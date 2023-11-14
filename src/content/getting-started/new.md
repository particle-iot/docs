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

