---
name: zephyr-module-federation
description: Use when the user asks about zephyr:dependencies, hosts/remotes, Module Federation build order, remote resolution, cross-bundler remotes, or monorepo MF on Zephyr.
license: Apache-2.0
metadata:
  author: Zephyr Cloud IO
---

# Zephyr Module Federation

Use this skill for Zephyr's Module Federation workflow: host/remote setup, `zephyr:dependencies`, resolution behavior, build order, and cross-bundler examples.

## What to cover

- Explain both layers: bundler MF config and Zephyr dependency mapping.
- Prefer concrete examples over abstract theory.
- Keep the answer grounded in the user's stack: Webpack, Rspack, Vite, Rsbuild, Turbo, Nx, or mixed-bundler.
- If the question is mostly about general Zephyr setup, version URLs, tags/envs, or public env vars, also read `../zephyr-core/SKILL.md`.

## Core mental model

- Module Federation defines host/remote wiring in bundler config.
- Zephyr adds deploy-time dependency resolution through `zephyr:dependencies`.
- `workspace:*` is the most important Zephyr-specific dev workflow for coordinated branch/user/CI resolution.
- Remotes usually need to be built before hosts.
- Names must stay consistent across `package.json`, MF config, and dependency declarations.

## Answer flow

1. Read `references/setup-patterns.md` for host/remote config shapes.
2. Read `references/remote-resolution.md` for `zephyr:dependencies`, selectors, and `workspace:*`.
3. Read `references/examples.md` for concrete file paths and snippets.
4. Read `references/gotchas.md` for build order, naming, and mixed-bundler edge cases.
5. Link deeper docs from `references/docs-map.md`.

## Source priorities

- Public docs source: `/Users/hzk/dev/zephyr/zephyr-documentation/docs/`
- Examples source: `/Users/hzk/dev/zephyr/zephyr-examples/`
- Docs site: `https://docs.zephyr-cloud.io`
- Raw docs path pattern: `https://docs.zephyr-cloud.io/<path>.md`
- Docs index: `https://docs.zephyr-cloud.io/llms.txt`

## Guardrails

- Do not treat `zephyr:dependencies` as a replacement for MF config; it complements it.
- Do not recommend hardcoded production remote URLs when Zephyr resolution should be used.
- Do not ignore build order for remotes and hosts.
- Call out naming mismatches early; they are a common failure source.
