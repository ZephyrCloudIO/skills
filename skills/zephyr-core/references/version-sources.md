# Version Sources

Use this file when the agent needs to add, update, or pin a Zephyr package or GitHub Action version.

## Core rule

Always prefer the latest released version. Do not hardcode version numbers in `package.json`, workflow files, or config unless the user explicitly asks for a specific version.

## Why this matters

Zephyr packages and actions release frequently. Hardcoded versions quickly become outdated and can break builds or miss critical fixes. For example, pinning `zephyr-rspress-plugin` to an old minor version led to an integration that was already superseded by the time the PR was reviewed (see `https://github.com/kitajs/html/pull/509`).

## Authoritative sources

| Artifact                                                                                                                                                                                                                                                                                                                                                                                                        | Source          | How to get the latest                                                                |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- | ------------------------------------------------------------------------------------ |
| Zephyr npm packages (`vite-plugin-zephyr`, `zephyr-webpack-plugin`, `zephyr-rspack-plugin`, `zephyr-rsbuild-plugin`, `rollup-plugin-zephyr`, `zephyr-rolldown-plugin`, `parcel-reporter-zephyr`, `zephyr-metro-plugin`, `zephyr-repack-plugin`, `zephyr-astro-integration`, `zephyr-modernjs-plugin`, `zephyr-nuxt-module`, `zephyr-rspress-plugin`, `vite-plugin-tanstack-start-zephyr`, `zephyr-agent`, etc.) | npm registry    | `npm view <package-name> version` or install with `<package-name>@latest`            |
| `with-zephyr` codemod                                                                                                                                                                                                                                                                                                                                                                                           | npm registry    | `npm view with-zephyr version` or `npx with-zephyr@latest`                           |
| `zephyr-preview-environment-action`                                                                                                                                                                                                                                                                                                                                                                             | GitHub releases | `https://github.com/ZephyrCloudIO/zephyr-preview-environment-action/releases/latest` |
| All Zephyr packages monorepo                                                                                                                                                                                                                                                                                                                                                                                    | GitHub releases | `https://github.com/ZephyrCloudIO/zephyr-packages/releases/latest`                   |

## Recommended install patterns

For the codemod (preferred for existing apps):

```bash
curl -fsSL https://with.zephyr-cloud.io | node
# or
npx with-zephyr@latest
```

For manual package installation, let the package manager resolve the latest version:

```bash
npm install <package-name>@latest
pnpm add <package-name>@latest
yarn add <package-name>@latest
bun add <package-name>@latest
```

For GitHub Actions, point to the latest release tag:

```yaml
- uses: ZephyrCloudIO/zephyr-preview-environment-action@v0.2.0
```

When the exact latest tag is unknown, open `https://github.com/ZephyrCloudIO/zephyr-preview-environment-action/releases/latest` and use the resolved tag.

## What to avoid

- Do not copy version numbers from old examples, blog posts, or previous PRs without verifying they are still current.
- Do not pin Zephyr packages to a fixed version in `package.json` unless the user asks for it.
- Do not use a stale action tag because it appeared in an earlier workflow file.

## When pinning is okay

Only pin when:

- The user explicitly requests a specific version.
- A reproducible build artifact is required and the user understands they are opting out of automatic updates.
- A known incompatibility exists with the latest version and the user has verified the pin is necessary.

In all other cases, prefer `@latest`, `^<latest>`, or the latest release tag.
