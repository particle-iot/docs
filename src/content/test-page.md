---
title: Test Page
layout: landing.hbs
description: Test Page
includeDefinitions: [api-helper, api-helper-config, api-helper-events, api-helper-extras, api-helper-primitives]
---

# Test Page

## Blink LED test 

{{> sso }}
{{> led-function-test }}


## Codebox Flash

{{codebox content="/assets/files/hardware-examples/blink-function.ino" format="cpp" height="300" webide="605b22dd4c3ada0017fd896e" flash="true"}}


## Tracker Edge Schema

{{> sso }}
{{> config-schema }}


## Codebox Schema

This is the v11 + engine schema test:

{{codebox content="/assets/files/tracker/engine-schema.json" format="json" height="300" configSchema="true"}}


## Event Viewer #1

{{> sso }}
{{> event-viewer height="300" style="table"}}


## Publish Event

{{> publish-event defaultName="setColor" defaultData="255,0,0"}}

## Call Function

{{> device-function}}


## Get Variable

{{> device-variable}}

## Codebox Flash 

This is the sensor page firmware that publishes a value

{{codebox content="/assets/files/app-notes/AN032/SensorPage.cpp" format="cpp" height="500" flash="true"}}

## Event Viewer #2

{{> event-viewer height="300" style="table"}}
