---
word: Webhooks
title: Webhooks
order: 14
---

Webhooks
==========

Introduction
===

You've built an amazing device, to be paired with a powerful application online, and you're looking for a way to connect them.  You're in the right place!

Webhooks listen for events from your devices, and then make a request to somewhere online.  They make it easy to connect with anything online that accepts a web request style integration (which by now is most things).  So let's show you how to say, log events published from your devices, or let your devices make secure requests anywhere on the internet.

If you're totally new to Spark, that's okay!  Checkout our [Getting started guide here](http://docs.spark.io/start/) or our [Spark Basics tutorial](http://cmsunu28.gitbooks.io/spark-basics/content/), and come back when you're ready.

Lets go!



Seriously what's a web request?
====

When you surf the internet, you are riding a continuous wave of web requests. Browsers make requests to web servers, which send information back that allow you to view, point, click, and interact. When you loaded this page, your browser sent a "GET" request to our web server to ask to display the site. Our server recognized the information in that "GET" request, and it sent the page back to your browser.

There are many different kinds of web requests. Most of your average requests to view a page or browse around online are "GET" requests.  This is all part of that hypertext ```http://``` thing that is at the front of the address in your browser.  When you fill out and submit a form, your browser tends to send "POST" requests.  POST requests are usually for sending data to a server.  You can read more about all the different types [here](http://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol#Request_methods).

Imagine that you could use your devices to make these requests. You could grab or send values to any web service or site with something as simple as ```Spark.publish("lets go!");``` That's what we are going to teach you to do with Webhooks.


Installing the CLI
===

We're still building the beautiful, intuitive web interface for creating and managing webhooks, but we didn't want you to wait any longer.  Here's a way you can use it without the web interface, using the terminal and the Spark Command Line Interface (Spark-CLI).

For those of you who have used the Spark-CLI in the past, you're all set! If you are a CLI newcomer, install it by following [these instructions](http://docs.spark.io/cli/#installing).

You'll also need some basic knowledge of the terminal. Adafruit has a [lovely intro to the command line](https://learn.adafruit.com/what-is-the-command-line/overview) that beginners may find helpful.




Your first Webhook (Showing the weather)
===

Lets grab and display some weather data, that's fun!

If you're in the US, pick your state and area [here](http://w1.weather.gov/xml/current_obs/), if you're somewhere else, try to find a weather service site that is open to being accessed from your device, and can send a simple text report.


Creating the Webhook
-----

Remember that Webhooks listen for events from your devices and then make requests based on those events. We want this webhook to listen for an event called `get_weather` from our device, and then we want it to make a GET request to the weather site server.

Hop on the terminal, download and update the Spark-CLI if you haven't yet, and type `spark login` to log in. Then:

```sh

    # create the webhook on the command line with spark-cli
    # the syntax is:
    #    spark webhook GET <your_event_name> http://<website.you.are.trying.to.contact>
    # in this case, the request will be:
    #    spark webhook GET get_weather http://w1.weather.gov/xml/current_obs/<your_local_weather_station_here>.xml
    # our local weather station is KMSP, so we will enter the following:
    spark webhook GET get_weather http://w1.weather.gov/xml/current_obs/KMSP.xml 
    
```

This webhook will now be triggered when we publish "get_weather" from any of our devices.

Now, let's write some firmware!


The weather displaying firmware
-----

```cpp
    
    void setup() {
        // First, we are going to set up serial data transmission.
        // Serial allows us to listen in on our device over USB and get updates.
        // In this example, we will use Serial communication to display the data our Webhook fetches
        // but you could just as easily display it in a webpage or pass the data to another system.
        // We set up Serial using:
        Serial.begin(115200);
        // Now, when we write commands that begin with Serial, such as
        //     Serial.println('Hello, World!')
        // we will be able to see the result when we open a serial monitor.
        // You can open a serial monitor on your computer by using the Spark-CLI.
        // Open a terminal window and type:
        //    spark serial monitor
        // If you only have one device connected via serial, your device should open automatically.
        // Otherwise, you will have to select which serial port is being used.
        
        // Next, we will set up our subscription to hear the hook response
        // (We registered this webhook earlier using the Spark-CLI)
        Spark.subscribe("hook-response/get_weather", gotWeatherData, MY_DEVICES);
    
        // We will give the system 10 seconds before we actually start the program.
        // This for loop will make us wait 10 seconds and count down until the program starts.
        // That will just give us a chance to open the serial monitor before the program publishes anything.
        for(int i=0;i<10;i++) {
            Serial.println("waiting " + String(10-i) + " seconds before we publish");
            delay(1000);
        }
        
    
    void loop() {
    
        // We're goign to request the weather here.
        // Let's do it only every 20 seconds.
        
        // First, write to the serial monitor that we are requesting weather...
        Serial.println("Requesting Weather!");
        
        // Then, actually publish the event that gets the weather...
        Spark.publish("get_weather");
        
        // ...and wait 20 seconds before you do it again.
        delay(20000);
        
        // If we wanted our webhook to be triggered by a button press,
        // we could put an if statement here instead so that 
        //     Spark.publish("get_weather")
        // is only called when the button is pressed

    }
    
    // Now we are going to define a function to handle the weather data when it comes in and make it look pretty
    // Don't worry too much about the details of this; basically just know that it makes the data pretty for the Serial monitor
    void gotWeatherData(const char *name, const char *data) {
        //Important note!  This assumes we're getting our info in whole chunks, and doesn't work when the chunks are split.
        //Sample data:
        // <location>Minneapolis, Minneapolis-St. Paul International Airport, MN</location>
        // <weather>Overcast</weather>
        // <temperature_string>26.0 F (-3.3 C)</temperature_string>
        // <temp_f>26.0</temp_f>
    
        
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









Webhook Options
===

You can even customize the Webhook to send custom headers, form fields, and more. This section explains what's available and how to use them all!

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

Web requests via webhooks can go almost anywhere on the internet, with any service, which is awesome.  In being responsible members of the Internet community, we want to make sure we're not sending unwanted requests to sites, or sending too much traffic, or causing errors.  For this reason we ask that you make sure you have permission to make requests to any sites you configure hooks for, and that you're sending those requests within their usage policies.  We will generally disable any hooks, or adjust rate limiting if we hear from site administrators that contact us about issues.

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


