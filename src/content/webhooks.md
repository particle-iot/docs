---
word: Webhooks
title: Webhooks
order: 15
---

Webhooks
==========

Introduction
===

You've built an amazing device, and a powerful application online, and now you want to connect them.  You're in the right place!

Webhooks are a simple and flexible way for your devices to make requests to almost anything on the Internet.  Webhooks listen for events from your devices.  When you send a matching event, the hook will send a request to your web application with all the details!

If you're totally new to Spark, that's okay!  Check out our [Getting started guide here](http://docs.spark.io/start/) or our [Spark Basics tutorial](http://cmsunu28.gitbooks.io/spark-basics/content/), and come back when you're ready.

Let's go!



What's a web request?
====

When you surf the internet, you are riding a continuous wave of web requests. Browsers make requests to web servers, which send information back that allow you to view, point, click, and interact. When you loaded this page, your browser sent a "GET" request to our web server to ask to display the site. Our server recognized the information in that "GET" request, and it sent the page back to your browser.

There are many different kinds of web requests. Most of your average requests to view a page or browse around online are "GET" requests.  This is all part of that hypertext ```http://``` thing that is at the front of the address in your browser.  When you fill out and submit a form, your browser tends to send "POST" requests.  POST requests are usually for sending data to a server.  You can read more about all the [different kinds of web requests here](http://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol#Request_methods).

Your Spark powered device can now easily make these requests!  You could grab or send values to any web service or site with something as simple as ```Spark.publish("lets go!");``` That's what we are going to teach you how to do with Webhooks.


Installing the CLI
===

```
# if you haven't already, open a command prompt / terminal, and login to the CLI
spark login
> Could I please have an email address?:  cheddar_robot@spark.io
> and a password?: **********
...
Success!
```

We're still building the beautiful, intuitive web interface for creating and managing Webhooks, but you're determined, you are ready to use webhooks now.  You're in luck!  With the Spark-CLI and your terminal you can start using webhooks right away.  You might need to install a few things, but it's going to be worth it.  First, make sure you have [Node.js](https://www.nodejs.org) installed if you don't already.

For those of you who have used the Spark-CLI in the past, you're all set! If you are a CLI newcomer, install it by following [these instructions](http://docs.spark.io/cli/#installing).

You'll also need some basic knowledge of the terminal. Adafruit has a [lovely intro to the command line](https://learn.adafruit.com/what-is-the-command-line/overview) that beginners may find helpful.


CLI Command Reference
================

###spark webhook create

  Registers your webhook with the Spark Cloud.  Creates a postback to the given url when your event is sent.  See [Webhook Options](#webhook-options) for JSON formatting requirements and parameters.

```sh
# how to create a webhook with json data using the CLI
$ spark webhook create slack.json

Using settings from the file slack.json
Sending webhook request  { uri: 'https://api.spark.io/v1/webhooks',
  method: 'POST',
  json: true,
  form: 
   { event: 'slack-incoming-webhook',
     url: 'https://hooks.slack.com/services/B1234567/C234567/345634563456345634563456',
     deviceid: undefined,
     access_token: '56785678567856785678567856785678',
     requestType: 'POST',
     headers: undefined,
     json: 
      { channel: '#random',
        username: 'SparkBot',
        text: '{{SPARK_EVENT_VALUE}}',
        icon_emoji: ':spark:' },
     query: undefined,
     auth: undefined,
     mydevices: true } }
```


###spark webhook list

Generates a list of what webhooks you own, including their ID numbers and registered event names.

```sh
# how to show your currently registered webhooks using the CLI
$ spark webhook list

Found 2 hooks registered

    1.) Hook #123412341234123412341234 is watching for "Librato_"
        and posting to: https://metrics-api.librato.com/v1/metrics
        created at 2015-02-28T03:32:41.412Z

    2.) Hook #234523452345234523452345 is watching for "slack-incoming-webhook"
        and posting to: https://hooks.slack.com/services/B1234567/C234567/345634563456345634563456
        created at 2015-02-28T04:31:47.133Z
```

###spark webhook delete

  Delete a webhook using your registered webhook ID number.  Use `spark webhook list` to find the WEBHOOK_ID you wish to delete, then copy/paste it into the `spark webhook delete WEBHOOK_ID` command.

```sh
# how to delete your previously registered webhook 
# from the Spark Cloud using the CLI
$ spark webhook delete WEBHOOK_ID

$ spark webhook delete 234523452345234523452345
Successfully deleted webhook!
```


Your first webhook
===


Getting the weather in the US
---

```
# If you're in the United States, you can use weather.gov, pick your state here:
http://w1.weather.gov/xml/current_obs/


# Once you've picked your state and local station, pick your url 
http://w1.weather.gov/xml/current_obs/<your_local_weather_station_here>.xml


# For KMSP in Minnesota, the url would be:
http://w1.weather.gov/xml/current_obs/KMSP.xml
```

Lets grab and display some weather data, that's fun!

If you're in the US, pick your state and area from [Weather.gov here](http://w1.weather.gov/xml/current_obs/), if you're somewhere else, try to find a weather service site that is open to being accessed from your device, and can send a simple text report.


Getting the weather Globally
---

```
# Details about OpenWeatherMap's api is here:
http://openweathermap.org/api

# To use OpenWeatherMap, make sure you sign up for an API key from them before using their data
# Sample request for London weather 
http://api.openweathermap.org/data/2.5/weather?q=London&mode=xml
```

There are a ton of weather data services spread around the world!
 
One we found with lots of great international data, and a developer program is [OpenWeatherMap](http://openweathermap.org/)


Creating the webhook
-----

```sh
# creating a GET hook with the Spark-CLI
# spark webhook GET <your_event_name> http://<website.you.are.trying.to.contact>

# create a webhook to send a "GET" request to our weather URL when we publish "get_weather"
spark webhook GET get_weather http://w1.weather.gov/xml/current_obs/KMSP.xml
> ...
> Successfully created webhook!
```

Webhooks listen for events from your devices and will make requests based on those events. For this example, lets setup a hook to listen for a `get_weather` event from our devices, and then have it make a GET request to our weather data url.

Hop on the terminal, make sure you have the Spark-CLI, and make sure you've logged in (`spark login`).

This Webhook will now be triggered when we publish "get_weather" from any of our devices.


The weather firmware
-----

```cpp
// called once on startup
void setup() {
    // For simplicity, we'll format our weather data as text, and pipe it to serial.
    // but you could just as easily display it in a webpage or pass the data to another system.

    // Learn more about the serial commands here http://docs.spark.io/firmware/#communication-serial
    // You can also watch what's sent over serial with the spark-cli with 
    //  spark serial monitor
    Serial.begin(115200);

    // Lets listen for the hook response
    Spark.subscribe("hook-response/get_weather", gotWeatherData, MY_DEVICES);

    // Lets give ourselves 10 seconds before we actually start the program.
    // That will just give us a chance to open the serial monitor before the program sends the request
    for(int i=0;i<10;i++) {
        Serial.println("waiting " + String(10-i) + " seconds before we publish");
        delay(1000);
    }
}
    

// called forever really fast
void loop() {

    // Let's request the weather, but no more than once every 60 seconds.
    Serial.println("Requesting Weather!");
    
    // publish the event that will trigger our webhook
    Spark.publish("get_weather");
    
    // and wait at least 60 seconds before doing it again
    delay(60000);
}

// This function will get called when weather data comes in
void gotWeatherData(const char *name, const char *data) {
    // Important note!  -- Right now the response comes in 512 byte chunks.  
    //  This code assumes we're getting the response in large chunks, and this
    //  assumption breaks down if a line happens to be split across response chunks.
    //
    // Sample data:
    //  <location>Minneapolis, Minneapolis-St. Paul International Airport, MN</location>
    //  <weather>Overcast</weather>
    //  <temperature_string>26.0 F (-3.3 C)</temperature_string>
    //  <temp_f>26.0</temp_f>

    
    String str = String(data);
    String locationStr = tryExtractString(str, "<location>", "</location>");
    String weatherStr = tryExtractString(str, "<weather>", "</weather>");
    String tempStr = tryExtractString(str, "<temp_f>", "</temp_f>");
    String windStr = tryExtractString(str, "<wind_string>", "</wind_string>");

    if (locationStr != NULL) {
        Serial.println("At location: " + locationStr);
    }
    
    if (weatherStr != NULL) {
        Serial.println("The weather is: " + weatherStr);
    }
    
    if (tempStr != NULL) {
        Serial.println("The temp is: " + tempStr + String(" *F"));
    }
    
    if (windStr != NULL) {
        Serial.println("The wind is: " + windStr);
    }
}

// Returns any text found between a start and end string inside 'str'
// example: startfooend  -> returns foo
String tryExtractString(String str, const char* start, const char* end) {
    if (str == NULL) {
        return NULL;
    }
    
    int idx = str.indexOf(start);
    if (idx < 0) {
        return NULL;
    }
    
    int endIdx = str.indexOf(end);
    if (endIdx < 0) {
        return NULL;
    }
    
    return str.substring(idx + strlen(start), endIdx);
}
```


Even if you're already familiar with writing firmware, that's great!, there are some great details here to catch.  First when we want to capture a reponse from a webhook, make sure you're subscribing to "hook-response/" + ( your published event name ).  That means if your hook captures everything starting with "my-hooks", but you published "my-hooks/get_weather", then your response event name would be "hook-response/my-hooks/get_weather".

The other important detail from this example is that webhooks right now assumes you're using an embedded device without a lot of ram.  Large web responses are cut into 512 byte pieces, and are sent at a fixed rate of about 4 per second.  This is to make it easier for these low power devices to parse and process responses that otherwise wouldn't fit in ram.

Now, let's write some firmware!



Sample output:

```
# Sample Output over serial
Requesting Weather!
At location: Minneapolis, Minneapolis-St. Paul International Airport, MN
The weather is: A Few Clouds
The temp is: 15.0 *F
The wind is: from the Northwest at 19.6 gusting to 28.8 MPH (17 gusting to 25 KT)
```




Lets make some graphs
===
 
Logging to Librato
---

Librato is great service that lets you quickly track and graph any data over time.  This example requires you have an account with them first, [signup for librato here](https://librato.com)

When you first login you'll see a screen like this:

[![Librato Welcome Screen]({{assets}}/images/webhooks_librato_example_1.png)]({{assets}}/images/webhooks_librato_example_1.png)



An example librato webhook
---

Copy and save the librato access token for your webhook below.  Create a text file somewhere named librato.json, and paste in this example.  Make sure you replace the librato username, and librato access token as well.

```json
# copy-paste the stuff between the {}'s (including those brackets) into a file librato.json
{
    "eventName": "librato_",
    "url": "https://metrics-api.librato.com/v1/metrics",
    "requestType": "POST",
    "auth": {
        "username": "YOUR_LIBRATO_USERNAME",
        "password": "YOUR_LIBRATO_ACCESS_TOKEN"
    },
    "json": {
        "gauges": [
            {
                "name": "\{{SPARK_EVENT_NAME}}",
                "value": "\{{SPARK_EVENT_VALUE}}",
                "source": "\{{SPARK_CORE_ID}}"
            }
        ]
    },
    "mydevices": true
}
```


```sh
# example of creating the hook 
spark webhook create librato.json
> ...
> Successfully created webhook!
```

Use the `spark webhook create` command in your terminal to create the webhook.  Make sure you're in the same folder as where you created the file.  The webhook will see the special template keywords, and replace them with the values from your published event.



The example data logging code!
---

Here's the fun part, hook anything up to your core!  A motion sensor, temperature sensor, a switch, anything that generates some data that you're interested in tracking over time.  You can also leave the pins floating and measure the floating pin too!  Our example code will assume you have something interesting happening on A0.  This firmware waits 10 seconds, reads pin A0, and then publishes the value to your webhook.

```cpp
#define publish_delay 10000
unsigned int lastPublish = 0;

void setup() {
    
}

void loop() {
    unsigned long now = millis();
    
    if ((now - lastPublish) < publish_delay) {
        // it hasn't been 10 seconds yet...
        return;
    }
    
    int value = analogRead(A0);
    Spark.publish("librato_A0", String(value), 60, PRIVATE);
    
    lastPublish = now;
}
```

[![Testing the events first]({{assets}}/images/webhooks-librato-cli-example.png)]({{assets}}/images/webhooks-librato-cli-example.png)


After you flash the firmware to your core, open up the Spark-CLI, and subscribe to your events with `spark subscribe mine`, you should see something like:

[![Librato Metrics Screen]({{assets}}/images/webhooks-librato-metrics-screen1.png)]({{assets}}/images/webhooks-librato-metrics-screen1.png)


Once you've created the webhook, and some events are coming through successfully, your metric should show up in your metrics list:


[![Librato Sample Graph]({{assets}}/images/webhooks-librato-metric-sample.png)]({{assets}}/images/webhooks-librato-metric-sample.png)


Open up that metric, and congrats!  Your sensor data is now readily available to you in Librato!







What's in a request?
===

```json
{
    event: "Your event name",
    data: "Your event contents",
    published_at: "When it was published",
    coreid: "Your core ID"
}
```

Since your webhook listens for events from your devices, it can send that event data along to whatever url you specify.  If you don't add any custom options, the hook will send a JSON type POST request with the following values:

This is same data you'd see if you subscribed to your event stream http://docs.spark.io/api/#reading-data-from-a-core-events 


These properties will all be strings except for published_at, which is an ISO8601 date formatted string, which tends to be in the form YYYY-MM-DDTHH:mm:ssZ


Templates
===

In order to help connect with many different services, you can move these published event values around in your request using simple templates.  You can picture the example above as the following template:
 
 
```json
{
    event:  "\{{SPARK_EVENT_NAME}}",
    data: "\{{SPARK_EVENT_VALUE}}",
    published_at: "\{{SPARK_PUBLISHED_AT}}",
    coreid: "\{{SPARK_CORE_ID}}"
}
```


Custom template variables
---


You can also add custom template values by formatting your publish event data as JSON!

```
Spark.publish("custom_templates", "{ \"my-var\": \"foo\", \"my-temp\": \"98.6F\" }", 60, PRIVATE);
```

An example hook that uses custom templates.  In this case the URL of the request will change as the value of "my-var" changes in your published event!
```json
{
    "eventName": "custom_templates",
    "url": "http://my-awesome-website.spark/\{{my-var}}",
    "requestType": "POST",
    "json": {
        "my-temp": "\{{my-temp}}",
        "source": "\{{SPARK_CORE_ID}}"
    },
    "mydevices": true
}
```



Webhook Options
===

You can even customize the Webhook to send custom headers, form fields, and more. This section explains what's available and how to use them all!

event
---

The topic of your published event is sent as the 'event' property in webhook requests.  In your firmware it's this part:

```
Spark.publish(event, data);
#  This part  ^^^^^
```

data
---

The contents of your published event is sent as the 'data' property in webhook requests.  In your firmware it's this part:

```
Spark.publish(event, data);
#  This part         ^^^^
```


url
---

The address of the resource you want to contact.  Make sure you have permission to be sending requests to this server.  This field is required.

Hooks that result in a high error count or cause that server to go over our limit will be muted for a time to make sure no sites are being abused.  If you're a site operator and you believe you're being spammed by webhooks, please email us at hello@spark.io.

```
Usually something like: https://<some-website-name-here.com>/<some-cool-api>
```

requestType
---

Optionally specify a standard web request method (GET, POST, PUT, DELETE).  This defaults to POST if not supplied.

```
Usually one of GET, POST, PUT, DELETE
```

deviceID
---

Provide a full id of one of your devices, and the webhook will only respond to events from that device.


mydevices
---

Expects true or false, and will optionally filter to only events coming from devices owned by you.

```
One of true, false
```

headers
---

Optionally provide a JSON object with key / value pairs specifying custom headers.  This can be useful for authorization codes or custom headers required by some services.

```json
# example headers usage
"headers": {
    "Authorization": "Bearer 12345"
}
```


form
---

Optionally include custom fields and values as if submitting a form with your request.  This parameter will change the content-type header to `application/x-www-form-urlencoded`

```json
# example form usage
"form": {
    "custom-field": "reindeer counts"
}
```

json
---

Optionally include custom fields and values as JSON with your request.  This parameter will change the content-type header to `application/json`.

```json
# example json usage
"json": {
    "table-name": "racetrack_times"
}
```


query
---

Optionally include extra parameters in the URL of the request encoded as normal query params.

```json
# example query usage
"query": {
    "q": "how much can an unladen swallow carry",
    "p": 2
}

# would cause the hook to include those query parameters 
http://<the url>/?q=how+much+can+an+unladen+swallow+carry&p=2
```

auth
---

Optionally include an object with username/password set to include a properly encoded HTTP basic auth header.

```json
# example auth usage
"auth": {
    "username": "dancy_pants",
    "password": "speak friend and enter"
}
```




Limits
===

```
Please make sure you have permission from the site first!
```

Web requests via webhooks can go almost anywhere on the internet, and to almost any service, which is awesome!

In being responsible members of the Internet community, we want to make sure we're not sending unwanted requests to sites, or sending too much traffic, or causing errors.  For this reason we ask that you make sure you have permission to make requests to any sites you configure hooks for, and that you're sending those requests within their usage policies.  We will generally disable any hooks, or adjust rate limiting if we hear from site administrators that contact us about issues.

We also have a handful of rate limits that we hope will provide you a ton of usability, while also protecting against accidental abuse, they fall into 3 categories:

Limits by Host
---

```
Any host will be limited to 120 requests per minute
unless we're contacted by the site administrator 
```

Spark webhooks will not contact any host more often than 120 times per minute, despite any number of configured webhooks from any number of users.  Requests over this limit for the moment will be dropped.  We intend to add a proper queuing system so this is done more fairly, but for the moment we've opted to protect sites against abuse first.  If you're a site owner / operator and you want to allow more traffic, please email us at hello@spark.io.


Limits by User
---

```
You can create up to 20 webhooks,
you can send 10 hooks per minute per device
```

A user by default may trigger a hook up to 10 times per minute for every core that is registered to their account.  A user may create up to 20 webhooks in total.



Limits by Hook
---

```
The hook will be disabled if the server responds
with errors 10 times in a row.
```

Any hook that results in an error code from the server (above a 400), 10 consecutive times in a row will be automatically disabled.  We'll be adding notifications, and the ability to pause/unpause when this happens, but for the moment you might notice that your hook stops working for this reason.  


Handling Web Responses
===

Responses from hooks are sent in the following format:

```
# format for hook response events 
hook-response/<triggering-event-name>/<index>
```

Where the response is cut into some number of chunks of about 512 bytes, and sent back to your device at a rate of one per 250ms, or about 4 per second.  The event name will use the triggering event, and not the registered hook name filter.  If your hook captures everything starting with "my-hooks", but you published "my-hooks/get_weather", then your response event name would be "hook-response/my-hooks/get_weather".  Each packet event name includes the index of the packet in the response.  For example, a large response might appear as:

```
# website responses are cut into chunks of 512 bytes
# they're sent at a rate of up to 4 per second.
# The first 100KB of the request will be sent, and the rest will be dropped.

hook-response/get_weather/0
    "<?xml version=\"1.0\" encoding=\"ISO-8859-1\"?> \r\n<?xml-stylesheet href=\"latest_ob.xsl\" type=\"text/xsl\"?>\r\n<current_observation version=\"1.0\"\r\n\t xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\"\r\n\t xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\"\r\n\t xsi:noNamespaceSchemaLocation=\"http://www.weather.gov/view/current_observation.xsd\">\r\n\t<credit>NOAA's National Weather Service</credit>\r\n\t<credit_URL>http://weather.gov/</credit_URL>\r\n\t<image>\r\n\t\t<url>http://weather.gov/images/xml_logo.gif</url>\r\n\t\t<title>NOAA's Nat"

hook-response/get_weather/1
    "ional Weather Service</title>\r\n\t\t<link>http://weather.gov</link>\r\n\t</image>\r\n\t<suggested_pickup>15 minutes after the hour</suggested_pickup>\r\n\t<suggested_pickup_period>60</suggested_pickup_period>\n\t<location>Minneapolis, Minneapolis-St. Paul International Airport, MN</location>\n\t<station_id>KMSP</station_id>\n\t<latitude>44.88306</latitude>\n\t<longitude>-93.22889</longitude>\n\t<observation_time>Last Updated on Feb 27 2015, 4:53 pm CST</observation_time>\r\n        <observation_time_rfc822>Fri, 27 Feb 2015 16:53:0"

hook-response/get_weather/2
    "0 -0600</observation_time_rfc822>\n\t<weather>Fair</weather>\n\t<temperature_string>14.0 F (-10.0 C)</temperature_string>\r\n\t<temp_f>14.0</temp_f>\r\n\t<temp_c>-10.0</temp_c>\n\t<relative_humidity>49</relative_humidity>\n\t<wind_string>Southwest at 8.1 MPH (7 KT)</wind_string>\n\t<wind_dir>Southwest</wind_dir>\n\t<wind_degrees>240</wind_degrees>\n\t<wind_mph>8.1</wind_mph>\n\t<wind_kt>7</wind_kt>\n\t<pressure_string>1035.2 mb</pressure_string>\n\t<pressure_mb>1035.2</pressure_mb>\n\t<pressure_in>30.50</pressure_in>\n\t<dewpoint_string"

hook-response/get_weather/3
    ">-2.0 F (-18.9 C)</dewpoint_string>\r\n\t<dewpoint_f>-2.0</dewpoint_f>\r\n\t<dewpoint_c>-18.9</dewpoint_c>\n\t<windchill_string>3 F (-16 C)</windchill_string>\r\n      \t<windchill_f>3</windchill_f>\r\n      \t<windchill_c>-16</windchill_c>\n\t<visibility_mi>10.00</visibility_mi>\n \t<icon_url_base>http://forecast.weather.gov/images/wtf/small/</icon_url_base>\n\t<two_day_history_url>http://www.weather.gov/data/obhistory/KMSP.html</two_day_history_url>\n\t<icon_url_name>skc.png</icon_url_name>\n\t<ob_url>http://www.weather.gov/data"

hook-response/get_weather/4
    "/METAR/KMSP.1.txt</ob_url>\n\t<disclaimer_url>http://weather.gov/disclaimer.html</disclaimer_url>\r\n\t<copyright_url>http://weather.gov/disclaimer.html</copyright_url>\r\n\t<privacy_policy_url>http://weather.gov/notice.html</privacy_policy_url>\r\n</current_observation>\n"
    
```



Errors
===

Error responses from the target url will also be sent back in the response event.  If you have 10 consecutive errors, the hook will send you a "Too many errors, webhook disabled" message.  Make sure you're watching the responses when developing your hook!  You can monitor these with the spark-cli by running:

```
spark subscribe mine
```

