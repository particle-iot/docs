---
word: Connecting the Particle Device Cloud to Azure
title: Connecting the Particle Device Cloud to Azure
order: 4
columns: two
layout: workshops.hbs
---

# Chapter 3: Connecting the Particle Device Cloud to Azure

| **Project Goal**            | Connect your project to Azure and "backhaul" sensor data to the cloud. |
| --------------------------- | ---------------------------------------------------------------------- |
| **What you’ll learn**       | Piping sensor data into the Azure IoT Hub.                             |
| **Tools you’ll need**       | Particle Dev (Desktop IDE), a Particle Photon and Maker Kit            |
| **Time needed to complete** | 15 minutes                                                             |

## Setting up an Azure IoT Hub instance

1.  Sign up for an [Azure Account](https://azure.microsoft.com/en-us/get-started/), or sign in if you already have one.

![](./images/03/azureacct.png)

2.  In the dashboard, click "Create a resource." Click "Internet of Things," then "IoT Hub" at the top of the list.

![](./images/03/resourcelist.png)

3.  Create a new resource group named `workshop-group` and give the hub a name. The name must be unique across all of Azure, but you'll receive a notification if the name you selected is not unique.

![](./images/03/iothubdetails.png)

4.  Click "Review + create".

![](./images/03/reviewcreate.png)

5.  Click "Create".

![](./images/03/hubcreate.png)

6.  You'll get a notification that your IoT Hub is being deployed, which may take a few minutes. Once done, pin the hub to your dashboard.

![](./images/03/deploymentinprogress.png)

7.  Click "Go to resource" to open the hub.

![](./images/03/deploymentsucceeded.png)

8.  Click "Shared access policies". We'll create a policy to allow the Particle Device Cloud to stream events into the hub.

9.  Give the policy the name `workshop-policy`, select all four permissions, then click "Create."

![](./images/03/shared-access-policy.png)

10. Open the policy you just created and copy the "Primary key."

![](./images/03/policykey.png)

Now we can complete setting up this integration from the Particle Console.

## Setting up the Particle Integration

1.  Navigate to [console.particle.io](https://console.particle.io) and click the "Integrations" menu item.

![](./images/03/console-integrations.png)

2.  Click "New Integration."

![](./images/03/new-integration.png)

3.  Choose "Azure IoT Hub."

![](./images/03/integration-list.png)

4.  You'll see a "Setup required" notice. We've already done all the things needed here, so you can click on "I have done all these things."

![](./images/03/setup-required.png)

5.  Now we need to add an event we cant to capture, and some of the details from our event hub. For the event name, use `temp`, which is the name of the publish event we set-up in the last module. The "IoT Hub Name" should be the unique name you used earlier. The "Shared Policy Name" will be `workshop-policy` and the "Shared Policy Key" is the primary key you copied in step #10. In the Device dropdown, select the name of your Photon.

![](./images/03/integration-details.png)

6.  Save your integration and you'll be taken to the "View Integration" page.

![](./images/03/view-int.png)

7. Since we've already added the `temp` event, after a few seconds, we should be able to confirm that the integration works. Refresh the integration page and scroll down to the `Logs` section. You should see one or more entries in the list.

![](./images/03/logs.png)

8. Click on one of the logs to view the request, in detail.

![](./images/03/eventlog.png)

9. To verify that your integration worked, go back to your Azure IoT Hub and click on the "IoT Devices" menu item. If you see a single device in the list with the ID "api" you're good to go.

![](./images/03/iot-devices.png)

![](./images/03/device-in-hub.png)

## Viewing IoT Hub Events

With the event set up, everything should be piping into the Azure IoT hub. We can verify using the [iothub-explorer command line utility](https://docs.microsoft.com/en-us/azure/iot-hub/iot-hub-explorer-cloud-device-messaging?WT.mc_id=7061727469636c65).

1.  Install the iothub-explorer using the instructions [here](https://github.com/azure/iothub-explorer).

2.  Navigate to your IoT Hub in the azure portal, and return to your shared access policy, `workshop-policy`. Copy the Connection string. You'll need this to authenticate with the iothub-explorer.

![](./images/03/copy-conn-string.png)

3.  Open a terminal window and type in the following command, replacing the `<device-id>` with the ID of your Photon and pasting the Shared access policy connection string in place of `<connection-string>` after login. Make sure to leave the quotation marks in place.

```bash
iothub-explorer monitor-events <device-id> --login "<connection-string>"
```

If you've authenticated correctly, you'll see the message "Monitoring events from device `<device-id>`..."

![](./images/03/iothubexplorer-login.gif)

4.  Navigate back to the Particle console for your device and call the `readSensors` function a few more times. After a moment, you should see events streaming into the Azure IoT Hub!

![](./images/03/iothubexplorer-stream.gif)

Once you're streaming device data into the Azure IoT Hub, you can pipe the data into Azure table storage, set-up streaming analytics to transform the data, create Azure Web Apps, reports with Power BI, use Azure Machine Learning, and more!
