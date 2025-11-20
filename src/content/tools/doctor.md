---
title: Device Doctor
layout: commonTwo.hbs
description: Device Doctor
includeDefinitions: [api-helper, api-helper-cloud, device-setup-usb, api-helper-protobuf, api-helper-usb, api-helper-extras, api-helper-tickets, debug-log, usb-serial, webdfu, zip]
---

# {{{title}}}

{{> sso selectOrg="1"}}

{{> device-setup-usb mode="doctor"}}

{{> support-ticket style="hidden"}}
