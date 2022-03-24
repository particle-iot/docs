---
title: Data operations reports
layout: commonTwo.hbs
description: Data operations report tutorial
includeDefinitions: [api-helper, api-helper-extras, api-helper-cloud, api-helper-projects, chart, stackblitz, zip]
---

# {{title}}

This tutorial shows how to use the Particle Cloud API to retrieve data operations usage reports. 

{{!-- BEGIN shared-blurb a7c0e9bc-9ba8-11ec-b909-0242ac120002 --}}
The central billing element for both cellular and Wi-Fi is the Data Operation:

- Each publish, subscribe, function, or variable consumes one Data Operation regardless of size
- The data has a maximum size of 622 to 1024 bytes of UTF-8 characters; see [API Field Limits](/cards/firmware/cloud-functions/overview-of-api-field-limits/)
- Stored data, such as Tracker geolocation data, consume one Data Operation per location point saved<sup>1</sup>
- Certain retransmissions, as described below

The following do **not** count against your Data Operations limit:

- Over-the-air firmware updates do not count against your Data Operations limit
- Internal events such as device vitals (beginning with "particle" or "spark") do not count against your Data Operations limit
- Acknowledgements, session negotiation, keep-alives etc. do not count against your Data Operations limit
- Webhooks and server-sent-events (SSE) themselves do not count against your Data Operations limit, but the triggering event or response could
- Particle cloud API calls do not count against your Data Operations limit

<sup>1</sup>You will receive warnings by email, and as a pop-up and in the [**Billing & Usage**](https://console.particle.io/billing) tab in the console at 70%, 90%, and 100% of the allowable data operations. In the Free Plan you will have an opportunity to upgrade to the Growth Plan. In the Growth Plan, additional blocks can be added to allow for more data operations.
{{!-- END shared-blurb --}}

## Request a report tool

The tool below makes it easy to request a data usage report:

{{> sso}}

{{> data-operations-report}}

- You are limited to three outstanding report requests at a time
- Generating the report can take several minutes
- You will receive an email when the report is complete, along with a download link

## Using curl

### Get an access token

The most common create an access token is to use the Particle CLI [`particle token create`](/reference/developer-tools/cli/#particle-token-create) command. 

```
particle token create
```

Be sure to keep this token secure, because it allows access to your account and all of your devices. By default, the token will expire in 90 days and will need to be issued again. You can make a non-expiring token by using:

```
particle token create --never-expires
```

### Sandbox or organization

You can request a report for your free tier developer sandbox. 

If you are a growth or enterprise organization administrator, you can also request a data operations report for your whole organization. The report covers devices all devices in all organization products, however a column in the report specifies which product the device belongs to so you can filter the report results easily in a spreadsheet.


{{> sandbox-or-org}}


### Check service agreements

In order to request a report you will the service agreement ID. You can get this from the [service agreements API](/reference/device-cloud/api/#service-agreements-and-usage). You really only need to do this once as your service agreement ID will generally not change. However, the API also returns the billing period dates, so you may want to make the API call to get that information.

{{> service-agreements-curl}}

Note that the URL is different for sandbox vs. organization, so make sure you've selected the value from the popup above.

The result from the command is JSON formatted, but the curl command just returns it without formatting. The "id" parameter is easy to spot, however, and that's what you need to request a report.

{{> service-agreement-id}}


### Set start and end dates

Dates in the API are always specified in YYYY-MM-DD format, with a leading zero in MM and DD if necessary. 

When you check your service agreement, you can also find the date range for the current billing period. If you've used the tool above to check your service agreement, you can probably spot the `current_billing_period_start` and `current_billing_period_end` which you may find helpful.

{{> data-report-dates}}


### Request a report

{{> data-report-request-curl}}

Once you've requested a report it can take several seconds to several minutes to generate the report. 

- There is a limit of 3 outstanding report requests at a time
- The owner of the access token used to make the request is sent an email when the report is complete with a download link

If you want to check the report status with code (as opposed to waiting for an email), note the "id" (report ID) in the response as you'll need it in the next step.

### Check the report status

Optionally, you can check the status of your report using an API. This is most common when scripting the operation. You will receive an email when the report is complete regardless of whether you query the status or not.

The report status response also includes the URL to download the actual CSV report.

{{> data-report-status-curl}}


### Download a report csv

Optionally, you can download your report CSV from curl or from a script. Of course you can also just download the link in a browser. Reports are only downloadable for 7 days, after that they are deleted and no longer downloadable.

The URLs are not guessable or iterable, however you should keep the download URLs secret as having the URL will provide access to the report that includes all of the Device IDs in your account or organization.

{{> data-report-download-curl}}

## Scripting using node.js

It's also possible to

You can change whether to pull a sandbox or organization data operations report by editing the config.js file, but the initial state of the file will be set from this control:

{{> sandbox-or-org}}

{{> project-browser project="node-data-report" default-file="app.js"}}

If you are using the Chrome browser on Windows, Mac, or Linux you can open the node.js project in your browser, edit, and run it with no software install required using the **Open in Browser** button.