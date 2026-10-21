# Configure Modern.js for Zephyr

## Setup

Read the application's existing `modern.config.ts` and installed package
versions before editing. Keep `appTools()`, its runtime and router settings,
and other framework plugins. The package peers on `@modern-js/app-tools` ^3.0.0.

Install both `zephyr-modernjs-plugin` and `zephyr-rspack-plugin` as development
dependencies when dependency changes are authorized. The Rspack plugin is
declared as an optional peer, but the Modern.js plugin imports it while
configuring every build, so the build fails to configure without it.

Add `withZephyr()` after `appTools()`. The package README lists these output
settings as required so the HTML entry is emitted at the output root; the plugin
does not set them for you:

```typescript
import { appTools, defineConfig } from '@modern-js/app-tools';
import { withZephyr } from 'zephyr-modernjs-plugin';

export default defineConfig({
  output: {
    distPath: { html: './' },
  },
  html: {
    outputStructure: 'flat',
  },
  source: {
    mainEntryName: 'index',
  },
  plugins: [appTools(), withZephyr()],
});
```

The options are `target` (`web`, `ios`, `android`, or `tap-app`),
`wait_for_index_html`, and `hooks.onDeployComplete`, exported as
`ZephyrModernjsPluginOptions`. Whether `snapshotType` and `entrypoint` take
effect depends on the installed plugin's compiler integration; see below.

## Order with Module Federation

The plugin declares `pre: ['@modern-js/plugin-module-federation-config']`, so
Modern.js runs Module Federation's config plugin before Zephyr's. Zephyr then
reads federation plugins and resolves remotes. Keep the app's existing Module
Federation Modern.js plugin; do not reorder plugins to work around federation
detection.

Check the installed `zephyr-modernjs-plugin` implementation before relying on
late configuration. The coordinated implementation registers
`onBeforeCreateCompiler` and passes the finalized `bundlerConfigs` array to
`zephyr-rspack-plugin` once, after Modern.js applies `tools.rspack`. Earlier
versions register `modifyRspackConfig`; federation plugins added through
`tools.rspack` are invisible to those versions. Do not assume an unreleased
compiler-coordination change is installed. The `zephyr-module-federation` skill
covers `zephyr:dependencies` and build order.

## Understand the publication shape

Modern.js 3 builds only with Rspack. With the coordinated implementation,
client and server compilers share one Zephyr engine and publication. The
compiler-array integration can apply `snapshotType` and `entrypoint`.
Client-only builds use the same array integration.

Modern.js's coordinated integration uses the finalized client configuration's
application base for its server compiler too. The existing HTML-base and
public-path detection still applies to the client; server public paths such as
`/bundles/` describe compiler output locations. Actual public paths are not
rewritten, and generic Rspack/Webpack integrations keep their existing base
detection. Do not change the application's route base to match its server
output folder.

Earlier implementations wrap each `modifyRspackConfig` call separately. Each
config gets its own engine and publication, and `snapshotType` and `entrypoint`
have no effect there. Check installed package versions and the registered hook
when diagnosing this behavior.

A coordinated upload alone does not establish Edge SSR compatibility.
Modern.js's server bundle exports a framework request handler; selecting
`bundles/index.js` does not provide a Worker `fetch` adapter. Verify the actual
runtime adapter, required render resources, and server federation compatibility
before claiming Edge SSR works.

When `NODE_ENV` is `development` as the config loads, a companion plugin sets
the client `output.publicPath` to `auto` for the dev server, except for
`tap-app`. Production builds keep the app's public path.

## Avoid misleading fixes

- Do not remove `zephyr-rspack-plugin` because it is an optional peer. The
  Modern.js plugin cannot configure the build without it.
- Do not follow the README's `appTools({ bundler: 'webpack' })` guidance or its
  "Modern.js 2.x" requirement. In `@modern-js/app-tools` 3.x, `appTools()`
  takes no arguments, and this plugin only hooks Rspack config.
- Do not use `snapshotType` or `entrypoint` as a substitute for a compatible
  server runtime entrypoint, or assume older per-config versions honor them.
- Do not treat a finished Modern.js build as a deployment. Verify the actual
  publication result; use `ZE_FAIL_BUILD=true` when publication failures must
  fail the build.
- Do not put credentials in `ZE_PUBLIC_*`; those values are client-visible.

## Verify completion

Run the authorized production build with the application's existing package
runner, usually `modern build`. Confirm the HTML entry is at the output root,
any federation remotes appear in Zephyr's "Resolved remotes" log, and the
publication has a version URL. For coordinated builds, confirm client and
server assets belong to one snapshot. For older per-config builds, check each
reported publication and explain the limitation. A compilation with errors is
never uploaded. A build without credentials can establish local asset
correctness, but not live deployment success. Report that distinction.

For SSR, request the deployed page directly and inspect its HTML before client
JavaScript runs. An HTTP success response or a working hydrated page alone does
not prove server rendering.

On failure, keep the actionable error and fix the matching configuration or
publication issue. Do not switch bundlers, remove federation plugins, suppress
errors, or claim that a partial build was deployed.
