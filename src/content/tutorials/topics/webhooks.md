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


### Creating the webhook

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


### The firmware

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

## Graphing data in Librato

Librato is great service that lets you quickly track and graph any data over time.  This example requires you have an account with them first. You can [signup for a free trial from Librato](https://metrics.librato.com/sign_up) to get started.

When you first sign up, Librato will direct you to a setup wizard that is really meant more for cloud infrastructure monitoring, not IoT device data. Find "I'm a Librato Pro! Take me to the API Tokens" on the bottom of the first screen and click the link to skip the onboarding process.

This will direct you to your API Tokens page (If you already have a Librato account, log in and navigate to Integrations --> API Tokens). You'll need an API token to authenticate with Librato when sending your webhook. You should see a token named "Autogenerated by Librato."

Click on the token's name to expose a pane that includes the full API token.

![Librato Token](/assets/images/librato-token.png)
<p class="caption">Your API Token will grant you access to Librato's Metrics API</p>

Copy the token and put it somewhere easily accessible. You'll need it when creating the webhook in the next step.

### An example librato Webhook

For this example, we will be using the Particle CLI to create the Librato webhook. It is also entirely possible to use the Particle Dashboard to create this webhook.

Create a text file and name it librato.json, and paste in this example.  Make sure you replace the Librato username, and API Token as well.

```json
{
    "event": "librato_",
    "url": "https://metrics-api.librato.com/v1/metrics",
    "requestType": "POST",
    "auth": {
        "username": "YOUR_LIBRATO_USERNAME",
        "password": "YOUR_LIBRATO_API_TOKEN"
    },
    "json": {
        "gauges": [
            {
                "name": "\{{PARTICLE_EVENT_NAME}}",
                "value": "\{{PARTICLE_EVENT_VALUE}}",
                "source": "\{{PARTICLE_DEVICE_ID}}"
            }
        ]
    },
    "mydevices": true
}
```



Use the `particle webhook create` command in your terminal to create the Webhook.  Make sure you're in the same folder as where you created the file.  The Webhook will see the special template keywords, and replace them with the values from your published event.

```sh
# example of creating the hook
particle webhook create librato.json
> ...
> Successfully created webhook!
```



### The example data logging code!

Here's the fun part, hook anything up to your device!  A motion sensor, temperature sensor, a switch, anything that generates some data that you're interested in tracking over time.  You can also leave the pins floating and measure the floating pin too!  Our example code will assume you have something interesting happening on A0.  This firmware waits 10 seconds, reads pin A0, and then publishes the value to your Webhook.

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
    Particle.publish("librato_A0", String(value), 60, PRIVATE);

    lastPublish = now;
}
```

After you flash the firmware to your device, open up the Particle CLI, and subscribe to your events with `particle subscribe mine`, you should see something like:

[![Testing the events first]({{assets}}/images/webhooks-librato-cli-example.png)]({{assets}}/images/webhooks-librato-cli-example.png)

Once you've created the Webhook, and some events are coming through successfully, your metric should show up in your metrics list:

![Librato Metrics Screen]({{assets}}/images/librato-metric.png)

Click on that metric, and congrats!  Your sensor data is now readily available to you in Librato!

![Librato Metric Result]({{assets}}/images/librato-metric-result.png)
