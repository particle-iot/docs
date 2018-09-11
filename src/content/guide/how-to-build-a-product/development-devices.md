---
title: Development Devices
columns: two
layout: guide.hbs
order: 11
---

# {{title}}

As a firmware engineer building a Particle product, it is important that
you can rapidly iterate on new device firmwares, while still simulating
the behaviors of production devices deployed in the
field. Development devices allow you to do just this.

**Development devices** ( <i class="im-development-device-icon"></i> )
are special kinds of product devices marked specifically
for internal testing, separate from the production fleet.
Development devices are prevented from receiving any
automatic product firmware updates from the Particle cloud. These devices will ignore both
released product firmware as well as any firmware version it has been
locked to run.

This allows you to freely flash new firmware to these devices from the
development tool of your choice (i.e. the <a href="https://build.particle.io" target="_blank">Web IDE</a>, <a href="https://www.particle.io/products/development-tools/particle-desktop-ide" target="_blank">Local IDE</a>, or the <a href="https://github.com/particle-iot/particle-cli">CLI</a>),
without having it immediately overwritten by the Particle cloud. These
devices will continue to maintain [product
privileges](/guide/how-to-build-a-product/security/#product-privileges),
allowing you the flexibility to experiment with new firmwares while
still simulating behaviors of deployed devices in the production fleet.

## Marking a development device

You can mark a device as a development device from the <a
href="https://console.particle.io" target="_blank">Console</a>. When
viewing your product's Devices view ( <i class="im-devices-icon"></i> ),
mark a development device by clicking the `...` icon and finding the
"Mark development device" link as shown below:

<img
src="/assets/images/development-devices/mark-development-device.png"
alt="Mark development device" class="small"/>

Once you mark a device as a development device, you will see it marked
with the <i class="im-development-device-icon"></i> icon in the
"Firmware" column:

<img
src="/assets/images/development-devices/development-device.png"
alt="Mark development device"/>

This illustrates that the device is no longer targeted for product
firmware releases. You are now free to begin flashing the device from
the <a href="https://build.particle.io" target="_blank">Web IDE</a>, or
whatever your preferred tool is for sending firmware to Particle devices.

*Quick tip*: You can sort by firmware version on this page to quickly
find all of your development devices. When sorting in descending order,
development devices will appear at the top of your device list.

*Quick tip*: If you prefer, you can also [call the Particle
API](/reference/api/#mark-product-development-device) directly to mark a device as a
development device.


## Unmarking a development device

If you would like to return a device to the pool of eligible product devices
to receive automatic firmware updates, you can unmark it as a development
device. Non-development devices will be targeted to receive released
product firmware or any firmware version it has been locked to run.

This is useful if a device is no longer being used for active firmware
development, and you would like it to behave just like any other device in
the product fleet.

From the Console, you can find the "Unmark development device" link by
clicking the `...` icon from the Devices view:

<img
src="/assets/images/development-devices/unmark-development-device.png"
alt="Unmark development device" class="small"/>

You should see the development device icon disappear from the "Firmware"
coulumn for this device once it has been successfully unmarked as a
development device. Note that **unmarking a device as a development device may trigger an
immediate over-the-air update**. This happens to return the
device to its targeted version of product firmware.

*Quick tip*: If you prefer, you can also [call the Particle
API](/reference/api/#unmark-product-development-device) directly to unmark a device as a
development device.
