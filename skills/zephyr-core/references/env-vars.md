# Public environment overrides

Use this reference for per-environment public configuration in the dashboard.
SDK capture, source rewrites, and application code examples belong to the
installed package's guidance in zephyr-packages.

ZE*PUBLIC*\* values are public client-facing configuration. They are not secret
storage. A public environment override can select a different value for the
same published artifact without rebuilding that artifact.

## Dashboard workflow

1. Identify the application and the intended environment.
2. Inspect its current public overrides and the version or tag it points to.
3. Apply only the requested override changes through the authorized workflow.
4. Verify the resulting environment values rather than treating request
   acceptance as completion.

Keep secure server-only settings separate. Never place authentication tokens,
private keys, or database credentials in public overrides. For remote dependency
overrides, consult the platform's environment-override documentation; plugin
remote declarations are a separate SDK task.

## Documentation

- Environment overrides: https://docs.zephyr-cloud.io/features/environment-overrides.md
- Tags and environments: https://docs.zephyr-cloud.io/features/tags-environments.md
