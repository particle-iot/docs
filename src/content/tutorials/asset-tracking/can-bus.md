---
title: CAN Bus
columns: two
layout: tutorials.hbs
order: 50
description: Integrating CAN Bus data with your Tracker One
---

# CAN Bus

 [CAN Bus](https://en.wikipedia.org/wiki/CAN_bus) ("Controller Area Network") is a standard to allow many microcontrollers to communicate with each other over a two-wire serial bus without requiring a single host controller. It's used in vehicles to allow various systems to communicate, but is also used in some industrial equipment (such as elevator control) and can be used in proprietary designs for many purposes. It typically runs at 250, 500, or 1000 Kbits/second and uses differential signaling so it can be used over vehicle-sized distances. A priority-based system allows higher priority messages onto the shared serial bus before low-priority messages.

One common use is the vehicle [on-board diagnostics](https://en.wikipedia.org/wiki/On-board_diagnostics). The current version used on passenger vehicles is OBD-II (sometimes OBD-2). Most vehicles have a 16-pin connector (J1962), typically on the driver's side, hidden just below the dashboard but accessible. One use is an OBD-II diagnostic scanner, which provides more details than just the Check Engine light. Another use is getting vehicle information in real-time using the CAN protocol.

There are other CAN-based protocols like [CANopen](https://en.wikipedia.org/wiki/CANopen) and [DeviceNet](https://en.wikipedia.org/wiki/DeviceNet) that could be implemented, but do not currently have software libraries available.

This section will be provided at a later date.
