---
word: Visualizing sensor data in the cloud
title: Visualizing sensor data in the cloud
order: 5
columns: two
layout: workshops.hbs
---

# Chapter 4: Visualizing sensor data in the cloud

| **Project Goal**            |                                 |
| --------------------------- | ------------------------------- |
| **What you’ll learn**       | Streaming data to Power BI      |
| **Tools you’ll need**       | Azure Account, Power BI Account |
| **Time needed to complete** | 30 minutes                      |

In this exercise, we're going to send data from IoT Hub to Power BI. When we do that, we'll be able to visualize our temperature data in real-time, as it comes in from the Particle Cloud.

![](./images/04/power-bi-done.png)

## Add a new Consumer Group to IoT Hub

1. In your IoT Hub, select "Endpoints" under the "Messaging" section and then click on "Events" under Built-in Endpoints.

![](./images/04/iot-hub-events.png)

2. Add a new Consumer Group. Call it "stream". Click the "Save" button at the top.

![](./images/04/new-consumer-group.png)

## Setting Up Stream Analytics

1. Create a new Stream Analytics Job in the Azure Portal

![](./images/04/new-stream-analytics.png)

2. Give it a name and put it in the same resource group as your IoT Hub. Click "Create".

![](./images/04/new-stream-analytics-settings.png)

3. Once the resource is created, you can click on the bell in the right-hand corner to access it. It's also a good idea to pin it to the dashboard at this time.

![](./images/04/go-to-resource-pin-to-dashboard.png)

4. Under the section "Job Topology", select "inputs"

![](./images/04/job-topology-inputs.png)

5. Click on "Add Stream Input" and select "IoT Hub"

![](./images/04/add-stream-input.png)

6. Name it "iothub". Select the correct IoT Hub from your subscription. Change the "Shared access policy name" to the policy you created in Chapter 3. Change the "Consumer Group" to the group you created in the first part of this chapter. Click "Save"

![](./images/04/new-input.png)

7. Under the "Job Topology" section, select "Outputs". Click the "Add" button and select "Power BI" from the dropdown list.

![](./images/04/new-output.png)

8. Name it "powerbi". You will need to authorize the Azure Portal to Power BI at this point. Once you have done that, you can use the "My Workspace" Group Workspace. Name the Dataset "Photon Data" and the table "Temperature".

![](./images/04/new-output.png)

9. Click on the "Query" option under "Job Topology". Enter the following query...

```sql
SELECT
    DEVICE_ID AS Device,
    EVENT AS Event,
    PUBLISHED_AT AS Published,
    CAST(DATA AS BIGINT) AS Temperature
INTO
    powerbi
FROM
    iothub
```

Don't forget to click "Save".

![](./images/04/alter-query.png)

10. Click on the "Overview" item and click the "Start" button to start the Stream Analytics job.

![](./images/04/overview-start-start.png)

## Create a Live Streaming Power BI Dashboard

1. Log in to Power BI at [powerbi.microsoft.com](powerbi.microsoft.com)

2. Click on the "My Workspace" section in the sidebar. Click the + button in the corner to create a new dashboard.

![](./images/04/create-dashboard.png)

3. Name the dashboard "Particle Dashboard"

![](./images/04/dashboard-name.png)

4. Click the "Add Tile" button

![](./images/04/add-tile.png)

5. Scroll down on the right-hand side and select "Custom Streaming Data". Then select "Photon Data". Click "Next".

![](./images/04/photon-dataset.png)

6. Select the "Line chart" visualisation type. For the "Axis", click "Add value" and select "published". Scroll down a little further to the next "Value" field and select "Temperature". Then click "Next".

![](./images/04/custom-streaming-tile.png)

7. Add any tile details you like and click "Apply"

![](./images/04/tile-details.png)

You should now have a line chart that will update every 10 seconds with the current temperature of your thermometer. It's still a bit hard to know exactly what the current temperature is. See if you can add another tile on your own which pulls from the streaming data set and just shows the current temperature.

![](./images/04/power-bi-done.png)
