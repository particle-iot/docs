---
title: Workbench
layout: support.hbs
columns: two
order: 900
---

# Particle Workbench FAQ

{{!-- FAQs: See ch25557 --}}

- [Installation Instructions](/quickstart/workbench/)
- [Tutorial](/tutorials/developer-tools/workbench)


## Uninstalling Workbench

- Open VSCode.
- Click the **Extensions** button on the left toolbar (Activity bar).
- Click on the gear icon for the **Workbench** extension and select **Uninstall**.
- Repeat for the **C/C++** and **Cortex-Debug** extensions
- Close and re-open VSCode, then close it again.
- Delete the `~/.particle/toolchains` directory.

## Uninstalling VSCode

### Mac

- Find your `Visual Studio Code.app` file (typically in `~/Applications` or `/Applications`)
- Delete `Visual Studio Code.app`

### Windows 

- Open **Add/Remove Programs**.
- Select **Microsoft Visual Studio Code** and click the **Uninstall** button

### Linux 

- Open a terminal
- Run `sudo apt-get purge code`. This currently only works with Ubuntu and other Debian-style distributions.





