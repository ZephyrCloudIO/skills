// Confirms that the skills CLI behind skills.sh discovers exactly the skills this
// repository distributes. Listings on skills.sh come from `npx skills add`
// installs, so a skill the CLI cannot discover cannot be installed or listed.
import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const distribution = JSON.parse(readFileSync(path.join(root, '.intent/skill-distribution.json'), 'utf8'));
const expected = distribution.skills.map((skill) => skill.name).sort();

const cli = path.join(root, 'node_modules/skills/bin/cli.mjs');
const result = spawnSync(process.execPath, [cli, 'add', root, '--list'], {
  cwd: root,
  encoding: 'utf8',
  env: { ...process.env, DISABLE_TELEMETRY: '1', DO_NOT_TRACK: '1' },
});
const output = `${result.stdout}${result.stderr}`.replace(/\x1b\[[0-9;?]*[A-Za-z]/gu, '');
if (result.status !== 0) throw new Error(`skills add --list failed:\n${output}`);

const found = Number(output.match(/Found (\d+) skills?/u)?.[1]);
const listed = expected.filter((name) => new RegExp(`^│\\s+${name}\\s*$`, 'mu').test(output));
if (found !== expected.length || listed.length !== expected.length) {
  throw new Error(`skills CLI discovered ${found} skill(s); expected ${expected.join(', ')}.\n${output}`);
}
console.log(`skills CLI discovers ${expected.join(', ')}`);
