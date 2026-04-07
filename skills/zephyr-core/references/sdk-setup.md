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

- Zephyr integration should stay near the final bundler/framework config, usually as the last plugin/wrapper.
- For existing apps, prefer the codemod before hand-editing configs.
- Git context matters for deployment identity: repo, branch, and commit need to exist.
- If docs disagree on Rspack naming, prefer `zephyr-rspack-plugin` from the SDK picker and examples.

## Best docs to link

- Quick start: `https://docs.zephyr-cloud.io/getting-started/quick-start.md`
- SDK picker: `https://docs.zephyr-cloud.io/getting-started/find-your-sdk.md`
- Existing app integration: `https://docs.zephyr-cloud.io/integrations/existing-app.md`
- Vite: `https://docs.zephyr-cloud.io/bundlers/vite.md`
- llms index: `https://docs.zephyr-cloud.io/llms.txt`
