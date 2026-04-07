# Examples Resume

Use this file when the user wants concrete Zephyr setup examples for frontend stacks.

## Fast starting points

- Vite SPA: `bundlers/react-vite`
- Rspack SPA: `bundlers/react-rspack`
- TanStack Start: `frameworks/tanstack-start`
- Astro: `frameworks/astro`
- Cross-bundler MF: `module-federation/react-vite-rspack-webpack`
- Monorepo MF: `build-systems/turborepo-rspack-mf`

Repo root: `/Users/hzk/dev/zephyr/zephyr-examples`

## Core pattern

- Install the Zephyr integration that matches the stack.
- Add `withZephyr()` as the last plugin, or wrap the final config with `withZephyr()`.
- For special frameworks, use the framework-specific Zephyr integration instead of the generic bundler plugin.

## Good references

### Minimal Vite

File: `/Users/hzk/dev/zephyr/zephyr-examples/bundlers/react-vite/vite.config.ts`

```ts
import react from '@vitejs/plugin-react';
import { withZephyr } from 'vite-plugin-zephyr';

export default defineConfig({
  plugins: [react(), withZephyr()],
});
```

### Minimal Rspack

File: `/Users/hzk/dev/zephyr/zephyr-examples/bundlers/react-rspack/rspack.config.ts`

```ts
import { withZephyr } from 'zephyr-rspack-plugin';

const config = defineConfig({
  entry: { main: './src/main.tsx' },
});

export default withZephyr()(config);
```

### TanStack Start

File: `/Users/hzk/dev/zephyr/zephyr-examples/frameworks/tanstack-start/vite.config.ts`

```ts
import { withZephyrTanstackStart } from 'vite-plugin-tanstack-start-zephyr';

plugins: [tanstackStart(), viteReact(), withZephyrTanstackStart()];
```

### Astro

File: `/Users/hzk/dev/zephyr/zephyr-examples/frameworks/astro/astro.config.mjs`

```js
import { withZephyr } from 'zephyr-astro-integration';

export default defineConfig({
  integrations: [mdx(), sitemap(), withZephyr()],
});
```

## Gotchas worth reusing

- Use the framework-specific integration when one exists.
- Build remotes before hosts in MF setups.
- Do not assume every example uses the same remote manifest format.
- Cross-bundler MF hosts may need explicit remote `type` values.
