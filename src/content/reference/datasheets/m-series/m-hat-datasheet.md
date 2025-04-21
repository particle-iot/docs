---
title: M-HAT datasheet
columns: two
layout: commonTwo.hbs
description: M-HAT Datasheet
---

# M-HAT datasheet (preview)

{{box op="start" cssClass="boxed warningBox"}}
This is a preliminary datasheet and there may be changes before release
{{box op="end"}}

![](/assets/images/m-hat/m-hat.png)

## Overview

The M-HAT is pass-through HAT (hardware attached on top) for the Raspberry Pi to provide cellular connectivity and power.

It contains the power circuitry from the Muon, including the ability to power both the cellular modem and Raspberry Pi using USB-C PD, external DC power, or LiPo battery.

It is intended for use with the B504e (LTE Cat 1 NorAm) and B524 (LTE Cat 1 EMEAA) to provide network connectivity to the Raspberry Pi using [tethering](reference/device-os/tethering/).

It provides a pass-through Raspberry Pi 40-pin expansion HAT connector to allow use with additional HATs.

- [B504e datasheet](/reference/datasheets/b-series/b504-datasheet/)
- [B524 datasheet](/reference/datasheets/b-series/b524-b523-datasheet/)
- [Muon datasheet](/reference/datasheets/m-series/muon-datasheet/)

## Diagram

{{imageOverlay src="/assets/images/m-hat/m-hat-labeled.png" alt="Diagram"}}

<!-- shared-diagram-table start m-hat -->
| Label | Description |
| ---: | :--- |
| 1 | USB-C |
| 2 | USB-C PD LED |
| 3 | DC IN |
| 4 | Charge LED |
| 5 | LiPo Battery |
| 6 | I/O Expansion |
| 7 | RTC Battery |
| 8 | Grove connector |
| 9 | QWIIC connector |
| 10 | SMA connector |
| 11 | SMA connector |
| 12 | SMA connector |
| 13 | Reset button |
| 14 | Raspberry Pi HAT 40-pin connector |
| 15 | Particle M.2 SoM |
| 16 | Particle MODE button |
| 17 | Particle RGB LED |
<!-- shared-diagram-table end m-hat -->

#### <!-- shared-diagram-label m-hat usb title-label-paren -->USB-C (1)<!-- end -->




## Schematics

{{box op="start" cssClass="boxed warningBox"}}
These are preliminary (v0.2) schematics and are subject to change.
{{box op="end"}}

#### Schematics - Page 2

{{imageOverlay src="/assets/images/m-hat/m-hat-sch-2.png" alt="Schematic page 2"}}

#### Schematics - Page 3

{{imageOverlay src="/assets/images/m-hat/m-hat-sch-3.png" alt="Schematic page 3"}}

#### Schematics - Page 4

{{imageOverlay src="/assets/images/m-hat/m-hat-sch-4.png" alt="Schematic page 4"}}

#### Schematics - Page 5

{{imageOverlay src="/assets/images/m-hat/m-hat-sch-5.png" alt="Schematic page 5"}}

There is no page 1; it is a cover sheet.

---
## Ordering information

{{!-- BEGIN do not edit content below, it is automatically generated 47e37393-b9c0-4b04-9da6-e54cb2227cd1 --}}

| SKU | Description | Region | Lifecycle |
| :--- | :--- | :--- | :--- |
| MHAT | M-HAT | Global | In development |
| MHAT504e | M-HAT with LTE CAT1 for North America | NORAM | In development |
| MHAT524e | M-HAT with LTE CAT1 for Rest of World | EMEAA | In development |


{{!-- END do not edit content above, it is automatically generated  --}}

- EMEAA: Selected countries in Europe, Middle East, Africa, and Asia, including Australia and New Zealand. See the [cellular carrier list](/reference/cellular/cellular-carriers/) for more information.


## Revision history

| Revision | Date | Author | Comments |
|:---------|:-----|:-------|:---------|
| pre      | 2024-04-21 | RK | Initial version |


# M-HAT datasheet

{{box op="start" cssClass="boxed warningBox"}}
This is a preliminary datasheet and there may be changes before release
{{box op="end"}}

![](/assets/images/m-hat/m-hat.png)

## Overview

The M-HAT is HAT (hardware attached on top) of a Raspberry Pi to provide cellular connectivity and power.

It contains the power circuitry from the Muon, including the ability to power both the cellular modem and Raspberry Pi using USB-C PD, external DC power, or LiPo battery.

It is intended for use with the B504e (LTE Cat 1 NorAm) and B524 (LTE Cat 1 EMEAA) to provide network connectivity to the Raspberry Pi using [tethering](reference/device-os/tethering/).

It provides a pass-through Raspberry Pi 40-pin expansion HAT connector to allow use with additional HATs.

- [B504e datasheet](/reference/datasheets/b-series/b504-datasheet/)
- [B524 datasheet](/reference/datasheets/b-series/b524-b523-datasheet/) 
- [Muon datasheet](/reference/datasheets/m-series/muon-datasheet/)

## Diagram

{{imageOverlay src="/assets/images/m-hat/m-hat-labeled.png" alt="Diagram"}}

<!-- shared-diagram-table start m-hat -->
| Label | Description |
| ---: | :--- |
| 1 | USB-C |
| 2 | USB-C PD LED |
| 3 | DC IN |
| 4 | Charge LED |
| 5 | LiPo Battery |
| 6 | I/O Expansion |
| 7 | RTC Battery |
| 8 | Grove connector |
| 9 | QWIIC connector |
| 10 | SMA connector |
| 11 | SMA connector |
| 12 | SMA connector |
| 13 | Reset button |
| 14 | Raspberry Pi HAT 40-pin connector |
| 15 | Particle M.2 SoM |
| 16 | Particle MODE button |
| 17 | Particle RGB LED |
<!-- shared-diagram-table end m-hat -->

## Schematics

{{box op="start" cssClass="boxed warningBox"}}
These are preliminary (v0.2) schematics and are subject to change.
{{box op="end"}}

#### Schematics - Page 2

{{imageOverlay src="/assets/images/m-hat/m-hat-sch-2.png" alt="Schematic page 2"}}

#### Schematics - Page 3

{{imageOverlay src="/assets/images/m-hat/m-hat-sch-3.png" alt="Schematic page 3"}}

#### Schematics - Page 4

{{imageOverlay src="/assets/images/m-hat/m-hat-sch-4.png" alt="Schematic page 4"}}

#### Schematics - Page 5

{{imageOverlay src="/assets/images/m-hat/m-hat-sch-5.png" alt="Schematic page 5"}}

There is no page 1; it is a cover sheet.

---
## Ordering information

{{!-- BEGIN do not edit content below, it is automatically generated 47e37393-b9c0-4b04-9da6-e54cb2227cd1 --}}

| SKU | Description | Region | Lifecycle |
| :--- | :--- | :--- | :--- |
| MHAT | M-HAT | Global | In development |
| MHAT504e | M-HAT with LTE CAT1 for North America | NORAM | In development |
| MHAT524e | M-HAT with LTE CAT1 for Rest of World | EMEAA | In development |


{{!-- END do not edit content above, it is automatically generated  --}}

- EMEAA: Selected countries in Europe, Middle East, Africa, and Asia, including Australia and New Zealand. See the [cellular carrier list](/reference/cellular/cellular-carriers/) for more information.


## Revision history

| Revision | Date | Author | Comments |
|:---------|:-----|:-------|:---------|
| pre      | 2024-04-21 | RK | Initial version |
