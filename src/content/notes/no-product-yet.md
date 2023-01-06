If all of your devices are still in the developer sandbox, there are a few steps you will need to do before migration. The [creating a product guide](/getting-started/products/creating-a-product/) can help with this.

- You will need to adjust your workflow to include uploading product firmware releases and releasing them to your fleet. In the unusual situation where each device in your product has its own unique firmware, you can use the **Mark as Development Device** to allow each device to have its own firmware that you flash manually instead of using fleet firmware.

- You will need to add devices to your product. For cellular devices, also their SIM cards. The [Move devices into a product](https://github.com/particle-iot/node-example-device-move) script can simplify this process.

- You may or may not want to change device claiming. See [device claiming](/getting-started/products/creating-a-product/#device-claiming) in the creating a product guide.

- If you are using integrations such as webhooks, you may want to move your integrations into your product, see [integrations](/getting-started/products/creating-a-product/#integrations), in the creating a product guide.

- Cloud API endpoints are different for developer devices vs. product devices. If you are using the cloud API to access devices, changes will be necessary.

- If you have created oAuth tokens for your developer account you will need to generate new product-specific oAuth tokens for use with your product.
