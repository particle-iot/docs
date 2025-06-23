---
title: Tachyon Datasheet
columns: two
layout: commonTwo.hbs
description: Tachyon Datasheet
---
---
title: Tachyon Datasheet
columns: two
layout: commonTwo.hbs
description: Tachyon Datasheet
---

# Tachyon Datasheet

{{box op="start" cssClass="boxed warningBox"}}
This is a preliminary datasheet and is subject to change.
{{box op="end"}}

{{imageOverlay src="/assets/images/tachyon/tachyon-iso.jpg" alt="Tachyon Photo"}}


## Overview

Tachyon is a 5G-connected single-board computer (SBC) that takes the technology inside a modern smartphone and packs it into a Raspberry Pi form factor to power portable and remote computing devices. With a powerful Qualcomm Dragonwing™ SoC, an AI accelerator, and Particle’s application infrastructure, Tachyon combines all of the edge computing power, connectivity, and software necessary to embed intelligence into anything, anywhere.

- Qualcomm QCM6490 8-core Kryo™ 670 CPU (1x 2.7GHz, 3x 2.4GHz, 4x 1.9GHz).
- 5G sub-6Hz cellular connectivity and Wi-Fi 6E with on-device antennas
- 8GB RAM and 128GB with built-in UFS storage
- Adreno 643 GPU and 12 TOPS NPU 
- USB-C 3.1 PD with DisplayPort and PD, 2x PCIe lanes, and DSI 4-lane
- 2 x CSI 4-lane with ISP, supporting 20+ pre-integrated camera sensors 
- Powered by USB-C or lithium-ion battery with integrated battery charger
- Secure boot and encrypted filesystem

### CPU information

#### AI Engine

<table>
<tbody>
<tr><td style="width: 250px;">GPU Name</td><td style="width: 400px;">Qualcomm® Adreno™ 643L</td></tr>
<tr><td>CPU Name</td><td>Qualcomm® Adreno™ 643L</td></tr>
<tr><td>GPU Name</td><td>Qualcomm® Kryo™ 670</td></tr>
<tr><td>Qualcomm® Hexagon™ Processor Name</td><td>Qualcomm® Hexagon™ 770</td></tr>
<tr><td>Qualcomm® Hexagon™ Processor Features</td><td>Qualcomm® Hexagon™ Tensor Accelerator<br/>Qualcomm® Hexagon™ Scalar Accelerator<br/>Qualcomm® Hexagon™ Vector eXtensions (HVX)<br/>Qualcomm® Hexagon™ Voice Assistant Accelerator<br/>Large shared AI memory</td></tr>
<tr><td>Qualcomm® Sensing Hub Generation</td><td>2nd</td></tr>
<tr><td>Qualcomm® Sensing Hub Features</td><td>Qualcomm® Sensing Hub</td></tr>
<tr><td>Tera Operations Per Second (TOPS)</td><td>12 TOPS</td></tr>
</tbody>
</table>

#### CPU

<table>
<tbody>
<tr><td style="width: 250px;">Name</td><td style="width: 400px;">Qualcomm® Kryo™ CPU, Qualcomm® Kryo™ 670</td></tr>
<tr><td>Number of cores</td><td>8</td></tr>
<tr><td>Architecture</td><td>64-bit</td></tr>
<tr><td>Clock speed</td><td>1x 2.7GHz, 3x 2.4GHz, 4x 1.9GHz</td></tr>
</tbody>
</table>



#### GPU

<table>
<tbody>
<tr><td style="width: 250px;">Name</td><td style="width: 400px;">Qualcomm® Adreno™ 643L</td></tr>
<tr><td>Clock Speed</td><td>Up to 812 MHz</td></tr>
<tr><td>APIs</td><td>OpenGL® ES 3.2<br/>DirectX® FL 12<br/>OpenCL™ 2.0 FP<br/>Vulkan® 1.1</td></tr>
</tbody>
</table>


#### DSP

<table>
<tbody>
<tr><td style="width: 250px;">Name</td><td style="width: 400px;">Qualcomm® Hexagon™</td></tr>
</tbody>
</table>


#### Location

<table>
<tbody>
<tr><td style="width: 250px;">Sensor-assisted Positioning</td><td style="width: 400px;">Sensor-assisted Positioning</td></tr>
<tr><td>Satellite Systems</td><td>GLONASS, NavIC, QZSS, Galileo, Beidou, SBAS, GPS</td></tr>
<tr><td>Frequency Support</td><td>Dual (L1/L5)</td></tr>
<tr><td>Accuracy</td><td>Lane-level, Sidewalk-level</td></tr>
<tr><td>Features</td><td>Global Freeway Vehicle Navigation</td></tr>
</tbody>
</table>

#### Radio 

- 3GPP Rel-15 specification, and supports both 5G NSA and SA modes with 4G/ 3G fallback
- 5G & LTE cellular technology
- Wi-Fi 6E & DBS, IEEE 802.11a/ b/ g/ n/ ac/ ax, Wi-Fi 2
- Bluetooth 5.2


