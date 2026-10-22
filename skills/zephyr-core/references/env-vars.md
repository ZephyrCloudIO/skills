# Environment Variables

Use this file when the user asks about `ZE_PUBLIC_*`, runtime config, build once deploy everywhere, or per-environment variable overrides.

## Build switches

Use these when the user asks how to fail a build on a Zephyr error, or how to build without Zephyr.

| Variable        | Effect                                                                                                         |
| --------------- | -------------------------------------------------------------------------------------------------------------- |
| `ZE_FAIL_BUILD` | `true` makes a Zephyr failure fail the build. Otherwise the failure is logged and the build continues.         |
| `ZE_DISABLED`   | `true` skips Zephyr. The bundle is built and is not deployed. No request, no token, no git information needed. |

- `ZE_DISABLED=true` works in the webpack, rspack, rsbuild (and Modern.js) and Vite plugins and in `ze-cli run`, `deploy` and `watch`. Each prints `The bundle is built. The bundle is not deployed. Zephyr is disabled (ZE_DISABLED).`
- Only the exact value `true` counts. It never turns on by itself, and it is not the fail-open behavior after an outage (there Zephyr is still contacted).
- Do not suggest it to hide a failing deploy. Use it for a deliberate local, fork or outage build.
- Other integrations (rollup, rolldown, parcel, metro, repack, astro, nuxt, rspress, TanStack Start, vinext) do not read it yet.
- With Vite, skip mode also leaves out the Zephyr Module Federation runtime plugin and `ZE_PUBLIC_*` rewrites.

## Core rule

- `ZE_PUBLIC_*` variables are public client-facing values captured at build time.
- They are not secret storage.
- Zephyr can override them per environment at runtime.
- Public docs currently describe environment-level overrides as beta.

## How it works

1. Build-time capture: Zephyr records variables prefixed with `ZE_PUBLIC_`.
2. Manifest generation: captured values are written into `zephyr-manifest.json`.
3. Runtime override: an environment can inject different values without rebuilding.

Why this matters: the same built artifact can run in development, staging, and production with different public config.

This applies to public client-facing values. Secure server-only values are a separate concern and should not be modeled as `ZE_PUBLIC_*`.

If the user asks where secrets should go instead, route them to the server-side environment variable path rather than public runtime overrides.

## Example

Build-time `.env`:

```bash
DATABASE_URL=postgres://localhost/myapp
ZE_PUBLIC_API_URL=https://api.development.example.com
ZE_PUBLIC_FEATURE_FLAGS=beta-ui,new-checkout
ZE_PUBLIC_ANALYTICS_KEY=dev_analytics_12345
```

Application usage:

```ts
export const config = {
  apiUrl: process.env.ZE_PUBLIC_API_URL,
  flags: process.env.ZE_PUBLIC_FEATURE_FLAGS,
  analyticsKey: process.env.ZE_PUBLIC_ANALYTICS_KEY,
};
```

Environment-level overrides example:

| Environment | ZE_PUBLIC_API_URL                 | ZE_PUBLIC_FEATURE_FLAGS          |
| ----------- | --------------------------------- | -------------------------------- |
| Development | `https://api.dev.example.com`     | `beta-ui,new-checkout,analytics` |
| Staging     | `https://api.staging.example.com` | `new-checkout,analytics`         |
| Production  | `https://api.example.com`         | `analytics`                      |

## Remote overrides relationship

The same environment-level override system also supports remote dependency overrides. If the user is asking about both env vars and remotes together, also read `../../zephyr-module-federation/references/remote-resolution.md`.

## Dashboard flow

- Go to the Zephyr dashboard DevOps section.
- Select the environment.
- Set override values for the `ZE_PUBLIC_*` entries.
- Requests served from that environment use the environment values, not the original build-time values.

## Guardrails

- Keep secrets out of `ZE_PUBLIC_*`.
- Do not tell users they need a rebuild for normal per-environment public config changes.
- If the value is server-only or sensitive, Zephyr public env var overrides are the wrong tool.
- If the user needs secure server-side environment variables, explain that this is a different path than public runtime overrides.

## Best docs to link

- Environment overrides: `https://docs.zephyr-cloud.io/features/environment-overrides.md`
- Tags & environments: `https://docs.zephyr-cloud.io/features/tags-environments.md`
- Architecture manifest section: `https://docs.zephyr-cloud.io/reference/architecture.md`
