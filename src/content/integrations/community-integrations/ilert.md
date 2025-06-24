---
title: ilert
columns: two
layout: commonTwo.hbs
description: ulert incident management
---

# {{title}}

[ilert](https://eu1.hubs.ly/H062_XF0) is an AI-first company offering an all-in-one incident management tool for alerting, on-call management, and incident communication to help companies increase their digital uptime. B2C and B2B companies from across the globe, including well-known brands such as IKEA, Lufthansa Systems, and NTT Data, trust ilert to empower their operations teams and ensure everything is running smoothly.

The ilert integration for Particle enables users to receive alerts from devices and notify engineers by multiple channels, be it phone calls, push notifications, 
SMS, etc. Use alert templates to enrich alerts with all vital information to help your team react quicker.

![ilert particle](/assets/images/integrations/ilert/ilert_particle.png)

## In ilert: Create a Particle alert source

1. Go to **Alert sources** -> **Alert sources** and click on **Create new alert source**

{{imageOverlay src="/assets/images/integrations/ilert/ilert_particle_1.png"}}

2. Search for **Particle** in the search field, click on the Particle tile and click on **Next**.

{{imageOverlay src="/assets/images/integrations/ilert/ilert_particle_2.png"}}

3. Give your alert source a name, optionally assign teams and click **Next**.
4. Select an **escalation policy** by creating a new one or assigning an existing one.

{{imageOverlay src="/assets/images/integrations/ilert/ilert_particle_3.png"}}

5. Select you Alert grouping preference and click **Continue setup**. You may click **Do not group alerts** for now and change it later.

{{imageOverlay src="/assets/images/integrations/ilert/ilert_particle_4.png"}}

6. The next page show additional settings such as customer alert templates or notification prioritiy. Click on **Finish setup** for now.
7. On the final page, an API key and / or webhook URL will be generated that you will need later in this guide.

{{imageOverlay src="/assets/images/integrations/ilert/ilert_particle_5.png"}}

## In Particle: Create a Webhook

1. In the sidebar click on **Integrations**.

{{imageOverlay src="/assets/images/integrations/ilert/particle_ilert_1.png"}}

2. Now click on **ADD NEW INTEGRATION**.

{{imageOverlay src="/assets/images/integrations/ilert/particle_ilert_2.png"}}

3. Click on **Webhook**, to create a new webhook integration.

{{imageOverlay src="/assets/images/integrations/ilert/particle_ilert_3.png"}}

4. Enter a **Name**, an **Event Name**(ALERT or RESOLVE) and the previous generated ilert webhook URL into the **URL** field.
5. Change the **Request Type** to **POST** and open the **Advanced Settings**.

For alert:
{{imageOverlay src="/assets/images/integrations/ilert/particle_ilert_4.png"}}

For resolve:
{{imageOverlay src="/assets/images/integrations/ilert/particle_ilert_5.png"}}

6. Select **Default**. (for custom json data follow this step)

{{imageOverlay src="/assets/images/integrations/ilert/particle_ilert_6.png"}}

7. Click on **SAVE**.
8. Optional: Click on **TEST** to test the integration.

{{imageOverlay src="/assets/images/integrations/ilert/particle_ilert_7.png"}}


## Custom Webhooks

### In Particle: Custom json data

1. Under Advanced Settings choose **Custom** for **JSON DATA**.
2. Create a template using the [Particle documentation](/reference/cloud-apis/webhooks/). It is also possible to add own customized values.

{{imageOverlay src="/assets/images/integrations/ilert/particle_ilert_8.png"}}

### In ilert: Create a custom template

1. Go to the alert source edit view.
2. Under **Alert template** enable **Alert summary** and **Alert details**.
3. For a detailed guide on how to use our alert templating click [here](https://eu1.hubs.ly/H06300b0).
4. Use the payload keys created in Particle to create the alert template.

{{imageOverlay src="/assets/images/integrations/ilert/particle_ilert_9.png"}}


