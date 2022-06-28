---
title: How Do I Find My Device's Device OS Version
layout: commonTwo.hbs
columns: two
---

# {{{title}}}
There are a number of ways to quickly find your Particle device's Device OS version. This is often a requirement for submitting a support ticket, as it provides our Support Team critical insight into the system conditions on your device!  
  
There are two easy ways to do so, and it depends on one thing: **has your device come online after its most recent firmware flash or not?**

## The Console

If your device **has come online**, and you've been able to claim it, you can find your device's Device OS version by navigating to the /devices page of the Console - either a User account, and/or a Product page if this device belongs to a Product. For example:

**https://console.particle.io/devices** (for your User account) or

**https://console.particle.io/<PRODUCT\_ID or SLUG>/devices** (for a Product page)

Once you've done so, you can see the Device OS version on that device immediately: 

![Screen_Shot_2020-12-03_at_7.40.35_AM.png](/assets/images/support/Screen_Shot_2020-12-03_at_7.40.35_AM.png)

You can click on that page to view more information about this device (including Serial Number, ICCID, Product firmware version (for Product devices), etc....

## The CLI

If your device **has not come online** since its most recent firmware flash (or ever), you can grab your device's Device OS version by using the Particle CLI ([link](/getting-started/developer-tools/cli/)) or PuTTY/CoolTerm/Screen. You simply need to follow the instructions here ([link](/troubleshooting/guides/device-management/finding-your-device-id/)) for getting your Device ID. The payload returned back from your computer Terminal will include Device OS version in addition to other important information (Device ID, ICCID, etc...).
