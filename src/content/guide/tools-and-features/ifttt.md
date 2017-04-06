---
word: IFTTT
title: IFTTT
order: 6
shared: true
columns: two
layout: guide.hbs
---

# Particle Channel on IFTTT

## Introduction

Anything you build with Particle is now easily available on IFTTT! IFTTT is a service that lets you create powerful connections with one simple statement: "If this then that."  There is a great introduction to their ecosystem [on IFTTT's website](https://ifttt.com/wtf). Go check it out if you haven't already, it's super helpful.

The Particle Channel on IFTTT will let you connect your devices to other powerful channels. You can now easily send and receive tweets, SMS, check the weather, respond to price changes, monitor astronauts, and much, much more. This page is a reference for you to use as you get your Particle Recipes set up.

If you're totally new to Particle, that's okay! Before you get going on the Particle channel, be sure to get your Photon or Core connected and claimed. [Get started here](/guide/getting-started/start).

Lets go!

## Parts of an IFTTT Recipe

### What are triggers?

Triggers are the _this_ part of a Recipe. Triggers are how IFTTT knows when to run your recipe. A trigger can be as conceptually simple as "is x greater than 5?" or "did I get new email?", and they frequently are!

### What are actions?

Actions are what IFTTT does when the answer to your trigger question is "yes!" When set up, you can have IFTTT email you, post for you, save info to Dropbox, or many other useful functions.

### What are Recipes?
A combination of a Trigger and an Action. IFTTT lets you connect triggers to actions.  Did someone tweet something interesting (that's a trigger), then turn my disco ball on (that's an action).

### What are ingredients?

Ingredients are pieces of data from a Trigger. Ingredient values are automatically found by IFTTT using certain aspects of your device and/or firmware. These pieces of data can be used when setting up the Action that goes with your created Trigger. For Particle, ingredients will often include the name you've given your Core or Photon, the time that the trigger occurred, and any data that trigger returned.

Other IFTTT channels will provide (and sometimes automatically insert) their own ingredients. If ingredients are available, they can be found in the blue Erlenmeyer flask icon next to the relevant input box.

### Before you build with Particle + IFTTT

**Firmware is key**: IFTTT will pull directly from the firmware that is currently flashed to your devices. It will only show functions,variables,etc from firmware that is currently flashed to one of your devices. That means that if, for example, you're trying to use the "Monitor a Function" Trigger you'll need to have flashed firmware to your board that includes Particle.function().

**But what if I want to try this without writing firmware?** We recommend starting with the Monitor a Device Status Trigger. You can use this Trigger with the firmware that came with your device.

**Okay, I'm ready to build my own firmware. Where do I start?** Get to know [the web IDE](http://build.particle.io/) and explore the Particle [community site](http://community.particle.io/) for great tutorials, examples and advice on projects.

## Triggers

### New Event Published

```C++
// SIMPLEST SYNTAX
Particle.publish(String eventName);

// EXAMPLE DEVICE CODE
Particle.publish("Boiling!");


// SYNTAX FOR SENDING DATA
Particle.publish(String eventName, String data);

// EXAMPLE DEVICE CODE
Particle.publish("Boiling!", "212");


// THE COMPLETE VERSION, useful for making events private
Particle.publish(String eventName, String data, int ttl, PRIVATE);

// EXAMPLE DEVICE CODE
Particle.publish("Boiling!", "212", 60, PRIVATE);

```

#### Firmware requirements

To use this Trigger, firmware must include Particle.publish(). Complete documentation on using [Particle.publish() is here.](/reference/firmware/#particle-publish-)

A word of caution - firmware loops quickly, so it's very easy to run publish() too frequently. You'll trigger your IFTTT recipe 100 times in a blink, and if you publish() more than once a second then the Particle Cloud will briefly disable further publishes. Make sure to think through the logic of your code so that it only publishes when you actually want it to.

### Trigger fields

**If (Event Name):** The name you gave to Particle.publish() in your firmware. Also referred to as topic, name or channel.

**is (Event Contents): ** *Optional* Any data you included with your Particle.publish call from firmware.

**Device Name or ID:** This dropdown menu will be automatically populated with the names of Particle devices that are claimed to your account and are loaded with firmware.

#### Ingredients

**EventName:** The name you gave to Particle.publish("name") in your firmware.

```
// EXAMPLE EVENT NAME
allbuttons
```
**EventContents:** What data the event contained *optional*

```
// EXAMPLE CONTENTS
"on"

```
**DeviceName:** The name you provided when you claimed your Particle device.

```
// EXAMPLE DEVICE NAME
MyDevice
```

**CreatedAt:** Date and time the event was published

```
// EXAMPLE TIMESTAMP
January 12, 2015 at 6:59pm
```

### Monitor a variable


#### Firmware requirements
Monitoring variables is also a simple way to get going. You'll need to create a variable at the top of your code, call Particle.variable() using the format to the right in the setup() function, and then you're good to go.

Complete documentation on using [Particle.variable() is here.](/reference/firmware/#particle-variable-)

```C++
// EXAMPLE SHOWING THREE DATA TYPES
int analogvalue = 0;
double tempC = 0;
char *message = "my name is particle";

void setup()
{
  // variable name max length is 12 characters long
  Particle.variable("analogvalue", &analogvalue, INT);
  Particle.variable("temp", &tempC, DOUBLE);
  Particle.variable("mess", message, STRING);
  pinMode(A0, INPUT);
}

void loop()
{
  // Read the analog value of the sensor (TMP36)
  analogvalue = analogRead(A0);
  //Convert the reading into degree celcius
  tempC = (((analogvalue * 3.3)/4095) - 0.5) * 100;
  delay(200);
}
```

#### Trigger fields

**If (Variable Name):** Select the Particle.variable you'd like to use from an automatically populated dropdown menu. These options will be pulled from the firmware flashed to your claimed devices. No options will be displayed if your devices don't have Particle.variable()s defined, so check your code and reflash your firmware if it's empty.

```
// EXAMPLE VARIABLE NAME
temperature
```

**is (Test Operation):** Select a comparison based on a dropdown menu with options: greater, less than, equals, greater or equal, less or equal


**Comparison Value (Value to Test Against):** The value that you are comparing with your Particle.variable().
```
// EXAMPLE VALUE
90
```

#### Ingredients

**Value:** The actual value of your variable. While your trigger will be doing a comparison, you can also use the value it returned in your action. This is useful for logging to email, Dropbox, or spreadsheets.

```
// EXAMPLE VALUE
72
```

**Variable:** The name of the Particle.variable that you are measuring.

```
// EXAMPLE VARIABLE NAME
temperature
```

**DeviceName:** The device the variable came from.

```
// EXAMPLE DEVICE NAME
MyDevice
```

**CreatedAt:** Date and time the event was created.

```
// EXAMPLE TIMESTAMP
January 17, 2015 at 7:52am
```

### Monitor a function result

```cpp
// SYNTAX TO REGISTER A PARTICLE FUNCTION
Particle.function("cloudNickname", firmwareFunctionName);
//                ^
//                |
//     (max of 12 characters long)

// EXAMPLE USAGE
int brewCoffee(String command);

void setup()
{
  // register the Particle function
  Particle.function("brew", brewCoffee);
}

void loop()
{
  // this loops forever, doing nothing
}

// this function automagically shows up in IFTTT
int brewCoffee(String command)
{
  // look for the matching argument "coffee" <-- max of 64 characters long
  if(command == "coffee")
  {
    //things you want it to do
    activateWaterHeater();
    activateWaterPump();

    //Returns the value "1" if it was successful
    return 1;
  }
  else return -1;
}
```
Your Particle.function()s can be used in several ways with IFTTT. You can send a value to your function to look up data, perform behaviors before taking a measurement, or ask for something to happen and get a response when it's successful.

#### Firmware requirements
All of the details are covered in the example to the right. Just remember to declare a function at the top of your code, make it Particle.function() in setup(), and then declare what the function does down below. Currently, only the first 4 Particle.function()s that you register will show up in IFTTT.

Complete documentation on using [Particle.function() is here.](/reference/firmware/#particle-function-)


#### Trigger fields

**If the output value of (Function Name):** The name of your function.
```
// EXAMPLE USAGE
allLedsOn()
```

**when you send it (Value):** *Optional* This is the data you're giving to the Particle.function() in your firmware.
```
// EXAMPLE USAGE, RGB VALUES FOR COLOR
100,100,100
```

**is (Test Operation):** Select a comparison based on a dropdown menu with options: greater, less than, equals, greater or equal, less or equal

**Comparison Value:** The value that you are comparing with your Particle.function result.

#### Ingredients

**FunctionName:** The function you just called.

```
// EXAMPLE USAGE
allLedsOn
```

**FunctionResult:** The number returned when you call the function. This may be a value from a sensor, or it could be a 0 or 1 which will confirm whether your function occurred.

```
// EXAMPLE USAGE
1
```
**DeviceName:** The device the variable came from.

```
// EXAMPLE USAGE
MyDevice
```
**CreatedAt:** Date and time the event was created.
```C++
// EXAMPLE TIMESTAMP
May 2, 2013 at 9:02am
```

### Monitor your device status

#### Firmware requirements
You must have firmware on your Particle device, but nothing else is necessary. Basically, you're fine unless you've actively wiped your device.


#### Trigger fields

**If (Device Name or ID:** This dropdown menu will be automatically populated with the names of Particle devices that are claimed to your account and are loaded with firmware.

  **is (Status of your device):** Selected from a dropdown menu - either online or offline.

#### Ingredients

  **DeviceName:** The name of the device that changed status

  ```C++
  // EXAMPLE USAGE
  MyDevice
  ```

  **Status:** Indicates whether your device is online or offline

  ```C++
  // EXAMPLE USAGE
  Offline
  ```

  **CreatedAt:** Date and time that the status change occurred

  ```C++
  // EXAMPLE TIMESTAMP
  November 13, 2015 at 6:02pm
  ```

## Actions

### Publish an event

#### Firmware requirements

  This action has IFTTT publishing an event, so your Particle device needs to subscribe to that event. These are complementary; a Particle.subscribe("myEventName") watches for a publish("myEventName") and runs a function when it sees this matching event name. This means that even though this action is called *Publish* an event, your firmware needs to include Particle.subscribe().

  ```cpp
  int i = 0;

  void myHandler(const char *event, const char *data)
  {
    i++;
    Serial.print(i);
    Serial.print(event);
    Serial.print(", data: ");
    if (data)
    Serial.println(data);
    else
    Serial.println("NULL");
  }

  void setup()
  {
    Particle.subscribe("temperature", myHandler);
    Serial.begin(9600);
  }
  ```

  To use `Particle.subscribe()`, define a handler function and register it in `setup()`.

  ---

  You can listen to events published only by your own Cores by adding a `MY_DEVICES` constant.

  ```cpp
  // only events from my Cores
  Particle.subscribe("the_event_prefix", theHandler, MY_DEVICES);
  ```

  Complete documentation on using [Particle.subscribe() is here.](/reference/firmware/#particle-subscribe-)

#### Action fields

  **Then publish (Event Name):** This may be autopopulated by the Trigger you have chosen, however you'll want to delete that and write in the Event Name that you have defined in your firmware. Also known as topic, event name, or channel.

  ```C++
  // EXAMPLE USAGE
  temperature
  ```

  **The event includes (Data):** *Optional* The data that comes along with the event - a temperature value or sensor measurement for example.

  **is this a public or private event?** Select either private or public.


### Call a function

  It's important to note that if you turn off the board that is attached to this action while your recipe is still live, the IFTTT servers may disable your recipe. This is easy to fix, just turn it back on again. Your default IFTTT settings are set up to send you an email when your recipe encounters a serious issue (like not having a device to run the requested function). You can always change these by clicking on your username at the top of the IFTTT menu and selecting "Preferences".

#### Firmware requirements

  This is very similar to using a Particle.function() as a trigger, only you won't be using any values it returns. The same setup on the firmware side, and the example code above for Particle.function() as trigger, will work for this as well.

  Complete documentation on using [Particle.function() is here.](/reference/firmware/#particle-function-)

#### Action fields

  **Then call (Function Name):** Select the function you'd like to use from the options in a dropdown menu. These options will be pulled from the Particle.function()s that are in the firmware flashed to any of your claimed Cores or Photons. IFTTT will list the first 4 function()s defined in your firmware.

  ```C++
  // EXAMPLE USAGE
  brew
  ```

  **with input (Function Input):** This is an optional field. It may be automatically populated with ingredients from the trigger that you chose (i.e. Twitter may put in something like "Favorite tweet: TweetEmbedCode"). If you don't have specific code in your function() to use this data, it's best to delete it. There will be cases when you'll want to send some specific input.

## FAQs

  - How often should I expect IFTTT to check my triggers?

  After you create a recipe we'll check functions or variables once a minute and then notify IFTTT right away if your trigger happens.  Other channels will frequently take a while (up to 15 minutes) to trigger or perform their action.

  - IFTTT says there is an error or something in my recipe log... what gives?

  Make sure your device is online and still running firmware that has the (event, function, variable, etc) that you linked in your recipe.  If your device isn't connected when IFTTT tries to call a function, it won't work.

  - I don't see my function in the list on IFTTT?

  Make sure you flashed your firmware to your device with the function you've exposed, and try refreshing the IFTTT page.  You can confirm what functions are available using [Particle Dev](/guide/tools-and-features/dev/) and clicking the 'Cloud variables and functions' menu or in the [Particle-CLI](/guide/tools-and-features/cli) by running `particle list`

  - Why can I log in on build.particle.io, but I can't log in on IFTTT?

  Try just once more, and make sure that you're typing your username and password exactly how you entered it when creating your account.  The build site is a little more forgiving than others at the moment.


**Also**, check out and join our [community forums](http://community.particle.io/) for advanced help, tutorials, and troubleshooting.

{{#if photon}}
[Go to Community Forums >](http://community.particle.io/c/troubleshooting)
{{/if}}

{{#if core}}
[Go to Community Forums >](http://community.particle.io/c/troubleshooting)
{{/if}}
