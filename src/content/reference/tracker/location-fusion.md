---
title: Location fusion
columns: two
layout: commonTwo.hbs
description: Particle Tracker Wi-Fi and Cellular Geolocation
---

# {{title}}

The Particle Tracker provides three methods of geolocation:

- GNSS (GPS) is the primary method of geolocation, and uses a set of satellites to accurately obtain position and elevation information, up to 1.8 meter precision.
- Wi-Fi geolocation uses nearby Wi-Fi access points to determine location. This is especially helpful indoors and outdoors in "urban canyons" in downtown areas where building block views of the GNSS satellites, but there are many nearby Wi-Fi networks.
- Cell tower location uses a database of cellular tower identifiers to locate the tower you are connected to. This has the lowest resolution.

The last two are used in the location fusion feature, new in Device OS 3.0 and Tracker Edge v12. A geolocation service is used by the Particle cloud to provide these additional location services when the GNSS does not have a good location available. The geolocation service is included with your Tracker, and you only need to have it enabled to use it; there is no additional charge and no need to sign up for additional services.

Wi-Fi geolocation does not connect to the Wi-Fi access points. Most access points are configured to periodically broadcast their presence to make it easy for Wi-Fi devices to connect. This public broadcast is used in combination with the geolocation service to provide an approximate location. Not all Wi-Fi access points are in the database.

- The settings are in the [location tab](/getting-started/console/console/#location-settings) of the fleet settings or device settings.

- Enhanced location events are described in the [asset tracking events references](/reference/cloud-apis/api/#enhanced-location-events).

- Handing enhanced location events from device firmware is in the [Tracker Edge reference](/firmware/tracker-edge/tracker-edge-api-reference/#regenhancedloccallback-trackerlocation).

The best-case and worse-case resolution of the various technologies is:

| Technology | Best-Case | Worst-Case | 
| :--- | :--- | :--- |
| GNSS | 1.8 meters | 500 meters |
| Wi-Fi | 24 meters |  | 
| Cellular Tower | 123 meters | 10 kilometers |

The theoretical worst-case GNSS precision, based on visibility of a minimum number of satellites, combined with multi-path interference is 100 kilometers. Practically speaking, when there is a GNSS lock, the reported location is generally within 500 meters (1640 feet, or 1/3 of a mile) of the actual location, and often within 10 meters.

## Enabling location services

Geolocation services are only available to devices in a product. Additionally, you must enable location services in the Settings (gear) icon for the product.

![Location](/assets/images/console/enable-location.png)


## On non-Tracker devices

{{!-- BEGIN shared-blurb c4c1c0b6-028c-47fa-a13d-4b14452f096f --}}
On some plans, it is possible to use the `loc` event on non-Tracker devices. See [getting started with location](/getting-started/cloud/location/).

This might be done if you have a device with GNSS in the cellular modem (such as the M-SoM and B504), or if you have added an external hardware GNSS to your project.

The [LocationFusionRK](https://github.com/rickkas7/LocationFusionRK) can be used to provide Tracker-like location services non-Tracker devices.
{{!-- END shared-blurb --}}
