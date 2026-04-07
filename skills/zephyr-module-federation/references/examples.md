# Examples

Use this file when the user wants concrete working MF examples to copy from.

## Best examples

- Webpack host/remote: `/Users/hzk/dev/zephyr/zephyr-examples/module-federation/react-webpack`
- Rsbuild consumer/provider: `/Users/hzk/dev/zephyr/zephyr-examples/module-federation/react-rsbuild`
- Cross-bundler host + remotes: `/Users/hzk/dev/zephyr/zephyr-examples/module-federation/react-vite-rspack-webpack`
- Advanced staged builds: `/Users/hzk/dev/zephyr/zephyr-examples/module-federation/tractor-sample`
- Turborepo monorepo MF: `/Users/hzk/dev/zephyr/zephyr-examples/build-systems/turborepo-rspack-mf`

## Strong snippets

### Cross-bundler Vite host

File: `/Users/hzk/dev/zephyr/zephyr-examples/module-federation/react-vite-rspack-webpack/host/vite.config.ts`

- Good for showing remote `type: 'module'` vs `type: 'var'`
- Good for showing `withZephyr({ mfConfig })`

### Host dependency mapping

File: `/Users/hzk/dev/zephyr/zephyr-examples/module-federation/react-vite-rspack-webpack/host/package.json`

- Good for `workspace:*` mapping

### Turborepo build-order explanation

File: `/Users/hzk/dev/zephyr/zephyr-examples/build-systems/turborepo-rspack-mf/README.md`

- Good for explaining why remotes should build before host
- Good for monorepo orchestration answers
