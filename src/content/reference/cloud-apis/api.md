---
title: Cloud API reference
layout: api.hbs
columns: three
description: Control and manage Particle IoT devices from the Internet with a REST API
---

{{!--
  The Cloud API documentation is auto-generated from an internal repository.
  To make a change, please open a GitHub issue with your change and
  someone from Particle will be happy to merge it in for you!
--}}

# {{title}}

The Particle Device Cloud API is a [REST](http://en.wikipedia.org/wiki/Representational_State_Transfer) API.
REST means a lot of things, but first and foremost it means that we use the URL in the way that it's intended:
as a "Uniform Resource Locator".

In this case, the unique "resource" in question is your device (Argon, Boron, Photon 2).
Every device has a URL, which can be used to `GET` variables, `POST` a function call, or `PUT` new firmware.
The variables and functions that you have written in your firmware are exposed as *subresources* under the device.

All requests to the API server require TLSv1.2 or later.

```
PROTOCOL AND HOST
"https://api.particle.io"
```

*Formatting note:* When we write something prefixed with a colon `:`, we mean you should substitute your own information.
For example when you see something like `/v1/devices/:deviceId`
you might code something like `/v1/devices/55ff8800beefcafe12345678`.

![Product ID or slug](/assets/images/productIdOrSlug.png)

For product endpoints, you need to specify which product the API call targets. You can use either the product ID or the short alphanumerical product slug. Get either from the Console. In this example, the product ID is 1337 and the product slug is `my-product-v1`.

## Format

The Particle API accepts requests in [JSON](https://www.w3schools.com/js/js_json_intro.asp) (content type `application/json`) and in [form encoded format](https://en.wikipedia.org/wiki/POST_(HTTP%29) (content type `application/x-www-form-urlencoded`). It always replies with JSON (content type `application/json`).

```bash
# Example with form encoded format
curl https://api.particle.io/v1/devices/mydevice/wakeup \
     -d arg=please \
     -H "Authorization: Bearer :access_token"

# Same example with JSON
curl https://api.particle.io/v1/devices/mydevice/wakeup \
     -H "Authorization: Bearer :access_token" \
     -H "Content-Type: application/json" \
     -d "{\"arg\": \"please\"}"
```

In these docs, you'll see example calls written using a terminal program called [curl](https://curl.haxx.se/) which may already be available on your machine.

The examples use form encoded data to make them easier to read and type but unless specified otherwise any endpoint can also accept a JSON object with the parameters as properties.

## Postman

In addition to using curl, you can use [Postman](https://www.postman.com/) a 3rd-party product that provides a web-based graphical interface for making API calls.

To making using Postman significantly easier, download these two files:

- [Particle API](/assets/files/particle_api.postman_collection.json)
- [Particle API Environment](/assets/files/particle_api.postman_environment.json)

Use the **Import** feature to import these two files into Postman. The Particle API file will be updated periodically as new APIs are added, but the environment file is intended to be imported only once and then updated with your settings, like your Particle account username.

{{imageOverlay src="/assets/images/postman/import.png" alt="Import"}}

Once you've imported the Particle Postman Environment you can select it from the popup in the upper right corner of the Postman workspace window.

{{imageOverlay src="/assets/images/postman/set-environment.png" alt="Set Environment"}}


### Authenticating with Postman

Using a quickly expiring access token is a good way to maintain security when using Postman. You can easily do this using the [Particle CLI](/reference/developer-tools/cli/#particle-token-create).

The parameter is the number of seconds, so 3600 is one hour. If you leave off the `--expires-in` option, the token will be good for 90 days. You can also create a non-expiring token.

`
particle token create --expires-in 3600
`

- To use this token, select **Particle API Environment** in the upper right corner of the Postman workspace  (1). 

- Click the eye icon next to it to view the configuration (2).

- Paste in the access token in the `access_token` field (3).

{{imageOverlay src="/assets/images/postman/access-token.png" alt="Access Token" }}


It's also possible to enter your username and password in the Postman environment, and also possible to generate the token from within Postman itself. However, these techniques are hard to use if you have multi-factor authentication (MFA) enabled on your Particle account. The CLI and `access_token` technique above works both with and without MFA enabled.

### Example: List devices

A good way to test out your access token is use **List devices**.

- Open **Collections** then **Particle API** then **Devices** then **List devices**.

- If you've entered the access_token in the previous step, there should be a small green circle on the **Authorization** tab.

- Click the blue **Send** button.

{{imageOverlay src="/assets/images/postman/list-devices.png" alt="List Devices" }}


You should get output with information about your devices in the bottom pane.

{{imageOverlay src="/assets/images/postman/list-output.png" alt="List Output" }}


### Example: Calling a function

- Open **Collections** then **Particle API** then **Devices** then **Call a function**.

- In the **Params** tab, enter the device ID you want to call in **deviceid** and the function name in **functionName**. 
In this case, we're using the Blink and LED firmware on the device, so it will respond to the **led** function.

{{imageOverlay src="/assets/images/postman/function-name.png" alt="Function Name" }}


- You don't need to enter anything in the **Authorization** tab, but this is how the data gets from the Environment into the API call.

{{imageOverlay src="/assets/images/postman/authorization.png" alt="Authorization" }}

- In this example, we're passing the value **on** in the **arg** parameter. This turns on the blue D7 LED on the device with the Blink and LED firmware.

{{imageOverlay src="/assets/images/postman/call-function-body.png" alt="Call function" }}

- Click **Send**. It will also show some output in the bottom pane if the device is online and is running the appropriate firmware.


## Authentication

Just because you've connected your Particle device to the internet doesn't mean anyone else should have access to it.
Permissions for controlling and communicating with your Particle device are managed with OAuth2.

```bash
# You type in your terminal
curl https://api.particle.io/v1/devices/0123456789abcdef01234567/brew \
     -H "Authorization: Bearer 9876987698769876987698769876987698769876"
# Response status is 200 OK, which means
# the device says, "Yes ma'am!"

# Sneaky Pete tries the same thing in his terminal
curl https://api.particle.io/v1/devices/0123456789abcdef01234567/brew \
     -H "Authorization: Bearer 1234123412341234123412341234123412341234"
# Response status is 403 Forbidden, which means
# the device says, "You ain't the boss of me."

# LESSON: Protect your access token.
```

You can create an access token using [the Particle CLI](/reference/developer-tools/cli/#particle-token-create).

When you connect your Particle device to the Cloud for the first time, it will be associated with your account,
and only you will have permission to control your Particle device—using your access token.



### How to send your access token

There are three ways to send your access token in a request.

* In an HTTP Authorization header (always works)
* **Deprecated**: In the URL query string (only works with GET requests)
* **Deprecated**: In the request body (only works for POST and PUT when body is form encoded)

---

To send a custom header using curl, use you the `-H` flag.
The access token is called a "Bearer" token and goes in the standard
HTTP `Authorization` header.

``` bash
curl -H "Authorization: Bearer 38bb7b318cc6898c80317decb34525844bc9db55" \
  https://...
```

---

Sending the access token in the query string is **deprecated and discouraged for new application**
since many tools log query strings so there's a chance for your access token to be logged in places
where you don't expect it. Legacy applications sending `access_token=38bb...` in the query string
should be updated to use the HTTP Authorization header. When using a query string in the terminal,
enclose the entire URL in double quotes to avoid issues with special characters.

``` bash
curl "https://api.particle.io/v1/devices?access_token=38bb7b318cc6898c80317decb34525844bc9db55"
```

---

Sending the access token as part of the request body is **deprecated** since it only works for POST
and PUT requests. Prefer using the HTTP Authorization header since it works for all request types.

``` bash
curl -d access_token=38bb7b318cc6898c80317decb34525844bc9db55 \
  https://...
```


{{> api group=apiGroups.Authentication}}

## OAuth clients

An OAuth client generally represents an app.
The Particle CLI is a client, as are the Particle Web IDE, the Particle iOS app, and
the Particle Android app. You too can create your own clients.
You should create separate clients for each of your web and mobile apps that hit
the Particle API.

Some requests, like generating an access token, require you to specify an OAuth
client ID and secret using HTTP Basic authentication. Normally, when calling the
Particle API as a single developer user to access your own account, you can use
`particle` for both the client ID and secret as in the example above for
generating an access token.

```bash
curl -u particle:particle https://...
```

However, especially when you are *creating a product* on the Particle platform
and your web app needs to hit our API on behalf of your customers, you need to
create your own client.

*NEVER expose the client secret to a browser.*
If, for example, you have a client that controls all your organization's
products, and you use the client secret in front-end JavaScript, then a
tech-savvy customer using your website can read the secret in her developer
console and hack all your customers' devices.

{{> api group=apiGroups.OAuth}}

## Errors

The Particle Device Cloud uses traditional HTTP response codes to provide feedback from the device regarding the validity
of the request and its success or failure. As with other HTTP resources, response codes in the 200 range
indicate success; codes in the 400 range indicate failure due to the information provided;
codes in the 500 range indicate failure within Particle's server infrastructure.

```html
200 OK - API call successfully delivered to the device and executed.

400 Bad Request - Your request is not understood by the device, or the requested subresource (variable/function) has not been exposed.

401 Unauthorized - Your access token is not valid.

403 Forbidden - Your access token is not authorized to interface with this device.

404 Not Found - The device you requested is not currently connected to the cloud.

408 Timed Out - The cloud experienced a significant delay when trying to reach the device.

429 Too Many Requests - You are either making requests too often or too many at the same time. Please slow down.

500 Server errors - Fail whale. Something's wrong on our end.
```

## API users

An API user account is a specific type of user account in the Particle platform that is designed to replace using 'human' accounts for programmatic tasks. It allows the creation of tightly scoped users that are unable to do things that machines shouldn't need to do - like log into the console, or administer accounts. This allows you to better enforce the security principle of least privilege.

### Overview - API users

- An API user can be scoped to an organization or a product.
- An API user can only have one valid access token associated with it at any one time.
- If an API user's privileges change - the associated access token will change as well, to prevent scope creep.

Currently, API users are created, updated and deleted via the REST API, and are visible in the console, in either the product team or organization view.
API users cannot log into the console, administer users, receive emails - or generally do other things that are reserved for humans.

The [API User Tutorial](/getting-started/cloud/cloud-api/#api-users) has interactive controls in the web page that allow you to easily create, list, and delete API users for products and organizations. These controls allow you to both easily perform these operations on your account, and also learn how the APIs work, without needing to use curl or Postman.

### Creating an API user

Use an access token with permission to create users in your organization or product (administrator account).
Pass a request to the relevant endpoint with a friendly name, and the desired scope(s) for the user.

---

#### Create an API user scoped to an organization

```
curl https://api.particle.io/v1/orgs/:orgIDorSlug/team \
	-H "Authorization: Bearer :access_token" \
	-H "Content-Type: application/json" \
	-d '{
		"friendly_name": "org api user",
		"scopes": [ "devices:list" ]
	}'
```

The resulting access token can then be used by programmatic processes. As always, access tokens are sensitive and should be treated as secrets.

---

#### Create an API user scoped to a product

```
curl https://api.particle.io/v1/products/:productIDorSlug/team \
	-H "Authorization: Bearer :access_token" \
	-H "Content-Type: application/json" \
	-d '{
		"friendly_name": "product api user",
		"scopes": [ "devices:list" ]
	}'
```

The API will return an access token based on that user, for example:

```
{"ok":true,"created":{"username":"example-api-user+g7lvvcczos@api.particle.io","is_programmatic":true,"tokens":[{"token":"yyyyyyyyy"}]}}
```

---

#### Multiple API user scopes

```
"scopes": [ "devices:list","sims:list" ]
```

Multiple scopes can be assigned to an API user as follows:

#### Available API user scopes

{{{scopeList}}}

---

### Determining API user scopes

The Particle API documentation includes the required scopes needed to call a particular API function. To determine which scope(s) to assign your API user, determine the minimum set of API functions they should be able to call.

### Updating an API user

```
curl -X PUT https://api.particle.io/v1/products/12857/team/example-api-user+6fbl2q577b@api.particle.io \
	-H "Authorization: Bearer :access_token" \
	-H "Content-Type: application/json" \
	-d '{
		"friendly_name": "Updated API user",
		"scopes": [ "devices:list", "sims:list", "customers:list" ]
	}'
```

To modify the permissions associated with an API user, you must update the scopes via the REST API. Remember, when scopes assigned to a user change, the access token is updated and a fresh token is returned, to avoid scope creep. Depending on the scenario, it may be optimal to create a fresh user with updated permissions first, update the access token in use by the script/code/function, and then delete the old user.
To update the API user, you pass in the full username, in this case example-api-user+6fbl2q577b@api.particle.io.


### Listing API users

```
curl -X GET https://api.particle.io/v1/products/12857/team/ \
	-H "Authorization: Bearer :access_token" \
	-H "Content-Type: application/json"
```

Listing API users is done by getting the team member list of the product or for the organization. Both regular and API users are returned, however you can tell API users as they have the `is_programmatic` flag set to true in the user array element:

```
{
  "ok": true,
  "team": [
    {
      "username": "user@example.com",
      "role": {
        "id": "000000000000000000000002",
        "name": "Administrator"
      }
    },
    {
      "username": "example-api-user+6fbl2q577b@api.particle.io",
      "is_programmatic": true
    }
  ]
}
```

### Deleting an API user

```
curl -X DELETE https://api.particle.io/v1/products/12857/team/example-api-user+6fbl2q577b@api.particle.io \
     -H "Authorization: Bearer :access_token"
```

To delete an API user and its associated access token, simply:


### Errors - API users

```
{"error":"unauthorized","error_description":"API users are not allowed to call this endpoint"}
```

If an API user attempts to perform an action that it is not permitted to, a standard **400** unauthorized error is returned. In the event that an API user tries to hit an endpoint that no API user is authorized to access, then this error is returned:


## API rate limits

The following API rate limits apply. Exceeding the rate limit will result in a 429 HTTP error response.


{{!-- BEGIN shared-blurb 18c4e2a8-ac34-11ec-b909-0242ac120002 --}}
#### All API functions - API rate limits

- Maximum of 10,000 requests every 5 minutes
- Limited by source IP address (public IP address)
- Can be increased for enterprise customers
- All API Routes
{{!-- END shared-blurb --}}

{{!-- BEGIN shared-blurb 1ef79152-ac34-11ec-b909-0242ac120002 --}}
#### Create an access token - API rate limits

- Maximum of 100 requests every 5 minutes
- Limited by source IP address (public IP address)
- If a single IP address sends 10 consecutive failed create token requests, the API will block further attempts from that IP address for 30 minutes. After this lockout period, requests from the same IP address will be allowed again.
- Can be increased for enterprise customers
- API Route: POST /oauth/token
{{!-- END shared-blurb --}}

#### List access tokens - API rate limits

- Maximum of 100 requests every 5 minutes
- Limited by source IP address (public IP address)
- API Route: GET /v1/access_tokens

#### Delete an access token - API rate limits

- Maximum of 100 requests every 5 minutes
- Limited by source IP address (public IP address)
- API Route: DELETE /v1/access_tokens/:token

#### Create a user account - API rate limits

- Maximum of 100 requests every 5 minutes
- Limited by source IP address (public IP address)
- API Route: POST /v1/users

#### Delete user account - API rate limits

- Maximum of 100 requests every 5 minutes
- Limited by source IP address (public IP address)
- API Route: DELETE /v1/user

#### Generate a password reset token - API rate limits

- Maximum of 100 requests every 5 minutes
- Limited by source IP address (public IP address)
- API Route: POST /v1/user/password-reset

#### Reset password - API rate limits

- Maximum of 100 requests every 5 minutes
- Limited by source IP address (public IP address)
- API Route: PUT /v1/user/password-reset


#### Get all events - API rate limits

- Maximum of 100 requests every 5 minutes
- Limited by source IP address (public IP address)
- Can be increased for enterprise customers
- API Route: GET /v1/events


#### Subscribe to server-sent events - API rate limits

- Maximum of 100 requests every 5 minutes
- Limited by source IP address (public IP address)
- Can be increased for enterprise customers
- API Routes: 
  - GET /v1/devices/events/                                                                     
  - GET /v1/devices/:DeviceID/events/
  - GET /v1/orgs/:OrgID/events/
  - GET /v1/orgs/:OrgID/devices/:DeviceID/events/
  - GET /v1/orgs/products/:ProductID/events/
  - GET /v1/products/:ProductID/events/
  - GET /v1/products/:ProductID/devices/:DeviceID/events/

#### Open server-sent event streams - API rate limits

- A maximum of 100 simultaneous connections
- Limited by source IP address (public IP address)

#### Get device data via serial number - API rate limits

- Maximum of  of 50 requests every hour
- Limited per user account that generated the access token
- Can be increased for enterprise customers
- API Route: GET /v1/serial_numbers/:SerialNumber


#### Beware of monitoring variables for change

One situation that can cause problems is continuously monitoring variables for change. If you're polling every few seconds it's not a problem for a single device and variable. But if you are trying to monitor many devices, or have a classroom of students each polling their own device, you can easily exceed the API rate limit.

Having the device call [Particle.publish](/reference/device-os/api/cloud-functions/particle-publish/) when the value changes may be more efficient.

#### Make sure you handle error conditions properly

If you get a 401 (Unauthorized), your access token has probably expired so retransmitting the request won't help.

If you get a 429 (Too many requests) you've already hit the limit, so making another request immediately will not help.

In response to most error conditions you may want to consider a delay before retrying the request.

## Versioning

The API endpoints all start with `/v1` to represent the first official
version of the Particle Device Cloud API.
The existing API is stable, and we may add new endpoints with the `/v1` prefix.

If in the future we make backwards-incompatible changes to the API, the new endpoints will start with
something different, probably `/v2`.  If we decide to deprecate any `/v1` endpoints,
we'll give you lots of notice and a clear upgrade path.

## Devices

Note: Cellular devices may indicate that the device is online for up to 46 minutes after the device has gone offline because it went out of range or was powered off. Wi-Fi devices will generally be accurate to within a few minutes. Online indications are should occur immediately if the device was previously offline for both cellular and Wi-Fi.

{{> api group=apiGroups.Devices}}

## Device search

{{> api group=apiGroups.Search}}


## Remote diagnostics
{{> api group=apiGroups.Diagnostics}}
## User
{{> api group=apiGroups.User}}
## Quarantine
{{> api group=apiGroups.Quarantine}}
## SIM cards
{{> api group=apiGroups.Sims}}
## Events
{{> api group=apiGroups.Events}}

Also note:
{{!-- BEGIN shared-blurb e18d206a-9ba9-11ec-b909-0242ac120002 --}}
- Publishes are not end-to-end confirmed. Even if the `Particle.publish` returns true, there is no guarantee that any recipient (another device, webhook, or SSE) will receive it.
- It is possible to receive an event more than once. The most common reason is a lost ACK, which will cause the device to send the event again. Storing a unique identifier in the event payload may help code defensively for this possibility.
- It is possible that events will arrive out-of-order. The most common cause is retransmission, but it can also occur because events can flow through different redundant servers, each with slightly difference latency, so it's possible that two event sent rapidly will arrive out-of-order as well. This is common for multi-part webhook responses.
- It is possible that even if `Particle.publish` returns false, the event will still be received by the cloud later. This occurs because the 20-second timeout is reached, so false is returned, but the event is still buffered in Device OS and will be retransmitted if the reconnection to the cloud succeeds.
{{!-- END shared-blurb --}}

{{!-- BEGIN shared-blurb 7aab98b6-da1a-43e8-ac8c-49713ceef19d --}}

Two common ways Particle devices can trigger external services are webhooks and Server-Sent Events (SSE).

The SSE event stream works by having your server make an outbound https (encrypted) connection to the Particle API service. This connection is kept open, and if new events arrive, they are immediately passed down this stream. There are a number of advantages to this:

- Works for developer and product event streams.
- Can get all events, or a subset of events by prefix filter.
- Works from a network behind a firewall or NAT typically with no changes required (no port forwarding required).
- You do not need TLS/SSL server certificates for encrypted communication, because the connection is outbound.
- You do not need separate authentication; Particle API tokens are used for authentication.
- It's efficient - the connection only needs to be established and authenticated once.

While this sounds great, there are some issues that can occur that make it less than ideal for large device fleets and make webhooks more attractive:

- You can only have one server accepting events with SSE. With webhooks you can have multiple servers behind a load balancer for both server redundancy as well as load sharing.
- If the SSE stream fails for any reason, you could end up losing events. It can take up to a minute to detect that this has happened in some cases.

| SSE | Webhooks |
| :---: | :---: |
| Works from behind a firewall | Requires a public IP address |
| Encrypted without a SSL certificate | Requires a SSL certificate for the server to support https |
| Best if lost events are not critical | Event delivery is more reliable |
| Only allows a single server | Can use load balancing and redundant servers |

When using SSE, we recommend using the [particle-api-js](/reference/cloud-apis/javascript/#geteventstream) library with node.js, however any language can be used. We recommend using a good, well-tested SSE library as there are some things to beware of when implementing the SSE protocol:

- The connection can be closed at any time by the SSE server. You must be able to handle this and reconnect.
- The connection can stop receiving data because the TCP connection is losing all packets when crossing the Internet. You can detect this because the SSE client will not get any events or the 60 second ping, and it should try reconnecting. This also means that you could lose up to 60 seconds of events in the case of an Internet outage.
- Beware of excessively reconnecting and rate limits.

There is a limit of 100 requests to open an SSE connection in each 5 minute period per public IP address. If rate limiting occurs, you will get a 529 error and you must wait before retrying the connection or you will never be able to successfully connect again. There is also a limit of 100 simultaneous SSE connections from each public IP address. This is not separated by device, access token, etc.; it applies to the public IP address the requests come from.

Because of the simultaneous connection limit, if you want to subscribe to multiple events, you should establish one SSE connection to handle all events, and filter the results for the events that you want to handle. While this seems less efficient, it is the preferred method because the overhead of handling multiple SSE sessions is far higher than the incremental overhead of sending many events across a single event stream. Using a common prefix to group multiple events that need to be received from a single SSE event stream is also a good technique to use if possible.

{{!-- END shared-blurb --}}

## Integrations [Webhooks]
{{> api group=apiGroups.Integrations}}

## Cloud secrets

{{> api group=apiGroups.Secrets}}

## Special events

If you watch your event stream, you may notice your devices publishing events that don't appear in your firmware.  The
cloud will automatically publish events in special situations that would be hard to monitor without an event.

### Special device events

#### Connection status

When your device starts ("online") or stops ("offline") a session with the cloud, you'll see a 'spark/status' event.

```
# spark/status, online
{"name":"spark/status","data":"online","ttl":"60","published_at":"2015-01-01T14:29:49.787Z","coreid":"0123456789abcdef01234567"}
    
# spark/status, offline
{"name":"spark/status","data":"offline","ttl":"60","published_at":"2015-01-01T14:31:49.787Z","coreid":"0123456789abcdef01234567"}
```

Offline events occur if the device gracefully disconnects from the cloud. If you remove the power to a device, the offline event will occur at approximately two times the default keep alive value. For the P2, Photon 2, and Argon, 2 &times; 25 seconds = 50 seconds. For cellular devices, 2 &times; 23 minutes = 46 minutes.

If the device comes online and the cloud did not know it was previously offline, the offline will be generated immediately before the online, not when the actual offline occurred, since it would be impossible to know.
    
    
#### Safe-mode

If your device is running an app that needs a particular version of
Device OS, your device may come online and
report that it's in Safe Mode.  In this case, your device is waiting to run your app until it has received an update.
Some products can receive system updates automatically while in safe mode, but others like the Electron prevent this to
save you costs on bandwidth.  If you do get an automatic update, you may see a "spark/safe-mode-updater/updating" event.

```
#  spark/status/safe-mode
{"name":"spark/status/safe-mode","data":"{ .. a bunch of data from your device about the system parts ...","ttl":"60","published_at":"2016-01-01T14:40:0.000Z","coreid":"0123456789abcdef01234567"}
{"name":"spark/status/safe-mode","data":"{\"f\":[],\"v\":{},\"p\":6,\"m\":[{\"s\":16384,\"l\":\"m\",\"vc\":30,\"vv\":30,\"f\":\"b\",\"n\":\"0\",\"v\":4,\"d\":[]},{\"s\":262144,\"l\":\"m\",\"vc\":30,\"vv\":30,\"f\":\"s\",\"n\":\"1\",\"v\":11,\"d\":[]},{\"s\":262144,\"l\":\"m\",\"vc\":30,\"vv\":30,\"f\":\"s\",\"n\":\"2\",\"v\":7,\"d\":[{\"f\":\"s\",\"n\":\"1\",\"v\":7,\"_\":\"\"}]},{\"s\":131072,\"l\":\"m\",\"vc\":30,\"vv\":26,\"u\":\"F3380CF3018C104BA3BD9438EA921A1ABF315E8063318FDDDCDBE10FED044BEB\",\"f\":\"u\",\"n\":\"1\",\"v\":3,\"d\":[{\"f\":\"s\",\"n\":\"2\",\"v\":11,\"_\":\"\"}]},{\"s\":131072,\"l\":\"f\",\"vc\":30,\"vv\":0,\"d\":[]}]}","ttl":"60","published_at":"2015-01-01T14:40:0.000Z","coreid":"0123456789abcdef01234567"}

#  spark/safe-mode-updater/updating
{"name":"spark/safe-mode-updater/updating","data":"2","ttl":"60","published_at":"2016-01-01T14:41:0.000Z","coreid":"particle-internal"}
```

You can copy and paste the raw event JSON data from a safe-mode event into the [Device Inspect Tool](/tools/developer-tools/device-inspect/) to decode the data.

#### Flashing

As updates are being delivered via the cloud to your device, you may see some events published by the cloud to help
you monitor the update, typically `started` and `success` but could also be `failed`.


```
{"name":"spark/flash/status","data":"started","ttl":"60","published_at":"2016-02-09T14:43:05.606Z","coreid":"0123456789abcdef01234567"}

{"name":"spark/flash/status","data":"success","ttl":"60","published_at":"2016-02-09T14:38:18.978Z","coreid":"0123456789abcdef01234567"}
   
{"name":"spark/flash/status","data":"failed","ttl":"60","published_at":"2016-02-09T14:43:11.732Z","coreid":"0123456789abcdef01234567"}
```

#### app-hash

After you've flashed a new app to your device, you may see an "app-hash" event.  This is a unique hash corresponding
to that exact app binary.  This hash can help confirm a flash succeeded and your new app is running, and also help you
track exactly which version of which app is running on your device.  This is only published when it is different from
the previous session.

```
#  spark/device/app-hash
{"name":"spark/device/app-hash","data":"2BA4E71E840F596B812003882AAE7CA6496F1590CA4A049310AF76EAF11C943A","ttl":"60","published_at":"2016-02-09T14:43:13.040Z","coreid":"2e0041000447343232363230"}
```

#### particle/device/updates

These events are used for controlling OTA updates.

- `particle/device/updates/enabled` (true or false). Sent by the device in response to `System.enableUpdates()` or `System.disableUpdates()`.

- `particle/device/updates/forced` (true or false). Sent by the device when a forced update is requested. This is used to prevent a race condition during forced updates.

- `particle/device/updates/pending` (true or false). Sent by the cloud if there is an update pending.

#### spark/device/last_reset

{{!-- BEGIN shared-blurb ececa6c1-db6d-4658-b47f-74b82f32af27 --}}
The event data will be the reason for the most recent reset:

| Data | Description |
| :--- | :--- |
| `unknown` | `RESET_REASON_UNKNOWN` |
| `pin_reset` | `RESET_REASON_PIN_RESET` |
| `power_management` | `RESET_REASON_POWER_MANAGEMENT` |
| `power_down` | `RESET_REASON_POWER_DOWN` |
| `power_brownout` | `RESET_REASON_POWER_BROWNOUT` |
| `watchdog` | `RESET_REASON_WATCHDOG` |
| `update` | `RESET_REASON_UPDATE` (firmware update) |
| `update_error` | `RESET_REASON_UPDATE_ERROR` |
| `update_timeout` | `RESET_REASON_UPDATE_TIMEOUT` |
| `factory_reset` | `RESET_REASON_FACTORY_RESET` |
| `safe_mode` | `RESET_REASON_SAFE_MODE` |
| `dfu_mode` | `RESET_REASON_DFU_MODE` |
| `panic` | `RESET_REASON_PANIC` |
| `user` | `RESET_REASON_USER` |
| `config_update` | `RESET_REASON_CONFIG_UPDATE` |

- If the reset reason is not one of these known codes, the numeric value is included.
- Not all hardware platforms can generate all reset reasons.

If the reason is `RESET_REASON_PANIC`, then a comma and either a known panic code a number will be present:

| Data | Description |
| :--- | :--- |
| `hard_fault` | `HardFault` (1) |
| `2` | `NMIFault` (2) |
| `memory_fault` | `MemManage` (3) |
| `bus_fault` | `BusFault` (4) |
| `usage_fault` | `UsageFault` (5) |
| `6` | `InvalidLenth` (6) |
| `7` | `Exit` (7) |
| `out_of_heap` | `OutOfHeap` (8) |
| `9` | `SPIOverRun` (9) |
| `assert_failed` | `AssertionFailure` (10) |
| `10` | `AssertionFailure` (10) |
| `11` | `InvalidCase` (11) |
| `12` | `PureVirtualCall` (12) |
| `stack_overflow` | `StackOverflow` (13) |
| 14 | `HeapError` (14) |

For example: `panic, hard_fault`.
{{!-- END shared-blurb --}}


#### Future reserved events

These events are planned, but not yet available.

If an update is available from the cloud, but isn't sent automatically, the cloud may publish
an "flash/available" event to let the firmware know it can ask to have the update delivered.

```
#  spark/flash/available
{ reserved / not yet implemented}
```

If the cloud detects than an update is very large, or the update is taking a very long time,
it might decide to publish periodic flash progress events.  These are meant to help you track the progress of a slow
update.

```
# spark/flash/progress,   sent,total,seconds
{ reserved / not yet implemented }
```



### Special webhook events

Webhooks are a powerful way to connect events from your devices to other services online.

When the webhook detects your event, it'll publish back a hook-sent event to let you know it's processing the event and
has sent a request to your server.

```
# hook-sent
{"name":"hook-sent/your_published_event_topic","data":"undefined","ttl":"60","published_at":"2016-02-09T14:42:19.876Z","coreid":"particle-internal"}

```

If the hook got an error back from your server, it'll publish a hook-error event with the contents of the error.

```
# hook-error

{"name":"hook-error/your_published_event_topic/0","data":"Message ...","ttl":"60","published_at":"2016-02-09T15:23:23.047Z","coreid":"particle-internal"}

```

If the hook got a good response back, it'll break the response into 512 byte chunks and publish up to the first 100KB
of the response back to your devices.

```
# hook-response
{"name":"hook-response/your_published_event_topic/0","data":"your server response...","ttl":"60","published_at":"2016-02-09T15:23:23.047Z","coreid":"particle-internal"}
```

A response larger than 512 bytes will be split into multiple parts of 512 bytes. The events are of the form:

- hook-response/name_of_my_event/0
- hook-response/name_of_my_event/1
- hook-response/name_of_my_event/2
- ...

All parts except the last will be exactly 512 bytes.

The parts may arrive out of order. This has always been the case if retransmission occurred, but as of late 2020, it will happen regularly. The reason is that events now flow through multiple redundant servers for fault tolerance and performance, but this also means that events may arrive in a different order.

There is no express indication of how many parts there are. Any part less than 512 bytes is the last part, however if the data is a multiple of 512 bytes, then it will be impossible to tell. Some formats like JSON will only be parsable after all parts have been received.

Each chunk is a separate publish from the cloud point-of-view. Each chunk uses one data operation for each Particle device it is subscribed by. Furthermore, on all devices (except the Photon and P1), each chunk has a maximum of 3 retries at the CoAP level, but no further checks are done to insure delivery. These chunks are sent out rapidly, faster than the 1 second per publish limit. Thus if you have a large number of chunks, it is likely that some may not be received by the device, especially in areas with poor cellular connectivity. There is no way to get lost chunks retransmitted.

These special webhook events cannot trigger webhooks themselves to avoid the possibility of a bad webhook recursively triggering other webhooks. Use the [Console event logs](https://console.particle.io/logs) or open an [event stream](/reference/cloud-apis/api/#get-a-stream-of-events) to see these events.

#### Webhook events and the product event stream

Prior to March 2023, webhook events like hook-sent, hook-error, and hook-response only went to the device owner's event stream. If the device was unclaimed, the events disappeared.

Now, these events also appear in the product event stream, in the console, SSE event stream, and webhooks. 

Additionally, unclaimed product devices can now subscribe to these events to get webhook responses.


## Asset tracking events

### Tracker location events

A location event typically has JSON that looks like this:

```
{
	"cmd":"loc",
	"time":1584484345,
	"loc":{
		"lck":1,
		"time":1584484333,
		"lat":37.295945,
		"lon":-121.986830,
		"alt":71.6,
		"hd":46.16,
		"h_acc":10.0,
		"v_acc":2.57,
		"cell":37.1,
		"batt":98.8
	},
	"trig": ["lock"],
	"req_id":1
}
```

To estimate the data usage for location events, see [this page](/getting-started/console/console/#data-usage).

#### On non-Tracker devices

{{!-- BEGIN shared-blurb c4c1c0b6-028c-47fa-a13d-4b14452f096f --}}
On some plans, it is possible to use the `loc` event on non-Tracker devices. See [getting started with location](/getting-started/cloud/location/).

This might be done if you have a device with GNSS in the cellular modem (such as the M-SoM and B504), or if you have added an external hardware GNSS to your project.
{{!-- END shared-blurb --}}

#### cmd

This currently always the string `loc`, indicating that the payload contains the `loc` object.

#### time

Event time, from the device RTC. UTC time/date in 32-bit, signed, POSIX epoch format (seconds past January 1, 1970). This timestamp may be different than the timestamp in the event metadata, which is generated cloud-side when the event is received because of event queuing and retries due to connection failures. 

#### loc.lck

Lock or fix status. If 0, the GNSS has not locked yet. If non-zero, it has locked and the lat/lon are valid.

#### loc.time

GNSS timestamp. This may be different than the device and cloud times.

#### loc.lat

Latitude part of geographic coordinate in reference to WGS84 datum. It is floating point degrees in the range of -180.0 to +180.0.

#### loc.lon

Longitude part of geographic coordinate in reference to WGS84 datum. It is floating point degrees in the range of -90.0 to +90.0.

#### loc.alt

Altitude, in meters, part of geographic coordinate in reference to WGS84 datum.

#### loc.hd

Heading, in degrees, of perceived direction. It is floating point degrees in the range of -360.0 to +360.0.

#### loc.h_acc

Horizontal accuracy, in meters, of geographic latitude and longitude coordinates.

#### loc.v_acc

Vertical accuracy, in meters, of geographic altitude coordinates.

#### loc.spd

Speed, in meters per second, of perceived GNSS movement. Added in Tracker Edge v12.

#### loc.batt

Battery level, in percentage (0-100.0) when available and valid.  This field will be omitted when no battery is connected.

#### loc.cell

Cellular signal strength/quality, in percentage (0-100.0).

#### loc.temp

Device temperature, in degrees Celsius, if available.

#### towers.str

Serving and neighboring cell tower signal strength (RSSI in dBm). Added in Tracker Edge v12.

#### towers.rat

Radio Access Technology, for example, "lte". Added in Tracker Edge v12.

#### towers.mcc

Mobile Country Code (0 - 999). Added in Tracker Edge v12.

#### towers.mnc

Mobile Network Code (0 - 999). This is the operator or carrier within the country. Added in Tracker Edge v12.

#### towers.lac

Location Area Code (0 - 65535). Added in Tracker Edge v12.

#### towers.cid

Cell Identifier (0 - 268435455). Added in Tracker Edge v12.

#### towers.nid

Neighboring tower Physical Cell ID (0 - 2147483647). Added in Tracker Edge v12.

#### towers.ch

Frequency channel number (0 - 2147483647). Added in Tracker Edge v12.

#### wps.bssid

MAC address (BSSID) for the base station (access point). Added in Tracker Edge v12.

#### wps.str

Signal strength (RSSI in dBm). Added in Tracker Edge v12.

#### wps.ch

Wi-Fi channel number. Added in Tracker Edge v12.

#### trig

Reason for point location publish message, an array of cause enumeration strings:

- `time` time-based (`interval_max`)
- `radius` movement-based (`radius`)
- `imu_m` IMU wake on motion
- `imu_g` IMU wake on high-G acceleration (4g for at least 2.5ms.)
- `temp_h` High temperature wake
- `temp_l` Low temperature wake
- `user` User-triggered publish
- `batt_warn` Low battery warning
- `batt_low` Low battery
- `outside1` The device is currently outside of geofence zone 1 (and outside trigger is enabled)
- `inside1` The device is currently inside of geofence zone 1 (and inside trigger is enabled)
- `enter1` The device has entered geofence zone 1 (and enter trigger is enabled)
- `exit1` The device has exited geofence zone 1 (and exit trigger is enabled)
- `outside2`, `inside2`, `enter2`, and `exit2`
- `outside3`, `inside3`, `enter3`, and `exit3`
- `outside4`, `inside4`, `enter4`, and `exit4`

#### req_id

The request identifier, used to make sure the event was received.

### Enhanced location events 

The `loc-enhanced` event includes Location Fusion information, enhanced geolocation using Wi-Fi and/or cellular tower information. This can occur indoors, and in "urban canyons" where view of the GNSS satellites is obstructed.

`loc-enhanced` events are generated by the Particle cloud, one for every `loc` event sent by the Tracker, with any additional location information added. The enhanced location can be monitored using webhooks or server-sent-events. Optionally, these events can also be sent to devices, to allow the device to act on the enhanced location information. See [location configuration](/getting-started/console/console/#location-settings).

The `loc-enhanced` event will have data the same as the original `loc` event, such as: `cmd`, `time`, `loc.lck`, `loc.cell`, `loc.batt`, `loc.temp`, `loc.time`, `loc.lat`, `loc.lon`, `loc.h_acc`, and `trig`. 

Note that `loc.alt` (altitude), `loc.v_acc` (vertical accuracy), `loc.hd` (heading), and `loc.spd` (speed) are not available for locations derived from location fusion, but if that information was in the original `loc` event from the GNSS, it will be preserved in the `loc-enhanced` event.

#### loc.src

The sources used for enhanced geolocation, an array. Can be "cell" or "wifi" or both. Added in Tracker Edge v12.

### Location point schema

The full JSON schema for the location point can be downloaded [here](/assets/files/tracker/point-schema.json).


## Firmware
{{> api group=apiGroups.Firmware}}

### Firmware API limits

While compiling source code using the cloud compiler, or flashing a device with source code, there are limits:

- Maximum time to compile: {{maximumCompileTime}}
- Maximum source code size: {{maximumCompilePayload}}

This affects the following endpoints:

```
POST /v1/binaries
PUT /v1/devices/:deviceId
```

## Product firmware
{{> api group=apiGroups.ProductFirmware}}


## Libraries
The libraries endpoints are a little different as they follow the [JSON API](http://jsonapi.org/) specification.

{{> api group=apiGroups.Libraries}}
## Products
{{> api group=apiGroups.Products}}

## Device groups

Device groups allow you to define subsets of your IoT deployment that
can be addressed separately from the rest of the fleet. Groups are
defined within the scope of a [product](#products). For more information,
please see [the guide](/getting-started/console/device-groups/).

{{> api group=apiGroups.Groups}}

## Asset tracking

### Location
{{> api group=apiGroups.Location}}

### Configuration
{{> api group=apiGroups.Configuration}}

## Logic

{{> api group=apiGroups.Logic}}

## Ledger

{{> api group=apiGroups.Ledger}}

## Fleet Health

{{> api group=apiGroups.FleetHealth }}

## Customers

If you wish to provide a mobile app or web app for your customers, we recommend that you implement your own user management features on your front and back-end. You may want to use common third-party login features such as login with Google, Facebook, Twitter, etc. instead of implementing your own from scratch, but this not required. Implementing user management this way will eliminate the need for customer-specific Particle access tokens, which will greatly simplify the implementation of your front and back-end.

{{> api group=apiGroups.Customers}}

### Reset password (simple auth)

If you wish to provide a mobile app or web app for your customers, we recommend that you implement your own user management features on your front and back-end. We do not recommend using simple auth or two-legged shadow customers in most cases now.

 **Simple Auth** can be used as a simpler alternative, however you will need to provide an additional service if you want to allow your customers to be able to reset their password by email. The process works like this:

1. Customer loses access, clicks "forgot password" on your mobile or front-end app.
2. App hits an endpoint on your back-end. The back-end app should know your Particle access token, the one you used to create that product, and, optionally, list of valid customer emails.
3. This triggers an email to the customer sent from your back-end. This email can have your brand, logo, colors, etc. The email contains link to reset his or her password. Behind the scenes, a short-lived reset password token is created and stored in your back-end database.
4. The email links to your hosted, brand-themed webpage that shows the a "set new password" field and verifies the reset password token. The customer types in new password, and the front-end hits an endpoint on your back-end with the new password.
5. The back-end hits the update customer password API.
6. Customer password is reset.

```
PUT /v1/products/:productIdOrSlug/customers/:customerEmail 
{password: <new_password>, access_token: <your_token>}
```

We've provided a [sample app using Heroku and PostgreSQL](https://github.com/particle-iot/password-reset-example). This can be used as-is, or you can use it as an example of how to add support into your existing server infrastructure. 


## Service agreements and usage
{{> api group=apiGroups.ServiceAgreements}}
