---
title: United Kingdom 2G/3G Sunset
columns: two
layout: commonTwo.hbs
description: United Kingdom 2G/3G Sunset
includeDefinitions: [api-helper, datastore, sunset-tool]
---

# {{title}}

The mobile operators used by Particle cellular devices in the United Kingdom are making changes to their networks that will affect some devices.

In the United Kingdom, carriers will be generally shutting down 3G services before 2G services.

However, there are important dates that affect two large operators:

- 2025-09-30 At the end of September, O2 will sunset all 2G and 3G services
- 2025-12-31 At the end of December, Vodafone will sunset 2G, and has previously sunset 3G

This means that 2G/3G devices will not be able to connect to O2 or Vodafone after the end of December, and thus will likely be unable to connect at all in many areas.

EE has already sunset 3G service and will sunset 2G on 2029-12-31. This is the only remaining carrier using 2G/3G services for Particle devices.

The UK government is requiring all 2G and 3G services end by 2033-12-31, though carriers may discontinue service earlier.

{{> sunset-tool options="country=United Kingdom"}}


## 2G/3G sunset dates

{{> sunset-list options="country=United Kingdom"}}