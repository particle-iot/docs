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
- Be sure to follow the header style exactly: A L3 (###) header, followed by a short description, then the date in YYYY-MM-DD format

The header format must be exactly that because the search feature uses that to delimit entries, and determine the date of entries
--}}

### What's new page 2023-11-14

New What's new page ([this page](/getting-started/new/)) lists what's new in the Particle docs! 

### Logic beta docs 2023-11-13

Logic is a serverless computing platform to host the business logic of an IoT product by running scripts in response to events being emitted from devices. 
[Logic beta documentation](/getting-started/cloud/logic/) is now available.

### Classroom setup 2023-11-13

A new page for [Classroom setup](/getting-started/setup/classroom/) has tips for using Particle devices in classrooms.


### Datasheet full pin details 2023-11-3

Added a full pin details listing to the P2, Photon 2, BRN404X, B404X, B524, datasheets. The migration guides had these, but the actual datasheets did not. The detail listing includes every interface and feature of each pin, sorted by pin, for example this listing for the [P2](/reference/datasheets/wi-fi/p2-datasheet/#complete-module-pin-details).

### Designing on Particle video descriptions 2023-11-09

Added a short description before each Designing on Particle video on the [video home page](/getting-started/getting-started/#designing-on-particle-videos).

### Device Restore USB fix for P2 with 5.3.0 2023-11-09

Fixed a bug in Device Restore USB on the P2 and Photon 2 (RTL872x) where if both prebootloader-part1 and bootloader required an upgrade, the bootloader might not upgrade (even with the flash even if version unchanged option is set). This was most noticeable if upgrading a P2/Photon 2 to 5.3.0 with no Wi-Fi credentials so the bootloader would not upgrade OTA.

### Documentation for analogSetReference 2023-11-08

Documented [analogSetReference()](/reference/device-os/api/input-output/analogsetreference/) and analogGetReference(), added in 5.3.0 and 4.1.0.

### New community integration: ilert 2023-11-08

New community integration: [ilert](/integrations/community-integrations/ilert/), an incident response platform.


