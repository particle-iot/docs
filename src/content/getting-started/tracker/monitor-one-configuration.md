---
title: Monitor One configuration
columns: two
layout: commonTwo.hbs
description: Monitor One configuration
---

## Monitor One Settings

Tracker One and Monitor One devices share the same platform ID, and by default new products default to being Tracker One products.

To enable the Monitor One features, use this control to change the product schema to Monitor One and add the additional tabs shown below,
use the [configuration schema tool](/tools/cloud-tools/configuration-schema/).

{{imageOverlay src="/assets/images/console/product-configuration-monitor-one.png" class="no-darken"}}

### Settings shared with the tracker

The following settings, shown above, are the same for the Tracker One and Monitor One:

- [Location settings](#location-settings)
- [Store and forward settings](#store-and-forward)
- [Motion settings](#motion-settings)
- [Temperature settings](#rgb-led-settings)
- [Sleep settings](#sleep-settings)
- [Device monitoring settings](/#device-monitoring)
- [Geofence settings](/#geofence-settings)
                      

### I/O card config

These settings are for the I/O Card configuration. 

{{imageOverlay src="/assets/images/tracker/io-config-1.png" alt="I/O card settings" }}

{{!-- BEGIN do not edit content below, it is automatically generated 'cef0011b-49a1-4992-ab61-ee8eea74abc2' --}}


##### 0-10V Voltage Input configuration

Configuration for 0-10V scaling.

###### Sensor low scaling configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/io/voltage/sensorlow</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Sensor low scaling</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Scaling applied to calibrated voltage inputs to scale value to sensor units in application.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; "></td></tr>
</tbody>
</table>

###### Sensor high scaling configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/io/voltage/sensorhigh</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Sensor high scaling</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Scaling applied to calibrated voltage inputs to scale value to sensor units in application.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Default Value</td><td class="" style="text-align: left; ">10</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">100</td></tr>
</tbody>
</table>

###### Sensor filter cutoff frequency configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/io/voltage/sensorfc</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Sensor filter cutoff frequency</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Frequency for 3db low pass filtering of the voltage input in Hertz.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Default Value</td><td class="" style="text-align: left; ">1</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">12</td></tr>
</tbody>
</table>

###### Threshold low comparator limit configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/io/voltage/threshlow</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Threshold low comparator limit</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Threshold value for comparator.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Default Value</td><td class="" style="text-align: left; ">2</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">100</td></tr>
</tbody>
</table>

###### Threshold low hysteresis configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/io/voltage/hystlow</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Threshold low hysteresis</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Hysteresis value for comparator.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Default Value</td><td class="" style="text-align: left; ">1</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">100</td></tr>
</tbody>
</table>

###### Threshold low enable configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/io/voltage/th_low_en</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Threshold low enable</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">If enabled, publish an immediate event when the lower threshold is crossed.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">true</td></tr>
</tbody>
</table>

###### Threshold high comparator limit configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/io/voltage/threshhigh</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Threshold high comparator limit</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Threshold value for comparator.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Default Value</td><td class="" style="text-align: left; ">8</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">100</td></tr>
</tbody>
</table>

###### Threshold high hysteresis configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/io/voltage/hysthigh</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Threshold high hysteresis</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Hysteresis value for comparator.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Default Value</td><td class="" style="text-align: left; ">1</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">100</td></tr>
</tbody>
</table>

###### Threshold high enable configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/io/voltage/th_high_en</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Threshold high enable</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">If enabled, publish an immediate event when the upper threshold is crossed.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">true</td></tr>
</tbody>
</table>

##### 4-20mA Current Input configuration

Configuration for 4-20mA scaling.

###### Sensor low scaling configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/io/current/sensorlow</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Sensor low scaling</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Scaling applied to calibrated current inputs to scale value to sensor units in application.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Default Value</td><td class="" style="text-align: left; ">0.004</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; "></td></tr>
</tbody>
</table>

###### Sensor high scaling configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/io/current/sensorhigh</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Sensor high scaling</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Scaling applied to calibrated current inputs to scale value to sensor units in application.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Default Value</td><td class="" style="text-align: left; ">0.02</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">10</td></tr>
</tbody>
</table>

###### Sensor filter cutoff frequency configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/io/current/sensorfc</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Sensor filter cutoff frequency</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Frequency for 3db low pass filtering of the current input in Hertz.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Default Value</td><td class="" style="text-align: left; ">1</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">12</td></tr>
</tbody>
</table>

###### Threshold low comparator limit configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/io/current/threshlow</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Threshold low comparator limit</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Threshold value for comparator.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Default Value</td><td class="" style="text-align: left; ">0.008</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">100</td></tr>
</tbody>
</table>

###### Threshold low hysteresis configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/io/current/hystlow</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Threshold low hysteresis</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Hysteresis value for comparator.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Default Value</td><td class="" style="text-align: left; ">0.002</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">100</td></tr>
</tbody>
</table>

###### Threshold low enable configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/io/current/th_low_en</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Threshold low enable</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">If enabled, publish an immediate event when the lower threshold is crossed.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">true</td></tr>
</tbody>
</table>

###### Threshold high comparator limit configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/io/current/threshhigh</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Threshold high comparator limit</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Threshold value for comparator.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Default Value</td><td class="" style="text-align: left; ">0.016</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">100</td></tr>
</tbody>
</table>

###### Threshold high hysteresis configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/io/current/hysthigh</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Threshold high hysteresis</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Hysteresis value for comparator.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Default Value</td><td class="" style="text-align: left; ">0.002</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">100</td></tr>
</tbody>
</table>

###### Threshold high enable configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/io/current/th_high_en</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Threshold high enable</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">If enabled, publish an immediate event when the upper threshold is crossed.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">true</td></tr>
</tbody>
</table>

###### Threshold low fault comparator limit configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/io/current/th_fault_low</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Threshold low fault comparator limit</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Threshold value, in milliamps, for fault comparator.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Default Value</td><td class="" style="text-align: left; ">0.003875</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">100</td></tr>
</tbody>
</table>

###### Threshold low fault hysteresis configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/io/current/hyst_fault_low</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Threshold low fault hysteresis</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Hysteresis value, in milliamps, for fault comparator.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Default Value</td><td class="" style="text-align: left; ">0.000125</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">100</td></tr>
</tbody>
</table>

###### Threshold low fault enable configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/io/current/th_fault_low_en</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Threshold low fault enable</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">If enabled, publish an immediate event when the lower threshold is crossed.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">true</td></tr>
</tbody>
</table>

###### Threshold high fault comparator limit configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/io/current/th_fault_high</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Threshold high fault comparator limit</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Threshold value, in milliamps, for fault comparator.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Default Value</td><td class="" style="text-align: left; ">0.016</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">100</td></tr>
</tbody>
</table>

###### Threshold high fault hysteresis configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/io/current/hyst_fault_high</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Threshold high fault hysteresis</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Hysteresis value, in milliamps, for fault comparator.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Default Value</td><td class="" style="text-align: left; ">0.002</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">100</td></tr>
</tbody>
</table>

###### Threshold high fault enable configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/io/current/th_fault_high_en</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Threshold high fault enable</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">If enabled, publish an immediate event when the upper threshold is crossed.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">true</td></tr>
</tbody>
</table>

##### 24V Digital Input configuration

Configuration for optoisolated digial input.

###### Publish immediately on input change configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/io/input/immediate</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Publish immediately on input change</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">If enabled, publish an immediate event when the digital input changes.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">true</td></tr>
</tbody>
</table>

###### Edge detection configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/io/input/edge</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Edge detection</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Publish on input change based on edge detected.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Default Value</td><td class="" style="text-align: left; ">none</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Enumeration values</td><td class="" style="text-align: left; ">none,<br>rising,<br>falling,<br>both</td></tr>
</tbody>
</table>


{{!-- END do not edit content above, it is automatically generated --}}


### I/O card calibration

{{imageOverlay src="/assets/images/tracker/io-calibration-config.png" alt="I/O card calibration settings" }}

{{!-- BEGIN do not edit content below, it is automatically generated '23d4ca8b-c845-4939-bf6b-e259dc45af27' --}}


##### 0-10V Voltage Input configuration

Configuration for 0-10V calibration.

###### Calibration gain configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/iocal/voltage/calgain</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Calibration gain</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Gain applied to raw voltage inputs to correct gain errors.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Default Value</td><td class="" style="text-align: left; ">1</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">0.95</td></tr>
</tbody>
</table>

###### Calibration offset configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/iocal/voltage/caloffset</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Calibration offset</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Offset applied to raw voltage inputs to correct offset errors.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">-0.01</td></tr>
</tbody>
</table>

##### 4-20mA Current Input configuration

Configuration for 4-20mA calibration.

###### Calibration gain configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/iocal/current/calgain</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Calibration gain</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Gain applied to raw current inputs to correct gain errors.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Default Value</td><td class="" style="text-align: left; ">1</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">0.95</td></tr>
</tbody>
</table>

###### Calibration offset configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/iocal/current/caloffset</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Calibration offset</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Offset applied to raw current inputs to correct offset errors.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">-0.01</td></tr>
</tbody>
</table>


{{!-- END do not edit content above, it is automatically generated --}}


### Modbus

The following settings, available in Monitor Edge v2, are for the Modbus (RS485) support on the Monitor One I/O card.

{{!-- BEGIN do not edit content below, it is automatically generated 'c7548071-4421-40b6-b229-bf8e51e625cc' --}}


##### RS-485 Baud configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/modbus_rs485/baud</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">RS-485 Baud</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Baud rate to operate the RS-485 bus.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Default Value</td><td class="" style="text-align: left; ">38400</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Enumeration values</td><td class="" style="text-align: left; ">1200,<br>2400,<br>4800,<br>9600,<br>19200,<br>28800,<br>38400,<br>57600,<br>76800,<br>115200</td></tr>
</tbody>
</table>

##### RS-485 Parity Bits configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/modbus_rs485/parity</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">RS-485 Parity Bits</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Specifies partiy type used for the RS-485 bus.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Default Value</td><td class="" style="text-align: left; ">none</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Enumeration values</td><td class="" style="text-align: left; ">none,<br>even</td></tr>
</tbody>
</table>

##### Modbus Inter Message Delay configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/modbus_rs485/imd</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Modbus Inter Message Delay</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Delay between the last Modbus response and the next transmission in milliseconds.  This is used for rate limiting transactions.</td></tr>
</tbody>
</table>

##### Modbus Server Enable configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/modbus1/enable</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Modbus Server Enable</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">If enabled, poll the given Modbus server address.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">true</td></tr>
</tbody>
</table>

##### Modbus Server ID configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/modbus1/id</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Modbus Server ID</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">The remote device server ID (also known as slave ID). Range: 1-255.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Default Value</td><td class="" style="text-align: left; ">1</td></tr>
</tbody>
</table>

##### Modbus Timeout configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/modbus1/timeout</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Modbus Timeout</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Allowable time to wait for a response in milliseconds. Range: 0-10000.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Default Value</td><td class="" style="text-align: left; ">2000</td></tr>
</tbody>
</table>

##### Polling Interval configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/modbus1/poll</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Polling Interval</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Defines the frequency (in seconds) in which the register will be polled and results published.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Default Value</td><td class="" style="text-align: left; ">1</td></tr>
</tbody>
</table>

##### Publish polled value configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/modbus1/publish</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Publish polled value</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Select when to publish the polled value.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Default Value</td><td class="" style="text-align: left; ">always</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Enumeration values</td><td class="" style="text-align: left; ">always</td></tr>
</tbody>
</table>

##### Modbus Function configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/modbus1/function</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Modbus Function</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Type of read function.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Default Value</td><td class="" style="text-align: left; ">coil</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Enumeration values</td><td class="" style="text-align: left; ">coil,<br>discrete_input,<br>input_register,<br>holding_register</td></tr>
</tbody>
</table>

##### Register Address configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/modbus1/address</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Register Address</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Address to read from, zero based. Range: 0-65535.</td></tr>
</tbody>
</table>

##### Modbus data type configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/modbus1/type</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Modbus data type</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Type of data being read.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Default Value</td><td class="" style="text-align: left; ">uint16</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Enumeration values</td><td class="" style="text-align: left; ">int16,<br>uint16,<br>int32,<br>uint32,<br>float32_abcd,<br>float32_badc,<br>float32_cdab,<br>float32_dcba,<br>bits</td></tr>
</tbody>
</table>

##### Mask Value configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/modbus1/mask</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Mask Value</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">16-bit bitmask to apply to read value to isolate bits. Use 65535 if masking is not required. Range: 0-65535.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Default Value</td><td class="" style="text-align: left; ">65535</td></tr>
</tbody>
</table>

##### Shift Value configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/modbus1/shift</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Shift Value</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Shifting, in bits, to right shift read value after masking. Use 0 if shifting is not required. Range: 0-15.</td></tr>
</tbody>
</table>

##### Offset Value configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/modbus1/offset</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Offset Value</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Offset applied to masked and shifted input. This represents “b” in “y = mx + b”. Use 0 if not required (float variable).</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">0.5</td></tr>
</tbody>
</table>

##### Scaling Value configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/modbus1/scale</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Scaling Value</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Scaling applied to masked and shifted input. This represents “m” in “y = mx + b”. Use 1 if not required (float variable).</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Default Value</td><td class="" style="text-align: left; ">1</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">10</td></tr>
</tbody>
</table>

##### Modbus Server Enable configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/modbus2/enable</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Modbus Server Enable</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">If enabled, poll the given Modbus server address.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">true</td></tr>
</tbody>
</table>

##### Modbus Server ID configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/modbus2/id</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Modbus Server ID</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">The remote device server ID (also known as slave ID). Range: 1-255.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Default Value</td><td class="" style="text-align: left; ">1</td></tr>
</tbody>
</table>

##### Modbus Timeout configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/modbus2/timeout</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Modbus Timeout</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Allowable time to wait for a response in milliseconds. Range: 0-10000.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Default Value</td><td class="" style="text-align: left; ">2000</td></tr>
</tbody>
</table>

##### Polling Interval configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/modbus2/poll</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Polling Interval</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Defines the frequency (in seconds) in which the register will be polled and results published.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Default Value</td><td class="" style="text-align: left; ">1</td></tr>
</tbody>
</table>

##### Publish polled value configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/modbus2/publish</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Publish polled value</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Select when to publish the polled value.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Default Value</td><td class="" style="text-align: left; ">always</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Enumeration values</td><td class="" style="text-align: left; ">always</td></tr>
</tbody>
</table>

##### Modbus Function configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/modbus2/function</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Modbus Function</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Type of read function.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Default Value</td><td class="" style="text-align: left; ">coil</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Enumeration values</td><td class="" style="text-align: left; ">coil,<br>discrete_input,<br>input_register,<br>holding_register</td></tr>
</tbody>
</table>

##### Register Address configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/modbus2/address</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Register Address</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Address to read from, zero based. Range: 0-65535.</td></tr>
</tbody>
</table>

##### Modbus data type configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/modbus2/type</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Modbus data type</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Type of data being read.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Default Value</td><td class="" style="text-align: left; ">uint16</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Enumeration values</td><td class="" style="text-align: left; ">int16,<br>uint16,<br>int32,<br>uint32,<br>float32_abcd,<br>float32_badc,<br>float32_cdab,<br>float32_dcba,<br>bits</td></tr>
</tbody>
</table>

##### Mask Value configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/modbus2/mask</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Mask Value</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">16-bit bitmask to apply to read value to isolate bits. Use 65535 if masking is not required. Range: 0-65535.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Default Value</td><td class="" style="text-align: left; ">65535</td></tr>
</tbody>
</table>

##### Shift Value configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/modbus2/shift</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Shift Value</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Shifting, in bits, to right shift read value after masking. Use 0 if shifting is not required. Range: 0-15.</td></tr>
</tbody>
</table>

##### Offset Value configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/modbus2/offset</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Offset Value</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Offset applied to masked and shifted input. This represents “b” in “y = mx + b”. Use 0 if not required (float variable).</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">0.5</td></tr>
</tbody>
</table>

##### Scaling Value configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/modbus2/scale</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Scaling Value</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Scaling applied to masked and shifted input. This represents “m” in “y = mx + b”. Use 1 if not required (float variable).</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Default Value</td><td class="" style="text-align: left; ">1</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">10</td></tr>
</tbody>
</table>

##### Modbus Server Enable configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/modbus3/enable</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Modbus Server Enable</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">If enabled, poll the given Modbus server address.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">true</td></tr>
</tbody>
</table>

##### Modbus Server ID configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/modbus3/id</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Modbus Server ID</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">The remote device server ID (also known as slave ID). Range: 1-255.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Default Value</td><td class="" style="text-align: left; ">1</td></tr>
</tbody>
</table>

##### Modbus Timeout configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/modbus3/timeout</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Modbus Timeout</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Allowable time to wait for a response in milliseconds. Range: 0-10000.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Default Value</td><td class="" style="text-align: left; ">2000</td></tr>
</tbody>
</table>

##### Polling Interval configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/modbus3/poll</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Polling Interval</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Defines the frequency (in seconds) in which the register will be polled and results published.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Default Value</td><td class="" style="text-align: left; ">1</td></tr>
</tbody>
</table>

##### Publish polled value configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/modbus3/publish</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Publish polled value</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Select when to publish the polled value.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Default Value</td><td class="" style="text-align: left; ">always</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Enumeration values</td><td class="" style="text-align: left; ">always</td></tr>
</tbody>
</table>

##### Modbus Function configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/modbus3/function</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Modbus Function</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Type of read function.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Default Value</td><td class="" style="text-align: left; ">coil</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Enumeration values</td><td class="" style="text-align: left; ">coil,<br>discrete_input,<br>input_register,<br>holding_register</td></tr>
</tbody>
</table>

##### Register Address configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/modbus3/address</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Register Address</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Address to read from, zero based. Range: 0-65535.</td></tr>
</tbody>
</table>

##### Modbus data type configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/modbus3/type</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Modbus data type</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Type of data being read.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Default Value</td><td class="" style="text-align: left; ">uint16</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Enumeration values</td><td class="" style="text-align: left; ">int16,<br>uint16,<br>int32,<br>uint32,<br>float32_abcd,<br>float32_badc,<br>float32_cdab,<br>float32_dcba,<br>bits</td></tr>
</tbody>
</table>

##### Mask Value configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/modbus3/mask</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Mask Value</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">16-bit bitmask to apply to read value to isolate bits. Use 65535 if masking is not required. Range: 0-65535.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Default Value</td><td class="" style="text-align: left; ">65535</td></tr>
</tbody>
</table>

##### Shift Value configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/modbus3/shift</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Shift Value</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Shifting, in bits, to right shift read value after masking. Use 0 if shifting is not required. Range: 0-15.</td></tr>
</tbody>
</table>

##### Offset Value configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/modbus3/offset</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Offset Value</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Offset applied to masked and shifted input. This represents “b” in “y = mx + b”. Use 0 if not required (float variable).</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">0.5</td></tr>
</tbody>
</table>

##### Scaling Value configuration

<table class="schemaParameterTable">
<thead>
<th>Field</th><th>Value</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Schema ID</td><td class="" style="text-align: left; ">#/properties/modbus3/scale</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Title</td><td class="" style="text-align: left; ">Scaling Value</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Scaling applied to masked and shifted input. This represents “m” in “y = mx + b”. Use 1 if not required (float variable).</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Default Value</td><td class="" style="text-align: left; ">1</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Example values</td><td class="" style="text-align: left; ">10</td></tr>
</tbody>
</table>


{{!-- END do not edit content above, it is automatically generated --}}


{{!-- New settings from the schema go here --}}
{{!-- BEGIN do not edit content below, it is automatically generated '40b06c67-b4eb-4be9-b9c2-539ac2f68dbd' --}}

 

{{!-- END do not edit content above, it is automatically generated --}}
