# Agent Skills

Skills live in `skills/<name>/SKILL.md`: `zephyr-core`,
`zephyr-module-federation`, `zephyr-cli`, and `create-zephyr-apps`. Each
bundler or framework integration has a guide in
`skills/zephyr-core/references/integrations/<stack>.md`, listed in the
`zephyr-core` routing table.

Keep frontmatter to the Agent Skills fields (`name`, `description`, `license`,
`compatibility`, `metadata`, `allowed-tools`), keep links inside the skill
directory, and add a routing table row for a new integration. Run
`pnpm skills:check` and `pnpm skills:discover` before handing off.
