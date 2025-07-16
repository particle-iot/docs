---
title: What's new
columns: two
layout: commonTwo.hbs
description: What's new
includeDefinitions: [api-helper, lunr, whats-new]
---

# {{title}}

{{> whats-new-search}}

## Updates

{{!--
When adding new items to this page:

- New items go newest first below this comment
- Be sure to follow the header style exactly: A L3 (###) header, followed by a short description, then the date in YYYY-MM-DD format. Make sure MM and DD have a leading 0 if < 10.

The header format must be exactly that because the search feature uses that to delimit entries, and determine the date of entries
--}}

### Verizon FAQ update 2025-07-16

The [Verizon FAQ](/reference/cellular/verizon-faq/) did not previously did not mention the B504, M404, and M635, since it predated those devices and had not been updated.

### B504 comparison 2025-07-16

The B504 is now in the [band fit](/reference/cellular/cellular-carriers/?tab=BandFit&test=b-series&region=South%20America&country=) tab in the carrier list tool.

### Device OS 6.3.3 GA 2025-07-16

Device OS 6.6.3 is now generally available (GA) instead of preview.

### Library updates 2025-06-30

The [library viewer](/reference/device-os/libraries/search/) has been updated for newly released or updates libraries.

### Web device doctor 2025-06-27

The [Web device doctor](/tools/doctor/) incorrectly stated that a backup user firmware would be created; this is not correct and the message updated.

### Cellular GNSS updates 2025-06-25

Clarifications in datasheets and migration guides for devices with GNSS in the cellular modem (M404, M524, B504).

### Secrets API update 2025-06-24

Minor updates for [cloud secrets](/getting-started/cloud/secrets/) cloud API.

### PHNTRAYH deprecation 2025-06-24

The PHNTRAYH (Photon with Headers, Tray [x50]) is now deprecated and will no longer be available.

### Monitor One 4-20mA 2025-06-18

[Monitor One datasheet](/reference/datasheets/tracker/monitor-one-datasheet/#4-20ma-i-o-card) updated to correct the ADC values for reading the 4-20mA current loop input on the I/O card.

### Muon 3D model 2025-06-17

A link to the Muon 3D model is now available in the [Muon datasheet](/reference/datasheets/m-series/muon-datasheet/#3d-models).

### Power measurement 2025-06-17

New [power measurement](/hardware/power/power-measurement/) page includes tips for measuring power usage on Particle devices and a device comparison tool.

### Tachyon 3D model 2025-06-16

A link to the Tachyon 3D model is now available in the [Tachyon datasheet](/reference/datasheets/tachyon/tachyon-datasheet/#3d-models).

### Cloud secrets 2025-06-09

Documentation for [cloud secrets](/getting-started/cloud/secrets/) is now available.

### Enterprise SSO 2025-06-04

Clarification of [step 3](/scaling/quick-start-guide/enterprise-sso/#step-3-complete-application-setup) for Enterprise SSO setup.

### Library updates 2025-06-02

The [library viewer](/reference/device-os/libraries/search/) has been updated for newly released or updates libraries.

### TAN release dates 2025-06-02

[TAN](/reference/technical-advisory-notices/technical-advisory-notices/) (technical advisory notices) now have release date information (starting with TAN009 in 2022).

### Tracker bare SoM 2025-05-27

Added instructions for changes that must be made to Tracker Edge when using the [bare Tracker SoM](/firmware/tracker-edge/tracker-edge-firmware/#tracker-edge-with-bare-tracker-som).

### B504e ISED certification 2025-05-15

[ISED (Canada) certification documents for the B504e](/hardware/certification/certification-documents/#ised-canada-b504e-b-series-som) are now available.

### 2G/3G sunset 2025-05-13

The [2G/3G sunset page](/reference/discontinued/cellular/2g-3g-sunset/) now includes a second table sorted by country in addition to the table sorted by date.

### UK 2G/3G sunset 2025-05-12

Added a new page to consolidate information about [2G/3G sunset in the United Kingdom](/reference/discontinued/cellular/uk-sunset/).

### Input protection page 2025-05-12

New community hardware page for [input protection](/hardware/community/input-protection/) for digital and analog inputs using rail-to-rail TVS diodes.

### Resistor divider calculator 2025-05-12

New [resistor divider calculator](/tools/developer-tools/resistor-calculator/) which has the typical calculation features and also can choose the resistors from standard 10% or 5% resistors and shows a sorted list.

### acquireWireBuffer example 2025-05-12

The example code for acquireWireBuffer used a deprecated type, should use hal_i2c_config_t.

### Location updates 2025-05-08

There is now a maximum frequency of updates for [location updates](/getting-started/cloud/location/) based on device vitals.

### Device OS 6.3.2 2025-05-05

Device OS 6.3.2 is now available in Device Restore DFU, Device Restore JTAG, hex file generator, etc. It is a preview release.

### System reset reasons 2025-05-02

Added additional documentation for [reset reason](/reference/device-os/api/system-calls/reset-reason/) including MCU-specific differences.

### Library updates 2025-05-01

The [library viewer](/reference/device-os/libraries/search/) has been updated for newly released or updates libraries.

### Extended publish examples 2025-04-28

Added a [Typed and extended publish community projects](/reference/device-os/typed-publish/#community-projects) section.

### T-Mobile US Virgin Islands 2025-04-25

T-Mobile is now included as a "Not officially supported, may work but is untested" carrier in the US Virgin Islands for the B504e and Electron 2.

### Shipping mode 2025-04-24

Added instructions for how to implement [shipping mode on non-Tracker devices](/hardware/power/power-supply-guide/#shipping-mode).

### Carrier list 2025-04-16

When viewing the [Carrier list](/reference/cellular/cellular-carriers/), Country Details view, for a LTE Cat M1 device, if the number of bands is so large that it can't be viewed without scrolling, the unsupported 5G, and sometimes 4G and 3G, will be removed from the table. This only affects the United States and Canada. 

### BRN314TRAY50 deprecation 2025-04-11

The BRN314TRAY50 (Boron 2G/3G (Global), Tray [x50]) is now deprecated and will no longer be available. The u-blox SARA-U201 cellular modem on that device is no longer manufactured.

### T-Mobile US 2G sunset 2025-04-09

Updated information about the [T-Mobile US 2G sunset](/reference/discontinued/cellular/us-2g-3g-sunset/).

### Monitor Edge v2 configuration schema 2025-04-02

Fixed a problem in the Monitor Edge v2 schema. There was an incorrect integer value encoded as a string for Modbus Inter Message Delay.

### Carrier list on mobile 2025-04-02

Fixed a bug in the [carrier list](/reference/cellular/cellular-carriers/) where clicking on one of the tabs at at the top (By Device, Country Details, etc.) would instead open a different page (possibly the Verizon FAQ).

### Location clarifications 2025-04-02

Clarifications about using Location Fusion on non-Tracker devices added to the [Location](/getting-started/cloud/location/) page.

### Library updates 2025-04-01

The [library viewer](/reference/device-os/libraries/search/) has been updated for newly released or updates libraries.

### Cellular connect timing 2025-04-01

Added a warning about allowing for sufficient [cellular connection time](/reference/device-os/api/system-modes/semi-automatic-mode/#semi-automatic-mode) in several locations.

### Device restore DFU fix 2025-03-27

Fixed a recently introduced bug where you could not reconnect in DFU mode for Device Restore DFU, Web Device Doctor,
and Product Device Flash Tool because no devices were displayed in the browser device selector.

### Band fit fix 2025-03-26

Fixed a bug in the Band Fit section of the [carrier list](/reference/cellular/cellular-carriers/). Countries were listed as
not officially supported instead of supported in some cases.

### B504e migration guide 2025-03-21

[B504e from B404X/B404/B402 migration guide](/hardware/migration-guides/b404-b504-migration-guide/) is now available.

### CloudEvent 2025-03-20

Added a note about [CloudEvent](/reference/device-os/api/cloudevent/) object lifetime requirements; it generally should not be stack allocated.

### B504e 2025-03-19

The B504EMEA and B504EMTY are now GA.

### I2C endTransmission errors 2025-03-18

Added information about return code 7 for I2C [endTransmission](/reference/device-os/api/wire-i2c/endtransmission/).

### Firmware reference navigation 2025-03-17

Fixed a bug in the Device OS firmware reference left navigation where clicking on a header that's an anchor within a page opened the next page instead.

### Monitor One cellular antenna 2025-03-11

The Monitor One cellular antenna datasheet is now included in the [antenna guide](/hardware/certification/antenna/#cellular).

### M.2 breakout board schematics 2025-03-11

The schematics and design files are now included in the [M.2 breakout board datasheet](/reference/datasheets/m-series/m2-breakout-datasheet/#schematics).

### Console device search 2025-03-10

The console now has a [device and product search](/getting-started/console/console/#search) feature.

### Tachyon datasheet 2025-03-06

A preliminary [Tachyon datasheet](/reference/datasheets/tachyon/tachyon-datasheet/) is now available. Carrier information for Tachyon is now included in the [carrier list](/reference/cellular/cellular-carriers/).

### Thread and interrupt safety 2025-03-03

New page with tips for [thread and interrupt safety](/firmware/best-practices/thread-interrupt-safety/).

### 2G/3G sunset update 2025-03-03

Countries with upcoming 2G/3G sunsets have been updated. There is a new [2G/3G sunset page](/reference/discontinued/cellular/2g-3g-sunset/) with a timeline for all countries.

### Library updates 2025-03-01

The [library viewer](/reference/device-os/libraries/search/) has been updated for newly released or updates libraries.

### Device Restore DFU fix 2025-02-28

On Gen 3 devices, Device Restore DFU would sometimes not restore the bootloader when the target Device OS version was 5.3.0 or later.

### Datasheet carrier fix 2025-02-24

In the lists of supported countries and technologies (2G, 3G, Cat1, M1) in the datasheets, corrected a problem where technologies 
that are supported by the SIM but not present in the country, or did not have a band match for the modem, were listed.

### Muon GA 2025-02-20

Muon 404 and 524, and power modules, are now generally available (GA).

### Grove sensor kit deprecated 2025-02-20

Grove Starter Kit (SNSR-GRVKIT) is now deprecated.

### M.2 eval board labels 2025-02-20

Added a table to highlight the differences in the [labels on the M.2 eval board vs. the schematic net names](/reference/datasheets/b-series/b-series-eval-board/#labels). This is the older eval board.

### M.2 breakout board RoHS 2025-02-19

The [M.2 breakout board RoHS certification document](/hardware/certification/certification-documents/#m-2-breakout-board) is now available.

### Muon RoHS 2025-02-19

The [Muon RoHS certification document](/hardware/certification/certification-documents/#muon) is now available.

### ICMP ping 2025-02-14

ICMP ping is available on Gen 3 and Gen 4 devices in the [WiFi](/reference/device-os/api/wifi/ping/), [Cellular](/reference/device-os/api/cellular/), [Ethernet](/reference/device-os/api/ethernet/ping-ethernet/), and [Network](/reference/device-os/api/network/ping-network/) classes in 6.3.0 and later.

### Large publish on old R410 modems 2025-02-13

Added a compatibility warning for [extended publish](/reference/device-os/typed-publish/) with some older R410M-02-B cellular modems
that cannot transmit 1024 byte events.

### Cloud API docs updates 2025-02-12

Added missing service agreement scopes and added missing documentation for ledger calls for products in the cloud API reference.

### Servo update 2025-02-11

Updated the default microsecond mappings for [Servo](/reference/device-os/api/servo/writemicroseconds/) to match the code instead of the theoretical values.

### Extended publish API 2025-02-07

Documentation for features in Device OS 6.3.0 include: [Typed and extended publish](/reference/device-os/typed-publish/) (includes examples), 
[CloudEvent](/reference/device-os/api/cloudevent/) (the most important class for this feature), and 
[Particle.publish](/reference/device-os/api/publish/particle-publish-cloudevent-publish/).

### Device OS 6.3.0 2025-02-06

Device OS 6.3.0 is now available in Device Restore DFU, Device Restore JTAG, hex file generator, etc.

### File to code tool 2025-02-03

New [file to code](/tools/developer-tools/file-to-code/) tool that generates C++ or Javascript code snippets from binary data in a file, or from randomly generated data. This is mainly useful for test firmware.

### Updated logic APIs 2025-01-27

Documentation for the [Logic geocoding API](/getting-started/logic-ledger/logic/#particle-geocoding-api) and [getDeviceLocation](/getting-started/logic-ledger/logic/#getdevicelocationoptions-core-api) is now available. 

### Left navigation fix 2025-01-22

The left navigation for a number of pages had incorrect indentation, making it very hard to find sections, which has been fixed.

### TAN015 - SARA-R510 reset procedure 2025-01-18

[TAN015 - SARA-R510 reset procedure](/reference/technical-advisory-notices/tan015/) is now available.

### Reset reason and panic 2025-01-18

Added additional documentation on [System.resetReason()](/reference/device-os/api/system-calls/reset-reason) after a system panic.

### Muon I2S clock 2025-01-18

On the Muon, the `GPIO18` pin is also `PCM_CLK`.

### Location updates 2025-01-15

A new [getting started with location](/getting-started/cloud/location/) guide discusses additional options on non-Tracker devices.

### Updated tethering 2025-01-15

Updated the [tethering reference](/reference/device-os/tethering/) with a new script and updated instructions.

### Boron 2G/3G deprecation 2025-01-13

BRN310TRAY50, Boron 2G/3G (Global), Tray [x50], is no longer available. The BRN310KIT was previously deprecated so all BRN310 SKUs are now deprecated.

### EEPROM and objects 2025-01-10

Additional information on using [EEPROM and objects](/reference/device-os/api/eeprom/eeprom-and-objects/) is now available.

### Migration guides 2025-01-07

Added power supply notes to all P2 and M-SoM migration guides.

### Muon power jumper 2025-01-06

Added a warning to the M1 enclosure datasheet to set the power jumper before installation. Also added a picture of the jumper to the Muon datasheet.

### M-SoM reserved SoM pins 2025-01-06

Added note explaining reserved pins on the M.2 connector to the M-SoM datasheet; it was in the B-SoM datasheets but not M-SoM.

### Muon datasheet power interrupt 2025-01-02

The Muon datasheet had the wrong pin listed for the power manager interrupt pin. It is A7, not A6. It was correct in the Device OS firmware API reference.

### Create access token limit 2024-12-20

There is an additional rate limit after 10 failed attempts to create an access token. See [Create an access token rate limits](/reference/cloud-apis/api/#create-an-access-token-api-rate-limits/).

### Hibernate on Gen 4 2024-12-20

Clarified which pins can be used to wake from hibernate sleep mode on Gen 4 (RTL872x) and split the pins that can wake from hibernate table from the pins that don't support pull-up or pull-down in hibernate sleep mode into two separate tables to reduce confusion. Datasheets and Device OS firmware API reference updated.

### firmware_update_failed fix 2024-12-20

Using `firmware_update_failed` in case statement with an `int` param now requires a cast to compile.

### Libraries update 2024-12-17

Updated the library viewer with currently available public libraries.

### TAN014 - SARA-R510 band selection 2024-12-16

[TAN014 - SARA-R510 band selection](/reference/technical-advisory-notices/tan014/) is now available.

### Device OS 6.2.1 2024-12-16

Device OS 6.2.1 is now available in Device Restore DFU, Device Restore JTAG, hex file generator, etc.

### DeviceInfoLedger 2024-12-16

The [Device information in ledger](/getting-started/logic-ledger/device-info-ledger/) example now includes 
a [documented library](https://github.com/particle-iot/DeviceInfoLedger) to make it easier to add the 
feature to your firmware. It also factors out the cloud configuration code so you can use that separately
from the device information ledger.

### B504 2024-12-13

The B-Series SoM B504 did not previously list Verizon as supported for enterprise customers, though it is supported.

### Ethernet pin remapping 2024-12-12

Added additional instructions to [Ethernet pin remapping](/reference/device-os/api/ethernet/pin-configuration-ethernet/) 
including how to reset the default values, and a warning about lower performance when not using interrupts.

### Updated Canada 2G/3G sunset 2024-12-12

There is a new page for [Canada 2G/3G sunset](/reference/discontinued/cellular/canada-sunset/) information.

### Argon kit deprecation 2024-12-10

The Argon kit (ARGNKIT) is now deprecated and will no longer be available.

### Query auth deprecation 2024-12-04

The date for [query auth deprecation](/reference/discontinued/software/query-auth/) is December 4, 2024. It was previously
listed as December 2024. This only affects new accounts.

### SKU deprecation 2024-12-02

ARG-STRTKT (Argon starter kit) is now deprecated and will no longer be available. Muon kit SKUs have been renamed but are otherwise the same.


### Real-time clocks 2024-12-02

Added Gen 4 devices to the [real-time clock guide](/reference/device-os/real-time-clocks/).

### M1 Enclosure update 2024-12-02

Updated assembly instructions for the [M1 enclosure](/reference/datasheets/m-series/m1-enclosure-datasheet/). 

### Tracker Edge licenses 2024-11-20

Added a discussion of [Tracker Edge](/firmware/tracker-edge/tracker-edge-firmware/#software-licenses) and [Monitor Edge](/firmware/tracker-edge/monitor-edge-firmware/#software-licenses)
software licenses and the use of open-source libraries in closed-source applications.

### M-SoM and Muon power 2024-11-20

Added an additional warning to the M-SoM migration guides that the power requirements are different than previous Particle devices.

### Import device tool fix 2024-11-20

Fixed a bug in the [Import devices tool](/tools/cloud-tools/import-devices/) where it would not import Wi-Fi devices that do not have an ICCID.

### Query parameter authentication deprecation 2024-11-19

Added a new page that summarizes [query parameter authentication deprecation](/reference/discontinued/software/query-auth/).

### RegisterCommand 2024-11-18

Added documentation for the Tracker Edge v19 and Monitor Edge `registerCommand()` method in the cloud service; this takes the 
place of `regCommandCallback()` in older versions of Tracker Edge.

### Window width fix 2024-11-15

Fixed an issue where the search icon and username would drop below the menubar at certain screen widths, depending on the length of your user email, if logged in.

### SKU deprecation 2024-11-14

The remaining stock of Particle Debugger, [x1] (ACC-DEBUG) and Argon Air Quality Monitor Kit [x1] (ARG-AQKT)
has been sold and these items are now deprecated.

### Authentication tokens 2024-11-13

Updated information about using an authentication token query parameters, which will be not be allowed for security reasons. Only an Authorization header should be used. This change only affects newly created accounts.

Also updated the version of particle-api-js used by the docs itself to 11.1.1.

### Tethering script 2024-11-07

Updated the [tethering reference](/reference/device-os/tethering/) with a script to simplify installation on a Raspberry Pi.

### Updated webhook reference 2024-11-07

Updated [webhook reference](/reference/cloud-apis/webhooks/) with much more information.

### Logic APIs 2024-11-06

There are a number of Particle cloud APIs that can now be called from Logic, see [Logic core APIs](/getting-started/logic-ledger/logic/#particle-logic-core-api).

### Logic and ledger API fixes 2024-11-06

Several logic and ledger APIs showed `/user` in the endpoint URL, but this wasn't correct. 

### Cellular global identity 2024-11-06

The [cellular_global_identity](/reference/device-os/api/cellular/cellular-global-identity/) function, used to get the MCC, MNC, LAC, and cell identifier, is now documented.

### Removed particle token list 2024-11-06

This command has been removed from the Particle CLI for security reasons.

### Library builds 6.2.0 2024-11-06

The [library viewer](/reference/device-os/libraries/search/) now includes tests build for 6.2.0 and M-SoM. 

### NeoPixel tutorial 2024-11-04

Added a [NeoPixel tutorial](/hardware/expansion/neopixel/).

### Import device fix 2024-11-03

Fixed a bug in the [Import devices tool](/tools/cloud-tools/import-devices/) that could cause the actual serial number
to be overwritten by the mobile secret in some cases when both were present on a line.

### Height of PM-BAT 2024-11-01

Added the height of modules to the [PM-BAT datasheet](/hardware/power/pm-bat-datasheet#dimensions).

### TCP and UDP network interface 2024-10-31

Documented the optional network interface parameter for TCPClient, TCPServer, and UDP, used to bind the connection to a specific interface such as Ethernet.

### M1 Enclosure antenna placement 2024-10-31

Added [recommended antenna placement instructions](/reference/datasheets/m-series/m1-enclosure-datasheet/#muon-antenna-placement) for using the Muon in the M1 enclosure.

### Gen 4 hibernate wake pins 2024-10-31

Additional pins are available for wake from hibernate sleep on P2, Photon 2, and M-SoM; these are now documented in the datasheets and Device OS firmware API reference.

### ELC402TY deprecated 2024-10-30

The remaining stock ELC402TY (Electron LTE CAT-M1 (NorAm), [x1]) has been sold and this SKU is
no longer available.

### Tracker Edge schema fix 2024-10-28

Fixed default quota values for the Tracker Edge v17 and v18 schemas that could cause
the data to not be able to be saved.

### analogWrite and Servo on Gen 4 2024-10-23

Added a note to analogWrite and Servo that you must specify a non-default PWM frequency for analogWrite
on Gen 4 devices (M-SoM, P2, Photon 2) or Servo will not function properly.

### M1 enclosure datasheet 2024-10-23

The [M1 enclosure datasheet](/reference/datasheets/tracker/m1-enclosure-datasheet/) is now available.

### Tethering documentation 2024-10-23

The [tethering page](/reference/device-os/tethering/) documents how to use tethering
on LTE Cat 1 devices to provide TCP/IP to external devices such as the Raspberry Pi.

### Plus plan 2024-10-22

Information about the plus plan included in the [migrating to basic/plus](/getting-started/billing/migrating-to-basic/) page.

### Muon datasheet 2024-10-22

The [Muon datasheet](/reference/datasheets/m-series/muon-datasheet/) is now available!

### Removed Australia 3G 2024-10-21

Australia will have no 2G or 3G service as of 2024-10-28; removed 3G as supported from the carrier list
and datasheets.

### Workbench debugging 2024-10-18

Minor updates to Workbench source-level debugging instructions to match the current Workbench and OpenOCD versions.

### Device OS 6.2.0 2024-10-15

Device OS 6.2.0 is now available in Device Restore DFU, Device Restore JTAG, hex file generator, etc.

### System thread default 2024-10-15

In Device OS 6.2.0 and later, system thread is now enabled by default. See 
[non-threaded system mode](/reference/discontinued/software/non-threaded-system-mode/) for additional information.

### Typed publish 2024-10-15

[Typed publish](/reference/device-os/typed-publish/), available in Device OS 6.2.0, allows for sending binary data
in publishes and efficiently sending structured data.

### Device OS 5.9.0 GA 2024-10-10

Device OS 5.9.0 is now generally available (GA) and the default release for P2/Photon 2 and M-SoM.

### Hex generator fix 2024-10-02

Fixed an issue where the [Hex Generator](/tools/developer-tools/hex-generator/) did not show the list of platforms and
versions on Safari (and possibly other cases).

### Antenna warning 2024-10-02

Added warning to not use Argon (ANT-FLXV2) antenna on the P2, Photon 2, or M-SoM to the antenna guide, and the three datasheets.

### Tracker Edge v19 2024-09-24

Tracker Edge v19 is now in the [Tracker Edge docs](/firmware/tracker-edge/tracker-edge-firmware/).

### M-SoM GNSS 2024-09-24

Removed the warning about using the GNSS concurrently with cellular on the M404. Added link to GNSS library.

### Logging warnings 2024-09-20

Added warning about places where you should not use logging calls like Log.info like
[BLE data handlers](/reference/device-os/api/bluetooth-le-ble/blecharacteristicproperty/) and
[system button handlers](/reference/device-os/api/system-events/).

### Updated library reference 2024-09-18

Updated [library reference](/reference/device-os/libraries/search/) with latest libraries and versions.

### Updated cloud API documentation 2024-09-18

Updated the cloud API, particle-api-js, and Postman definition files with the latest updates.

### Power manager updates 2024-09-18

Documented new [system power manager](/reference/device-os/api/power-manager/) calls available in
Device OS 5.9.0 for `3V3_AUX` power control on the Muon, M.2 SoM breakout board, and custom
boards that use the [PM-BAT power module](/hardware/power/pm-bat-datasheet/).

### Ethernet update 2024-09-18

Updated [Ethernet documentation](/reference/device-os/api/ethernet/) for Device OS 5.9.0 and
the ability to use the [Adafruit Ethernet FeatherWing](/hardware/ethernet/ethernet/#adafruit-featherwing) without having to solder jumpers.


### POSIX error codes 2024-09-17

Documented [POSIX error codes](/reference/device-os/api/debugging/posix-errors/) that can occur when
using certain features like TCPClient.

### Status LED page update 2024-09-17

The [Status LED and device modes page](/troubleshooting/led/) has been updated.

### Left navigation fixes 2024-09-16

Fixes to the left navigation menu, particularly in the Device OS API reference, improve performance
and should eliminate issues with the navigation disappearing and not being able to scroll down
in the content.

### Device OS 5.9.0 2024-09-09

Device OS 5.9.0 is now available in Device Restore DFU, Device Restore JTAG, hex file generator, etc.

### Protected device CLI commands 2024-09-09

CLI commands for [protected devices](/reference/developer-tools/cli/#particle-device-protection) are now documented.

### API users 2024-09-04

From the Particle console you can now created and edit [API users](/getting-started/console/console#api-users).

### Logic and Ledger 2024-09-04

The Logic and Ledger features are now generally available (no longer in beta).

### P2 VBAT_MEAS 2024-09-04

Added a new section to the [P2 datasheet](/reference/datasheets/wi-fi/p2-datasheet/#vbat_meas-a6-) to 
explain the VBAT_MEAS pin.

### Modem USB clarification 2024-09-03

Added a clarification that the cellular modem USB pins on SoMs are not required on custom base boards.

### Power guide updates for M-SoM 2024-08-28

The [power supply guide](/hardware/power/power-supply-guide/) has been updated for the M-SoM.

### Logic FunctionInfo 2024-08-28

The prototype for FunctionInfo showed FunctionContext instead, though the description of the fields was correct.

### SKU availability 2024-08-28

The EDGEAISNSRKIT and PHN2EDGEKIT are no longer available. 

### 2G/3G sunset date updates 2024-08-21

Several 2G and 3G sunset dates, mainly in Europe, were updated.

### Github actions 2024-08-21

[Github actions](/firmware/best-practices/github-actions/) is no longer in beta and is now generally available.

### Supervisory reset 2024-08-21

Added additional information about supervisory reset chips to the M-SoM and P2 datasheets.

### Tracker fleet updates 2024-08-19

Updates to the Tracker [fleet mapping](/getting-started/console/console/#asset-tracker-features) to show all devices
on the map, better real-time updates, and a mini-map view in device details.

### Updated 3G Sunset for Telstra and Optus (Australia) 2024-08-16

The [3G sunset for Telstra and Optus](/reference/discontinued/cellular/au-nz-sunset/) has been extended to October 28, 2024.

### Updated Servo 2024-08-16

The Device OS API documentation for [Servo](/reference/device-os/api/servo/servo/) now includes information for Gen 4 devices.

### M-SoM sleep network standby clarification 2024-08-14

The M-SoM does not support sleep with network standby for cellular or Wi-Fi networks.

### B504 certification docs 2024-08-13

FCC Certification documents added for the B504.

### Device OS version page 2024-08-13

The [Device OS version listing](/reference/device-os/versions/?v=6.1.1) page now has a box where you type in a version number to
filter for that version.

### Device OS version page 2024-08-12

There is a new [Device OS version listing](/reference/device-os/versions/) page that shows the release state of the releases and has various controls for filtering. You can also view the release notes, and the SKUs are compatible with any version. 

### Modifying a public library 2024-08-12

Added information on modifying a public library to the [library guide](/getting-started/device-os/firmware-libraries/#modifying-a-public-library).

### Publish to Google sheets 2024-08-08

Updated [Publish to Google sheets](/integrations/community-integrations/publish-to-google-sheets/) `
community integration with the updated user interface for Apps Script.

### Device OS API collapse menu fix 2024-08-08

Fixed a bug where using the collapse triangle in the [Device OS API reference](/reference/device-os/api/) would leave
deeply nested items visible. For example, collapsing "Bluetooth LE (BLE)" when viewing BLE.advertising().

### Monitor One I2C 2024-08-08

In the I2C section of the [Monitor One datasheet](/reference/datasheets/tracker/monitor-one-datasheet/), Wire and Wire3 share
the same I2C peripheral. It was previously reversed here, but correct in the Device OS firmware API reference.

### PM-DC input voltage 2024-08-08

The [PM-DC power module](/hardware/power/pm-dc-datasheet/) input voltage range is 5 - 12 VDC (not 24).

### API user tool 2024-08-08

The [API user tool](/tools/cloud-tools/api-users/) now allows scopes that are not listed in the checkboxes to
be entered manually.

### Cloud ledger size 2024-08-07

Cloud ledgers can now be up to 1 Mbyte in size. Device to cloud and Cloud to device ledgers are still limited to 16 Kbyte.

### Gen 4 maximum sleep duration 2024-07-30

Documented the [maximum sleep duration](/reference/device-os/api/sleep-sleep/duration-systemsleepconfiguration/) for Gen 4 devices (P2, Photon 2, M-SoM).

### M.2 breakout battery 2024-07-29

The [M.2 breakout datasheet](/reference/datasheets/m-series/m2-breakout-datasheet/) now includes information about the 
battery as does the [battery guide](/hardware/power/batteries/).

### Logout fix 2024-07-26

Fixed a bug where the Logout menu item did nothing when attempted on a page with no active content 
like the home page.

### BLE peer address 2024-07-23

BLE peer address printing examples previously printed the 6-byte MAC addresses in reverse byte order. This 
has been corrected.

### Style update 2024-07-23

Updated styles in the docs! You can change the color mode from the three dots menu in the upper right corner of the tab 
or have it automatically match your operating system setting.

### Particle.connect change 2024-07-12

Particle.connect() with a network type, such as Particle.connect(WiFi) was available in 5.6.0 to 5.8.1, but is removed from 5.8.2 
and later because using it can lead to unpredictable behavior with automatic connection management.

### Dual-band Wi-Fi antenna datasheet update 2024-07-12

Updated the Particle P2/Photon2 Wi-Fi Antenna 2.4/5GHz antenna [datasheet](/assets/datasheets/PARANTWM1EA.pdf) (PARANTWM1EA and PARANTWM1TY).
The shipping product is unchanged; the previous datasheet was for an earlier version, not the version that shipped.

### Device OS 6.1.1 2024-07-11

Device OS 6.1.1 is now in Device Restore USB, Hex Generator, etc.. Note that this releases is for Gen 3 (nRF52) only; it is not supported on P2, Photon 2, and M-SoM (RTL872x).

### BLE concurrent advertising and scanning 2024-07-11

Added a warning to the BLE documentation that scanning and advertising at the same time
is not recommended.

### M635 M-SoM and Muon update 2024-07-09

Updated the cellular modem model number of the M635 M-SoM and Muon from BG95-M5 to BG95-S5. 

### API minimum TLS version 2024-07-09

Requests to api.particle.io now require TLSv1.2 or later.

### Device restore fixes 2024-07-09

Fixed an issue with Device restore DFU and Web device doctor when upgrading or downgrading 
P2/Photon 2 or M-SoM with Device OS 5.5.0 and later. It was particularly noticeable with 
5.8.2.

### Device OS 5.8.2 2024-07-02

Device OS 5.8.2 is now in Device Restore USB, Hex Generator, etc.

### BRN404X Australia certification 2024-06-28

The [BRN404X](/reference/datasheets/b-series/brn404x-datasheet/) is now certified for use in Australia.

### B504 datasheet 2024-06-27

The B-SoM [B504 datasheet](/reference/datasheets/b-series/b504-datasheet/) is now available.

### FeatherAB1805-Li fix 2024-06-14

Updated the design files for [FeatherAB1805-Li](/hardware/best-practices/watchdog-timers/#featherwing-ab1805-li) to add a missing pull-up resistor that would affect using it with the Photon 2.

### FCC permissive change 2024-06-14

Added link to the FCC permissive change policy document to the [Certification guide](/hardware/certification/certification/#fcc-united-states-rf-certifications).

### Integration gallery update 2024-06-10

The [Integration gallery](/integrations/introduction/) has new, easier to configure, forms.

### Muon datasheet 2024-06-05

Updated the [Muon datasheet](/reference/datasheets/m-series/muon-datasheet/) with the updated expansion connector.

### particle wifi 2024-06-05

Added documentation for [`particle wifi`](/reference/developer-tools/cli/#particle-wifi) commands.

### particle bundle 2024-06-03

Added documentation for the Particle CLI [`particle bundle`](/reference/developer-tools/cli/#particle-bundle) commands.

### Getting started with Monitor One and Modbus 2024-05-31

There is a new tutorial for [Getting started with the Monitor One with Modbus](/hardware/community/monitor-one-modbus/)!

### M.2 breakout updates 2024-05-29

Minor updates to the [M.2 breakout datasheet](/reference/datasheets/m-series/m2-breakout-datasheet/).

### Getting started with cloud to device ledger 2024-05-28

New [Getting started with cloud to device ledger](/getting-started/logic-ledger/logic-ledger-community/cloud-to-device-ledger-getting-started/) tutorial.

### Telstra Australia 3G sunset 2024-05-24

In Australia, the Telstra 3G shutdown date have been moved to August 31, 2024 (was previously June 2024).

### Community integration submission 2024-05-24

Updated the [community integration submission](/integrations/community-integrations/about-community-integrations/) page with additional instructions.

### Device OS API sleep updates 2024-05-22

The  [Device OS Firmware API sleep reference](/reference/device-os/api/sleep-sleep/sleep-sleep/) includes additional information for Gen 4 devices 
(P2, Photon 2, M-SoM).

### M-SoM PWM in Device OS Firmware API 2024-05-22

The list of PWM pins for the M-SoM is different than the P2/Photon 2; the table in the [Device OS Firmware API reference](/reference/device-os/api/input-output/analogwrite-pwm/) was not correct for the M-SoM.

### WiFiCredentials setHidden and setValidate 2024-05-21

Documentation is now available for setHidden (added in 5.5.0) and setValidate (added in 5.8.0) in the [WiFiCredentials class](/reference/device-os/api/wifi/wificredentials-class/#wificredentials-).

### Updated Postman files 2024-05-17

The files to using the Particle cloud API from Postman have been updated, and are now generated automatically
from the Cloud API definitions. They were previously manually generated.

### Updated cloud API docs 2024-05-16

The [cloud API documentation](/reference/cloud-apis/api/) has been updated to make it more consistent.

### Device group name limits 2024-05-15

Added the limits for device group names to the [device group page](/getting-started/console/device-groups/): Group names can consist of the letters a - z, numbers 0-9, hyphen, and underscore. The maximum length of a group name is 64 characters.

### Firmware update events 2024-05-14

Added a new guide to [firmware update events](/reference/cloud-apis/firmware-update-events/) in the product event stream when 
updating firmware and Device OS OTA.

### Monitor One M12 connector 2024-05-14

Added [M12 connector ratings](/reference/datasheets/tracker/monitor-one-datasheet#m12-connector-ratings) to the Monitor One datasheet with voltage and current limits for this connector.

### Device OS API reference scrolling 2024-05-14

Fixed a bug in the [Device OS API reference](/reference/device-os/api/introduction/getting-started/) where the left navigation did not
scroll to the active item on page open with direct link, or when clicking links to other pages within
the reference.

### Tracker SoM supported GNSS 2024-05-06

Updated the list of supported GNSS systems for the [Tracker SoM](/reference/datasheets/tracker/tracker-som-datasheet/).

### Device OS 6.1.0 2024-05-03

Device OS 6.1.0 is now in Device Restore USB, Hex Generator, etc.. Note that this releases is for Gen 3 (nRF52) only; it is not supported on P2, Photon 2, and M-SoM (RTL872x).

### Device-side ledger 2024-05-02

[Ledger](/getting-started/logic-ledger/ledger/) support on Particle devices is now available in Device OS 6.1.0.

### Disable optimization typo 2024-04-03

Fixed a typo in the command `#pragma GCC optimize ("O0")` which previously had a lowercase oh in `O0` which does not work
in the [Workbench reference](/getting-started/developer-tools/workbench/#disabling-optimization).

### Thread and mutex documentation 2024-04-30

The [thread and mutex functions](/reference/device-os/api/threading/threading/) are now documented in the Device OS API reference. There's also a new explainer for [callback functions](/firmware/software-design/callback-functions/).

### Search fixed 2024-04-30

Search results now filter out assets including the app-note README files, which won't render properly if opened directly.

### M-SoM SPI speed 2024-04-30

Corrected the M-SoM SPI and SPI1 port maximum speeds; they're opposite of the P2/Photon 2.

### MON524 datasheet update 2024-04-29

Updated the [EU declaration of conformity for the MON524](/reference/datasheets/tracker/monitor-one-datasheet/#eu-declaration-of-conformity).

### Integration gallery 2024-04-25

Documentation for the new [integration gallery](/integrations/introduction/) is now available.

### Logic for organizations 2024-04-25

[Logic](/getting-started/logic-ledger/logic/) can be used at the organization level as well as in your developer sandbox.

### I/O characteristics 2024-04-25

Added I/O characteristics such as input high and low levels, and pin drive strength, to the P2, Photon 2, and M-Som datasheets.

### Retained memory clarification 2024-04-25

Updated the description of retained memory on RTL872x devices (P2, Photon 2, M-SoM) in the datasheets, migration guides, and Device OS API reference.

### Data usage troubleshooting 2024-04-24

There's a new page with tips for [data usage troubleshooting](/troubleshooting/guides/connectivity-troubleshooting/data-usage/).

### Datasheet updates 2024-04-23

Datasheets for current products now contain links to the individual certification documents for that SKU. It's the same content as in the [certification documents page](/hardware/certification/certification-documents/) but having it in the datasheets will make it easier to find.

### Machine learning support 2024-04-22

[Machine learning](/getting-started/machine-learning/machine-learning/) models created with Edge Impulse can now be used on the Boron, B-SoM, and M-SoM in addition to the P2/Photon 2.

### B524 Japan certification 2024-04-22

Added [Japan certification documents](/hardware/certification/certification-documents/#japan-b524-b-series-som) for the B524.

### System event parameter update 2024-04-20

Added some missing [system event parameter values](/reference/device-os/api/system-events/system-events-overview/#system-events-reference).

### SPI DMA callback warning 2024-04-18

Added a warning about not setting the CS pin high in a [SPI DMA transfer callback](/reference/device-os/api/spi/transfer-void-void-size_t-std-function/). 

### B-SoM eval board fix 2024-04-18

The pinout diagram for the [M.2 eval board board](/reference/datasheets/b-series/b-series-eval-board/) 60-pin expansion header pin 25 (A4) was missing from the diagram. The tables are text were correct.


### M404 certification update 2024-04-18

[Certification documents for the M404](/hardware/certification/certification-documents/#m404-m-som-m-series-lte-m-2g) include ISED (Canada) individual test reports; previously only the certificate was included.

### Community library update 2024-04-18

The community library information in the docs has been updated with any recently updated libraries.

### PDM microphone information 2024-04-18

Updated the M-SoM, P2, and Photon 2 datasheets and migration guides to include information about PDM microphones.

### Cellular data usage guide update 2024-04-17

Added additional tips to the [cellular data usage guide](/getting-started/billing/cellular-data/).

### STM32 Asset OTA Update 2024-04-16

Updated [STM32 Asset OTA](/reference/asset-ota/asset-ota-community/stm32-asset-ota/) example uses a library to make it
easier to integrate into your application.

### M404 certification update 2024-04-16

[Certification documents for the M404](/hardware/certification/certification-documents/#m404-m-som-m-series-lte-m-2g) include ISED (Canada).

### M404 certification update 2024-04-15

[Certification documents for the M404](/hardware/certification/certification-documents/#m404-m-som-m-series-lte-m-2g) include CE RED certification and RoHS.

### Release note filter 2024-04-12

The [release note tool](/reference/device-os/release-notes/) now has an option to filter by device platform.

### M524 certification update 2024-04-12

[Certification documents for the M524](/hardware/certification/certification-documents/#m524-m-som-m-series-lte-cat-1) updated to include CE RED certificate and RoHS.

### M404 certification update 2024-04-11

[Certification documents for the M404](/hardware/certification/certification-documents/#m404-m-som-m-series-lte-m-2g) include an updated PCS certificate and added FCC Part 15B.

### Qubitro integration instructions 2024-04-11

Added integration instructions for [Qubitro](/integrations/community-integrations/qubitro/).

### M404 certification 2024-04-08

[Certification documents for the M404](/hardware/certification/certification-documents/#m404-m-som-m-series-lte-m-2g) are now available.

### particle.include update 2024-04-04

Updated the [example patterns for filename wildcards](/getting-started/device-os/firmware-libraries/#particle-include-and-particle-ignore) for particle.include and particle.ignore.

### M SoM datasheet 2024-04-03

Added additional RF transmitter information.

### particle-api-js duplicate sections 2024-04-02

Removed the duplicate sections from the particle-api-js documentation.

### Organization integrations 2024-04-02

Documentation for [organization integrations](/integrations/organization-integrations/) is now available.

### M SoM GA 2024-04-02

The M404 and M524 are now generally available (GA).

### PHNTRAYNOH deprecation 2024-03-26

PHNTRAYNOH (Photon without Headers, Tray [x50]) is now deprecated. This is the Photon 1, not the Photon 2.

### BLE.getProvisioningStatus 2024-03-20

The BLE.getProvisioningStatus method is now documented.

### Incorrect LTE M1 bands 2024-03-19

The datasheets for the B402/B404 and BRN402/BRN404 listed the wrong LTE Cat M1 bands. The list of supported bands should be 2, 4, 5, 12, 13.

### Particle.subscribe clarification 2024-03-19

Clarified that subscription updates occur only after loop is running.

### Device OS 5.8.0 2024-03-16

Device OS 5.8.0 is now in Device Restore USB, Hex Generator, etc.. Also fixed a bug where Device Restore USB and Web Device Doctor returned a "could not put device in DFU mode" error immediately after selecting the device when the device had Device OS 5.7.0 installed on it.

### P2, Photon 2, M-SoM baud rates 2024-03-16

On the P2, Photon 2, M-SoM, and Muon UART serial, 2400, 4800, 380400, 460800, baud rates are supported but were not listed.

### M SoM pin 45 2024-03-15

M SoM pin 45 is not shared. Pins 43 and 53 are both connected to PB[3], but not pin 45.

### Photon 2 and Argon block VUSB clarification 2024-03-15

Updated the block diagram and added text to clarify how VUSB works on the Argon and Photon 2.

### Basic plan 2024-03-12

The growth plan is now named the basic plan. The free plan is unchanged.

### Tracker Edge ignore() 2024-03-12

Tracker Edge and Monitor Edge `ignore(pin_t)` may require a cast to avoid an ambiguous declaration error. Example 
and documentation updated.

### Photon 2 and Argon block diagram update 2024-03-12

The block diagram for the Photon 2 and Argon had the diode on VUSB in the wrong location. 

### Boot mode pin warnings 2024-03-11

The P2 and Photon 2 datasheets now include a warning about boot mode pins (TX, D6, and D7) in the GPIO pin listing.

### Wake source clarification 2024-03-11

At least one wake source must be specified for STOP and ULP sleep modes.

### Photon 2 migration guide USB 2024-03-11

The Photon 2 migration guides listed the Photon 2 as having a USB C connector, but it has a Micro USB B. The datasheet was correct.

### Photon 2 datasheet CHG pin 2024-03-11

The Photon 2 datasheet and Photon 2 from Argon migration guide now has the same warning about the CHG
pin as the Device OS firmware API reference. The pin cannot be reliably used.

### Logic open beta 2024-03-11

Logic is now in open beta.

### Hardware overview page update 2024-02-26

The [hardware overview](/getting-started/hardware/hardware-overview/) has information about the M-SoM and Muon, and
the page should be much easier to understand now.

### BLE.scan callback example typo 2024-02-22

The example in for [BLE.scan(callback)](/reference/device-os/api/bluetooth-le-ble/ble-class/#ble-scan-callback-) had an error that 
prevented compiling.

### M-SoM datasheet 2024-02-22

The [preliminary M-SoM datasheet](/reference/datasheets/m-series/msom-datasheet/) and [migration guides](/hardware/migration-guides/msom-b-series-migration-guide/) are now available. The [battery calculator](/tools/developer-tools/battery-calculator) and 
[cellular carrier list](/reference/cellular/cellular-carriers/) includes M-SoM now.

### Muon datasheet preview 2024-02-22

The [Muon datasheet preview](/reference/datasheets/m-series/muon-datasheet/) is now available.

### Pin drive strength P2 2024-02-20

Pin drive strength for the P2 and Photon 2 is now included in the [Device OS firmware API](/reference/device-os/api/input-output/pinsetdrivestrength/)
documentation and datasheets.

### Upload firmware clarification 2024-02-16

When using the upload product firmware cloud API to upload a .zip file containing Asset OTA images, it must be
set as type application/json.

### BLE.setPairingPasskey 2024-02-16

Clarified the use of the pass key parameter to [BLE.setPairingPasskey](/reference/device-os/api/bluetooth-le-ble/ble-class/#ble-setpairingpasskey-).

### CLI updates 2024-02-16

Updates for Particle CLI documentation for CLI version 3.21.0.

### Tracker cmd additions 2024-02-15

Added information about the cmd handlers in [Tracker Edge](/firmware/tracker-edge/tracker-edge-api-reference/#regcommandcallback-cloudservice) and Monitor Edge for the `get_cfg` and `reset_to_factory` commands.

### Tracker edge events 2024-02-13

Added links to the Tracker Edge, Monitor Edge, and Store and Forward documentation to the published event reference in
the [cloud API reference](/reference/cloud-apis/api/#asset-tracking-events).

### B-Series eval power power 2024-02-13

Clarified the power supply options for the [B-Series eval board](/reference/datasheets/b-series/b-series-eval-board/).

### setDeviceName maximum length 2024-02-12

The practical limit for the device name is 14 characters to fit in the default advertising message.

### Enterprise Wi-Fi 2024-01-31

Clarify that enterprise Wi-Fi is not supported on the P2/Photon 2.

### Connection management 2024-01-30

[Automatic connection management](/reference/device-os/connection-management/) documentation is now available. The feature
is available in Device OS 5.7.0.

### Monitor One datasheet battery warnings 2024-01-29

Added additional warnings related to batteries to the [Monitor One datasheet](/reference/datasheets/tracker/monitor-one-datasheet/#battery-warnings).

### ESP32 Wi-Fi test binaries 2024-01-25

Added a link to the test tools binary file to the [Argon ESP32 certification](/hardware/certification/enabling-wifi-rf-test-for-esp32) page.

### JSON tool 2024-01-24

There's always been a JSON verifier and encoder in the [JSON docs](/firmware/best-practices/json/#try-it-) but 
now it's available as standalone [JSON tool](/tools/developer-tools/json/) making it easier to find. There is also
a new option to convert a JSON object into a C++ string.

### Singleton class generator tool 2024-01-24

There's always been a tool to create a single class template (optionally with threading and locking), but it 
was hidden in the [singleton docs](/firmware/software-design/singleton/) but now it also exists as a 
standalone [singleton class generator tool](/tools/developer-tools/class-generator/) making it easier to find.

### Device OS 5.7.0 2024-01-24

Device OS 5.7.0 is now available in Device Restore DFU, Device Restore JTAG, hex file generator, and release note viewer.

### B402MEA deprecated 2024-01-22

The SKU B402MEA is deprecated. The recommended replacement is B404XMEA.

### SoM first board and Basic SoM fix 2024-01-22

M.2 pin 40 should be D3 and M.2 pin 42 should be D2. These were reversed previously, however
these sample boards do not use the pins.

### Scrolling fix in Device OS API reference 2024-01-18

Fixed a longstanding bug where if the section you opened in the Device OS firmware API reference was shorter than the height of your window, the next section might not load automatically. Scrolling down would not load it, either.

### Fixed navigation on some pages 2024-01-18

Fixed a bug where if a page had no L2 headers, no navigation would be shown even if it had L3 headers. One example was the Workbench FAQ.

### WiFi.setCredentials for P2/Photon 2 2024-01-16

Documented the number of Wi-Fi credentials for the P2/Photon 2, which is the same as the Argon (10).

### Static network interface example fixes 2024-01-12

In several locations in the Device OS firmware API reference, when `.source(NetworkInterfaceConfigSource::STATIC)` was specified, there
was a semicolon at the end of the line which should not be there.

### Added documentation for WiFi.getAntenna 2024-01-10

The [WiFi.getAntenna](/reference/device-os/api/wifi/getantenna/) function was not previously documented (but present since 0.8.0-rc.2).

### Opening a hidden section 2024-01-09

If you try to open a link to a header in a section hidden by a disclosure triangle, or click on a
left-hand navigation to one, the section is now opened first. Before, nothing would happen.

### Using Logic for data transformation 2024-01-08

New example of using [Logic for data transformation](/getting-started/logic-ledger/data-transformation/).

### Add link to custom schema page 2024-01-06

Added a link from the [configuration schema tool](/tools/cloud-tools/configuration-schema/) to [custom schema instructions](/reference/tracker/tracker-configuration/#restore-default-schema).

### Ethernet Featherwing deprecation 2024-01-05

The Ethernet Featherwing for Gen 3 devices is now deprecated and no longer available in the retail and wholesale stores.

### Clarify size of built-in types 2024-01-04

The size of double, etc. are the same across all platforms, not just the Photon and Electron.

### Clarify use of PMID on E404X 2024-01-03

Clarified that PMID should not be used on the E404X.

### Updated library database 2024-01-02

Updated the community library database with any recent versions, also updated the compile targets so every library example has been tested with 5.6.0 and 4.2.0 on an assortment of platforms.

### Clarify use of Tracker SoM PMID pin 2023-12-23

The PMID pin on the Tracker SoM should be left unconnected in normal use.

### Updated B524 band power information 2023-12-20

Clarified the band power table for the [B524](/reference/datasheets/b-series/b524-b523-datasheet/).

### Ledger documentation 2023-12-29

Added preliminary documentation for [Ledger alpha](/getting-started/logic-ledger/ledger/). 

### Photon 2 schematic 2023-12-19

Added Photon 2 schematic to the [datasheet](/reference/datasheets/wi-fi/photon-2-datasheet/#schematic).

### Monitor One 404 certification 2023-12-18

Certification documents for Monitor One (404) are [now available](/hardware/certification/certification-documents/#monitor-one-404-noram).

### In document search results 2023-12-08

Clicking on a search result now displays a in-document search results panel with the sections that match
your query. This is especially useful for long pages where it's not clear where you should scroll to.
For example [API users](/reference/cloud-apis/api/?q=api+user).

### Device OS 5.6.0 2023-12-08

Device OS 5.6.0 is now available in Device Restore DFU, Device Restore JTAG, hex file generator, etc.. Release notes are updated in the docs [release note viewer](/reference/device-os/release-notes/).


### Improved search result display 2023-12-06

When you click on a search result and the search query is present in a header in the page, it will now be scrolled into view. This previously worked on the Device OS API reference, but now it works on all pages.

### Copying and moving integrations 2023-12-06

Added instructions for [copying and moving integrations](/integrations/webhooks/#product-vs-sandbox-integrations).

### BLE.disconnect warning 2023-12-05

Added a warning for [BLE.disconnect](/reference/device-os/api/bluetooth-le-ble/ble-class/#ble-disconnect-) that it cannot be called from a BLE callback.

### Software timer note 2023-12-05

Added a note the [software timers](/reference/device-os/api/software-timers/software-timers/) reference about how certain timer 
semantics are undefined by the underlying FreeRTOS timers.

### Permanent roaming Oman 2023-12-04

Oman has been added the list of countries that may encounter [permanent roaming restrictions](/getting-started/hardware/cellular-overview/#permanent-roaming).

### SKU deprecation 2023-11-29

The B523MEA and ARGNTRAY50 are deprecated. They were previously NRND until the stock was depleted, and that has occurred.

### New search 2023-11-28

The new docs search is now available by clicking on the magnifying glass icon in the top navigation menu. 
- Vastly improved result quality.
- Clicking on a link then using Back brings you back to the search results. A checkmark next to the item shows which ones you've already visited in this session.
- Closing the search overlay and opening it again brings back your last search results.
- Search is now powered by Google but requests are anonymous, not tagged with your Particle account or Google account.

### T-Mobile USA LTE Cat M1 2023-11-28

T-Mobile's support for LTE Cat M1 (not just LTE Cat NB IoT) in the United States is now official so the footnote has been removed.

### Web device doctor antenna option 2023-11-27

The [web device doctor](/tools/doctor/), when used with the P2 and Photon 2, now has an option in Advanced Options for selecting the Wi-Fi antenna 
(internal, external, or leave unchanged).

### Monitor One GA 2023-11-21

The Monitor One (MON404E01C01KIT) is now generally available.

### Import devices 2023-11-20

Fixed a bug in the [Import devices tool](/tools/cloud-tools/import-devices/) where the device was marked as development if the checkbox was unchecked instead of checked.

### Tracker datasheet update 2023-11-20
Added link to footprint Eagle CAD library, and also information on the restrict areas under the SoM to the [Tracker SoM datasheet](/reference/datasheets/tracker/tracker-som-datasheet/#footprint).


### Updated SKU status 2023-11-16

| SKU | Description | Old | New |
| :--- | :--- | :--- | :--- |
| ARGN-H | Argon [x1] | NRND | Deprecated |
| PHN2MTY | Photon 2, Tray [x50] | Beta | GA |

### Ethernet.ready behavior 2023-11-16

Updated the description for [Ethernet.ready()](/reference/device-os/api/ethernet/ready/). On isolated Ethernet, it does not return true, because ready implies that the connection is ready to be used as a cloud connection, and isolated networks can't be used as the cloud connection.

### Windows 10 device drivers 2023-11-16

There is a new guide for troubleshooting [Windows 10 device driver issues](/troubleshooting/guides/build-tools-troubleshooting/win10-device-drivers/).

If you are experiencing these problems you may have a driver issue:

- No serial device identified in the web-based tools despite using a current version of Chrome or Edge.
- particle serial list returns no results.
- dfu-util -l returns no devices.

### Particle CLI and Mac with Apple silicon 2023-11-16

If you have a Mac with Apple silicon (M1, M2, M3, ...) and wish to use the Particle CLI natively (not in a Rosetta terminal), see [Particle CLI and Mac with Apple silicon](/troubleshooting/guides/build-tools-troubleshooting/cli-mac-apple-silicon/).


### Ethernet isolated LAN 2023-11-15

There are now additional instructions and a firmware example for using Ethernet with a static IP address and an [Isolated LAN](/hardware/ethernet/ethernet/#isolated-lan) and using cellular for the cloud connection.

### RS485 pin names 2023-11-14

Renamed RS485 pins A and B instead of P and N in the [Monitor One Datasheet](/reference/datasheets/tracker/monitor-one-datasheet/) and Quickstart page.

### What's new page 2023-11-14

New What's new page ([this page](/getting-started/new/)) lists what's new in the Particle docs! 

### Logic beta docs 2023-11-13

Logic is a serverless computing platform to host the business logic of an IoT product by running scripts in response to events being emitted from devices. 
[Logic beta documentation](/getting-started/logic-ledger/logic/) is now available.

### Classroom setup 2023-11-13

A new page for [Classroom setup](/getting-started/setup/classroom/) has tips for using Particle devices in classrooms.


### Datasheet full pin details 2023-11-13

Added a full pin details listing to the P2, Photon 2, BRN404X, B404X, B524, datasheets. The migration guides had these, but the actual datasheets did not. The detail listing includes every interface and feature of each pin, sorted by pin, for example this listing for the [P2](/reference/datasheets/wi-fi/p2-datasheet/#complete-module-pin-details).

### Designing on Particle video descriptions 2023-11-09

Added a short description before each Designing on Particle video on the [video home page](/getting-started/getting-started/#designing-on-particle-videos).

### Device Restore USB fix for P2 with 5.3.0 2023-11-09

Fixed a bug in Device Restore USB on the P2 and Photon 2 (RTL872x) where if both prebootloader-part1 and bootloader required an upgrade, the bootloader might not upgrade (even with the flash even if version unchanged option is set). This was most noticeable if upgrading a P2/Photon 2 to 5.3.0 with no Wi-Fi credentials so the bootloader would not upgrade OTA.

### Documentation for analogSetReference 2023-11-08

Documented [analogSetReference()](/reference/device-os/api/input-output/analogsetreference/) and analogGetReference(), added in 5.3.0 and 4.1.0.

### New community integration: ilert 2023-11-08

New community integration: [ilert](/integrations/community-integrations/ilert/), an incident response platform.

### Configuration schema documentation 2023-10-31

All fields in the Tracker Edge and Monitor Edge [configuration schemas](/getting-started/console/console/#device-fleet-settings) are now included in the docs. In addition to the longer explanatory text for some tabs in the console, there's now a table format listing of everything in the schema that's generated automatically.

### Australia and New Zealand 2G/3G sunset 2023-10-31

Updated [2G/3G sunset information for Australia and New Zealand](/getting-started/hardware/cellular-overview/#australia).

### Schematic viewer (beta) 2023-10-14

In the M.2 eval board datasheet, there's a [new experimental schematic viewer](/reference/datasheets/b-series/b-series-eval-board/#page-1). You can click on the image, and then zoom in, pan, and print from the expanded view. Known bug is that some text appears mirrored when it should not be.

### Edge off-the-shelf release tool 2023-10-25

[Monitor Edge off-the-shelf release tool](/firmware/tracker-edge/monitor-edge-firmware/#using-off-the-shelf-releases)! There's also a similar tool for Tracker Edge. This tool will automatically handle downloading an Edge release and upload it as product firmware. It can also update the configuration schema and view release notes for Edge versions.

### Route package protection 2023-10-19

New shipping FAQ for [Route package protection](/troubleshooting/faqs/shipping/route-package-protection/).

### P1MOD10 deprecation 2023-10-18

The P1 module in strips of 10 is deprecated. All existing stock has been sold and no more will be available.

### New project template 2023-10-17

The Create New Project option in Workbench has a new style! See the documentation for the new [project template](/firmware/best-practices/firmware-template/).


### Asset OTA community page 2023-10-06

Updated the [Asset OTA community examples](/reference/asset-ota/asset-ota-community/asset-ota-community/) page. They're now directly included in the docs instead of being links.

### Community integrations Tulip and Blynk 2023-10-06

- [Tulip](/integrations/community-integrations/tulip/)
- [Blynk](/integrations/community-integrations/blynk/) now has instructions for using Blynk blueprint, which greatly simplifies the process. 

### Workbench installation chagne 2023-10-04

Updated the [installation instructions for Workbench](/quickstart/workbench/) to use the standard VSCode installer.

### Updated Asset OTA docs 2023-10-03

Updated Asset OTA page includes additional material and a [FAQ](/reference/asset-ota/asset-ota/#faq) with many more technical details.

### Device Restore USB and Monitor Edge v2 2023-09-30

Device Restore USB now has an option for Monitor Edge v2. 

### Serial number docs 2023-09-29

[New page that discusses serial numbers](/hardware/best-practices/serial-number/) and how to use them to map serial number prefixes to SKUs. There's also a big table of SKU to prefix and prefix to SKU.

### BRN310KIT deprecation 2023-09-21

The stock of BRN310KIT (Boron 2G/3G) has been sold and will no longer be manufactured. The 2G/3G cellular modem on the BRN310 is no longer available.

### Number of hardware breakpoints 2023-09-19

Documented the number of hardware breakpoints (2 on RTL872x and 4 on nRF52) in the [Workbench docs](/getting-started/developer-tools/workbench/#debugging-3rd-generation-).

### Device restore hex files for 5.5.0 2023-09-18

There was a problem with the device restore hex files for Device OS 5.5.0 that has been corrected.

### Left navigation improvements 2023-09-15

On wider windows, the left navigation is now wider, making more of the content readable. Also a number of items in the troubleshooting menu now have shorter names.

### Asset OTA documentation 2023-09-13

Documentation for [Asset OTA](/reference/asset-ota/asset-ota/) is now available.

### Device Restore USB now supports the Monitor One 2023-09-11

[Device Restore USB](/tools/device-restore/device-restore-usb/) now supports the Monitor One. You can also select the Tracker Edge or Monitor Edge version separate from the version of Device OS you want to install.

