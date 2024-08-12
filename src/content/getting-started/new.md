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

### Device OS version page 2024-08-12

There is a new [Device OS version listing](/reference/device-os/versions/) page that shows the release state of the releases and has various controls for filtering. You can also view the release notes, and the SKUs are compatible with any version. 

### Modifying a public library 2024-08-12

Added information on modifying a public library to the [library guide](/getting-started/device-os/firmware-libraries/#modifying-a-public-library).

### Publish to Google sheets 2024-08-08

Updated [Publish to Google sheets](/integrations/community-integrations/publish-to-google-sheets/) 
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

