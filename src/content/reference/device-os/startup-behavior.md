---
title: Startup behavior
columns: two
layout: commonTwo.hbs
description: Startup behavior in Device OS
includeDefinitions: [api-helper, api-helper-extras]
---


## Boot sequence

{{step-diagram op="start"}}
```json
{
    "width": 600,
    "arrowHeight": 20,
	"arrowWidth": 20,
	"arrowBase": 8,
	"arrowHead": 10,
    "style": "withBody",
    "steps": [
        {
            "title": "ROM / Bootloader",
            "body": "Secure validation, image checks, vector table set"
        },
        {
            "kind": "arrow"
        },
        {
            "title": "Kernel/HAL bring‑up)",
            "body": "Clocks, pinmux, GPIO, timers"
        },
        {
            "kind": "arrow"
        },
        {
            "title": "Drivers (minimal)",
            "body": "I2C, SPI, PMIC/FuelGauge, LED/Button, filesystem"
        },
        {
            "kind": "arrow"
        },
        {
            "title": "Scheduler on",
            "body": "Multitasking enabled; no system threads yet"
        },
        {
            "kind": "arrow"
        },
        {
            "title": "Invoke PRE_SETUP()",
            "body": "Can put the device back to sleep without further booting if desired"
        },
        {
            "kind": "arrow"
        },
        {
            "title": "System startup",
            "body": "Start system services/threads (logging, heap monitor, etc.)"
        },
        {
            "kind": "arrow"
        },
        {
            "title": "Connectivity setup",
            "body": "Start cellular, Ethernet, Wi-Fi, etc."
        },
        {
            "kind": "arrow"
        },
        {
            "title": "Application initialization",
            "body": "Call setup(), then loop()"
        }
    ]
}
```
{{step-diagram op="end"}}


ROM/Bootloader → secure validation / image checks → vector table set
Kernel/HAL bring‑up → clocks, pinmux, GPIO, timers
Drivers (minimal) → I²C, SPI, PMIC/FuelGauge, LED/Button, filesystem
Scheduler on (multitasking enabled; no system threads yet)
Invoke Application Boot Hook (if present) (single‑threaded from the app’s perspective)
If the hook returns: start system services/threads (logging, heap monitor, etc.), then connectivity stacks, then call the platform’s standard app initialization (e.g., setup())
Enter the main run loop (e.g., loop())
