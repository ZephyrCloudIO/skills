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

## Resources

- [Zephyr Cloud Documentation](https://docs.zephyr-cloud.io)
- [Zephyr Dashboard](https://app.zephyr-cloud.io)
- [Zephyr Mission Control](https://chromewebstore.google.com/detail/zephyr-mission-control/liflhldchhinbaeplljlplhnbkdidedn)
- [Zephyr Examples](https://github.com/ZephyrCloudIO/zephyr-examples)
