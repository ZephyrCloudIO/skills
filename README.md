# Zephyr Skills

A collection of [Agent Skills](https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills) for Zephyr Cloud.

## Installing

These skills work with any agent that supports the Agent Skills standard, including Claude Code, OpenCode, OpenAI Codex, and Pi.

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

### npx skills

Install using the [`npx skills`](https://skills.sh) CLI:

```
npx skills add https://github.com/ZephyrCloudIO/skills
```

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

| Skill                      | Useful for                                                                                                                            |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `zephyr-core`              | Zephyr setup, `with-zephyr`, SDK selection, versions, tags, environments, snapshot/version URLs, dashboard flows, and public env vars |
| `zephyr-module-federation` | `zephyr:dependencies`, host/remote setup, remote resolution, mixed-bundler Module Federation, and monorepo MF workflows               |

## Maintaining skills

Use the lockfile-pinned Intent release with `pnpm install --frozen-lockfile`.
Run `pnpm exec intent maintainer status`, update the affected guidance and task
coverage, then run `pnpm exec intent maintainer sync`.

Inspect `pnpm skills:review --json`, review its actual source changes, and record
completed outcomes with the Intent maintainer workflow before running
`pnpm skills:check`. Do not mark missing evidence as a successful review.

The cumulative records are in `skills/_artifacts/`. Keep both existing skill
directories selected for repository distribution so their sibling reference
links continue to resolve. Setup and synchronization do not publish releases,
update consumer installations, or bump native plugin versions; bump those
versions deliberately when releasing changed skill content.

These repository skills own onboarding, product concepts, and cross-project
deployment workflows. Prefer SDK-specific skills from the application's
installed packages for configuration and version-dependent behavior. Intent
consumers select trusted packages in `intent.skills` and load their guidance
with `intent list` and `intent load <package>#<skill>`.

CI has read-only validation and review jobs pinned to the Intent release commit.
It does not open review pull requests or publish fixes. Native host activation
and fresh-agent task quality are separate checks from structural validation.

## Resources

- [Zephyr Cloud Documentation](https://docs.zephyr-cloud.io)
- [Zephyr Dashboard](https://app.zephyr-cloud.io)
- [Zephyr Mission Control](https://chromewebstore.google.com/detail/zephyr-mission-control/liflhldchhinbaeplljlplhnbkdidedn)
- [Zephyr Examples](https://github.com/ZephyrCloudIO/zephyr-examples)
