# Setup Patterns

Use this file when the user asks how to configure a host or remote with Zephyr and Module Federation.

## Two layers to explain

1. Bundler/module federation config
2. `zephyr:dependencies` mapping in `package.json`

Both are needed for a smooth Zephyr MF workflow.

## Vite host example

File: `/Users/hzk/dev/zephyr/zephyr-examples/module-federation/react-vite-rspack-webpack/host/vite.config.ts`

```ts
import react from '@vitejs/plugin-react';
import { withZephyr } from 'vite-plugin-zephyr';

const mfConfig = {
  name: 'vite-host',
  filename: 'remoteEntry.js',
  remotes: {
    vite_remote: { name: 'vite_remote', entry: 'http://localhost:5174/remoteEntry.js', type: 'module' },
    vite_webpack: { name: 'vite_webpack', entry: 'http://localhost:8080/remoteEntry.js', type: 'var' },
    vite_rspack: { name: 'vite_rspack', entry: 'http://localhost:8081/remoteEntry.js', type: 'var' },
  },
  shared: {
    react: { singleton: true },
    'react-dom': { singleton: true },
  },
};

export default defineConfig({
  plugins: [react(), withZephyr({ mfConfig })],
});
```

## Host dependency mapping

File: `/Users/hzk/dev/zephyr/zephyr-examples/module-federation/react-vite-rspack-webpack/host/package.json`

```json
"zephyr:dependencies": {
  "vite_remote": "workspace:*",
  "vite_rspack": "workspace:*",
  "vite_webpack": "workspace:*"
}
```

## What to explain

- Local import names must line up with the names the host uses.
- `zephyr:dependencies` tells Zephyr how to resolve those remotes at build/runtime.
- Shared React deps are usually singleton.
- In mixed-bundler Vite hosts, remote `type` matters.
