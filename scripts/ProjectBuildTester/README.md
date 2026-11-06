# Project Build Tester

Test compiles the sample projects in `src/assets/files/projects` (only directories containing a
`project.properties`) with `particle compile` (cloud compiler). The Particle CLI must be installed and logged in.
`scripts/config.json` and the access token are not used.

```
cd scripts/ProjectBuildTester && npm start                 # build whatever is out of date
npm run project-build-tester -- --help                     # from the top level
npm start -- --force                                       # rebuild everything
npm start -- --retry-failed                                # rebuild stored failures only
npm start -- --project BlinkLed --os-version 6.2.1 --platform boron
npm start -- --dry-run
```

Exits 0 only if every tested combination (including stored results that were skipped) succeeded.

## Versions and platforms

Versions come from `src/assets/files/deviceOsVersions.json`: the latest preview (if newer than the latest GA),
plus the latest GA of 6.x, 5.x, 4.x, 3.x and 2.x. Release candidates and variants such as `3.2.1-p2.3` are never
auto-selected. A platform is only built for a version if that version lists it in `supported_platforms`.

## Configuration: `config/projectBuildTester.json`

`defaults`: `platforms`, `majorVersions`, `includePreview`, `extraVersions` (any version in deviceOsVersions.json).

`projects.<name>.config` (all optional):

| Key | Meaning |
| --- | --- |
| `platforms` | Replace the default platform list |
| `addPlatforms` | Add platforms, such as `["tracker"]` |
| `excludePlatforms` | Never build these, such as `["electron", "photon"]` for BLE |
| `minVersion`, `maxVersion` | Inclusive limits, e.g. `"2.0.0"` / `"2.99.99"` for a 2.x only project |
| `extraVersions` | Additional versions for this project |
| `disabled` | `true` to skip the project |

`projects.<name>.results` is written by the tool: the source `hash` and `builds[version][platform]` =
`success` or `failure`. If the hash changes, the old results are discarded. New project directories are added
automatically; results for removed projects and for versions/platforms no longer tested are pruned on unfiltered runs.

Failed build logs are in `scripts/ProjectBuildTester/logs` (git ignored).
