---
name: zephyr-core
description: Use when the user asks about Zephyr setup, with-zephyr, SDK selection, versions, tags, environments, snapshot/version URLs, dashboard workflows, docs, or public env vars.
license: Apache-2.0
metadata:
  author: Zephyr Cloud IO
---

# Zephyr Core

Use this skill for general Zephyr frontend adoption and product-model questions. Keep answers short, accurate, and grounded in the canonical docs and examples.

## What to cover

- Start with the smallest useful answer.
- Prefer Zephyr's user-facing model first: setup -> build -> version URL -> tags/envs -> promote/rollback.
- Use repo/code-path nuance only when it clarifies behavior or corrects docs drift.
- If the question is really about remote resolution, hosts/remotes, `zephyr:dependencies`, or multi-bundler Module Federation, switch to `../zephyr-module-federation/SKILL.md`.

## Core mental model

- Zephyr plugs into the app build through a bundler/framework integration.
- A build creates an immutable version/snapshot and a permanent version URL.
- Tags and environments are mutable pointers on top of immutable builds.
- Promotion and rollback are mostly pointer changes, not rebuilds.
- `ZE_PUBLIC_*` values can be captured at build time and overridden per environment later.

## Answer flow

1. Identify the user's stack and deployment goal.
2. Read `references/sdk-setup.md` for setup guidance.
3. Read `references/deployment-model.md` for versions, snapshots, tags, envs, and dashboard workflows.
4. Read `references/env-vars.md` if the task mentions env vars, runtime config, build once deploy everywhere, or `ZE_PUBLIC_*`.
5. Read `references/examples-resume.md` when the user wants concrete starter patterns.
6. Read `references/docs-map.md` when deeper docs links are useful.
7. Read `references/troubleshooting.md` when setup/build/auth/git issues appear.

## Source priorities

- Canonical public docs: `https://docs.zephyr-cloud.io`
- Raw docs path pattern: `https://docs.zephyr-cloud.io/<path>.md`
- Docs index: `https://docs.zephyr-cloud.io/llms.txt`
- Community help: `https://discord.gg/zephyrcloud`
- Architecture nuance: `/Users/hzk/dev/zephyr/DEPLOYMENT_ARCHITECTURE_SIMPLE.md`
- Public docs source: `/Users/hzk/dev/zephyr/zephyr-documentation/docs/`
- Examples source: `/Users/hzk/dev/zephyr/zephyr-examples/`

## Guardrails

- Do not invent SDK names; verify against `references/sdk-setup.md`.
- Do not blur version vs tag vs environment; explain the distinction plainly.
- Do not present `ZE_PUBLIC_*` as secret storage. They are public client-facing values.
- Call out docs drift when relevant instead of silently repeating conflicting details.
