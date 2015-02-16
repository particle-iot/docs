---
word: Webhooks
title: Webhooks
order: 14
---

Webhooks
==========

Introduction
===

You've built an amazing device, and paired it with a powerful application online, and now you want to connect them.  You're in the right place!

Webhooks are a simple and flexible way for your devices to make a web request anywhere on the Internet!  When you create a webhook, it listens for specific events from your devices.  When you send that event, the hook will make your request, and optionally send you back the result.

This means you can quickly and easily connect your devices to most modern web services!  So let's show you how to say, log events published from your devices, or let your devices make secure requests anywhere on the internet.

If you're totally new to Spark, that's okay!  Checkout our [Getting started guide here](http://docs.spark.io/start/) first, and come back when you're ready.

Lets go!



Seriously what's a web request?
====

You're probably reading this documentation page with the help of a web browser.  Your browser sent a "GET" request when it asked for this page, which our web server recognized and so it sent the page back.  Most of your average requests to view a page or browse around online are "GET" requests.  This is all part of that hypertext ```http://``` thing that is at the front of the address in your browser.  When you fill out and submit a form, your browser tends to send "POST" requests.  POST requests are usually for sending data to a server.  You can read more about all the different types here ( http://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol#Request_methods ).

Webhooks lets you setup a web request that is tied to an event from your devices.  That means you can probably grab or send values to any web service or site with something as simple as ```Spark.publish("lets go!");```


Installing the CLI
===

We're still building the beautiful, intuitive web interface for creating and managing webhooks, but we didn't want you to wait any longer.  Grab the Spark-CLI for quick and easy access to managing your webhooks.  You'll need Node.js installed to use the CLI, but it's worth it and pretty easy to install.  At the moment you might also need to learn how to use the terminal.  Adafruit has a lovely intro to the command line here https://learn.adafruit.com/what-is-the-command-line/overview .


https://github.com/spark/spark-cli#installing



Your first webhook (Getting the weather)
===

Lets grab and display some weather data, that's fun!

If you're in the US, pick your state and area here ( http://w1.weather.gov/xml/current_obs/ ), if you're somewhere else, try to find a weather service site that is open to being accessed from your device, and can send a simple text report.


Creating the webhook
-----

```sh

    # create the webhook on the commane line with spark-cli
    # spark webhook GET http://w1.weather.gov/xml/current_obs/<your_local_weather_station_here>.xml
    
    
    # create a hook for the event "get_weather" that will hit the following URL
    spark webhook GET get_weather http://w1.weather.gov/xml/current_obs/KMSP.xml 
```

This webhook will now be triggered when we publish "get_weather" from any of our devices.  So let's write some firmware!


The weather displaying firmware
-----

```cpp
    
    void setup() {
        Serial.begin(115200);
        
        // setup our subscription to hear the hook response
        Spark.subscribe("hook-response/get_weather", gotWeatherData, MY_DEVICES);
    
        //wait for someone to open a serial monitor
        for(int i=0;i<10;i++) {
            Serial.println("waiting " + String(10-i) + " seconds before we publish");
            delay(1000);
        }
        
        //trigger our webhook
        Serial.println("Requesting Weather!");
        Spark.publish("get_weather");
    }
    
    void loop() {
    
    }
    
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



Sample output:

```
    Requesting Weather!
    At location: Minneapolis, Minneapolis-St. Paul International Airport, MN
    The weather is: A Few Clouds
    The temp is: 15.0 *F
    The wind is: from the Northwest at 19.6 gusting to 28.8 MPH (17 gusting to 25 KT)
```




Lets make some graphs (Logging to Librato)
===

Librato is great service that lets you quickly track and graph any data over time.  If you want to try this example, make sure you create a free account.  When you first login you'll see a screen like this:

INSERT webhooks_librato_example_1.png



An example librato webhook
---

Copy and save that access token for your webhook.  Create a text file somewhere named librato.json, and lets paste this in:

```json
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
                "name": "{{SPARK_EVENT_NAME}}",
                "value": "{{SPARK_EVENT_VALUE}}",
                "source": "{{SPARK_CORE_ID}}"
            }
        ]
      },
      "auth": null,
      "mydevices": true
    }
