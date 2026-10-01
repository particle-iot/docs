---
title: Antenna tool
columns: two
layout: commonTwo.hbs
description: Antenna comparison tool
includeDefinitions: [api-helper, api-helper-extras, antenna-tool]
---

# {{title}} (Beta)

This tool compares two antennas, typically to compare the peak gain and average gain values.

{{> antenna-tool}}


## Custom antennas

You can compare your own antenna against standard antennas using this tool, however you must convert your antenna data 
into a special JSON format. This can be done manually, or using an AI tool like Claude to parse the data out of an antenna datasheet
(typically a pdf file).

- [Example custom antenna JSON file](/assets/files/antenna-tool/custom-antenna-example.json)
- [Instructions for Claude to generate the file](/assets/files/antenna-tool/ANTENNA-INSTRUCTIONS.md)

## Note

This tool should only be used for general antenna guidance and does not replace the need for a qualified engineer to determine
the certification requirements for using a substitute antenna. There can be complex and expensive certification requirements
for substituting an antenna.

If the peak gain or average gain is higher for antenna 2, the number is shown in red. If you select a SKU and any gain
value is red, it may preclude the use of antenna 2 as a permissive change.

