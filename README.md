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

### Skills bundled with Zephyr packages

SDK setup, `with-zephyr`, and Module Federation guidance (`zephyr:dependencies`,
hosts and remotes) ship inside every published Zephyr package, versioned with the
SDK they describe. Each plugin also ships a dedicated skill, such as
`zephyr-vite`, `zephyr-rspack`, or `zephyr-metro`. After installing your Zephyr
package, link its bundled skills into your agents with:

```bash
npx skills experimental_sync
```

This command is experimental in the skills CLI. [TanStack Intent](https://github.com/TanStack/intent)
users can instead load bundled skills with `intent load <package>#<skill>`, for
example `intent load vite-plugin-zephyr#zephyr-vite`. Bundled skills require a
Zephyr package release newer than 1.4.2.

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

| Skill         | Useful for                                                                                                 |
| ------------- | ---------------------------------------------------------------------------------------------------------- |
| `zephyr-core` | Version URLs, tags, environments, promotion, rollback, dashboard routing, and public environment overrides |

## Maintaining skills

Use the lockfile-pinned Intent release with `pnpm install --frozen-lockfile`.
Run `pnpm exec intent maintainer status`, update the affected guidance and task
coverage, then run `pnpm exec intent maintainer sync`.

Inspect `pnpm skills:review --json`, review its actual source changes, and record
completed outcomes with the Intent maintainer workflow before running
`pnpm skills:check`. Do not mark missing evidence as a successful review.

The cumulative records are in `skills/_artifacts/`. Keep the skill directory
selected for repository distribution so its reference links continue to
resolve. Setup and synchronization do not publish releases or update consumer
installations.

## Releasing

[release-please](https://github.com/googleapis/release-please) manages
versions. Merging Conventional Commits to `main` updates a release pull request
that bumps `package.json` and both native plugin manifests
(`.claude-plugin/plugin.json` and `.cursor-plugin/plugin.json`) together and
writes the changelog. Merging that pull request tags and publishes the GitHub
release, which also runs the Intent release review in `check-skills.yml`. Do
not edit plugin versions by hand.

These repository skills own onboarding, product concepts, and cross-project
deployment workflows. Prefer SDK-specific skills from the application's
installed packages for configuration and version-dependent behavior. Intent
consumers select trusted packages in `intent.skills` and load their guidance
with `intent list` and `intent load <package>#<skill>`.

CI has read-only validation and review jobs pinned to the Intent release commit.
It does not open review pull requests or publish fixes. Native host activation
and fresh-agent task quality are separate checks from structural validation.

## Publishing to skills.sh

[skills.sh](https://skills.sh/ZephyrCloudIO/skills) has no submission step. It
lists skills from public GitHub repositories using anonymous install telemetry
from the `skills` CLI, so publishing means keeping every distributed skill
discoverable by `npx skills add ZephyrCloudIO/skills`:

- Keep each skill at `skills/<name>/SKILL.md` with `name` and `description`
  frontmatter, and keep the repository public.
- Run `pnpm skills:discover`. It runs the lockfile-pinned CLI with telemetry
  disabled and fails unless the CLI discovers exactly the skills selected in
  `.intent/skill-distribution.json`. CI runs it on every pull request.
- After merging, the next `npx skills add ZephyrCloudIO/skills` install
  publishes the change; installs and updates refresh the listing. Install
  counts for a removed skill, such as `zephyr-module-federation`, may remain on
  skills.sh until the directory drops it.

## Resources

- [Zephyr Cloud Documentation](https://docs.zephyr-cloud.io)
- [Zephyr Dashboard](https://app.zephyr-cloud.io)
- [Zephyr Mission Control](https://chromewebstore.google.com/detail/zephyr-mission-control/liflhldchhinbaeplljlplhnbkdidedn)
- [Zephyr Examples](https://github.com/ZephyrCloudIO/zephyr-examples)
