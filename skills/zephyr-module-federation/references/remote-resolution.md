# Remote Resolution

Use this file when the user asks how Zephyr resolves remotes, how `workspace:*` works, or which selector format to use.

## `zephyr:dependencies`

Zephyr uses the `zephyr:dependencies` field in `package.json` to map local remote names to application identifiers and resolution selectors.

Valid shapes:

```json
{
  "zephyr:dependencies": {
    "local-name": "workspace:*"
  }
}
```

```json
{
  "zephyr:dependencies": {
    "local-name": "application-uid-or-name@selector"
  }
}
```

```json
{
  "zephyr:dependencies": {
    "local-name": "zephyr:application-uid-or-name@selector"
  }
}
```

The `zephyr:` registry prefix is optional in current docs.

## Selectors to explain

- Label/tag/environment style: `@latest`, `@stable`, `@production`, `@staging`
- Semver: `@^1.2.3`, `@~2.0.0`, `@1.5.0`
- Wildcard latest: `*`
- Workspace matching: `workspace:*`
- Build target placeholder: `@dev-${target}` (combines with any label)

## `${target}` placeholder

The SDK replaces `${target}` in a selector with the build target (`web`, `ios`, `android`, or `tap-app`) before resolving it. Use it when a remote keeps one environment or tag per platform, which React Native remotes need because an environment points to a single version:

```json
{
  "zephyr:dependencies": {
    "mobile-cart": "zephyr:mobile-cart.super-app.acme@dev-${target}"
  }
}
```

- An iOS host build resolves `dev-ios`; an Android host build resolves `dev-android`. No per-platform `package.json` edits in CI.
- Each per-platform label must exist. Environment conditions only follow a tag or version, so `dev-ios` typically follows a tag whose conditions include `target is ios`.
- In a JavaScript `zephyr.config.*`, write the selector in plain quotes; a template literal would interpolate `${target}` as a JS variable.
- Requires a `zephyr-agent` release that includes [zephyr-packages#711](https://github.com/ZephyrCloudIO/zephyr-packages/pull/711); older SDKs send the literal placeholder and fail to resolve.

## `workspace:*`

This is the most important Zephyr-specific selector for local dev and coordinated CI.

It resolves the most recent version matching build context, including:

- git branch
- target platform
- CI vs local
- username / build identity

Why it matters:

- feature branches consume matching remotes automatically
- local dev stays isolated from CI builds
- teams do not need to hand-edit remote URLs for normal branch work

Concrete example:

- Host on branch `feature/cart`, user `alice`, local build, platform `web`
- Remote selector is `workspace:*`
- Zephyr prefers the most recent remote build that also matches `feature/cart`, `alice`, local context, and `web`
- If none exists, the SDK retries the same remote with version `*` and uses the latest published version

What to expect if no exact match exists:

- The SDK resolves version `*` silently; with `DEBUG=zephyr:remotes` it logs `No workspace build found for <remote>@workspace:*; falling back to the latest published version`.
- Some public docs describe this as a default-environment fallback; the current SDK uses the latest published version instead.
- That means the remote needs at least one published build to resolve cleanly; an exact workspace match always wins when it exists.
- If the user sees unresolved remotes, check whether the remote app has actually been built and exposed through an environment.

## Selector guidance by scenario

| Scenario                       | Good default                                              |
| ------------------------------ | --------------------------------------------------------- |
| Branch-based local dev         | `workspace:*`                                             |
| Moving preview/staging channel | environment/tag-style selector like `@staging` or `@beta` |
| Stable production pin          | exact version like `@1.2.3`                               |
| Latest acceptable version      | `*` or an explicit moving selector, depending on policy   |

## Resolution priority note

For label-like selectors, the public docs say Zephyr resolves by looking for:

1. environment name
2. tag name
3. version name

If a user is confused by `production` or `staging`, explain that those names may resolve to an environment before they resolve to a tag.

## Best docs to link

- Remote dependencies: `https://docs.zephyr-cloud.io/features/remote-dependencies.md`
- Environment overrides: `https://docs.zephyr-cloud.io/features/environment-overrides.md`
- MF guide: `https://docs.zephyr-cloud.io/tutorials/mf-guide.md`
