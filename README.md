# Zephyr Skills

[![skills.sh](https://skills.sh/b/ZephyrCloudIO/skills)](https://skills.sh/ZephyrCloudIO/skills)

A collection of [Agent Skills](https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills) for Zephyr Cloud.

## Installing

These skills work with any agent that supports the Agent Skills standard,
including Claude Code, Cursor, OpenAI Codex, OpenCode, GitHub Copilot, and Pi.

### Any agent (skills CLI)

Install with Vercel's [`skills`](https://github.com/vercel-labs/skills) CLI,
which also lists this repository on [skills.sh](https://skills.sh/ZephyrCloudIO/skills):

```bash
npx skills add ZephyrCloudIO/skills
```

The CLI detects your agents and asks where to install. Useful options:

```bash
# Show the skills in this repository without installing
npx skills add ZephyrCloudIO/skills --list

# Install one skill for specific agents, without prompts
npx skills add ZephyrCloudIO/skills --skill zephyr-core --agent claude-code cursor -y

# Install for your user instead of the current project
npx skills add ZephyrCloudIO/skills --global

# Update or remove installed skills
npx skills update
npx skills remove zephyr-core
```

Project installs are written to `.agents/skills/` and linked into each selected
agent's skill directory; pass `--copy` to copy the files instead.

### Claude Code

Install using the [plugin marketplace](https://code.claude.com/docs/en/discover-plugins#add-from-github):

```
/plugin marketplace add ZephyrCloudIO/skills
/plugin install zephyr@zephyr-cloud
/reload-plugins
```

### Cursor

Import the repo from GitHub using Cursor's documented skills flow:

1. Open **Settings > Rules**
2. Click **Add Rule** in **Project Rules**
3. Choose **Remote Rule (GitHub)**
4. Enter `https://github.com/ZephyrCloudIO/skills`

### Clone / Copy

Clone this repo and copy the skill folders into the appropriate directory for your agent:

| Agent        | Skill Directory              | Docs                                                                               |
| ------------ | ---------------------------- | ---------------------------------------------------------------------------------- |
| Claude Code  | `~/.claude/skills/`          | [docs](https://code.claude.com/docs/en/skills)                                     |
| Cursor       | `~/.cursor/skills/`          | [docs](https://cursor.com/docs/context/skills)                                     |
| OpenAI Codex | `~/.codex/skills/`           | [docs](https://developers.openai.com/codex/skills/)                                |
| OpenCode     | `~/.config/opencode/skills/` | [docs](https://opencode.ai/docs/skills/)                                           |
| Pi           | `~/.pi/agent/skills/`        | [docs](https://github.com/badlogic/pi-mono/tree/main/packages/coding-agent#skills) |

## Skills

Skills are contextual and auto-loaded based on your conversation. When a request matches a skill's triggers, the agent loads and applies the relevant skill to provide accurate, up-to-date guidance.

| Skill                      | Useful for                                                                                                            |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `zephyr-core`              | Adding Zephyr to an app, configuring its bundler or framework integration, versions, tags, environments, and rollback |
| `zephyr-module-federation` | Hosts, remotes, `zephyr:dependencies`, and remote resolution                                                          |
| `zephyr-cli`               | Publishing build output with `ze-cli` when there is no bundler integration                                            |
| `create-zephyr-apps`       | Scaffolding a new Zephyr project                                                                                      |

Most projects need only `zephyr-core`. Add `zephyr-module-federation` if the
application uses Module Federation.

`zephyr-core` has a guide for every integration in
[`skills/zephyr-core/references/integrations/`](skills/zephyr-core/references/integrations):
Vite, TanStack Start, Vinext, webpack, Rspack, Rsbuild, Modern.js, Rspress,
Rollup, Rolldown, Parcel, Astro, Nuxt, Metro, and Re.Pack. The agent reads only
the guide that matches the project's stack.

## Maintaining skills

Each skill lives in `skills/<name>/SKILL.md`. Integration guides live in
`skills/zephyr-core/references/integrations/<stack>.md` and are listed in the
`zephyr-core` routing table. When a change in
[zephyr-packages](https://github.com/ZephyrCloudIO/zephyr-packages) alters a
package's setup, options, or behavior, update its guide here.

Keep frontmatter to the Agent Skills fields (`name`, `description`, `license`,
`compatibility`, `metadata`, `allowed-tools`) and keep links inside the skill
directory. Run `pnpm skills:check` and `pnpm skills:discover` before opening a
pull request; CI runs both.

## Releasing

[release-please](https://github.com/googleapis/release-please) manages
versions. Merging Conventional Commits to `main` updates a release pull request
that bumps `package.json` and the native plugin manifests
(`.claude-plugin/plugin.json`, `.codex-plugin/plugin.json`, and
`.cursor-plugin/plugin.json`) together and writes the changelog. Merging that
pull request tags and publishes the GitHub release. Do not edit plugin versions
by hand.

## Publishing to skills.sh

[skills.sh](https://skills.sh/ZephyrCloudIO/skills) has no submission step. It
lists skills from public GitHub repositories using anonymous install telemetry
from the `skills` CLI, so publishing means keeping every distributed skill
discoverable by `npx skills add ZephyrCloudIO/skills`:

- Keep each skill at `skills/<name>/SKILL.md` with `name` and `description`
  frontmatter, and keep the repository public.
- Run `pnpm skills:discover`. It runs the lockfile-pinned CLI with telemetry
  disabled and fails unless the CLI discovers exactly the skills in `skills/`.
  CI runs it on every pull request.
- After merging, the next `npx skills add ZephyrCloudIO/skills` install
  publishes the change; installs and updates refresh the listing. Install
  counts for a removed skill may remain on skills.sh until the directory drops
  it.

## Resources

- [Zephyr Cloud Documentation](https://docs.zephyr-cloud.io)
- [Zephyr Dashboard](https://app.zephyr-cloud.io)
- [Zephyr Mission Control](https://chromewebstore.google.com/detail/zephyr-mission-control/liflhldchhinbaeplljlplhnbkdidedn)
- [Zephyr Examples](https://github.com/ZephyrCloudIO/zephyr-examples)
