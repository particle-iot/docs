---
title: USB Test Tools
layout: no-nav.hbs
description: USB Test Tools
includeDefinitions: [api-helper, api-helper-usb, mermaid, webdfu, zip]
---

# USB test tools

{{> usb-test}}


## Marking setup done

{{> usb-setup-done}}

Setup done is only required on the Argon, Boron, B-Series SoM, and Tracker SoM when using Device OS 3.x or earlier. It is no longer used in Device OS 4.0 and later.

## Restore device over USB

{{> usb-restore-device}}

### Special notes for downgrading

{{!-- BEGIN shared-blurb 164b5ce0-9baa-11ec-b909-0242ac120002 --}}
**Boron LTE BRN402 and B-Series SoM B402**

If you are downgrading a Boron LTE (BRN402) or B-Series SoM B402 from Device OS 2.0.0 or later, to 1.5.1 or earlier, you must first install 1.5.2, allow the device to boot and connect to cellular before downgrading again to an earlier version. The reason is that 2.0.0 and later use a higher baud rate for the cellular modem, and on the SARA-R410M only, this setting is persistent. Older versions of Device OS assume the modem is using the default of 115200 and will fail to communicate with the modem since it will be using 460800. Device OS 1.5.2 uses 115200, however it knows it can be 460800 and will try resetting the baud rate if it can't communicate with the modem.
{{!-- END shared-blurb --}}

- Test build 2023-01-05

## Test mermaid

```mermaid
graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
```
