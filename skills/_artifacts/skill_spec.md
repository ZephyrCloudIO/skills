# @zephyrcloudio/skills skill spec

This repository owns Zephyr onboarding, product concepts, and cross-project
deployment workflows. Version-sensitive SDK implementation guidance belongs in
the package that ships the implementation.

## Coverage and ownership

`zephyr-core` covers SDK selection, immutable versions, tags, environments, and
public runtime configuration. `zephyr-module-federation` covers the deployment
layer around host and remote wiring, dependency selectors, and build order.
Their existing bodies and reference layout remain authoritative here.

Both skills are explicitly selected for repository distribution. Keep the
existing `zephyr` plugin identity and the `zephyr-cloud` marketplace identity.
Intent generates metadata that points to those same directories, not another
copy of the guidance. The repository stays private as an npm package.

Source mappings track the maintained references inside this repository. They
do not establish automatic freshness against another repository or live docs.
For implementation work, prefer the matching installed package's guidance and
perform manual cross-repository review when needed.

Reference mappings use repository-qualified Git globs with a leading `**/`.
This avoids the local Git literal-prefix pruning behavior when Intent excludes
dependency directories. The matched files still belong to the selected skill.

## Verification and remaining work

The local structural gate is `pnpm skills:check`; reviews are inspected with
`pnpm skills:review --json` and recorded after the affected evidence is checked.
Validation and metadata synchronization do not establish fresh-agent discovery,
successful consumer deployments, or native host acceptance. Those checks remain
explicit follow-ups rather than recorded passing results.

Intent preserves plugin versions. Bump the authoritative native plugin versions
when changed guidance is released. Setup and sync do not publish or update an
installed consumer copy. CI validates pull requests and produces read-only
release reports; it does not create pull requests or publish fixes.

## Coverage and batch history

- 2026-10-02: Adopted Intent 0.5.0 for the existing two skills at source baseline
  `e43112fe22ef7bb09f70526c75a320f061e753e3`. Preserved activation descriptions as
  `metadata.purpose`, recorded the platform and federation tasks, and retained
  the existing installation routes. No SDK API guidance was migrated into this
  repository. Source-aware reviews cover local reference changes only.
