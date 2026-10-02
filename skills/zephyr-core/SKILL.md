---
name: zephyr-core
description: Use when managing Zephyr version URLs, tags, environments, promotion, rollback, dashboard routing, or public environment overrides. SDK setup and Module Federation configuration belong to the installed zephyr-packages skills.
license: Apache-2.0
metadata:
  author: Zephyr Cloud IO
  purpose: Explain and operate Zephyr's immutable versions, mutable deployment targets, dashboard workflows, and public environment overrides without prescribing SDK configuration.
  domain: platform
  type: core
sources:
  - ZephyrCloudIO/skills:**/skills/zephyr-core/references/*.md
  - README.md
---

# Zephyr platform workflows

Start with the application, existing version, and environment the user is asking
about. For SDK installation, build configuration, or host/remote wiring, use the
skills bundled with the relevant installed package from zephyr-packages instead.
If that package has no bundled guide yet, report the limitation and consult its
matching README and types rather than recreating plugin instructions here.

## Version and routing model

A version is an immutable deployed build with a permanent URL. Tags and
environments are mutable routing targets. Promotion and rollback generally
change those pointers; do not tell the user to rebuild an existing version just
to select it for another environment.

Read [deployment model](references/deployment-model.md) when distinguishing
versions, snapshots, tags, environments, or asynchronous target updates.
Confirm the intended application, target, and version before an authorized
routing change. A request accepted by an API is not proof that every target has
finished updating.

## Public configuration

Read [environment overrides](references/env-vars.md) for public runtime values
and per-environment dashboard settings. ZE*PUBLIC*\* values are client-visible,
not secret storage. Do not expose credentials through those settings.

## Access and diagnostics

Read [platform troubleshooting](references/troubleshooting.md) for account/app
permissions, target selection, and pending routing changes. Use
[documentation links](references/docs-map.md) when a deeper product explanation
is needed. Do not turn a platform diagnosis into a plugin configuration rewrite.

## Completion

Explain which immutable version or mutable target the user should use. For an
actual change, verify the requested target's resulting state or report what is
still pending. Keep version publication, tag resolution, and environment
activation distinct.
