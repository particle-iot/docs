
# M1 Enclosure datasheet

## Overview

Tachyon is a 5G-connected single-board computer (SBC) that takes the technology inside a modern smartphone and packs it into a Raspberry Pi form factor to power portable and remote computing devices. With a powerful Qualcomm Snapdragon SoC, an AI accelerator, and Particle’s application infrastructure, Tachyon combines all of the edge computing power, connectivity, and software necessary to embed intelligence into anything, anywhere.

- Qualcomm QCM6490 8-core Kryo™ 670 CPU (1x 2.7GHz, 3x 2.4GHz, 4x 1.9GHz).
- 5G sub-6Hz cellular connectivity and Wi-Fi 6E with on-device antennas
- 8GB RAM and 128GB with built-in UFS storage
- Adreno 643 GPU and 12 TOPS NPU 
- USB-C 3.1 PD with DisplayPort and PD, 2x PCIe lanes, and DSI 4-lane
- 2 x CSI 4-lane with ISP, supporting 20+ pre-integrated camera sensors 
- Powered by USB-C or lithium-ion battery with integrated battery charger
- Secure boot and encrypted filesystem

### Block diagram

![block diagram](/assets/images/tachyon/block-diagram.svg)

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

![connections](/assets/images/tachyon/top-diagram-labeled.png)

<!-- shared-diagram-table start top-diagram -->
| Label | Description |
| ---: | :--- |
| 1 | Primary USB (USB1) |
| 2 | Secondary USB (USB2) |
| 4 | Activity LED |
| 5 | LiPo battery connector |
| 6 | DSI/CSI connector - DISP_CAM1 (display or camera) |
| 7 | CSI connector - CAM2 (camera only) |
| 8 | GNSS antenna |
| 9 | Built-in cellular antenna |
| 10 | QWIIC connector (3.3V I2C)  |
| 11 | SD card (optional) |
| 12 | Debug connector (optional) |
| 13 | Raspberry Pi 40-pin expansion HAT connector |
| 14 | HAT 5V power direction jumper |
| 15 | Wi-Fi chip antenna |
| 16 | PCIe expansion connector |
| 17 | Device info (serial number data matrix code)  |
| 18 | Button (power and mode) |
| 19 | Primary LED |
| 20 | Audio card connector  |
| 21 | RTC battery connector (optional) |
| 22 | Connection for external button (optional) |
<!-- shared-diagram-table end top-diagram -->


### <!-- shared-diagram-label top-diagram primary-usb title-label-paren -->Primary USB (USB1) (1)<!-- end -->

<!-- shared-blurb start primary-usb -->
- Supports USB 3.1 (Key Port)
- Power & Data
  - Supports USB Power Delivery (USB PD) for powering the device.
  - Functions as a USB host or USB device depending on connection type.
- Video Output & Adapter Support
  - Supports USB-C adapters that combine USB, power, and HDMI output.
  - Acts as a PD sink when using a usb-c hub adapter.
- Can output HDMI over USB-C hub.
<!-- shared-blurb end primary-usb -->


### <!-- shared-diagram-label top-diagram secondary-usb title-label-paren -->Secondary USB (USB2) (2)<!-- end -->

<!-- shared-blurb start secondary-usb -->

- USB 2.0 only.
- Standard USB-C connectivity.
- Supports USB hubs and can provide 5V power to connected devices.

<!-- shared-blurb end secondary-usb -->

### <!-- shared-diagram-label top-diagram activity-led title-label-paren -->Activity LED (4)<!-- end -->

<!-- shared-blurb start activity-led -->

The Activity LED (4), located near the USB ports, provides system-level feedback, including disk operations, network activity, and battery charging status.

Activity LED States

- Off: Linux is not running
    - No system activity is occurring.
- Mostly on, periodically blinking off: Battery is charging
    - The device is running normally, and the battery is actively charging.
    - The brief off blinks indicate that system activity is functioning properly.
- Mostly off, periodically blinking on: Battery is not charging
    - The device is running normally, but the battery is not charging.
    - The on blinks indicate system activity is functioning correctly.
    - The battery may not be charging because the USB adapter is not compatible, or because the battery is fully charged.
<!-- shared-blurb end activity-led -->

### <!-- shared-diagram-label top-diagram lipo title-label-paren -->LiPo battery connector (5)<!-- end -->

<!-- shared-blurb start lipo -->
The Tachyon uses a 3.7V LiPo battery with a 3-pin JST-PH connector. The pack contains a 10K NTC thermistor temperature sensor.

