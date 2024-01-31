---
title: Weather API
shared: true
columns: two
layout: commonTwo.hbs
description: Using a Weather API on Particle IoT devices
includeDefinitions: [api-helper, api-helper-json, api-helper-mustache, api-helper-primitives, codemirror, api-helper-weather]
---

# {{title}}

The [OpenWeather API](https://openweathermap.org/api) provides a convenient way to get current weather and forecast information including current conditions and forecast information. In many cases, you can use the API for free. This tutorial shows how to use this specific API, however, the techniques for using webhooks and parsing the JSON data are useful for other REST APIs as well.

## Getting started

This tutorial will focus on a few specific APIs that are intended to be used with fixed locations, such as from your own home. The actual Weather API can be used in more complicated scenarios, like mobile devices and customer devices in various locations, but those use cases are a bit more complicated and aren't included in this tutorial.

You should go through the steps in order, as subsequent sections rely on the previously completed steps.

### Log into Particle

In order to take advantage of some of the interactive features of this page, you should log into your account if you are not already logged in:

{{> sso}}


### OpenWeather API Key (appid)

All OpenWeather API calls require an [API key](https://openweathermap.org/full-price#current), which is also referred to as the appid. This tutorial will work with the free plan but you must register to get your own API key. 

Enter it here so it can be used to make API calls from this page. The key is only stored in your browser until you close this tab.

{{> weather-api-key}}


### Your location

We'll be using the "one call" API that requires your latitude and longitude. If you know yours, you can type it into this box:

{{> weather-api-lat-lon}}

- If you go to [Google Maps](https://maps.google.com) and click on the map, a small popup will appear on the map that includes the location name of where you clicked and the coordinates. 
- You must enter the coordinates in decimal format. If you have the latitude and longitude in degrees, hour, minutes, and seconds you'll need to convert it to decimal format first.
- This is used when making API calls from this page only. 
- The location is only stored in your browser until you close this tab.


## Using the OpenWeather one call API

This control uses the OpenWeather [One Call API](https://openweathermap.org/api/one-call-api). It can return a great deal of information, and excluding the parts you don't care about can make the responses faster and a more reasonable size. The default setting of the checkboxes only includes the current and daily information. 

The units setting is described in greater detail [below](#units) but you will probably want Metric or Imperial in the United States.

The language is typically a two-character language code, such `fr` for French or `es` for Spanish. Other options are in the [language support](https://openweathermap.org/api/one-call-api#multi) section of the OpenWeather API documentation.

Additionally, the lat, lon, and appid you configured earlier are included in the request.

Once you click the **Get Weather** button it will make the API request and show the response.

{{> weather-api-one-call height="400"}}


### Paring down the output

Even excluding some of the fields, you'll probably notice that the output is large. Including only the current and daily information, the output can exceed 4 kilobytes. If you are sending it to a Particle device, that can require 9 data operations.

Including all fields, the output may exceed 38,617 bytes or 76 data operations if all of the data was sent your device! This is not only inefficient, but also prone to losing data and having a corrupted response.

In most cases, you'll only care about a small subset of the fields, and you can send only those fields to your device. This feature is built into the Webhooks support in the Particle cloud and is known as mustache templates. The template are a little difficult to create by hand, so this tool can be used to automate the process.

- Click the checkbox for each field that you want to send to your device.
- For time-series fields (minutely, hourly, daily), specify how many entries to include and what fields to include.

{{> weather-field-selector }}

#### Warning: Large Templates

Large templates (greater than 512 bytes) can cause issues:

- The generated sample code does not support multiple chunks
- The built-in JSON parser will not parse JSON with more than 128 tokens (roughly each key/value pair is two tokens)

It is possible to use JsonParserGeneratorRK to parse large JSON data with multiple chunks, but there isn't an automatic code generator for it.

For this reason, you probably don't want to include the minutely data, as it's very large.

#### Warning: Alerts

Accessor code is not generated for alerts. There are several reasons:

- The variable length array is difficult to handle in webhook response templates.
- The size is likely to exceed the 512 byte chunk size making using the built-in JSON parser difficult.
- There is no "push" mode for free alerts, so you would have to poll frequently, which is not efficient.

If you do want to handle alerts, it's probably best to create a separate webhook that only has the alerts (omits everything else), then send the entire JSON response back to the device. Recombine the parts and parse the JSON on the device. You could do this every 10 to 30 minutes for a single device for home use, but it doesn't scale very well.

## Creating a webhook

The pattern for using the Weather API is:

- Particle device subscribes to webhook responses (in setup) using `Particle.subscribe()`.
- Particle device uses `Particle.publish` to request weather data.
- The webhook server detects this event, and makes an API request to the OpenWeather API, and collects the response.
- The webhook server decodes the response and generates new data from it using the response template (mustache).
- This new, smaller data is broken into 512 byte chunks and publishes it to the device.
- The device picks the webhook response in its subscribe handler.
- The device parses the response and does something with it, like update a display.

{{> weather-api-webhook }}

You can use the **Create or Update Webhook** button to create or update the webhook in your account, or manually create one in the [Particle console](https://console.particle.io) and copy and paste the JSON into a **Custom Template**.

Note that the webhook configuration contains your OpenWeather API key so you should not share it publicly.

## Test firmware

This is sample device firmware that queries the weather once after the device connects to the cloud and prints the output to the serial debug log.

{{> codebox content="/assets/files/hardware-examples/WeatherTest.cpp" format="cpp" height="500" flash="true"}}

For example, I clicked the checkboxes for

- temp
- humidity (hum)

In the Daily section: 
- Include: 2
- temp.day (day)
- temp.night (night)

The following output was printed to `particle serial monitor`:

```
0000008749 [app] INFO: key=temp value=23.38
0000008749 [app] INFO: key=hum value=85
0000008750 [app] INFO: daily index=0 key=day value=23.87
0000008750 [app] INFO: daily index=0 key=night value=18.64
0000008751 [app] INFO: daily index=1 key=day value=24.21
0000008751 [app] INFO: daily index=1 key=night value=17.18
```

### Decoding the weather API output

This is a portion of the Weather API output:

```
"current": {
	"dt": 1622628830,
	"sunrise": 1622626005,
	"sunset": 1622680331,
	"temp": 51.21,
	"feels_like": 50.16,
	"pressure": 1024,
	"humidity": 88,
	"dew_point": 47.79,
	"uvi": 0,
	"clouds": 100,
	"visibility": 10000,
	"wind_speed": 3.71,
	"wind_deg": 167,
	"wind_gust": 3.49,
	"weather": [{
		"id": 804,
		"main": "Clouds",
		"description": "overcast clouds",
		"icon": "04d"
	}]
},
```

### Dates

```json
{
	"dt": 1622628830,
	"sunrise": 1622626005,
	"sunset": 1622680331,
}
```

Dates are represented in Unix timestamps (seconds past January 1, 1970) at UTC. This is the same as the default way time is stored on devices, and returned by functions such as `Time.now()`.

In the example above, 1622628830 is Wednesday, June 2, 2021 09:26:45 UTC. In the eastern US timezone, that's 5:26:45 AM EDT.

If you want to display the values in local time with daylight saving adjustments, you'll need to do this separately. One option is to use the [LocalTimeRK](https://github.com/rickkas7/LocalTimeRK) library.

Another option is to send the `timezone_offset` from the Top-Level values returned from the Weather API. This will return the appropriate UTC offset for the time the API call was made, but will not return information about a change in adjustment if DST starts or ends during period covered by data.


### Units

The units setting in the request is one of:

| Setting | Temperature | Wind Speed |
| :--- | :--- | :--- |
| Standard | Kelvin | meters/sec |
| Metric | Celsius | meters/sec |
| Imperial (US) | Fahrenheit | miles/hour |

A number of fields are not unit-converted so if you want to use them with imperial units, you'll need to convert them yourself:

| Field | Units (always metric) | For US measurement in | Multiply By |
| :--- | :--- | :--- | :--- |
| `pressure` | hPa | inches of mercury (inHg) | 0.75 | 
| `visibility` | meters | miles | 0.000621371 |
| `rain` | millimeters | inches | 0.0393701 |
| `snow` | millimeters | inches | 0.0393701 |
| `precipitation` | millimeters | inches | 0.0393701 |

### Weather condition codes and icons

These are described in the [OpenWeather API docs](https://openweathermap.org/weather-conditions).

For example, the icon 01d is a clear sky during the day. 10d is rain.

For each weather condition there's both a numeric id (500), a main category (Rain), and a description (light rain). The description is localized.


## Device-specific location

In this tutorial thus far, we've encoded the location in the webhook. But what if you wanted device-specific location?

You could use sources such as:

- GNSS (GPS) with additional hardware
- Cellular tower location using [Google Maps Device Locator](/integrations/google-maps/)
- Wi-Fi geolocation using [Google Maps Device Locator](/integrations/google-maps/)

### Sending the location in a request

Where you get the latitude and longitude will vary, but the basic process is to send up JSON data instead of an empty string from your device. In other words, change this:

```
Particle.publish(EVENT_NAME, "", PRIVATE);
```

To something like this:

```cpp
double lat, lon;
// Initialize lat and lon here!
Particle.publish(EVENT_NAME, String::format("{\"lat\":%lf,\"lon\":%lf}", lat, lon), PRIVATE);
```

Then, in the query section of your webhook, you'd have something like this:

```json
  "query": {
    "lat": "\{{lat}}",
    "lon": "\{{lon}}",
    "exclude": "minutely,hourly,alerts",
    "units": "metric",
```

What this does is copy lat and lon from the webhook request data into the API call made to the OpenWeather API server.

The rest of the code is unchanged.