{{!-- 
### Block diagram

imageOverlay src="/assets/images/tachyon/block-diagram.svg" alt="Block diagram"
--}}

### Power

Power can be supplied by:

- Primary USB-C (USB1)
- LiPo battery (3-pin JST-PH connector)
- 40-pin expansion HAT connector (when selected by jumper)


## Antennas

- The Tachyon includes built-in antennas for:
  - Cellular
  - Wi-Fi (2.4 GHz and 5 GHz) and BLE

- The Tachyon includes a U.FL connectors for:
  - GNSS (GPS)

- Wi-Fi operation in the 5150-5250 MHz band is only for indoor use to reduce the potential for harmful interference to co-channel mobile satellite systems.

## Connections

{{imageOverlay src="/assets/images/tachyon/top-diagram-labeled.png" alt="Connections"}}

<!-- shared-diagram-table start top-diagram -->
| Label | Description |
| ---: | :--- |
| 1 | Primary USB (USB1) | <!-- primary-usb -->
| 2 | Secondary USB (USB2) | <!-- secondary-usb -->
| 4 | Activity LED | <!-- activity-led -->
| 5 | LiPo battery connector | <!-- lipo -->
| 6 | DSI/CSI connector - DISP_CAM1 (display or camera) | <!-- dsi-csi -->
| 7 | CSI connector - CAM2 (camera only) | <!-- csi -->
| 8 | GNSS antenna | <!-- gnss-ufl -->
| 9 | Built-in cellular antenna | <!-- antennas -->
| 10 | QWIIC connector (3.3V I2C)  | <!-- qwiic -->
| 11 | SD card (optional) | <!-- sd -->
| 12 | Debug connector (optional) | <!-- debug-connector -->
| 13 | Raspberry Pi 40-pin expansion HAT connector | <!-- hat -->
| 15 | Wi-Fi chip antenna | <!-- wifi-antenna -->
| 16 | PCIe expansion connector | <!-- pcie -->
| 18 | Button (power and mode) | <!-- button -->
| 19 | Primary LED | <!-- primary-led -->
| 20 | Audio card connector  | <!-- audio-connector -->
| 21 | RTC battery connector (optional) | <!-- rtc-battery -->
| 22 | Connection for external button (optional) | <!-- external-button -->
<!-- shared-diagram-table end top-diagram -->


### <!-- shared-diagram-label top-diagram primary-usb title-label-paren -->Primary USB (USB1) (1)<!-- end -->

- Supports USB 3.1 (Key Port)
- Power & Data
  - Supports USB Power Delivery (USB PD) for powering the device.
  - Functions as a USB host or USB device depending on connection type.
- Video Output & Adapter Support
  - Supports USB-C adapters that combine USB, power, and HDMI output.
  - Acts as a PD sink when using a usb-c hub adapter.
- Can output HDMI over USB-C hub.


### <!-- shared-diagram-label top-diagram secondary-usb title-label-paren -->Secondary USB (USB2) (2)<!-- end -->

- USB 2.0 only.
- Standard USB-C connectivity.
- Supports USB hubs and can provide 5V power to connected devices.

### <!-- shared-diagram-label top-diagram activity-led title-label-paren -->Activity LED (4)<!-- end -->

The Activity LED (4), located near the USB ports, provides system-level feedback, including disk operations, network activity, and battery charging status.

### <!-- shared-diagram-label top-diagram lipo title-label-paren -->LiPo battery connector (5)<!-- end -->

The Tachyon uses a 3.7V LiPo battery with a 3-pin JST-PH connector. The pack contains a 10K NTC thermistor temperature sensor.

![battery connector](/assets/images/tachyon/battery-conn.png)

*Facing the plug on the battery side*


### <!-- shared-diagram-label top-diagram dsi-csi title-label-paren -->DSI/CSI connector - DISP_CAM1 (display or camera) (6)<!-- end -->

- This MIPI connection port supports either a camera or display
- Aligns with Raspberry Pi implementations for MIPI camera/display adapters.
- You can either use two cameras or one camera and one display using the two MIPI ports
- Based on 4-lane MIPI DSI, supports up to 2.5 Gbps/ lane, (1200 × 2520) @ 144 fps
- Supports DisplayPort 1.4, up to 4K (3840 × 2160) @ 60 fps
- Supports Wi-Fi Miracast 4K @ 60 fps

### <!-- shared-diagram-label top-diagram csi title-label-paren -->CSI connector - CAM2 (camera only) (7)<!-- end -->

- This MIPI connection port supports a camera
- Aligns with Raspberry Pi implementations for MIPI camera/display adapters.
- 4 × 4-lane MIPI CSI, up to 2.5 Gbps/ lane
- 3 × ISP, up to 3 × 27 MP @ 24 fps or 3 × 22 MP @ 30 fps; 36 MP + 27 MP @ 24 fps or 36 MP + 22 MP @ 30 fps; 36 MP @ 30 fps

