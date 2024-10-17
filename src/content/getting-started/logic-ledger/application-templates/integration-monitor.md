---
title: Integration monitor
columns: two
layout: commonTwo.hbs
description: Integration monitor
includeDefinitions: []
---

# {{title}}

Monitors Particle integrations for elevated error rates and alert when the error rate exceeds a threshold and
sends a notification.

One available notification is Slack:

![](/assets/images/cloud-app-templates/integration-monitor/integration-monitor-slack.png)


The [Integration Monitor Github page](https://github.com/particle-iot/cloud-app-templates/tree/main/apps/integration-monitor) 
contains the necessary code for this template.


## Prerequisites

Before you begin, ensure you have the following:

- An Organization in the Particle Cloud.
- Developer or Admin access to your organization.
- A Slack workspace, SendGrid account, or PagerDuty account for receiving notifications.

## Ledger Setup

Before configuring the Integration Monitor Logic Function, you'll need to set up two ledgers: one for the application configuration and one for the application state.

### Application Configuration Ledger

This ledger stores the configuration for the Integration Monitor, including the products to monitor and alert thresholds.

- **Name**: `integration-monitor-config-v1`
- **Type**: Cloud Ledger
- **Scope**: Owner
- **Instances Tab**: Create a new instance
- **New Ledger Instance Popup**: Click "Advanced"
- **Paste in `config.json`**: Update the `monitoredProductIds`, `alertConfig`, and `notificationConfig` fields as needed.
- **Create Instance**: Save the instance.
- **Modification**: Any changes to this ledger will be automatically picked up by the application.

### Application State Ledger

This ledger stores the state of the application, allowing it to track alert conditions over time.

- **Name**: `integration-monitor-state-v1`
- **Type**: Cloud Ledger
- **Scope**: Product
- **Instance**: Leave empty; the application will manage instances as needed.

## Logic Function Setup

The Logic function is the core of the Integration Monitor, running the monitoring and alerting logic. It requires you to create an API User to access the Particle API.

### Create an API User

- **Name**: `integration-monitor-v1`
- **Type**: Organization
- **Scopes**:
    - ledger.instances:get
    - ledger.instances:set
    - integrations:get
    - integrations:list
    - metrics.integrations:get
    - products:get

### Define the Logic Function

- **Name**: `integration-monitor-v1`
- **Type**: Scheduled Function
- **Execute Step**: Paste the provided code from GitHub.
- **API Authentication**: Enter the API username you created earlier for the application.
- **Run Code**: Execute the function and confirm successful output.
    - Show example output below
        
        ```
        Starting job() with {"context":{"functionInfo":{"ownerId":"user:5d8ec63ef4a9100000000000","logicFunctionId":"00000000-0000-0000-0000-000000000000"},"trigger":{"triggeredAt":"2024-07-18T13:27:42.455440744Z"},"scheduled":{"scheduledAt":"2024-07-18T13:27:42.455440744Z","startAt":"2024-07-18T13:27:42.455441663Z"}},"metadata":{"name":"integration-monitor","version":"1"}}
        Getting 'integration-monitor-config-v1' ledger instance
        Monitoring integrations for product 10000
        Getting 'integration-monitor-state-v1' ledger instance
        No initial state provided. Initializing to normal state.
        List integration metrics for product 10000; options=Some(IntegrationMetricsOptions { start_date: Some("2024-07-18T12:27:42.808Z"), end_date: None, bucket_size: Some(60), product_fw: None, device_os_version: None, device_group: None })
        State: normal -> normal with error rate 0.00%
        Setting 'integration-monitor-state-v1' ledger instance
        Finished successfully
        
        ```
        

### Schedule the Logic Function

- **Schedule**: Set the function to run at the desired interval (e.g., `* * * * *` for every minute).
- **Deploy**: Finalize the deployment.

## Notification Integrations

Configure how and where you want to receive alerts from the Integration Monitor.

### Slack

This is the easiest and most straightforward way to get notifications. All you need to do is grab a webhook URL from Slack and install it into a new Particle Slack integration.

1. Create a new Particle Integration
2. Select Slack
3. Select the same products you entered into the configuration json
4. Set event name to match the value in your configuration json
5. Enter your webhook url
6. Set the JSON template to `\{{{PARTICLE_EVENT_VALUE}}}`

### Sendgrid (Email)

Sendgrid has a free plan that you can use to receive email notifications, but there are caveats. The free plan can only send 100 emails a day, and a message delivered to a single recipient counts as a billable message. So if you send the notifications to a large list of recipents, it’s possible to quickly drain your free quota. 

Additionally, you may need to configure [Domain Authentication](https://www.twilio.com/docs/sendgrid/ui/account-and-settings/how-to-set-up-domain-authentication) in Sendgrid before you can send emails. You’ll need to create new DNS records to get SendGrid working. 

1. Create a new Particle Integration
2. Select Webhook
3. Select the same products you entered into the configuration json
4. Set event name to match the value in your configuration json
5. Set url to [`https://api.sendgrid.com/v3/mail/send`](https://api.sendgrid.com/v3/mail/send)
6. Set the `Authorization` header with your API key
7. Set the JSON template to `\{{{PARTICLE_EVENT_VALUE}}}`
8. Enable SendGrid in the configuration and provide the `fromEmail` and `toEmails` fields.

### PagerDuty

This is also simple to set up a PagerDuty is free for up to 5 users.

You’ll need to create a new Service in PagerDuty. Then, ou need to get the Integration Key from your PagerDuty Service, and paste it into the field called Routing Key in a Particle Integration.

1. Create a new Particle Integration
2. Select PagerDuty 
3. Select the same products you entered into the configuration json
4. Set event name to match the value in your configuration json
5. Set a Routing Key (also know as an Integration Key)
6. Use this JSON template

```json
{
    "routing_key": "\{{{PAGERDUTY_ROUTING_KEY}}}",
    "event_action": "\{{{event_action}}}",
    "payload": {
    "summary": "\{{{payload.summary}}}",
    "severity": "\{{{payload.severity}}}",
    "source": "\{{{payload.source}}}",
    "component": "\{{{payload.component}}}",
    "group": "\{{{payload.group}}}",
    "class": "\{{{payload.class}}}",
    "custom_details": {
        "error_rate": "\{{{payload.custom_details.error_rate}}}",
        "threshold": "\{{{payload.custom_details.threshold}}}",
        "duration": "\{{{payload.custom_details.duration}}}",
        "state": "\{{{payload.custom_details.state}}}",
        "impacted_integrations": "\{{{payload.custom_details.impacted_integrations}}}"
    }
    }
}
```

## Configuration

Tune these parameters in your configuration. 

They take effect right away during the next Logic Function execution.

### `alertConfig`

- **`errorRateThreshold`**: A numerical value that represents the percentage of errors needed to trigger an alert. For example, if set to `1`, an alert is triggered when 1% or more of requests fail.
- **`alertDelayMinutes`**: Specifies the number of minutes the error rate must stay above the threshold before triggering an alert. This helps prevent false positives from short-term spikes in errors.

### `notificationConfig`

Contains configuration for different notification systems (Slack, SendGrid, PagerDuty).

- **`slack`**
    - **`enabled`**: A boolean indicating if Slack notifications are active. Set to `true` to enable Slack alerts.
    - **`eventName`**: The event name that the Logic Function will publish to trigger Slack notifications. Used to map the alert to a specific event handler.
- **`sendgrid`**
    - **`enabled`**: A boolean indicating if SendGrid notifications are active. Set to `true` to send email notifications.
    - **`eventName`**: The event name that the Logic Function will publish to trigger SendGrid notifications.
    - **`fromEmail`**: The email address used as the sender for SendGrid emails.
    - **`toEmails`**: An array of recipient email addresses for SendGrid notifications.
- **`pagerduty`**
    - **`enabled`**: A boolean indicating if PagerDuty notifications are active. Set to `true` to enable PagerDuty alerts.
    - **`eventName`**: The event name that the Logic Function will publish to trigger PagerDuty notifications.

### `monitoredProductIds`

- **`monitoredProductIds`**: An array of product IDs to monitor. The application will check for integration errors in the products listed in this array.



## Testing and Debugging

### Testing Your Configuration

- **Run Manual Tests**: Manually trigger the Logic function to ensure it runs without errors and sends notifications to the configured channels.
- **Check Logs**: Review the output logs for any errors or warnings.
- **Simulate Errors**: Test with different product IDs and error rates to ensure alerts are triggered and resolved correctly. You may want to create an integration that intentionally fails very often in order to test and preview your notification.

### Debugging Issues

- **Verify Permissions**: Ensure the API user has all the necessary permissions.
- **Check Notification Setup**: Confirm that Slack, SendGrid, and PagerDuty configurations are correct.
- **Review Application Logs**: Check the logs for any errors or issues related to data retrieval or notification sending.



