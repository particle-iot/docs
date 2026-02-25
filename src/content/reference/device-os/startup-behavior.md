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
    "steps": [
        {
            "title": "ROM / Pre-bootloader"
        },
        {
            "kind": "arrow"
        },
        {
            "title": "Vector table set / Jump to system"
        },
        {
            "kind": "arrow"
        },
        {
            "title": "Kernel/HAL bring-up (clocks, pinmux, GPIO, timers)"
        },
        {
            "kind": "arrow"
        },
        {
            "title": "Drivers (I2C, SPI, PMIC/FuelGauge, LED, button, filesystem)"
        },
        {
            "kind": "arrow"
        },
        {
            "title": "STARTUP()"
        },
        {
            "kind": "arrow"
        },
        {
            "title": "Start system threads/services (logging, heap monitor, etc.)"
        },
        {
            "kind": "arrow"
        },
        {
            "title": "Connectivity stacks (Cellular/Wi‑Fi/Ethernet/Cloud), time sync, OTA/session"
        }
    ]
}
```
{{step-diagram op="end"}}

