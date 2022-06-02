---
title: M8 Accessories
layout: commonTwo.hbs
columns: two
description: Datasheet for Tracker One M8 connector accessories
---

# M8 Accessories<sup>(004)</sup>

{{#unless pdf-generation}}
{{downloadButton url="/assets/pdfs/datasheets/tracker-m8-accessories.pdf"}}
{{/unless}} {{!-- pdf-generation --}}

## M8 Pinouts

{{box op="start" cssClass="boxedSideBySide"}}

![M8 Connector Wire End](/assets/images/at-som/M8-connector-wire.png)

**M8 Connector on cable**

Facing sockets on connector end of cable

{{box op="switch"}}

![M8 Connector Panel](/assets/images/at-som/M8-connector.png)

**M8 Connector on Tracker One**

Facing pins on the panel connector from the outside of the case
{{box op="end"}}

The 8-pin connector has these signals:

| M8 Pin | Function   | Function  | Function  | I/O | Color |
| :----: | :-------   | :-------  | :-------  | :--- | :--- |
| 1      | CAN_P      |           |           | IO<sup>2</sup> | Yellow |
| 2      | VIN<sup>3</sup> |      |           | I | Red |
| 3      | Analog A3  |           | GPIO D3   | IO<sup>1</sup> | White |
| 4      | Serial1 RX | Wire3 SDA | GPIO D9   | IO<sup>1</sup> | Green |
| 5      | Serial1 TX | Wire3 SCL | GPIO D8   | IO<sup>1</sup> | Brown |
| 6      | CAN_5V<sup>4</sup> |   | CAN_PWR   | O | Orange |
| 7      | CAN_N      |           |           | IO<sup>2</sup> | Blue |
| 8      | GND        |           |           |   | Black |
    
<sup>1</sup>MCU GPIO is limited to 3.3V maximum.

<sup>2</sup>CAN Bus specifications can be found in the [Tracker SoM datasheet](/reference/datasheets/tracker/tracker-som-datasheet/#can-specifications). 

<sup>3</sup>6.0 to 30 VDC at 2A when using the M8 connector.

<sup>4</sup>5V, 370 mA maximum. Controlled by the `CAN_PWR` GPIO.

You typically connect the cable to your custom external interface device by routing the cable through a cable gland in your enclosure and to your custom board and:

- Terminate with pins in a PHR-8 to mate with a B8B-PH on your expansion board
- Terminate with screw terminals on your board
- Terminate by soldering the wires to your board

For more information on expanding your Tracker One using the M8 connector, see the [Tracker One Expansion Tutorials](/hardware/tracker/tracker-one-expansion/).

You must enable CAN_5V in order to use GPIO on M8 pins 3, 4, and 5 (A3, D9/RX/SDA, D8/TX/SCL) on the Tracker One. If CAN_5V is not powered, these pins are isolated from the MCU starting with version 1.1 of the Tracker One/Tracker Carrier Board (September 2020 and later). This is necessary to prevent an issue with shipping mode, see technical advisory note [TAN002](/reference/technical-advisory-notices/tan002-tracker-one-v10-shipping-mode/).

## M8 Cables

{{box op="start" cssClass="boxedSideBySide"}}

{{imageOverlay src="/assets/images/at-som/at-m8-cable-straight.png" alt="M8 Straight" class="full-width"}}

{{box op="switch"}}

{{imageOverlay src="/assets/images/at-som/at-m8-cable-right-angle.png" alt="M8 Right Angle" class="full-width"}}

{{box op="end"}}

The M8 cables provide a convenient way to connect external devices to the Tracker One while preserving the IP67 waterproof rating and not having to disassemble the Tracker One.

---

### Wire Gauge - M8 Cables

| M8 Pin | Function  | Color          | Wire Gauge |
| :----: | :-------- | :------------- | :--------- |
| 1      | CAN_P     | Yellow         | 26 AWG |
| 2      | VIN       | Red            | 24 AWG |
| 3      | A3        | White          | 26 AWG | 
| 4      | RX_SDA_D9 | Green          | 26 AWG |
| 5      | TX_SCL_D8 | Brown          | 26 AWG |
| 6      | CAN_5V    | Orange         | 26 AWG |
| 7      | CAN_N     | Blue           | 26 AWG |
| 8      | GND       | Black          | 24 AWG |

### Dimensions - M8 Cables

{{imageOverlay src="/assets/images/at-som/m8-diagram-straight.png" alt="M8 Straight" class="full-width"}}

{{imageOverlay src="/assets/images/at-som/m8-diagram-right-angle.png" alt="M8 Right Angle" class="full-width"}}

| Parameter | Value |
| :--- | :--- |
| Length | 1 meter &plusmn;3 cm |
| Outer jacket stripped | 10 cm &plusmn;1 cm |
| Inner wires stripped and tinned | 5 mm &plusmn;1 mm |
| Outer Diameter | 5.0 mm |
| Approvals | UL2464, RoHS |

### Orientation - M8 Cables

The key on the M8 panel connector is at 3 o'clock (right side, nearest to the USB connector), when facing the connectors, as in the diagram above. When using the right-angle M8 cable, the cable will face away from the USB connector.

![Cable Orientation](/assets/images/at-som/tracker-one-iso-closed-plugged.jpg)

### SKUs - M8 Cables

| SKU  | Description |
| :--- | :--- |
| ONEM8CABEA | Tracker One M8 Accessory Cable (Straight), (x1) |
| ONEM8CABTY | Tracker One M8 Accessory Cable (Straight), (x40) |
| ONEM8CABRAEA | Tracker One M8 Accessory Cable (Right Angle), (x1) |
| ONEM8CABRATY | Tracker One M8 Accessory Cable (Right Angle), (x40) |



## M8 Connector 

The ONEM8CONN is a connector similar to the M8 connector on the straight ONEM8CAB. It's intended for building your own M8 cable assembly and is the female side of the connector that mates with the Tracker One M8 connector. It is a bare connector and does not include a shroud. It is intended that your cable manufacturer will add an overmold to seal your cable to the connector.

![M8 Connector](/assets/images/at-som/at-m8-connector1.png)
![M8 Connector](/assets/images/at-som/at-m8-connector2.png)


### SKUs - M8 Connector

| SKU  | Description |
| :--- | :--- |
| ONEM8CONNEA | Tracker One M8 Connector (Straight), (x1) |
| ONEM8CONNTY | Tracker One M8 Connector (Straight), (x40) |

This connector has the same pinouts as the cable above, but without the cable, so you can substitute your own cable of the desired length.


## Other Sensors

### M8 Temperature/Humidity

![M8 Sensor Temperature/Humidity](/assets/images/tracker/m8-temp-humidity.png)

- [M8 Temperature/Humidity Datasheet](/reference/datasheets/tracker/m8-temperature-humidity/)
- [M8 Temperature/Humidity Tutorial](/hardware/tracker/m8-temperature-humidity/)



## Revision history

| Revision | Date | Author | Comments |
|:---------|:-----|:-------|:---------|
| 001      | 2020 Sep 15 | RK | First release |
| 002      | 2021 Feb 03 | RK | Change M8 CAN output current to 370 mA |
| 003      | 2021 Feb 10 | RK | Update picture of ONEM8CONN |
| 004      | 2021 Feb 17 | RK | Add note about Tracker One M8 GPIO requiring CAN_5V |
