# Remote Resolution

Use this file when the user asks how Zephyr resolves remotes, how `workspace:*` works, or which selector format to use.

## `zephyr:dependencies`

Zephyr uses the `zephyr:dependencies` field in `package.json` to map local remote names to application identifiers and resolution selectors.

Shape:

```json
{
  "zephyr:dependencies": {
    "local-name": "application-uid-or-name@selector"
  }
}
```

## Selectors to explain

- Label/tag/environment style: `@latest`, `@stable`, `@production`, `@staging`
- Semver: `@^1.2.3`, `@~2.0.0`, `@1.5.0`
- Wildcard latest: `@*`
- Workspace matching: `workspace:*`

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
