#### Claiming

Claiming a device associates the device with a user or customer. This is required for developer devices, because it allows the developer to flash code to the device, communicate with it using functions, variable, publish, and subscribe.

For products, however, claiming is optional, as explained below.

#### Product membership

Product membership, on the other hand, associates a device with a product. This allows the device to publish events to the product, and receive fleet firmware updates from the product. It's completely independent of claiming.

Claiming for product devices has a number of options:

- Unclaimed product devices are often the best option, because it eliminates the claiming step.

- Claim to a single account. This option was previously popular with cellular products, and legacy products that were created before unclaimed product devices were a viable alternative.

- Claim to a customer. Customer accounts are a special class of account that can be a device owner, but don't have access to the console, Web IDE, etc.. This is more common for Wi-Fi devices that have a mobile app, because it allows the mobile app to communicate directly with the device through the Particle cloud. Use of customer accounts is not required, however, and using unclaimed product devices or single account claimed devices can be done for Wi-Fi as well as cellular devices.

{{!-- BEGIN shared-blurb 04d55e8d-8af5-4d4b-b6a4-d4db886c669d --}}
- Prior to March 2023, claiming was required if the device firmware subscribed to events on-device. This is no longer necessary.
- You still need to claim a device is if you are using a webhook in the sandbox of the user who claimed the device. It is recommended that you use product webhooks instead, which do not require claiming.
- If you are using a device with Mark as Development device, you may want to claim the device to your account so you can easily OTA flash it from Particle Workbench or other development environments.
- If you previously had firmware that subscribed to events but was the device was unclaimed, the events previously disappeared. This is no longer the case and the device will now start receiving those events, and each event will count as a data operation.
- Claiming is still allowed, if you prefer to continue to use claiming.
{{!-- END shared-blurb --}}

#### Product developers

Another pattern is that developers of a product may want to claim devices to their own account, and mark the device as a developer device in the console.

This allows the developer to easy flash code directly from Workbench, Particle CLI, or the Web IDE.

Product features like product webhooks continue to work even if the device is claimed to a team member account. 