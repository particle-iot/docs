---
title: 2G/3G Sunset
columns: two
layout: commonTwo.hbs
description: 2G/3G Sunset
includeDefinitions: [api-helper, datastore, sunset-tool]
---

# {{title}}

The mobile operators used by Particle cellular devices around are making changes to their networks that will affect some devices.

As the number of 2G and 3G devices dwindle, carriers are ending, deprecating, or sunsetting 2G and/or 3G services in order to reallocate
spectrum and tower space for 4G and 5G LTE services.

There are two tables below:

- [2G/3G sunsets - by date](#2g-3g-sunsets-by-date)
- [2G/3G sunsets - by country](#2g-3g-sunsets-by-country)

## 2G/3G sunsets - by date

{{> sunset-list options=""}}

## 2G/3G sunsets - by country

{{> sunset-list options="byCountry"}}