### <!-- shared-diagram-label top-diagram gnss-ufl title-label-paren -->GNSS antenna (8)<!-- end -->

- The recommended antenna is the `PARANTGN1`, included in your alpha tester kit.
- If using your own active antenna, the LNA gain must be less than 17dB.
- Software support will be provided in a future release.

### <!-- shared-diagram-label top-diagram antennas title-label-paren -->Built-in cellular antenna (9)<!-- end -->

- This module contains the Wi-Fi and cellular antennas.
- Do not attempt to open the antenna module as it is very difficult to reassemble.

### <!-- shared-diagram-label top-diagram qwiic title-label-paren -->QWIIC connector (3.3V I2C)  (10)<!-- end -->

- Follows the SparkFun Qwiic/Adafruit STEMMA QT standard for easy I2C expansion.
- Enables connection to various sensors and peripherals.
- Sensors and peripherals can generally be daisy-chained together.
- 4-pin JST 1mm connector, keyed.
- 3.3V I2C.

There is additional information on the Qwiic ecosystem in the [Qwiic page in the Particle docs](https://docs.particle.io/hardware/expansion/qwiic/). Note that since Tachyon is Linux-based, you will need different libraries than you would for Particle or Arduino, but there are libraries for many popular Qwiic boards.

### <!-- shared-diagram-label top-diagram sd title-label-paren -->SD card (optional) (11)<!-- end -->

- Plug in any standard SD card into this slot.
- Optional for user data storage; operating system is stored on internal flash memory.
- SD 3.0, supports 4-bit SDIO

### <!-- shared-diagram-label top-diagram debug-connector title-label-paren -->Debug connector (optional) (12)<!-- end -->

- Provides UART access for system debugging and interaction.
- Used for:
  - SysCon UART (system controller communication).
  - Linux module UART (direct serial console access).
  - Battery communication (if applicable).

This connectors attaches to the debug adapter using a 10-pin (2x5) ribbon cable.

### <!-- shared-diagram-label top-diagram hat title-label-paren -->Raspberry Pi 40-pin expansion HAT connector (13)<!-- end -->

{{imageOverlay src="/assets/images/tachyon/tachyon-all.svg" alt="Expansion connector"}}

- I2C (also connected to Qwiic port)
- SPI
- UART serial
- All GPIO are 3.3V only (not 5V tolerant outside of the 5V power pin)

### <!-- shared-diagram-label top-diagram wifi-antenna title-label-paren -->Wi-Fi chip antenna (15)<!-- end -->

- Dual-band Wi-Fi and BLE chip antenna.

Alpha versions of the Tachyon have a U.FL connector marked **Wi-Fi/BLE**. This connector is not operational and will be removed in future versions of the Tachyon.


### <!-- shared-diagram-label top-diagram pcie title-label-paren -->PCIe expansion connector (16)<!-- end -->

- PCIe 3.0 x1 slot
- Matches the Raspberry Pi PCIe implementation.
- 2-lane PCIe Gen 3, supports NVMe

### <!-- shared-diagram-label top-diagram button title-label-paren -->Button (power and mode) (18)<!-- end -->

The Tachyon board has a single button (<!-- shared-diagram-label top-diagram button label -->18<!-- end -->), located next to the primary LED, which is used for managing device states. It allows users to power on, enter programming mode, suspend, wake up, force power off, and trigger custom actions in user space.

### <!-- shared-diagram-label top-diagram primary-led title-label-paren -->Primary LED (19)<!-- end -->


The primary LED (19) on the Tachyon board provides critical information about the device’s current mode and status. 

The LED indicates:

- The Tachyon’s core mode (e.g., off, standby, update, or operation).
- The Tachyon’s status within that mode (e.g., booting, connected, or error states).


### <!-- shared-diagram-label top-diagram audio-connector title-label-paren -->Audio card connector  (20)<!-- end -->

- This is a 4 pin connector that gives analog audio in / out on the Tachyon board
- Software support will be added in a future release



### <!-- shared-diagram-label top-diagram rtc-battery title-label-paren -->RTC battery connector (optional) (21)<!-- end -->

- Uses RTC modules for the Raspberry Pi that typically contain a Lithium coin cell battery.
- Helps retain time between power cycles but does not provide full power-loss protection.

### <!-- shared-diagram-label top-diagram external-button title-label-paren -->Connection for external button (optional) (22)<!-- end -->

- Connect these two pads to an external momentary switch to allow the button operations to be done from an external button.


## Technical specification

{{!-- 
### Absolute maximum ratings


### Recommended operating conditions

### Wi-Fi Specifications

--}}

### I/O Characteristics

The CPU runs at 1.8V, but I/O on the expansion HAT connector is is 3.3V. Levels are translated using TI TXS0108E bidirectional level translators.


- Maximum data rates:
  - 110Mbps (push-pull)
  - 1.2Mbps (open-drain)
- 1.65V to 5.5V on B port
- ESD protection exceeds JESD 22 (A port, CPU-side):
  - 2000 V Human Body Model (A114-B)
  - 150 V Machine Model (A115-A)
  - 1000 V Charged-Device Model (C101)
- IEC 61000-4-2 ESD (B port, expansion connector side):
  - ± 8kV Contact Discharge
  - ± 6kV Air Discharge


### Absolute maximum ratings

These values are from the TXS0108E datasheet and assume V<sub>CCB</sub> is 3.3V.

| Parameter | Min | Max | Unit |
| :--- | :--- | :--- | :--- |
| Input voltage | -0.5 | 6.5 | V |
| Voltage applies to any output in high or low state | -0.5 | 3.8 | V |
| Input clamp current I<sub>K</sub> | | -50 | mA |
| Output clamp current I<sub>OK</sub> | | -50 | mA |
| Continuous output current I<sub>O</sub> | -50| 50 | mA |
| Continuous output current I<sub>O</sub> | -50| 50 | mA |

### Recommended operating conditions

| Parameter | Min | Max | Unit |
| :--- | :--- | :--- | :--- |
| High-level input voltage V<sub>IH</sub> | 2.9| 3.3 | V |
| Low-level input voltage V<sub>IL</sub> | 0 | 0.15 | V |
| Input transition rise or fall rate Δt/Δv | | 10 | ns/V |


#### Timing requirements

<table>
    <thead>
        <tr>
            <th colspan="2">Parameter</th>
            <th>Test Conditions</th>
            <th>Min</th>
            <th>Max</th>
            <th>Unit</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td rowspan="2"></td>
            <td rowspan="2">Data rate</td>
            <td>Push-pull driving</td>
            <td></td>
            <td>70</td>
            <td rowspan="2">Mbps</td>
        </tr>
        <tr>
            <td>Open-drain driving</td>
            <td></td>
            <td>0.8</td>
        </tr>
        <tr>
            <td rowspan="2">t<sub>W</sub></td>
            <td rowspan="2">Pulse duration, data inputs</td>
            <td>Push-pull driving</td>
            <td>15.3</td>
            <td></td>
            <td rowspan="2">ns</td>
        </tr>
        <tr>
            <td>Open-drain driving</td>
            <td></td>
            <td>1250</td>
        </tr>    
    </tbody>
</table>


### Switching characteristics

<table>
    <thead>
        <tr>
            <th colspan="2">Parameter</th>
            <th colspan="2">Test Conditions</th>
            <th>Min</th>
            <th>Max</th>
            <th>Unit</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td rowspan="2">t<sub>PHL</sub></td>
            <td>Propagation delay time</td>
            <td rowspan="2">Output</td>
            <td>Push-pull driving</td>
            <td></td>
            <td>5.7</td>
            <td rowspan="2">ns</td>
        </tr>
        <tr>
            <td>(high-to-low output)</td>
            <td>Open-drain driving</td>
            <td>3.1</td>
            <td>9.3</td>
        </tr>
        <tr>
            <td rowspan="2">t<sub>PLH</sub></td>
            <td>Propagation delay time</td>
            <td rowspan="2">Output</td>
            <td>Push-pull driving</td>
            <td></td>
            <td>6.5</td>
            <td rowspan="2">ns</td>
        </tr>
        <tr>
            <td>(low-to-high output)</td>
            <td>Open-drain driving</td>
            <td>126</td>
            <td>486</td>
        </tr>
        <tr>
            <td rowspan="2">t<sub>PHL</sub></td>
            <td>Propagation delay time</td>
            <td rowspan="2">Input</td>
            <td>Push-pull driving</td>
            <td></td>
            <td>7.4</td>
            <td rowspan="2">ns</td>
        </tr>
        <tr>
            <td>(high-to-low output)</td>
            <td>Open-drain driving</td>
            <td>2.5</td>
            <td>7.3</td>
        </tr>
        <tr>
            <td rowspan="2">t<sub>PLH</sub></td>
            <td>Propagation delay time</td>
            <td rowspan="2">Input</td>
            <td>Push-pull driving</td>
            <td></td>
            <td>5.8</td>
            <td rowspan="2">ns</td>
        </tr>
        <tr>
            <td>(low-to-high output)</td>
            <td>Open-drain driving</td>
            <td>129</td>
            <td>459</td>
        </tr>
        <tr>
            <td rowspan="2">t<sub>rB</sub></td>
            <td rowspan="2">Input rise time</td>
            <td rowspan="2">B-port rise time</td>
            <td>Push-pull driving</td>
            <td>1.2</td>
            <td>5.2</td>
            <td rowspan="2">ns</td>
        </tr>
        <tr>
            <td>Open-drain driving</td>
            <td>73</td>
            <td>546</td>
        </tr>
        <tr>
            <td rowspan="2">t<sub>fB</sub></td>
            <td rowspan="2">Input fall time</td>
            <td rowspan="2">B-port fall time</td>
            <td>Push-pull driving</td>
            <td>0.9</td>
            <td>3.9</td>
            <td rowspan="2">ns</td>
        </tr>
        <tr>
            <td>Open-drain driving</td>
            <td>1</td>
            <td>9.6</td>
        </tr>
        <tr>
            <td>t<sub>SK(O)</sub></td>
            <td>Skew (time), output</td>
            <td>Channel-to-channel</td>
            <td>Push-pull driving</td>
            <td></td>
            <td>1</td>
            <td>ns</td>
        </tr>
        <tr>
            <td rowspan="2"></td>
            <td rowspan="2">Maximum date rate</td>
            <td rowspan="2">A or B</td>
            <td>Push-pull driving</td>
            <td>60</td>
            <td></td>
            <td rowspan="2">Mps</td>
        </tr>
        <tr>
            <td>Open-drain driving</td>
            <td>0.8</td>
            <td></td>
        </tr>    
    </tbody>
</table>

{{!-- 

### Power consumption
--}}


### Radio specifications


#### Frequency bands

<table>
<thead>
<tr><td style="width: 100px;">Frequency Bands</td><td style="width: 350px;">North America (TACH8NA)</td><td style="width: 350px;">Rest of World (TACH8ROW)</td></tr>
</thead>
<tbody>
<tr>
    <td style="width: 100px;">5G SA/NSA</td>
    <td style="width: 350px;">n2/ 5/ 7/ 12/ 13/ 14/ 25/ 26/ 29/ 30/ 38/ 41/ 48/ 66/ 70/ 71/ 77/ 78</td>
    <td style="width: 350px;">n1/ 3/ 5/ 7/ 8/ 20/ 28/ 38/ 40/ 41/ 77/ 78/ 79 </td>
</tr>
<!-- 
<tr>
    <td>5G MIMO </td>
    <td>4 × 4 MIMO (DL): n1/ 3/ 7/ 38/ 40/ 41/ 77/ 78/ 79<br/>2 × 2 MIMO (UL): n38/ 40/ 41/ 77/ 78/ 79</td>
    <td>4 × 4 MIMO (DL): n2/ 7/ 25/ 30/ 38/ 41/ 48/ 66/ 70/ 77/ 78<br/>2 × 2 MIMO (UL): n38/ 41/ 48/ 77/ 78</td>
</tr>
-->
<tr>
    <td>LTE</td>
    <td>B2/ 4/ 5/ 7/ 12/ 13/ 14/ 17/ 25/ 26/ 29/ 30/ 38/ 41/ 42/ 43/ 46/ 48/ 66/ 71</td>
    <td>B1/ 2/ 3/ 4/ 5/ 7/ 8/ 12/ 17/ 18/ 19/ 20/ 26/ 28/ 32/ 34/ 38/ 39/ 40/ 41/ 42</td>
</tr>
<!--
<tr>
    <td>LTE MIMO</td>
    <td>4 × 4 MIMO (DL): B2/ 4/ 7/ 25/ 30/ 38/ 41/ 42/ 43/ 48/ 66</td>
    <td>4 × 4 MIMO (DL): B1/ 3/ 7/ 38/ 40/ 41/ 42</td>
</tr>
-->
<tr>
    <td>WCDMA</td>
    <td>-</td>
    <td>B1/ 2/ 4/ 5/ 6/ 8/ 19 </td>
</tr>
<tr>
    <td>GSM/EDGE</td>
    <td>-</td>
    <td>B2/ 3/ 5/ 8 </td>
</tr>
<tr>
    <td>WLAN</td>
    <td>2.4 & 5 & 6 GHz<br/>802.11a/ b/ g/ n/ ac/ ax,<br/>Supports DBS<!-- , 2 × 2 MU-MIMO --></td>
    <td>2.4 & 5 & 6 GHz<br/>802.11a/ b/ g/ n/ ac/ ax,<br/>Supports DBS<!-- >, 2 × 2 MU-MIMO --></td>
</tr>
<tr>
    <td>Bluetooth</td>
    <td>Bluetooth 5.2</td>
    <td>Bluetooth 5.2</td>
</tr>
<tr>
    <td>GNSS</td>
    <td>GPS/ GLONASS/ BDS/ NavIC/ Galileo/ QZSS/ SBAS;<br/>L1 + L5</td>
    <td>GPS/ GLONASS/ BDS/ NavIC/ Galileo/ QZSS/ SBAS;<br/>L1 + L5</td>
</tr>
</tbody>
</table>

#### Data rate
<table>
<thead>
<tr><td style="width: 100px;">Data rate</td><td style="width: 350px;">North America (TACH8NA)</td><td style="width: 350px;">Rest of World (TACH8ROW)</td></tr>
</thead>
<tbody>
<tr>
    <td style="width: 100px;">5G SA</td>
    <td style="width: 350px;">2.1 Gbps (DL)/ 900 Mbps (UL) </td>
    <td style="width: 350px;">2.1 Gbps (DL)/ 900 Mbps (UL) 9 </td>
</tr>
<tr>
    <td>5G NSA </td>
    <td>2.5 Gbps (DL)/ 550 Mbps (UL) </td>
    <td>2.5 Gbps (DL)/ 550 Mbps (UL) </td>
</tr>
<tr>
    <td>LTE</td>
    <td>1.2 Gbps (DL)/ 200 Mbps (UL) </td>
    <td>1.2 Gbps (DL)/ 200 Mbps (UL) </td>
</tr>
<tr>
    <td>DC-HSPA+ </td>
    <td>42 Mbps (DL)/ 5.76 Mbps (UL) </td>
    <td>42 Mbps (DL)/ 5.76 Mbps (UL) 2</td>
</tr>
<tr>
    <td>WCDMA</td>
    <td>-</td>
    <td>384 kbps (DL)/ 384 kbps (UL)</td>
</tr>
<tr>
    <td>EDGE</td>
    <td>-</td>
    <td>296 kbps (DL)/ 236.8 kbps (UL) </td>
</tr>
<tr>
    <td>GSM</td>
    <td>-</td>
    <td>107 kbps (DL)/ 85.6 kbps (UL) </td>
</tr>
</tbody>
</table>


<!-- 
<tr>
    <td></td>
    <td></td>
    <td></td>
</tr>
-->

{{!--  
### Schematics
--}}

## Mechanical specifications

### Dimensions and Weight

- Dimensions: 85mm x 56mm
- Weight: 55g (approximate)
- Height: 18.5mm (from top of antenna to bottom of feet)

![](/assets/images/tachyon/dimensions.png)

Dimensions are in millimeters.

### 3D models

A 3D model of the Tachyon is available in the [hardware-libraries Github](https://github.com/particle-iot/hardware-libraries/tree/master/CAD/Tachyon).

## Product Handling

### ESD Precautions
The M-SoM contains highly sensitive electronic circuitry and is an Electrostatic Sensitive Device (ESD). Handling an M-SoM without proper ESD protection may destroy or damage it permanently. Proper ESD handling and packaging procedures must be applied throughout the processing, handling and operation of any application that incorporates the Particle M-SoM. ESD precautions should be implemented on the application board where the M-SoM is mounted. Failure to observe these precautions can result in severe damage to the M-SoM!

### Connectors

The 40-pin expansion had connector is static sensitive and should be handled carefully.


## FCC ISED CE Warnings and End Product Labeling Requirements

**FCC Supplier's Declaration of Conformity**

47 CFR § 2.1077 Compliance Information

Responsible party:<br/>
Particle Industries, Inc.<br/>325 9th St<br/>San Francisco, CA 94103

This device complies with Part 15 of the FCC Rules. Operation is subject to the following two conditions: (1) This device may not cause harmful interference, and (2) this device must accept any interference received, including interference that may cause undesired operation.


**FCC Radiation Exposure Statement**

This equipment has been tested and found to comply with the limits for a Class B digital device, pursuant to Part 15 of the FCC Rules. These limits are designed to provide reasonable protection against harmful interference in a residential installation. This equipment generates, uses and can radiate radio frequency energy and, if not installed and used in accordance with the instructions, may cause harmful interference to radio communications. However, there is no guarantee that interference will not occur in a particular installation. If this equipment does cause harmful interference to radio or television reception, which can be determined by turning the equipment off and on, the user is encouraged to try to correct the interference by one of the following measures:

- Reorient or relocate the receiving antenna.
- Increase the separation between the equipment and receiver.
- Connect the equipment into an outlet on a circuit different from that to which the receiver is connected.
- Consult the dealer or an experienced radio/TV technician for help.

**FCC Radiation Exposure Statement:**
This equipment complies with FCC radiation exposure limits set forth for an uncontrolled environment. This transmitter module must not be co-located or operating in conjunction with any other antenna or transmitter. This End equipment should be installed and operated with a minimum distance of 20 centimeters between the radiator and your body.

This Transmitter must not be co-located or operating in conjunction with any other antenna or transmitter.

**IMPORTANT NOTE:**
In the event that these conditions can not be met (for example certain laptop configurations or co-location with another transmitter), then the FCC authorization is no longer considered valid and the FCC ID can not be used on the final product. In these circumstances, the OEM integrator will be responsible for re-evaluating the end product (including the transmitter) and obtaining a separate FCC authorization.

**End Product Labeling**
The final end product must be labeled in a visible area with the following:

* Contains FCC ID: 

**Manual Information to the End User**
The OEM integrator has to be aware not to provide information to the end user regarding how to install or remove this RF module in the user’s manual of the end product which integrates this module.


**Outdoor Use (US)**

To be compliant to FCC §15.407(a) the EIRP is not allowed to exceed 125 mW
(21 dBm) at any elevation angle above 30° (measured from the horizon) when operated as an
outdoor access point in U-NII-1 band, 5.150-5.250 GHz. 


**Canada Statement**
This device complies with Industry Canada’s licence-exempt RSSs. Operation is subject to the following two conditions:

1. This device may not cause interference; and
2. This device must accept any interference, including interference that may cause undesired operation of the device.

Le présent appareil est conforme aux CNR d’Industrie Canada applicables aux appareils radio exempts de licence.

**L’exploitation est autorisée aux deux conditions suivantes:**

1. l’appareil ne doit pas produire de brouillage;
2. l’utilisateur de l’appareil doit accepter tout brouillage radioélectrique subi, même si le brouillage est susceptible d’en compromettre le fonctionnement.

**Caution Exposure:**
This device meets the exemption from the routine evaluation limits in section 2.5 of RSS102 and users can obtain Canadian information on RF exposure and compliance.
Le dispositif répond à l'exemption des limites d'évaluation de routine dans la section 2.5 de RSS102 et les utilisateurs peuvent obtenir des renseignements canadiens sur l'exposition aux RF et le respect.

**The final end product must be labelled in a visible area with the following:**
The Industry Canada certification label of a module shall be clearly visible at all times when installed in the host device, otherwise the host device must be labelled to display the Industry Canada certification number of the module, preceded by the words “Contains transmitter module”, or the word “Contains”, or similar wording expressing the same meaning, as follows:

 * Contains transmitter module ISED: 
 
This End equipment should be installed and operated with a minimum distance of 20 centimeters between the radiator and your body.
Cet équipement devrait être installé et actionné avec une distance minimum de 20 centimètres entre le radiateur et votre corps.

> The end user manual shall include all required regulatory information/warning as shown in this manual.


**Outdoor use (CA)**

- Operation in the band 5150–5250 MHz is only for indoor use to reduce the potential for harmful
interference to co-channel mobile satellite systems;
- Operation in the 5600-5650 MHz band is not allowed in Canada. High-power radars are allocated
as primary users (i.e., priority users) of the bands 5250-5350 MHz and 5650-5850 MHz and that
these radars could cause interference and/or damage to LE-LAN devices.
- DFS (Dynamic Frequency Selection) products that operate in the bands 5250- 5350 MHz, 5470-5600MHz, and 5650-5725MHz.

- Le dispositif de fonctionnement dans la bande 5150-5250 MHz est réservé à une utilisation en
intérieur pour réduire le risque d'interférences nuisibles à la co-canal systèmes mobiles par
satellite
- Opération dans la bande 5600-5650 MHz n'est pas autorisée au Canada. Haute puissance radars
sont désignés comme utilisateurs principaux (c.-àutilisateurs prioritaires) des bandes 5250-5350
MHz et 5650-5850 MHz et que ces radars pourraient causer des interférences et / ou des
dommages à dispositifs LAN-EL.
- Les produits utilisant la technique d’atténuation DFS (sélection dynamique des fréquences) sur les bandes 5250- 5350 MHz, 5470-5600MHz et 5650-5725MHz.

### European Union (CE)

Hereby, Particles declares that the radio equipment with the TACH8ROW referenced in the printed setup document for the product is in compliance with Directive 2014/53/EU. The full text of the EU Declaration of Conformity is available at the following internet address: https://docs.particle.io

**EU Radiation Exposure Statement:**

This device meets the EU requirements (2014/53/EU Article 3.1a) on the limitation of exposure of the general public to electromagnetic fields by way of health protection.
The device complies with RF specifications when the device used at 20 cm from your body.


### Outdoor use (world)

This device is restricted to indoor use when operating in the 5150 to 5350
MHz frequency range. This restriction applies in: AT, BE, BG, CH, CY, CZ, DE,
DK, EE, EL, ES, FI, FR, HR, HU, IE, IS, IT, LI, LT, LU, LV, MT, NL, NO, PL, PT, RO,
SE, SI, SK, TR, UA, UK(NI).

## Certification documents

## Product handling

### ESD precautions

The Tachyon contains highly sensitive electronic circuitry and is an Electrostatic Sensitive Device (ESD). Handling an module without proper ESD protection may destroy or damage it permanently. Proper ESD handling and packaging procedures must be applied throughout the processing, handling and operation of any application that incorporates the module. Failure to observe these precautions can result in severe damage to the module!

### Battery warnings

**CAUTION**

RISK OF EXPLOSION IF BATTERY IS REPLACED BY AN INCORRECT TYPE.
DISPOSE OF USED BATTERIES ACCORDING TO THE INSTRUCTIONS.

- Replacement of a battery with an incorrect type that can defeat a safeguard.
- Disposal of a battery into fire or a hot oven, or mechanically crushing or cutting of a battery, that can result in an explosion.
- Leaving a battery in an extremely high temperature surrounding environment that can result in an explosion or the leakage of flammable liquid or gas.
- A battery subjected to extremely low air pressure that may result in an explosion or the leakage of flammable liquid or gas.

This symbol indicates DC voltage: <img style="display: inline-block; vertical-align: middle; width: 40px; background-color: #fff" src="/assets/images/dc_symbol.svg">

### Disposal

<img src="/assets/images/weee.png" style="background-color: #fff">

The European directive 2012/19/EU On waste Electrical and Electronic Equipment (WEEE), requires that old household electrical appliance must not be disposed of in the normal unsorted municipal waste stream. Old appliances must be collected separately in order to optimize the recovery and recycling of the materials they contain, and reduce the impact on human health and the environment.

The crossed out “wheeled bin" symbol on the product reminds you of your obligation, that when you dispose of the appliance, it must be separately collected.
Consumers should contact their local authority or retailer for information concerning the correct disposal of their old appliance.


## Country compatibility

### TACH8NA - Country compatibility
{{!-- BEGIN do not edit content below, it is automatically generated ae3c46e6-c970-4ceb-8e55-2adde82efb79 --}}

| Country | Technologies | Carriers |
| :--- | :--- | :--- |
| Canada | 4G, 5G | Telus |
| Mexico | 4G, 5G | Movistar |
| United States | 4G, 5G | AT&T, US Cellular |


{{!-- END do not edit content above, it is automatically generated --}}

### TACH8ROW - Country compatibility

{{!-- BEGIN do not edit content below, it is automatically generated d37da224-3ea6-4b28-823c-8b322ab3b7c6 --}}

| Country | Technologies | Carriers |
| :--- | :--- | :--- |
| Australia | 4G, 5G | Optus |
| Austria | 2G, 3G, 4G, 5G | 3 (Drei) |
| Belgium | 2G, 3G, 4G, 5G | Base, Orange, Proximus |
| Bulgaria | 2G, 3G | A1, Telenor, Vivacom |
| Cyprus | 2G, 3G | Cytamobile-Vodafone |
| Czechia | 2G, 4G, 5G | O2, T-Mobile, Vodafone |
| Denmark | 2G, 3G, 4G | 3 (Tre), TDC, Telenor, Telia |
| Estonia | 2G, 3G, 4G | Elisa, Tele2, Telia |
| Finland | 2G, 4G | DNA, Elisa, Telia |
| France | 2G, 3G, 4G, 5G | Bouygues, Free Mobile, Orange, SFR |
| Germany | 2G, 3G, 4G, 5G | O2, Telekom, Vodafone |
| Greece | 2G, 4G, 5G | Cosmote, Vodafone, Wind |
| Hungary | 2G, 3G, 4G, 5G | T-Mobile, Telenor, Vodafone |
| Iceland | 2G, 3G, 4G | Nova, Siminn |
| India | 2G, 3G, 4G | Vodafone |
| Ireland | 2G, 4G, 5G | 3 (Tre), Vodafone |
| Italy | 2G, 3G, 4G, 5G | TIM, Vodafone, Wind |
| Japan | 4G, 5G | KDDI |
| Lithuania | 2G, 3G, 4G, 5G | Bite |
| Luxembourg | 2G, 3G, 4G | Orange, POST, Tango |
| Netherlands | 2G, 3G, 4G, 5G | KPN, T-Mobile, Vodafone |
| New Zealand | 3G, 4G, 5G | Spark |
| Norway | 2G, 4G | Telenor, Telia |
| Poland | 2G, 3G, 4G, 5G | Orange, Play, Plus, T-Mobile |
| Portugal | 2G, 3G, 4G, 5G | MEO, NOS, Vodafone |
| Romania | 2G, 3G, 4G, 5G | Orange, Telekom Romania, Vodafone |
| Slovakia | 2G, 4G | O2, Orange, Telekom |
| Slovenia | 2G, 3G, 4G, 5G | A1, Mobitel |
| South Africa | 2G, 3G, 4G, 5G | MTN |
| South Korea | 4G, 5G | LG U+ |
| Spain | 2G, 3G, 4G, 5G | Orange, Telefonica, Vodafone, Yoigo |
| Sweden | 2G, 3G, 4G, 5G | 3 (Tre), Tele2, Telenor, Telia |
| Switzerland | 3G, 4G, 5G | Sunrise, Swisscom |
| United Kingdom | 2G, 3G, 4G, 5G | 3, O2, Vodafone |


{{!-- END do not edit content above, it is automatically generated --}}


{{!-- 
#### TACH8ROW - Additional countries

The following countries are not officially supported by the TACH8ROW at this time, but may be compatible. In 
some cases, the device may only be compatible with some carriers, or some bands. 

99a15043-5618-49a0-84b4-4f1ef9c1fa3e
--}}


## Ordering information

| SKU | Description |
| :--- | :--- |
| TACH8NA  | Tachyon 8GB RAM / 128GB Flash (NorAm), [x1] |
| TACH8ROW | Tachyon 8GB RAM / 128GB Flash (EMEA), [x1] |



## Revision history

| Revision | Date | Author | Comments |
|:---------|:-----|:-------|:---------|
| pre      | 2025-03-03 | RK | Initial version |
| 001      | 2025-06-09 | RK | Updated photo |
| 002      | 2025-06-11 | RK | Updates for certification |
| 003      | 2025-06-16 | RK | Added link to 3D models |
