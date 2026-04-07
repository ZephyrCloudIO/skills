# Gotchas

Use this file when the user is stuck or their MF setup looks valid but still fails.

## Common issues

### Remotes built after host

- Zephyr usually needs remotes available first to resolve them cleanly.
- In cyclic setups, users may need a staged build process.

### Naming mismatch

Keep names aligned across:

- remote `package.json` `name`
- MF config `name`
- host remotes keys / import names
- `zephyr:dependencies` keys and targets

If these drift, resolution and runtime loading become fragile fast.

### Mixed-bundler remote type mismatch

- Vite module remotes often use `type: 'module'`
- Webpack/Rspack-style remotes may use `type: 'var'`

### Hardcoded URLs left in place

- Hardcoded localhost URLs are fine for local example configs.
- For Zephyr answers, steer the user toward Zephyr dependency resolution rather than manually swapping production remote URLs.

### Git and access still matter

- MF setup can be correct while deployment still fails because git context or app access is missing.