```

Create your webhook with the cli by running this in a command prompt.  Make sure you're next to where you created the file.  The webhook will see the special template keywords, and replace them with the values from your published event.

```sh
    spark webhook create librato.json
```


The example data logging code!
---

Here's the fun part, hook anything up to your core!  A motion sensor, temperature sensor, a switch, anything that generates some data that you're interested in tracking over time.  Our example code will assume you have something interesting happening on A0.  This firmware waits 10 seconds, reads pin A0, and then publishes the value to your webhook.

```cpp

    #define publish_delay 10000
    unsigned int lastPublish = 0;
    
    void setup() {
        pinMode(A0, INPUT);
        
    }
    
    void loop() {
        unsigned int now = millis();
        
        if ((now - lastPublish) < publish_delay) {
            // it hasn't been 10 seconds yet...
            return;
        }
        
        
        int value = analogRead(A0);
        Spark.publish("librato_A0", String(value), 60, PRIVATE);
        
        lastPublish = now;
    }
```










Webhook Options
===

What about when you want to send custom headers or parameters?  This section explains what's available and how to use them all!

event
---

The topic or name of the event being published from your device.  This field is required for a webhook.

```
    Spark.publish(event, data);
    #  This part  ^^^^^
```


url
---

The address of the resource you want to contact.  Make sure you have permission to be sending requests to this server.  This field is required.

Hooks that result in a high error count or cause that server to go over our limit will be muted for a time to make sure no sites are being abused.  If you're a site operator and you believe you're being spammed by webhooks, please email us at hello@spark.io.


requestType
---

Optionally specify a standard web request method (GET, POST, PUT, DELETE).  This defaults to POST if not supplied.



deviceID
---

Provide a full id of one of your devices, and the webhook will only respond to events from that device.


mydevices
---

Expects true or false, and will optionally filter to only events coming from devices owned by you.


headers
---

Optionally provide a JSON object with key / value pairs specifying custom headers.  This can be useful for authorization codes or custom headers required by some services.

```json
#example

    "headers": {
        "Authorization: Bearer 12345"
    }
```


form
---

Optionally include custom fields and values as if submitting a form with your request.  This parameter will change the content-type header to `application/x-www-form-urlencoded`

```json
#example
    "form": {
        "custom-field": "reindeer counts"
    }
```

json
---

Optionally include custom fields and values as JSON with your request.  This parameter will change the content-type header to `application/json`.

```json
#example
    "json": {
        "table-name": "racetrack_times"
    }
```


query
---

Optionally include extra parameters in the URL of the request encoded as normal query params.

```json
#example
    "query": {
        "q": "how much can an unladen swallow carry",
        "p": 2
    }

#would be:
    http://url.com/?q=how+much+can+an+unladen+swallow+carry&p=2

```

auth
---

Optionally include an object with username/password set to include a properly encoded HTTP basic auth header.

```json
#example
    "auth": {
        "username": "dancy_pants",
        "password": "speak friend and enter",
    }
```
                    
                       
                       
                       
Limits
===

Web requests via webhooks have the potential to cause side-effects anywhere on the internet, with any service, which is awesome.  In being a responsible member of the Internet community, we want to make sure we're not sending unwanted requests to sites, or sending too much traffic, or causing errors.  For this reason we ask that you make sure you have permission to make requests to any sites you configure hooks for, and that you're sending those requests within their usage policies.  We will generally disable any hooks, or adjust rate limiting if we hear from site administrators that contact us about issues.

We also have a handful of rate limits that we hope will provide you a ton of usability, while also protecting against accidental abuse, they fall into 3 categories:

Limits by Host
---

Spark webhooks will not contact any host more often than 120 times per minute, despite any number of configured webhooks from any number of users.  Requests over this limit for the moment will be dropped.  We intend to add a proper queuing system so this is done more fairly, but for the moment we've opted to protect sites against abuse first.  If you're a site owner / operator and you want to allow more traffic, please email us at hello@spark.io.


Limits by User
---

A user by default may trigger a hook up to 10 times per minute for every core that is registered to their account.  A user may create up to 20 webhooks total.



Limits by Hook
---

Any hook that results in an error code from the server (above a 400), 10 consequetive times in a row will be automatically disabled.  We'll be adding notifications, and the ability to pause/unpause when this happens, but for the moment you might notice your hook stop working for this reason.  


