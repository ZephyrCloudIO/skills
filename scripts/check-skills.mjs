// Validates every skill in skills/ against the Agent Skills format, keeps
// reference links inside each skill, and keeps the plugin manifests in step with
// the skills and the release version.
import { existsSync, readFileSync, readdirSync, realpathSync } from 'node:fs';
import path from 'node:path';

// Top-level frontmatter fields defined by the Agent Skills specification.
const allowedFields = new Set(['name', 'description', 'license', 'compatibility', 'metadata', 'allowed-tools']);
const pluginManifests = ['.claude-plugin/plugin.json', '.codex-plugin/plugin.json', '.cursor-plugin/plugin.json'];
const marketplaces = ['.claude-plugin/marketplace.json', '.cursor-plugin/marketplace.json'];

const root = path.resolve(import.meta.dirname, '..');
const skillsRoot = path.join(root, 'skills');
const readJson = (file) => JSON.parse(readFileSync(path.join(root, file), 'utf8'));
const errors = [];

const releaseFiles = new Set(
  readJson('release-please-config.json').packages['.']['extra-files'].map((file) =>
    typeof file === 'string' ? file : file.path,
  ),
);
const rootVersion = readJson('package.json').version;
for (const file of releaseFiles) {
  if (!existsSync(path.join(root, file))) errors.push(`release-please-config.json: extra-file ${file} does not exist`);
}

function frontmatter(source) {
  const match = source.replace(/\r\n/gu, '\n').match(/^---\n([\s\S]*?)\n---\n/u);
  if (!match) return undefined;
  const fields = new Map();
  let parent;
  for (const line of match[1].split('\n')) {
    const topLevel = line.match(/^([\w-]+):\s*(.*)$/u);
    if (topLevel) {
      parent = topLevel[1];
      fields.set(parent, topLevel[2]);
      continue;
    }
    const nested = line.match(/^ {2}([\w-]+):\s*(.*)$/u);
    if (nested && parent === 'metadata') fields.set(`metadata.${nested[1]}`, nested[2]);
    else if (parent && line.trim()) fields.set(parent, `${fields.get(parent)} ${line.trim()}`);
  }
  return fields;
}

const skills = [];
for (const entry of readdirSync(skillsRoot, { withFileTypes: true })) {
  if (!entry.isDirectory()) continue;
  const skillRoot = path.join(skillsRoot, entry.name);
  const skillFile = path.join(skillRoot, 'SKILL.md');
  const relativeSkillFile = path.relative(root, skillFile).split(path.sep).join('/');
  if (!existsSync(skillFile)) {
    errors.push(`${relativeSkillFile}: missing`);
    continue;
  }
  skills.push(entry.name);
  const fields = frontmatter(readFileSync(skillFile, 'utf8'));
  if (!fields) {
    errors.push(`${relativeSkillFile}: missing frontmatter`);
    continue;
  }
  if (fields.get('name') !== entry.name) errors.push(`${relativeSkillFile}: name must match its directory`);
  if (!fields.get('description')?.trim()) errors.push(`${relativeSkillFile}: missing description`);
  for (const field of fields.keys()) {
    if (!field.startsWith('metadata.') && !allowedFields.has(field))
      errors.push(`${relativeSkillFile}: unsupported frontmatter field ${field}`);
  }

  for (const file of readdirSync(skillRoot, { recursive: true, withFileTypes: true })) {
    if (!file.isFile() || !file.name.endsWith('.md')) continue;
    const markdown = path.join(file.parentPath, file.name);
    for (const link of readFileSync(markdown, 'utf8').matchAll(/\[[^\]]+\]\(([^)#\s]+)(?:#[^)]*)?\)/gu)) {
      const destination = link[1];
      if (/^[a-z][a-z\d+.-]*:/iu.test(destination)) continue;
      const target = path.resolve(path.dirname(markdown), destination);
      const relativeMarkdown = path.relative(root, markdown);
      if (!existsSync(target)) errors.push(`${relativeMarkdown}: broken link ${destination}`);
      else if (path.relative(realpathSync(skillRoot), realpathSync(target)).startsWith('..'))
        errors.push(`${relativeMarkdown}: link leaves the skill directory ${destination}`);
    }
  }
}

// Every integration file must be routed from the zephyr-core table, directly or
// through the guide that table links to.
const integrations = path.join(skillsRoot, 'zephyr-core/references/integrations');
const routingTable = readFileSync(path.join(skillsRoot, 'zephyr-core/SKILL.md'), 'utf8');
const guides = readdirSync(integrations).filter((file) => file.endsWith('.md'));
const routed = guides.filter((guide) => routingTable.includes(`(references/integrations/${guide})`));
const routedText = routed.map((guide) => readFileSync(path.join(integrations, guide), 'utf8')).join('\n');
for (const guide of guides) {
  if (!routed.includes(guide) && !routedText.includes(`](${guide})`))
    errors.push(`skills/zephyr-core/references/integrations/${guide}: not linked from the zephyr-core routing table`);
}

const expectedSkills = skills.map((name) => `./skills/${name}`).sort();
const listsEverySkill = (list) => JSON.stringify([...list].sort()) === JSON.stringify(expectedSkills);
for (const file of pluginManifests) {
  const manifest = readJson(file);
  if (manifest.version !== rootVersion) errors.push(`${file}: version must be ${rootVersion}`);
  if (!releaseFiles.has(file)) errors.push(`${file}: not in release-please extra-files`);
  const listed =
    typeof manifest.skills === 'string' ? manifest.skills === './skills/' : listsEverySkill(manifest.skills);
  if (!listed) errors.push(`${file}: skills must be ./skills/ or list every skill`);
}
for (const file of marketplaces) {
  for (const plugin of readJson(file).plugins) {
    if (!listsEverySkill(plugin.skills)) errors.push(`${file}: ${plugin.name} must list every skill`);
  }
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exitCode = 1;
} else {
  console.log(`Skills are valid: ${skills.join(', ')}`);
}
