---
title: Configuration
columns: two
layout: commonTwo.hbs
description: Configuration
---


**Configuration** is a platform‑wide capability for Particle. Configuration is the control plane for tailoring how devices, cloud, and applications behave, used to solve real-life problems like modem behavior and operating systen level radio configuration, as well as to align user applications needs from any vertical or use case. 

Configuration is used by all parts of IoT deployment: Device OS, cloud services, pre-built applications like Tracker Edge and Monitor Edge, and user applications.

Configuration scales from organization‑wide defaults, to product‑level settings, to device‑specific overrides where appropriate. 

It comprises three complementary layers:

- [Environment Variables (Env)](/getting-started/configuration/env-vars/): lightweight, non‑secret key - value pairs that shape the runtime environment. They are ideal for fast, system level adjustments (endpoints, feature flags, polling intervals) without changing firmware. Available in the cloud and in the firmware.
- [Secrets](/getting-started/cloud/secrets/): secure, organization‑scoped values that integrations and logic can reference securely.
- Schemas & Values: optional, typed, schema‑validated parameters that govern firmware‑level behavior at scale. A template (JSON Schema) is exposed so teams can type, document, and revision‑control options.

