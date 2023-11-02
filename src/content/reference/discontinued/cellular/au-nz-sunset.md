---
title: Australia and New Zealand 2G/3G Sunset
columns: two
layout: commonTwo.hbs
description: Australia and New Zealand 2G/3G Sunset
includeDefinitions: [api-helper, sunset-tool]
---

# {{title}}

The mobile operators used by Particle cellular devices in the Australia and New Zealand are making changes to their networks that will affect some devices.


## Australia 

In Australia, 2G services have already shut down, and 3G shutdown is approaching. 2G/3G devices will continue to operate until late 2024, however there may be degraded service.

- Optus: Planned 3G shutdown date: September 2024
- Telstra: Planned 3G shutdown date: June 2024
- Vodafone: Planned 3G shutdown date: December 15, 2023. 
  - In April 2019, Vodafone ended 3G service on B1 (2100 MHz), reallocating those frequencies to 4G LTE.

{{> sunset-tool options="country=Australia"}}



## New Zealand

In New Zealand, 2G/3G devices will continue to operate until late 2025.

- 2degrees: Expected 3G shutdown in late 2025. 2G is already shut down.
- Spark: Expected 3G shutdown in late 2025. 2G is already shut down.
- Vodafone: Expected 3G shutdown starting August 2024. 2G shutdown by end of 2025.

{{> sunset-tool options="country=New Zealand"}}
