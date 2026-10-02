# Platform troubleshooting

Use this reference for access, existing versions, and routing targets. SDK
installation and build failures belong to the installed package's skill.

## Access mismatch

Confirm the account, organization, application, and intended operation. Local
login success does not establish authorization for a different application or
organization. Report the actual denied operation without requesting or printing
credentials.

## Unexpected version or target

Confirm whether the user is inspecting a permanent version URL, a moving tag,
or an environment. Inspect the target's current pointer and matching rules
before recommending promotion or rollback.

## Pending routing updates

Version publication and mutable-target updates are different stages. Confirm
the target state after a change; do not infer completed activation from a queued
job or accepted request alone.

## Documentation

- Error index: https://docs.zephyr-cloud.io/errors.md
- Tags and environments: https://docs.zephyr-cloud.io/features/tags-environments.md
- Instant rollbacks: https://docs.zephyr-cloud.io/features/instant-rollbacks.md
