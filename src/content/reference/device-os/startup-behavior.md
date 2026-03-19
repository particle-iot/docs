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

In Device OS 6.4.0 a new `PRE_STARTUP()` function was added. If you need specific execution order guarantees and can deal with tighter limitations than `STARTUP()`, it is an option.

If you have existing code that uses `STARTUP()`, it is not necessary to change it as both will continue to be supported.

`PRE_STARTUP()` is guaranteed to run first before any `STARTUP()` or global object constructors. 

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
- [System power configuration](/reference/device-os/api/power-manager/systempowerfeature/) calls `System.setPowerConfiguration()` and `System.getPowerConfiguration()`
- [Serial](/reference/device-os/api/serial/), `Serial1`, etc.

### Additional available APIs 

- [System.sleep()](/reference/device-os/api/sleep-sleep)

### Feature not available

- Global objects will not have been constructed yet
- Logging (Log.info, etc.)
- Networking (Cellular, Ethernet, Wi-Fi)
- BLE
- System power manager functions such as `System.powerSource()`, `System.batteryState()`, `System.batteryCharge()`
- Anything that is not allowed during `STARTUP()` also cannot be done during `PRE_STARTUP()`.

### Global objects

`PRE_STARTUP()` executes before global object construction, so you must not rely on global objects. In general, you should be cautious when using global object constructors even without `PRE_STARTUP()` because the order of global object instantiation is not predictable. A good alternative is to use the [singleton pattern](/firmware/software-design/singleton/).

C++ POD structs are not initialized before `PRE_STARTUP()`.

Global variables of primitive types such as int, char, float, enums, and pointers do have their values set.







