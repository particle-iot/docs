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
            "title": "Invoke PRE_STARTUP()",
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


## PRE_STARTUP

In Device OS 6.4.0 a new `PRE_STARTUP()` function was added. It is similar to `STARTUP()` but the behavior is defined. It was created as a separate macro to avoid breaking applications that depend on the previous `STARTUP()` behavior, which varies slightly between device platforms.

Additionally, `PRE_STARTUP()` is an optional C function, not a macro. The code goes in the body of the function, not as an argument to the macro as with `STARTUP()`.

```cpp
void PRE_STARTUP() {
    Serial1.begin(115200);
    Serial1.println("PRE_STARTUP called");  
}
```

Because `PRE_STARTUP()` runs before the system thread is started, your code will essentially behave as if single-threaded.

### Features available during PRE_STARTUP

- [GPIO](/reference/device-os/api/input-output/)
- [I2C (Wire)](/reference/device-os/api/wire-i2c/wire-i2c/)
- [SPI](/reference/device-os/api/spi/)
- [PMIC](/reference/device-os/api/pmic-power-management-ic/)
- [Fuel Gauge](/reference/device-os/api/fuelgauge/)
- [User LED](/reference/device-os/api/led-signaling/)
- [File system (read/write)](/reference/device-os/api/file-system/)

### Additional available APIs 

- [System.sleep()](/reference/device-os/api/sleep-sleep)

### Feature not available

- Logging (Log.info, etc.)
- Networking (Cellular, Ethernet, Wi-Fi)
- BLE
- USB CDC serial (`Serial`)

`Serial` is not currently available but may be available on some platforms in the future, but is not guaranteed. Using UART serial (`Serial1`) may be an alternative.





