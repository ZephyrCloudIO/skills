# Configure Astro for Zephyr

## Setup

Read the site's existing `astro.config.*`, its `output` mode and adapter, and
the installed `astro` version before editing. Keep its existing integrations
and options. If `zephyr-astro-integration` is missing, install it only when
dependency changes are authorized; it is only needed at build time, so a
development dependency is sufficient.

The installed package declares an `astro` peer of
`^4.0.0 || ^5.15.8 || ^6.4.6 || ^7.0.7` and uses the Vite version that Astro
provides. Add `withZephyr()` as the last entry in `integrations`:

```typescript
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { withZephyr } from 'zephyr-astro-integration';

export default defineConfig({
  site: 'https://example.com',
  integrations: [mdx(), sitemap(), withZephyr()],
});
```

Astro runs `astro:build:done` hooks one integration at a time in list order,
and Zephyr uploads from that hook. Listing it last lets files written by
earlier integrations, such as a sitemap, exist before the upload. The default
export is the same `withZephyr` function. Do not add `vite-plugin-zephyr` to
`vite.plugins` as well; the integration already owns publication.

## Module Federation

This integration does not configure Module Federation and does not resolve
`zephyr:dependencies` into remote URLs. Its `mfConfigs` and `federation`
options are publication metadata forwarded unchanged and are required only for
TAP packages. Read [publication details](astro-publication.md) before
setting them. The shared `zephyr-module-federation` guide covers the
cross-project host and remote model.

## Static output and Cloudflare SSR preparation

Static output continues to use Astro's build asset list. The Cloudflare SSR
preparation implementation detects `output: 'server'` with the
`@astrojs/cloudflare` adapter, follows `.wrangler/deploy/config.json`, and
collects the complete generated server and client output. It sends an SSR
entrypoint and secret-free binding, asset, compatibility, and cron requirements.
It excludes generated Wrangler configuration and rejects missing modules,
symlinks, overlapping output directories, and unsupported bindings.

The selected Zephyr application configuration must advertise
`capabilities.cloudflareDeployment: 1` before transport. Without it, the build
fails before any asset upload. This protocol is preparation for the managed
runtime implementation; it does not establish that the current managed runtime
can host EmDash or other apps requiring D1/R2, sessions, Images, and scheduled
events. Do not add the capability locally to bypass the check, remove required
bindings, or advertise a live SSR deployment based only on a successful build.

Use `ZE_DISABLED=true` for local-only output verification. The exported
`collectCloudflareOutput(projectRoot)` inspects a completed build without
credentials or network access. The `examples/astro-emdash` fixture uses
published EmDash packages and preserves its native admin/API paths and custom
scheduled Worker entry. Its local preview enables local-only automatic
migrations; production uses deployment-managed migration checks.

The integration also loads `ZE_PUBLIC_*` values from the site's `.env` files
and rewrites `import.meta.env.ZE_PUBLIC_*` and `process.env.ZE_PUBLIC_*` reads
so environments can override them after the build. [Environment
variables](../env-vars.md) covers that model.

## Avoid misleading fixes

- Do not treat a successful `astro build` as publication. Zephyr errors in the
  build hook are logged and the build continues unless `ZE_FAIL_BUILD=true` is
  set for static builds. Cloudflare SSR preparation failures always fail the
  build; an invalid `target` also throws immediately.
- Do not set `target: 'tap-app'` on an ordinary site. TAP disables the
  `ZE_PUBLIC_*` rewrite and requires paired federation metadata.
- Do not assume source maps are published; `.map` files are skipped for
  ordinary sites.
- Do not put credentials in `ZE_PUBLIC_*`; those values are client-visible.

## Verify completion

Run the authorized build with the site's existing package runner. Confirm the
output directory contains the expected pages and assets, and that Zephyr
reports a successful publication with a version URL. A build without
credentials can establish local output correctness, but not live deployment
success. Report that distinction, and state plainly when server-rendered
routes are outside what was published.

On failure, keep the actionable error and fix the matching configuration. Do
not silently change the site's output mode, suppress errors, or claim a
partial build was deployed.
