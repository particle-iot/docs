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

Webhooks are a simple and flexible way for your devices to make a web request anywhere on the Internet!  When you create a webhook, it starts listening for specific events from your devices.  When you send that event, the hook will send the prepared request for you, and you can use the response!

This means you can\ quickly and easily connect your devices to just about anything online!  We're going to show you how to securely log your data to third party services, or do something like pull the weather from a local service.  

If you're totally new to Spark, that's okay!  Checkout our [Getting started guide here](http://docs.spark.io/start/) first, and come back when you're ready.

Let's go!



Seriously what's a web request?
====

You're probably reading this documentation page with the help of a web browser.  Your browser sent a "GET" request when it asked for this page, which our web server recognized and so it sent the page back.  Most of your average requests to view a page or browse around online are "GET" requests.  This is all part of that hypertext ```http://``` thing that is at the front of the address in your browser.  When you fill out and submit a form, your browser tends to send "POST" requests.  POST requests are usually for sending data to a server.  You can read more about all the different types here ( http://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol#Request_methods ).

Webhooks let you trigger a request by simply publishing an event from your devices.  That means you can probably grab or send values to any web service or site with something as simple as ```Spark.publish("lets go!");```


Installing the CLI
===

We're still building the beautiful, intuitive web interface for creating and managing webhooks, but we didn't want you to wait any longer.  Grab the Spark-CLI for quick and easy access to managing your webhooks.  You might need to install a few things, but it's going to be worth it.  Make sure you have [Node.js](https://www.nodejs.org) installed if you don't already. 


https://github.com/spark/spark-cli#installing

```
    # if you haven't already, open a command prompt / terminal, and login to the CLI
    spark login
    > Could I please have an email address?:  cheddar_robot@spark.io
    > and a password?: **********
    ...
    Success!
```


What's the command prompt?
---


If you're not already familiar, [Adafruit has a lovely intro to the command line here](https://learn.adafruit).com/what-is-the-command-line/overview).



Your first webhook (Getting the weather)
===

Lets grab and display some weather data, that's fun!

If you're in the US, pick your state and area here ( http://w1.weather.gov/xml/current_obs/ ), if you're somewhere else, try to find a weather service site that is open to being accessed from your device, and can send a simple text report.  We're going to insert our local station name into this url for our webhook:

```
http://w1.weather.gov/xml/current_obs/<your_local_weather_station_here>.xml
```

Here are a few:

<<<TODO: INSERT LINKS HERE / ALTERNATE EXAMPLE>>>
openweathermap.org


Creating the webhook
-----

```sh
    #
    # this will send a "GET" request to this URL whenever we publish the event "get_weather"
    #
    spark webhook GET get_weather http://w1.weather.gov/xml/current_obs/KMSP.xml
    > ...
    > Successfully created webhook!
```

This webhook will now be triggered when we publish "get_weather" from any of our devices.  So let's write some firmware!


The weather displaying firmware
-----

 Even if you're familiar with writing firmware or wiring, there are some great details here to catch.  First when we want to capture a reponse from a webhook, make sure you're subscribing to "hook-response/" + ( your published event name ).  That means if your hook captures everything starting with "my-hooks", but you published "my-hooks/get_weather", then your response event name would be "hook-response/my-hooks/get_weather".
  
 The other important detail from this example is that webhooks right now assumes you're using an embedded device without a lot of ram.  Large web responses are cut into 512 byte pieces, and are sent at a fixed rate of about 4 per second.  This is to make it easier for these low power devices to parse and process responses that otherwise wouldn't fit in ram.


```cpp
    
    // called once on startup
    void setup() {
        Serial.begin(115200);
        
        // setup our subscription to hear the hook response
        Spark.subscribe("hook-response/get_weather", gotWeatherData, MY_DEVICES);
    
        // wait for someone to open a serial monitor
        for(int i=0;i<10;i++) {
            Serial.println("waiting " + String(10-i) + " seconds before we publish");
            delay(1000);
        }
        
        // trigger our webhook
        Serial.println("Requesting Weather!");
        Spark.publish("get_weather");
    }
    
    // called forever really fast
    void loop() {
    
    }
    
    // used by our "subscribe" call up in setup(), gets called when we hear back from our webhook
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


![Librato Welcome Screen]({{assets}}/images/webhooks_librato_example_1.png)



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
      "mydevices": true
    }
```

Create your webhook with the cli by running this in a command prompt.  Make sure you're next to where you created the file.  The webhook will see the special template keywords, and replace them with the values from your published event.

```sh
    spark webhook create librato.json
    > ...
    > Successfully created webhook!
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


<<<TODO: INSERT CLI monitoring screenshot showing success / show user how to pre-verify that things work>>>

<<<TODO: INSERT LIBRATO Metrics screen>>>

<<<TODO: INSERT LIBRATO Metrics graph screen>>>





What gets sent in each request?
===

Since your webhook listens for events from your devices, it can send that event data along to whatever url you specify.  If you don't add any custom options, the hook will send a JSON type POST request with the following values:

```json
    {
        event: "Your event name",
        data: "Your event contents",
        published_at: "When it was published",
        coreid: "Your core ID"
    }
```

<<<TODO: what's the shorthand for this bit again? ".661Z", ISO what?  >>>
published_at is in the form YYYY-MM-DDTHH:mm:ss.661Z


Templates
===

In order to help connect with many different services, you can move these published event values around in your request using simple templates.  You can picture the example above as the following template:
 
 
```json
    {
        event:  "{{SPARK_EVENT_NAME}}",
        data: "{{SPARK_EVENT_VALUE}}",
        published_at: "{{SPARK_PUBLISHED_AT}}",
        coreid: "{{SPARK_CORE_ID}}"
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

A user by default may trigger a hook up to 10 times per minute for every core that is registered to their account.  A user may create up to 20 webhooks in total.



Limits by Hook
---

Any hook that results in an error code from the server (above a 400), 10 consecutive times in a row will be automatically disabled.  We'll be adding notifications, and the ability to pause/unpause when this happens, but for the moment you might notice that your hook stops working for this reason.  


Handling Web Responses
===

Responses from hooks are sent in the following format:

```
    hook-response/<triggering-event-name>/<index>
```

Where the response is cut into some number of chunks of about 512 bytes, and sent back to your device at a rate of one per 250ms, or about 4 per second.  The event name will use the triggering event, and not the registered hook name filter.  If your hook captures everything starting with "my-hooks", but you published "my-hooks/get_weather", then your response event name would be "hook-response/my-hooks/get_weather".  Each packet event name includes the index of the packet in the response.  For example, a large response might appear as:

```

<<<TODO: insert real data here, please show tags split across response packets>>>

hook-response/get-weather/0
    <location>Minneapolis, Minneapolis-St. Paul International Airport, MN</location>
    <weather>Overcast</weather>
    <temperature_string>26.0 F (-3.3 C)</temperature_string>
    <temp_f>26.0</temp_f>
    
hook-response/get-weather/1
    <location>Minneapolis, Minneapolis-St. Paul International Airport, MN</location>
    <weather>Overcast</weather>
    <temperature_string>26.0 F (-3.3 C)</temperature_string>
    <temp_f>26.0</temp_f>
    
hook-response/get-weather/2
    <location>Minneapolis, Minneapolis-St. Paul International Airport, MN</location>
    <weather>Overcast</weather>
    <temperature_string>26.0 F (-3.3 C)</temperature_string>
    <temp_f>26.0</temp_f>
    
hook-response/get-weather/3
    <location>Minneapolis, Minneapolis-St. Paul International Airport, MN</location>
    <weather>Overcast</weather>
    <temperature_string>26.0 F (-3.3 C)</temperature_string>
    <temp_f>26.0</temp_f>
    
```



Errors
===

Error responses from the target url will also be sent back in the response event.  If you have 10 consecutive errors, the hook will send you a "Too many errors, webhook disabled" message.  Make sure you're watching the responses when developing your hook!  You can monitor these with the spark-cli by running:

```
    spark subscribe mine
```

