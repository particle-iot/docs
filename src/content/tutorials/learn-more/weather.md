---
title: Weather API
shared: true
columns: two
layout: commonTwo.hbs
description: Using a Weather API on Particle IoT devices
includeDefinitions: [api-helper, api-helper-json, api-helper-mustache, api-helper-primitives, codemirror, api-helper-weather]
---

# Using the OpenWeather API

The [OpenWeather API](https://openweathermap.org/api) provides a convenient way to get weather information including current conditions and forecast information. In many cases, you can use the API for free. This tutorial shows how to use this specific API, however, the techniques for using webhooks and parsing the JSON data are useful for other REST APIs as well.

## Getting started

This tutorial will focus on a few specific APIs that are intended to be used with fixed locations, such as from your own home. The actual Weather API can be used in more complicated scenarios, like mobile devices and customer devices in various locations, but those use cases are a bit more complicated and aren't included in this tutorial.

### Log into Particle

In order to take advantage of some of the interactive features of this page, you should log into your account if you are not already logged in:

{{> sso}}

### OpenWeather API Key (appid)

All OpenWeather API calls require an [API key](https://openweathermap.org/full-price#current), which is also referred to as the appid. This tutorial will work with the free plan but you must register to get your own API key.

{{> weather-api-key}}

### Your location

We'll be using the "one call" API that requires your latitude and longitude. If you know yours, you can type it into this box:

{{> weather-api-lat-lon}}

- If you go to [Google Maps](https://maps.google.com) and click on the map, a small popup will appear on the map that includes the location name of where you clicked and the coordinates. 
- You must enter the coordinates in decimal format. If you have the latitude and longitude in degrees, hour, minutes, and seconds you'll need to convert it to decimal format first.

## Using the OpenWeather One Call API

This control uses the OpenWeather [One Call API](https://openweathermap.org/api/one-call-api). It can return a great deal of information, and excluding the parts you don't care about can make the responses faster and a more reasonable size. The default setting of the checkboxes only includes the current and daily information. 

The units setting is one of:

| Setting | Temperature | Wind Speed |
| :--- | :--- | :--- |
| Standard | Kelvin | meters/sec |
| Metric | Celsius | meters/sec |
| Imperial (US) | Fahrenheit | miles/hour |

The language is typically a two-character language code, such `fr` for French or `es` for Spanish. Other options are in the [language support](https://openweathermap.org/api/one-call-api#multi) section of the OpenWeather API documentation.

Additionally, the lat, lon, and appid you configured earlier are included in the request.

Once you click the **Get Weather** button it will make the API request and show the response.

{{> weather-api-one-call height="400"}}

### Paring down the output

Even excluding some of the fields, you'll probably notice that the output is large. Including only the current and daily information, the output can exceed 6 kilobytes. If you are sending it to a Particle device, that can require 12 data operations.

Including all fields, the output may exceed 38,617 bytes or 76 data operations if all of the data was sent your device! This is not only inefficient, but also prone to losing data and having a corrupted response.

In most cases, you'll only care about a small subset of the fields, and you can send only those fields to your device. This feature is built into the Webhooks support in the Particle cloud and is known as mustache templates. The template are a little difficult to create by hand, so this tool can be used to automate the process:

{{> weather-field-selector }}




## Creating a webhook


## Displaying the data


### Decoding the output

The output from 

https://openweathermap.org/weather-conditions#How-to-get-icon-URL


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

A number of fields are not unit-converted so if you want to use them with imperial units, you'll need to convert them yourself:

| Field | Units (always metric) |
| :--- | :--- |
| `pressure` | hPa |
| `visibility` | meters |
| `rain` | millimeters |
| `snow` | millimeters |
| `precipitation` | millimeters |