![battery connector](/assets/images/tachyon/battery-conn.png)

*Facing the plug on the battery side*

**Alpha warning:** If you completely discharge the battery it will not be possible to recharge the battery 
using the Tachyon version 2.1. You can charge it externally using a Muon, M.2 breakout board, or other Particle device 
with a 3-pin battery connector to get it above the minimum voltage and then it will charge again. This will be corrected in the next version.
<!-- shared-blurb end lipo -->


### <!-- shared-diagram-label top-diagram dsi-csi title-label-paren -->DSI/CSI connector - DISP_CAM1 (display or camera) (6)<!-- end -->

<!-- shared-blurb start dsi-csi -->
- This MIPI connection port supports either a camera or display
- Aligns with Raspberry Pi implementations for MIPI camera/display adapters.
- You can either use two cameras or one camera and one display using the two MIPI ports
<!-- shared-blurb end dsi-csi -->

### <!-- shared-diagram-label top-diagram csi title-label-paren -->CSI connector - CAM2 (camera only) (7)<!-- end -->

<!-- shared-blurb start csi -->
- This MIPI connection port supports a camera
- Aligns with Raspberry Pi implementations for MIPI camera/display adapters.
<!-- shared-blurb end csi -->

### <!-- shared-diagram-label top-diagram gnss-ufl title-label-paren -->GNSS antenna (8)<!-- end -->

<!-- shared-blurb start gmss-ufl -->
- The recommended antenna is the `PARANTGN1`, included in your alpha tester kit.
- If using your own active antenna, the LNA gain must be less than 17dB.
- Software support will be provided in a future release.
<!-- shared-blurb end gmss-ufl -->

### <!-- shared-diagram-label top-diagram antennas title-label-paren -->Built-in cellular antenna (9)<!-- end -->

<!-- shared-blurb start antennas -->
- This module contains the Wi-Fi and cellular antennas.
- Do not attempt to open the antenna module as it is very difficult to reassemble.
<!-- shared-blurb end antennas -->

### <!-- shared-diagram-label top-diagram qwiic title-label-paren -->QWIIC connector (3.3V I2C)  (10)<!-- end -->

<!-- shared-blurb start qwiic -->
- Follows the SparkFun Qwiic/Adafruit STEMMA QT standard for easy I2C expansion.
- Enables connection to various sensors and peripherals.
- Sensors and peripherals can generally be daisy-chained together.
- 4-pin JST 1mm connector, keyed.
- 3.3V I2C.

