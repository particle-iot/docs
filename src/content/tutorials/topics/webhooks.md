---
title: Webhooks
template: tutorials.hbs
columns: two
order: 100
---

# {{title}}

This page will include a series of examples of how you can use Particle
webhooks. For an overview of what webhooks are and how they work, check
out our [webhooks guide](/guide/tools-and-features/webhooks/).

## What's the weather like?

This example will show you how to get weather data from the Internet and
send it to a Particle device on demand.

If you're in the United States, you can use weather.gov to [pick your state
and local
station](http://w1.weather.gov/xml/current_obs/).

When you find your local station, locate the _station ID_, which should
be 4-characters long and immediately follow the name of the weather
station. You'll need this ID when creating the webhook a bit later.


### Creating the Webhook

For this example, let's puiblish a `get_weather` event from our devices, and then
have it make a GET request to our weather data url.

You can use the Particle dashboard to create a webhook. Follow [this
link](https://dashboard.particle.io/user/integrations/webhooks/create)
to create a new webhook via the dashboard.

Set the following properties for your new webhook:

- Event Name: <strong>get_weather</strong>
- URL: <strong>http://w1.weather.gov/xml/current_obs/\{{YOUR STATION
  ID}}.xml</strong>
- Request Type: <strong>GET</strong>
- Device: <strong>Any</strong>

Your completed form should look something like this:

![Create Weather Webhook](/assets/images/weather-webhook.png)

Click "Create Webhook" and you're done! Now any of the devices that you
own that publish the `get_weather` event will trigger your webhook.


### The weather firmware

Now it's time to write the firmware that will publish the event that
will trigger the webhook. On a high level, we will trigger the webhook
every 60s, parse the result on the device, and print out the weather
data over [serial](https://docs.particle.io/reference/firmware#serial).

Head over to the [Particle Web
IDE](https://build.particle.io). Create a new App called "get-weather"
and paste in the following code:


```cpp
// called once on startup
void setup() {
    // Begin serial communication
    Serial.begin(115200);

    // Listen for the webhook response, and call gotWeatherData()
    Particle.subscribe("hook-response/get_weather", gotWeatherData,
MY_DEVICES);

    // Give ourselves 10 seconds before we actually start the
    // program.  This will open the serial monitor before
    // the program sends the request
    for(int i=0;i<10;i++) {
        Serial.println("waiting " + String(10-i) + " seconds before we
publish");
        delay(1000);
    }
}

void loop() {

    // Let's request the weather, but no more than once every 60
    // seconds.
    Serial.println("Requesting Weather!");

    // publish the event that will trigger our Webhook
    Particle.publish("get_weather");

    // and wait at least 60 seconds before doing it again
    delay(60000);
}

// This function will get called when weather data comes in
void gotWeatherData(const char *name, const char *data) {
    String str = String(data);
    String locationStr = tryExtractString(str, "<location>",
"</location>");
    String weatherStr = tryExtractString(str, "<weather>",
"</weather>");
    String tempStr = tryExtractString(str, "<temp_f>", "</temp_f>");
    String windStr = tryExtractString(str, "<wind_string>",
"</wind_string>");

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
String tryExtractString(String str, const char* start, const char* end)
{
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

A few things to point your attention to in the firmware:

- `Particle.publish("get_weather")` is what publishes the event we need
  to trigger the webhook
- `Particle.subscribe("hook-response/get_weather" ...)` will receive the
  results of the `GET` request to weather.gov, and handle the response
- The response will be parsed by `gotWeatherData()` and printed over
  serial

When you're ready, flash the firmware to your device by clicking the <i
class="ion-flash"></i> icon.


### See the results

Ensure that your device is connected to your computer via USB, and open
your terminal. If you haven't already, [install the Particle
CLI](/guide/tools-and-features/cli#installing).

When you are sure that the device is now running the webhook firmware,
run `particle serial monitor` from the command line.

You should see output like this once per minute:

```xml
Requesting Weather!
At location: Minneapolis, Minneapolis-St. Paul International Airport, MN
The weather is: A Few Clouds
The temp is: 15.0 *F
The wind is: from the Northwest at 19.6 gusting to 28.8 MPH (17 gusting
to 25 KT)
```

Congrats! You are sending real-time weather data to your Particle device.
