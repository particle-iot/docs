---
title: Device Groups
columns: two
layout: guide.hbs
order: 12
---

# {{title}} <sub style="color: #777;font-size:18px; bottom: 0;">beta</sub>

Device groups allow you to define subsets of your IoT deployment that can
be addressed separately from the rest of the fleet. Groups provide the flexibility
and granularity you need to manage a connected product at scale. This
feature is currently available in beta to customers on an Enterprise
plan. If you would like access to this feature, please <a
href="https://www.particle.io/sales" target="_blank">contact us</a>.

![Device
Groups](/assets/images/device-groups/device-groups-overview.jpg)
<p class="caption">Assign devices to groups for more granular control of
your IoT deployment</p>

Segmenting devices into groups allows you to manage an IoT fleet with
more specificity,
like the ability to [rollout firmware by group](#firmware-release-by-group). As an example,
a business serving customers around the world can now target devices to run a different
version of firmware depending on the local country's native language.

Stay tuned as we add more ways to leverage device groups in your product.

## Creating Device Groups

In order to get the benefits of device segmentation, you will first need
to create a group.

A group is scoped to a Particle product, and can be applied to any number of devices in the
fleet. A group can be created using the
<a href="https://console.particle.io"
target="_blank">Particle Console</a>. Visit your product's devices view
(<i class="im-devices-icon"></i>) and click the "New Group" button:

![New group button](/assets/images/device-groups/new-group-btn.png)

<p class="caption">You will find the 'New Group' button on your
product's devices page. Note that this button will only be enabled if
you are on an Enterprise plan. <a href="https://www.particle.io/sales"
target="_blank">Contact us</a> for access to this feature.</p>

After clicking this button, the _New Device Group_ modal will appear:

![New group modal](/assets/images/device-groups/new-device-group.png)

Give your group a unique name that allows you to quickly identify its
purpose. You can optionally provide a description and a thumbnail color.
Some examples of groups you may wish to create:

- **Prerelease Group**: Target this subset of devices to receive
"bleeding-edge" firmwares for early testing. This can help you get user
feedback and/or identify potential firmware bugs before releasing to the rest of the fleet.
- **Group by Geographic Region**: Devices that are deployed in various
parts of the world may need to be addressed differently. Segment device
behavior, or run different versions of firmware.
- **Group by Permissions**: You may have distributors, service partners,
or customers that need access to certain device groups.

_Quick tip_: If you prefer, you can also [call the Particle API](!insert
group link) directly to create a device group.

## Tagging Devices to Groups

Now that you have created your group(s), you'll need to tag devices
in your fleet to a group. Note that **a device can belong to multiple
groups**, as you will likely need to segment your fleet
along many different axes.

To assign a single device to a group, click on it from your product's
devices view (<i class="im-devices-icon"></i>). Then, click the **+ Add
groups** button as shown in the device header:

<img class="full-width" alt="Tag device to group" src="/assets/images/device-groups/tag-device-to-group.png"/>

The page will enter into an edit mode. Apply groups to the device
using the dropdown, and click the **Done** button to save. You can tag
devices with existing groups, or create a new group and apply it to the
device. You can come back here and click the **Edit** button on a device
to update its group memberships at any time.

You can also assign many devices to a group at the same time. If you
have grouping enabled for your product, you should see checkboxes next
to each approved device visible on your product's device view. Select
some devices, and click the **Edit groups** button that appears:

<img class="full-width" alt="Batch edit groups"
src="/assets/images/device-groups/batch-edit-groups.png"/>

You will then be presented with a modal that will allow you to batch
update groups of the selected devices. **Note that editing groups for a
device may result in the device being targeted for an OTA firmware
update**, due to product firmware releases by group.

_Quick tip_: If you prefer, you can also [call the Particle API](!insert
group link) directly to tag a device to a group.

_Quick tip_: After tagging devices with groups, you can use the Console
or the [Particle API](!insert link) to filter product devices by group.

## Firmware Release by Group

With devices segmented into groups, it is now possible to gain more
control and flexibility over the firmware release process. If you are
unfamiliar with how to rollout firmware to a product fleet, please check
out the [Particle Console
Guide](/guide/tools-and-features/console/#rollout-firmware) before
continuing.

### Firmware Precedence Rules

You can release a product firmware to one or more groups, or choose to
make it the product default. Devices in your fleet will be targeted to
receive a version of product firmware according to these precedence
rules:

- A device that has been **individually locked** to a version of product
firmware is respected above all else, and will not be overwritten by any
released firmwares.

- If unlocked, devices **belonging to a group** will receive the
corresponding group's released firmware (if a firmware has been released
to the group). When a device belongs to multiple groups that each have
released firmware, the _highest firmware version_ will be preferred

- If a device is unlocked and **does not belong to any groups** with
released firmware, it will receive the product's default released
firmware (if a firmware has been released as the product default)

- If none of the above conditions result in a device being targeted for
a product firmware, it will not receive an automatic OTA update from the
Particle cloud

### Example Release Process

Let's walk through a real-life example of how you could utilize
releasing product firmware by group. Imagine you have a fleet of 5,000
internet-connected widgets in the field. They are all currently running
version 1 of your product firmware.

After some initial feedback from end-users, you and your engineering
team add a few impressive new features. You upload this new version of
firmware to your product:

<img class="full-width" alt="The new flashy firmware" src="/assets/images/device-groups/release-firmware-1.png"/>

You've tested out the firmware on a few of your internal development
devices, and are ready to roll it out to devices in the field. However,
you still aren't completely certain how this new code will perform in
the wild and would like to mitigate risk as much as possible.

Luckily, you've defined a `prerelease` group. This group contains 15
devices belonging to customers that have opted-in to receiving
bleeding-edge firmware