There is additional information on the Qwiic ecosystem in the [Qwiic page in the Particle docs](https://docs.particle.io/hardware/expansion/qwiic/). Note that since Tachyon is Linux-based, you will need different libraries than you would for Particle or Arduino, but there are libraries for many popular Qwiic boards.
<!-- shared-blurb end qwiic -->

### <!-- shared-diagram-label top-diagram sd title-label-paren -->SD card (optional) (11)<!-- end -->

<!-- shared-blurb start sd -->
- Plug in any standard SD card into this slot.
- Optional for user data storage; operating system is stored on internal flash memory.
<!-- shared-blurb end sd -->


### <!-- shared-diagram-label top-diagram debug-connector title-label-paren -->Debug connector (optional) (12)<!-- end -->

<!-- shared-blurb start debug-connector -->
- Provides UART access for system debugging and interaction.
- Used for:
  - SysCon UART (system controller communication).
  - Linux module UART (direct serial console access).
  - Battery communication (if applicable).

This connectors attaches to the [debug adapter](/reference/debug-adapter) using a 10-pin (2x5) ribbon cable.
<!-- shared-blurb end debug-connector -->

### <!-- shared-diagram-label top-diagram hat title-label-paren -->Raspberry Pi 40-pin expansion HAT connector (13)<!-- end -->

<!-- shared-blurb start hat-connector -->
- All GPIO are 3.3V only (not 5V tolerant outside of the 5V power pin)

![expansion connector](/assets/images/tachyon/tachyon-gpio.svg)

<!-- shared-blurb end hat-connector -->

### <!-- shared-diagram-label top-diagram hat-power-jumper title-label-paren -->HAT 5V power direction jumper (14)<!-- end -->

<!-- shared-blurb start hat-power-connector -->
Use the jumper to connect either `IN` or `OUT` to the center `5V` pin.

- `IN` means 5V is into the HAT, from the Tachyon.
- `OUT` means the HAT outputs power to power the Tachyon.

When in `IN` mode:

- 5V is not powered when in standby mode.
- 5V can be used even when powered only by LiPo battery.

When in `OUT` mode:

- Supply 5V at 2A to power the Tachyon to the 5V and GND pins on the 40-pin HAT connector.
<!-- shared-blurb end hat-power-connector -->

### <!-- shared-diagram-label top-diagram wifi-antenna title-label-paren -->Wi-Fi chip antenna (15)<!-- end -->

- Dual-band Wi-Fi and BLE chip antenna.

Alpha versions of the Tachyon have a U.FL connector marked **Wi-Fi/BLE**. This connector is not operational and will be removed in future versions of the Tachyon.


### <!-- shared-diagram-label top-diagram pcie title-label-paren -->PCIe expansion connector (16)<!-- end -->

- PCIe 3.0 x1 slot
- Matches the Raspberry Pi PCIe implementation.
- For the alpha release, this requires an external PCIe adapter board

### <!-- shared-diagram-label top-diagram device-info title-label-paren -->Device info (serial number data matrix code)  (17)<!-- end -->

- This data matrix code contains the serial number
- The serial number is also printed as numbers and letters on the bottom side label.

### <!-- shared-diagram-label top-diagram button title-label-paren -->Button (power and mode) (18)<!-- end -->

<!-- shared-blurb start button -->

The Tachyon board has a single button (<!-- shared-diagram-label top-diagram button label -->18<!-- end -->), located next to the primary LED, which is used for managing device states. It allows users to power on, enter programming mode, suspend, wake up, force power off, and trigger custom actions in user space.

**Power on (from standby mode)**
    - Quick Press → The device powers on, and the LED flashes green as Linux boots.

**Force power off (from operating mode)**
- Hold for 3 seconds → The device immediately shuts down, disconnecting power and returning to standby mode.

**Enter programming mode (from standby mode)**
- Hold for 3 seconds → The device enters programming mode, and the LED flashes yellow.

**Suspend and wake (from operating mode)**
- Quick press: The device suspends (low-power mode).
- Another quick press: The device wakes up and resumes operation.

**User-space custom actions (from operating mode)**

The button can be configured in Linux to detect multiple taps (e.g., double, triple, quadruple taps) and execute custom scripts. 

For example, you could configure triple tap to toggle a Wi-Fi hotspot on/off.

<!-- shared-blurb end button -->


### <!-- shared-diagram-label top-diagram primary-led title-label-paren -->Primary LED (19)<!-- end -->


<!-- shared-blurb start primary-led -->
The primary LED (19) on the Tachyon board provides critical information about the device’s current mode and status. 

The LED indicates:

- The Tachyon’s core mode (e.g., off, standby, update, or operation).
- The Tachyon’s status within that mode (e.g., booting, connected, or error states).

**** Power Off

- LED State: Off (blank)
- Meaning: No power applied to the device.

**** Standby

- LED State: Solid Red (no blinking)
- Meaning: The device is powered but inactive.

**** Device update mode

- LED State: Blinking Yellow
- Meaning: The device is in a firmware or system update mode.

**** Operating Mode

Once the device is operational, the LED indicates different system statuses:

- Blinking Green → Booting Linux
    - The device is starting up, and the operating system is in the process of loading.
- Glowing Green → Linux Booted
    - The OS is fully loaded and running.
- Glowing Cyan → Connected to Particle Cloud
    - The device has successfully connected to the Particle Cloud.
- Glowing Magenta → Connected to LTE Network (temporary state)
    - The device is establishing an LTE connection before cloud registration.

**** Error states

- Blinking Red (with a pattern): Device Crash / Malfunction
    - The software has detected a failure, and the device will reboot automatically.
<!-- shared-blurb end primary-led -->


### <!-- shared-diagram-label top-diagram audio-connector title-label-paren -->Audio card connector  (20)<!-- end -->

<!-- shared-blurb start audio-connector -->
- This is a 4 pin connector that gives analog audio in / out on the Tachyon board
- Software support will be added in a future release
<!-- shared-blurb end audio-connector -->



### <!-- shared-diagram-label top-diagram rtc-battery title-label-paren -->RTC battery connector (optional) (21)<!-- end -->

<!-- shared-blurb start rtc-battery -->
- Uses RTC modules for the Raspberry Pi that typically contain a Lithium coin cell battery.
- Helps retain time between power cycles but does not provide full power-loss protection.
<!-- shared-blurb end rtc-battery -->

### <!-- shared-diagram-label top-diagram external-button title-label-paren -->Connection for external button (optional) (22)<!-- end -->

<!-- shared-blurb start external-button -->
- Connect these two pads to an external momentary switch to allow the button operations to be done from an external button.
<!-- shared-blurb end external-button -->


## Technical specification

### Absolute maximum ratings


### Recommended operating conditions

### Wi-Fi Specifications


### I/O Characteristics


### Power consumption


### Radio specifications


## Mechanical specifications


### Dimensions and Weight

- Dimensions: 85mm x 56mm
- Weight: 55g (approximate)
- Height: 18.5mm (from top of antenna to bottom of feet)

![](/assets/images/tachyon/dimensions.png)


Dimensions are in millimeters.

## Product Handling

### ESD Precautions
The M-SoM contains highly sensitive electronic circuitry and is an Electrostatic Sensitive Device (ESD). Handling an M-SoM without proper ESD protection may destroy or damage it permanently. Proper ESD handling and packaging procedures must be applied throughout the processing, handling and operation of any application that incorporates the Particle M-SoM. ESD precautions should be implemented on the application board where the M-SoM is mounted. Failure to observe these precautions can result in severe damage to the M-SoM!

### Connectors

The U.FL antenna connector is not designed to be constantly plugged and unplugged. The antenna pin is static sensitive and you can destroy the radio with improper handling. A tiny dab of glue (epoxy, rubber cement, liquid tape or hot glue) on the connector can be used securely hold the plug in place.

The 40-pin expansion had connector is static sensitive and should be handled carefully.


## FCC ISED CE Warnings and End Product Labeling Requirements

**Federal Communication Commission Interference Statement**
This equipment has been tested and found to comply with the limits for a Class B digital device, pursuant to Part 15 of the FCC Rules. These limits are designed to provide reasonable protection against harmful interference in a residential installation. This equipment generates, uses and can radiate radio frequency energy and, if not installed and used in accordance with the instructions, may cause harmful interference to radio communications. However, there is no guarantee that interference will not occur in a particular installation. If this equipment does cause harmful interference to radio or television reception, which can be determined by turning the equipment off and on, the user is encouraged to try to correct the interference by one of the following measures:

- Reorient or relocate the receiving antenna.
- Increase the separation between the equipment and receiver.
- Connect the equipment into an outlet on a circuit different from that to which the receiver is connected.
- Consult the dealer or an experienced radio/TV technician for help.

**FCC Caution:**
Any changes or modifications not expressly approved by the party responsible for compliance could void the user's authority to operate this equipment.
This device complies with Part 15 of the FCC Rules. Operation is subject to the following two conditions:

1. This device may not cause harmful interference, and
2. This device must accept any interference received, including interference that may cause undesired operation.

**FCC Radiation Exposure Statement:**
This equipment complies with FCC radiation exposure limits set forth for an uncontrolled environment. This transmitter module must not be co-located or operating in conjunction with any other antenna or transmitter. This End equipment should be installed and operated with a minimum distance of 20 centimeters between the radiator and your body.

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


- Le dispositif de fonctionnement dans la bande 5150-5250 MHz est réservé à une utilisation en
intérieur pour réduire le risque d'interférences nuisibles à la co-canal systèmes mobiles par
satellite
- Opération dans la bande 5600-5650 MHz n'est pas autorisée au Canada. Haute puissance radars
sont désignés comme utilisateurs principaux (c.-àutilisateurs prioritaires) des bandes 5250-5350
MHz et 5650-5850 MHz et que ces radars pourraient causer des interférences et / ou des
dommages à dispositifs LAN-EL.


### European Union (CE)


### United Kingdom

UKCA Conformity:

Radio Equipment Regulations 2017 (S.I. 2017/1206)

### Outdoor use (world)

This device is restricted to indoor use when operating in the 5150 to 5350
MHz frequency range. This restriction applies in: AT, BE, BG, CH, CY, CZ, DE,
DK, EE, EL, ES, FI, FR, HR, HU, IE, IS, IT, LI, LT, LU, LV, MT, NL, NO, PL, PT, RO,
SE, SI, SK, TR, UA, UK(NI).


## Certification documents


## Country compatibility


## Ordering information



## Revision history

| Revision | Date | Author | Comments |
|:---------|:-----|:-------|:---------|
| pre      | 2025-02-05 | RK | Initial version |
