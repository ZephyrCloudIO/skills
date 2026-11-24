# Troubleshooting

Use this file for common Zephyr setup and build failures.

## First checks

- Confirm the stack is using the right SDK/plugin.
- Confirm the project is a git repo with a remote, branch, and commit.
- Confirm the user is authenticated and has access to the target app/org.
- Confirm the Zephyr integration is attached to the actual build config being executed.

## Common failure classes

### Wrong plugin for the stack

- Vite -> `vite-plugin-zephyr`
- Rspack -> `zephyr-rspack-plugin`
- Webpack -> `zephyr-webpack-plugin`
- TanStack Start, Vinext, Astro, Rspress, Nuxt, Nitro -> prefer their dedicated integration paths

### Git context missing

Common symptoms:

- app identity cannot be resolved
- build ID / auth / application UID errors
- deployment metadata is incomplete

### Auth/access mismatch

Common symptoms:

- login succeeds locally but deploy cannot write
- CI token works for one org/app but not another
- build accepts config but publish fails later
- a permission profile denies the deploy (`ZE10038`): see Deploy denied

### Zephyr unreachable

Error code `ZE50001` (category `unreachable`) means the plugin could not reach Zephyr
or Zephyr failed on its side: network, DNS, timeout, HTTP 5xx, 408, 425 or 429. A
wrapper code such as `ZE20014` can sit on top of it; the reason line shows `ZE50001`.
Nothing in the project or the credentials needs a fix. Retry later and check
https://status.zephyr-cloud.io. By default the build still succeeds without a deploy,
except in CI with `ZE_CI_TOKEN` set. `ZE_FAIL_BUILD=true` makes it fail. Other 4xx
responses are `ZE40035` (config), not an outage. `ze-cli deploy <dir> --format json`
prints one JSON document on stdout with `error.kind: "unreachable"` and exits 1.

### Deploy denied

Error code `ZE10038` (category `forbidden`) means a permission profile on an
environment did not let the uploader deploy. Zephyr keeps the uploaded version, but no
tag or environment of the app moves. The error is
`ZE10038: Deploy denied for <app> (version kept, nothing moved)`.

Then it lists each denied environment, its profile, and what the uploader needs. When
the environment follows a tag, the line names the tag. The uploader can need the Member
or Maintainer role on the profile, a seat, the app edit role, or an org admin. An
environment without details shows `details not available`. The last line says to ask
an org admin and, when known, gives the number of owners and admins in the org. It does
not print their names, because CI logs can be public.

Fix it in Zephyr: get a grant on the profile, or change which environments the
upload's branch or tag matches. Retrying the build does not help.

Other errors fail a CI build by default only when `ZE_CI_TOKEN` is set. `ZE10038` fails
every CI build, whatever credential the build uses. To opt out, for example for one app
of a monorepo, set `ZE_FAIL_BUILD=false`, or `failBuild: false` on the webpack or Rspack
plugin. Any `ZE_FAIL_BUILD` value other than `true` opts out, an empty value too. A
local build logs the error and continues, unless `ZE_FAIL_BUILD=true` or
`failBuild: true` is set. `ze-cli deploy` exits 1 on `ZE10038` in CI and locally. With
`--format json` it prints `error.kind: "forbidden"`.

When Zephyr is slow to decide, the upload can finish without this check, and the build
passes. If a build passes but its environments did not move, check the app in Zephyr.

A Zephyr write that the API refuses with HTTP 403 and code `ENVIRONMENT_DENIED` also
gives `ZE10038`, with the same failure policy. This includes the upload itself. Its
heading is `Denied by a permission profile (nothing changed)`: nothing is kept, and the
write can be a settings change.

### Docs drift to call out

- If Rspack docs and examples disagree, prefer `zephyr-rspack-plugin` from the SDK picker and examples.
- Public docs around status names have some drift; keep answers focused on immutable versions plus mutable routing targets.

## Good error docs

- Error index: `https://docs.zephyr-cloud.io/errors.md`
- Git remote missing: `https://docs.zephyr-cloud.io/errors/ze10014.md`
- Git config missing: `https://docs.zephyr-cloud.io/errors/ze10016.md`
- Auth error: `https://docs.zephyr-cloud.io/errors/ze10018.md`
- Build ID failure: `https://docs.zephyr-cloud.io/errors/ze10019.md`
