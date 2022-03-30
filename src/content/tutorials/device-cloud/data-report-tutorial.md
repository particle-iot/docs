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

## Log in

To use the interactive examples in this page, you must be logged into your Particle account:

{{> sso}}


## Request a report tool

The tool below makes it easy to request a data usage report:

{{> data-operations-report}}

- You are limited to three outstanding report requests at a time.
- Generating the report can take several minutes.
- You will receive an email when the report is complete, along with a download link.

## Using curl

### Sandbox or organization

You can request a report for your free tier developer sandbox. 

If you are a growth or enterprise organization administrator, you can also request a data operations report for your whole organization. The report covers devices all devices in all organization products, however a column in the report specifies which product the device belongs to so you can filter the report results easily in a spreadsheet.


{{> sandbox-or-org}}


### Check service agreements

In order to request a report you will the service agreement ID. You can get this from the [service agreements API](/reference/device-cloud/api/#service-agreements-and-usage). You really only need to do this once as your service agreement ID will generally not change. However, the API also returns the billing period dates, so you may want to make the API call to get that information.

{{> service-agreements-curl}}

- The URL is different for sandbox vs. organization, so make sure you've selected the value from the popup above.
- The command above contains your single-sign-on token, so keep this a secret!

The curl command just returns JSON data without formatting. The "id" parameter is easy to spot, however, and that's what you need to request a report.

{{> service-agreement-id}}


### Set start and end dates

Dates in the API are always specified in YYYY-MM-DD format, with a leading zero in MM and DD if necessary. 

When you check your service agreement, you can also find the date range for the current billing period. If you've used the tool above to check your service agreement, you can probably spot the `current_billing_period_start` and `current_billing_period_end` which you may find helpful.

{{> data-report-dates}}


### Request a report

{{> data-report-request-curl}}

Once you've requested a report it can take several seconds to several minutes to generate the report. 

- There is a limit of 3 outstanding report requests at a time.
- The owner of the access token used to make the request is sent an email when the report is complete with a download link.

If you want to check the report status with code (as opposed to waiting for an email), note the "id" (report ID) in the response as you'll need it in the next step.

### Check the report status

Optionally, you can check the status of your report using an API. This is most common when scripting the operation. You will receive an email when the report is complete regardless of whether you query the status or not.

The report status response also includes the URL to download the actual CSV report.

{{> data-report-status-curl}}

- There will be `data.attributes.status` will be `pending` while the report is being generated.
- The `data.attributes.download_url` will be `null` until the report is available, at which point it will be a string containing a full URL to the download.
- Limit the rate of polling. For example, you might want to wait 15 seconds, then 30, then 60 seconds and then poll once a minute.

### Download a report csv

Optionally, you can download your report CSV from curl or from a script. Of course you can also just download the link in a browser. Reports are only downloadable for 7 days, after that they are deleted and no longer downloadable.

The URLs are not guessable or iterable, however you should keep the download URLs secret as having the URL will provide access to the report that includes all of the Device IDs in your account or organization.

{{> data-report-download-curl}}

Note: The **Execute Command** button may not work from a browser. An upcoming change will fix the access controls to make this possible. **Download File** works fine from a browser.

### Get an access token

The examples below embed your single sign-on access token. If you want to create an access token, you can use the techniques below.

#### CLI particle token create

The most common create an access token is to use the Particle CLI [`particle token create`](/reference/developer-tools/cli/#particle-token-create) command. 

```
particle token create
```

Be sure to keep this token secure, because it allows access to your account and all of your devices. By default, the token will expire in 90 days and will need to be issued again. You can make a non-expiring token by using:

```
particle token create --never-expires
```

#### Create a token (browser-based)

You can also create a token using this web-browser control. This creates a token for your account, which can access all devices in your sandbox as well as products and organizations you have access to. Be careful with this token! The username, password, and MFA OTP token (if required) are necessary to create a new token.

{{> cloud-api-create-token-simple}}

Copy and paste the token out of the Access Token field to use in locations where you need an access token. (The password is sent using a Particle Cloud API call using Javascript and TLS/SSL encryption.)


## Scripting using node.js

It's also possible to script the download process using node.js.

You can change whether to pull a sandbox or organization data operations report by editing the config.js file, but the initial state of the file will be set from this control:

{{> sandbox-or-org}}

{{> project-browser project="node-data-report" default-file="app.js"}}

If you are using the Chrome or Edge browser on Windows, Mac, or Linux you can open the node.js project in your browser, edit, and run it with no software install required using the **Try It** button.
