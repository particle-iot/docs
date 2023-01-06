#### Claiming

Claiming a device associates the device with a user or customer. This is required for developer devices, because it allows the developer to flash code to the device, communicate with it using functions, variable, publish, and subscribe.

For products, however, claiming is optional, as explained below.

#### Product membership

Product membership, on the other hand, associates a device with a product. This allows the device to publish events to the product, and receive fleet firmware updates from the product. It's completely independent of claiming.

Claiming for product devices has a number of options:

- Unclaimed product devices are often the best option, because it eliminates the claiming step. The limitation is that unclaimed product devices cannot subscribe to events on device. They can still receive function and variable requests, but not subscribe. Tracker devices by default are unclaimed product devices.

- Claim to a single account. This option is popular with cellular products that need to subscribe to events, and legacy products that were created before unclaimed product devices were a viable alternative.

- Claim to a customer. Customer accounts are a special class of account that can be a device owner, but don't have access to the console, Web IDE, etc.. This is more common for Wi-Fi devices that have a mobile app, because it allows the mobile app to communicate directly with the device through the Particle cloud. Use of customer accounts is not required, however, and using unclaimed product devices or single account claimed devices can be done for Wi-Fi as well as cellular devices.

#### Product developers

Another pattern is that developers of a product may want to claim devices to their own account, and mark the device as a developer device in the console.

This allows the developer to easy flash code directly from Workbench, Particle CLI, or the Web IDE.

Product features like product webhooks continue to work even if the device is claimed to a team member account. 