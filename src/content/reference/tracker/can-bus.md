---
title: CAN bus
columns: two
layout: commonTwo.hbs
description: Integrating CAN Bus data with your Tracker One
---

# {{title}}

 [CAN Bus](https://en.wikipedia.org/wiki/CAN_bus) ("Controller Area Network") is a standard to allow many microcontrollers to communicate with each other over a two-wire serial bus without requiring a single host controller. It's used in vehicles to allow various systems to communicate, but is also used in some industrial equipment (such as elevator control) and can be used in proprietary designs for many purposes. It typically runs at 250, 500, or 1000 Kbits/second and uses differential signaling so it can be used over vehicle-sized distances. A priority-based system allows higher priority messages onto the shared serial bus before low-priority messages.

One common use is the vehicle [on-board diagnostics](https://en.wikipedia.org/wiki/On-board_diagnostics). The current version used on passenger vehicles is OBD-II (sometimes OBD-2). Most vehicles have a 16-pin connector (J1962), typically on the driver's side, hidden just below the dashboard but accessible. One use is an OBD-II diagnostic scanner, which provides more details than just the Check Engine light. Another use is getting vehicle information in real-time using the CAN protocol.

There are other CAN-based protocols like [CANopen](https://en.wikipedia.org/wiki/CANopen) and [DeviceNet](https://en.wikipedia.org/wiki/DeviceNet) that could be implemented, but do not currently have software libraries available.

## Termination resistors

The CAN bus requires termination resistors, typically 120 ohms on each end of the CAN bus to prevent reflection of the signal. 

In some cases, you will attach the Tracker One or Tracker SoM in the middle of the CAN bus, so no additional termination will be necessary. 

If you are attaching the Tracker to a vehicle OBD-II port, you may not need to add termination as the diagnostic connector may already include termination and be sufficient.

If you are directly connecting another CAN module to the Tracker you will have to add termination resistors on both ends. The Tracker SoM and Tracker One do not contain 120 ohm termination resistors.


## Tracker One CAN application notes

The [AN017 Tracker CAN](/hardware/tracker/projects/tracker-can/) application note is a good place to start.

This application note shows how to use the CAN bus for OBD-II to retrieve engine RPM:

- Setup parameters for CAN bus
- Requesting data via CAN bus
- Parsing CAN response

It also includes a number of techniques that will be useful in many more applications:

- Adding data to location publishes.
- Aggregating data that frequently changes, and upload minimum, average (mean), and maximum with location publishes.
- Adjusting the location publish rate based on criterial (such as when the engine is running faster than idle).
- Using cloud-configurable parameters. In this example, the engine idle speed and frequency to publish when engine is running fast.


