# SDK Setup

Use this file when the user asks how to add Zephyr to a frontend project, which SDK/plugin to install, or whether `with-zephyr` can wire up an existing app.

## Fastest path

For an existing app, start with the codemod:

```bash
curl -fsSL https://with.zephyr-cloud.io | node
```

Other launch forms:

```bash
npx with-zephyr
yarn dlx with-zephyr
pnpx with-zephyr
bunx with-zephyr
```

Why: the codemod detects the stack and makes the smallest setup change for supported bundlers/frameworks.

## Minimal prerequisites

- A Zephyr account or org/app access path
- A git repository with a remote, branch, and commit
- A supported Zephyr SDK path, or a build output directory for `zephyr-agent`

## What happens after `with-zephyr`

- It detects the stack and usually adds the matching Zephyr integration to the project config.
- It may add or update the relevant build config file for the bundler/framework.
- The next step is normally just to run the app's build command.
- After a successful Zephyr-enabled build, look for the version URL in the build output/logs.

## SDK picker

Use the official picker doc first:

- Docs page: `https://docs.zephyr-cloud.io/getting-started/find-your-sdk`
- Raw markdown: `https://docs.zephyr-cloud.io/getting-started/find-your-sdk.md`
- Source: `/Users/hzk/dev/zephyr/zephyr-documentation/docs/getting-started/find-your-sdk.mdx`

Current mapping:

| Stack             | SDK                                 |
| ----------------- | ----------------------------------- |
| Vite              | `vite-plugin-zephyr`                |
| Webpack           | `zephyr-webpack-plugin`             |
| Rspack            | `zephyr-rspack-plugin`              |
| Rsbuild / Rslib   | `zephyr-rsbuild-plugin`             |
| Rollup            | `rollup-plugin-zephyr`              |
| Rolldown          | `zephyr-rolldown-plugin`            |
| Parcel            | `parcel-reporter-zephyr`            |
| Metro             | `zephyr-metro-plugin`               |
| Re.Pack           | `zephyr-repack-plugin`              |
| Astro             | `zephyr-astro-integration`          |
| Modern.js         | `zephyr-modernjs-plugin`            |
| Nitro v3          | built-in `preset: 'zephyr'`         |
| Nuxt              | `zephyr-nuxt-module`                |
| Rspress           | `zephyr-rspress-plugin`             |
| Ember.js via Vite | `vite-plugin-zephyr`                |
| TanStack Start    | `vite-plugin-tanstack-start-zephyr` |

Fallback for unsupported stacks:

```ts
import { uploadOutputToZephyr } from 'zephyr-agent';

await uploadOutputToZephyr({
  rootDir: process.cwd(),
  outputDir: '.output',
  ssr: true,
});
```

Use this fallback when there is no official Zephyr SDK for the stack, but the project still produces a deployable output directory. It is the low-level integration path for custom frameworks and internal tooling.

Minimum assumption: Zephyr still needs a real built output directory and enough app/build context to upload it correctly.

## Smallest working examples

Vite:

```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { withZephyr } from 'vite-plugin-zephyr';

export default defineConfig({
  plugins: [react(), withZephyr()],
});
```

Source example: `/Users/hzk/dev/zephyr/zephyr-examples/bundlers/react-vite/vite.config.ts`

Rspack:

```ts
import { defineConfig } from '@rspack/cli';
import { withZephyr } from 'zephyr-rspack-plugin';

const config = defineConfig({
  entry: { main: './src/main.tsx' },
});

export default withZephyr()(config);
```

Source example: `/Users/hzk/dev/zephyr/zephyr-examples/bundlers/react-rspack/rspack.config.ts`

TanStack Start:

```ts
import { withZephyrTanstackStart } from 'vite-plugin-tanstack-start-zephyr';

plugins: [tanstackStart(), viteReact(), withZephyrTanstackStart()];
```

Source example: `/Users/hzk/dev/zephyr/zephyr-examples/frameworks/tanstack-start/vite.config.ts`

Astro:

```js
import { withZephyr } from 'zephyr-astro-integration';

export default defineConfig({
  integrations: [mdx(), sitemap(), withZephyr()],
});
```

Source example: `/Users/hzk/dev/zephyr/zephyr-examples/frameworks/astro/astro.config.mjs`

## Important setup notes

- Plugin placement is stack-specific, not globally “always last”.
- Nx compose-plugin setups usually put Zephyr last in the composition.
- Vite Module Federation and framework-specific integrations can require a specific order; verify against the stack docs/example before moving plugins around.
- For existing apps, prefer the codemod before hand-editing configs.
- Git context matters for deployment identity: repo, branch, and commit need to exist.
- If docs disagree on Rspack naming, prefer `zephyr-rspack-plugin` from the SDK picker and examples.

## Important availability caveats

- Astro integration is static-only. Do not present it as a general SSR deployment path.
- Nitro v3, Nuxt, and TanStack Start SSR-style paths are currently constrained to Zephyr's managed Cloudflare path in the public docs.
- If the user needs unsupported SSR behavior or a custom runtime, verify whether `zephyr-agent` output upload is a better fit than an official framework SDK.

## Best docs to link

- Quick start: `https://docs.zephyr-cloud.io/getting-started/quick-start.md`
- SDK picker: `https://docs.zephyr-cloud.io/getting-started/find-your-sdk.md`
- Existing app integration: `https://docs.zephyr-cloud.io/integrations/existing-app.md`
- Vite: `https://docs.zephyr-cloud.io/bundlers/vite.md`
- llms index: `https://docs.zephyr-cloud.io/llms.txt`
