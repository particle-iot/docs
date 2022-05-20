---
title: Tracker System Errata
layout: commonTwo.hbs
columns: two
---

# {{{title}}}
This document will contain known bugs, limitations, and errata for the Tracker SoM, Tracker One, and Tracker Eval board.

## Tracker One - Shipping Mode

Particle has discovered an issue with GPIO current leakage through Tracker One's M8 connector that affects Tracker One v1.0 devices manufactured prior to August 31, 2020 and can adversely affect the use of shipping mode for devices that use the M8 connection to an external peripheral device. For more information see [TAN002 - Tracker One v1.0 Shipping Mode](https://support.particle.io/hc/en-us/articles/360052713714).
