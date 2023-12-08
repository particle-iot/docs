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

- New items go newest first be;low this comment
- Be sure to follow the header style exactly: A L3 (###) header, followed by a short description, then the date in YYYY-MM-DD format. Make sure MM and DD have a leading 0 if < 10.

The header format must be exactly that because the search feature uses that to delimit entries, and determine the date of entries
--}}

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
[Logic beta documentation](/getting-started/cloud/logic/) is now available.

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

Updated Asset OTA page includes additional material and a [FAQ](/reference/device-os/asset-ota/#faq) with many more technical details.

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

Documentation for [Asset OTA](/reference/device-os/asset-ota/) is now available.

### Device Restore USB now supports the Monitor One 2023-09-11

[Device Restore USB](/tools/device-restore/device-restore-usb/) now supports the Monitor One. You can also select the Tracker Edge or Monitor Edge version separate from the version of Device OS you want to install.

