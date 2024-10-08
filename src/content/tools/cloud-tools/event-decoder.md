---
title: Event decoder
columns: two
layout: commonTwo.hbs
description: Event viewer
includeDefinitions: [api-helper, api-helper-events, api-helper-json, api-helper-mustache, api-helper-primitives, cbor, codemirror]
---

# {{title}}

In Device OS 6.2 and later, events can include typed, structured, and binary data. This tool 
makes it easy to decode these events for troubleshooting. Just copy and paste the raw 
data from the console or CLI event viewer.

{{> event-decoder rows="10" cols="90"}}
