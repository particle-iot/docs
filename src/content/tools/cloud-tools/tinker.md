---
title: Tinker
columns: two
layout: commonTwo.hbs
description: Tinker
includeDefinitions: [api-helper, api-helper-events, api-helper-extras, api-helper-primitives, zip]
---

# {{title}}

Tinker firmware is installed on your device at the factory and allows you to do simple reading and writing of digital GPIO, analog inputs, and PWM outputs. Once you've flashed other firmware to your device Tinker will no longer be available, but you can flash it back again below.

You must log in to your Particle account to interact with your devices using the web-based Tinker application.

{{> sso }}

&nbsp;

{{> flash-tinker}}

&nbsp;

{{> tinker}}
