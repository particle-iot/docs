---
title: Maker Kit
template: tutorials.hbs
columns: two
order: 10
---

# {{title}}

This section provides tutorials for new users of the [Particle Maker Kit](https://store.particle.io/collections/shields-and-kits#particle-maker-kit) to get started quickly and build some projects using the contents of the kit.

![Photon Maker Kit](/assets/images/maker-kit-box.jpg)

## Tutorial #1: Web-connected servo gong

In this beginner tutorial, you’ll learn how to connect the Maker Kit servo to your Photon, and how to control it via the web using the [Do Button](https://ifttt.com/products/do/button) app on your smartphone to ring a gong or other noise-making object.

<iframe width="500" height="180" src="https://www.youtube.com/embed/SAE3dq_ChZw?rel=0" frameborder="0" allowfullscreen></iframe>

```
Note: see if we can make the video larger on the page or open in a lightbox type thing.
```

This tutorial assumes you’ve gone through the [Getting Started](/guide/getting-started/intro/photon/) guide, have set up your Photon, and are familiar with using the online IDE. If not, head over there first.

### What you'll need

In addition to your Maker Kit, you’ll need something that makes noise, like a bell or wine glass or gong, and something to strike it with, like a chopstick or mallet if you have one. You’ll also need some tape. We're using a wine glass in this example because it's something most people have, but a real gong or singing bowl provides the best sound.

![Maker Kit, wine glass, chopstick, and tape](/assets/images/maker-kit-servo-wineglass-chopstick-tape.jpg)

### Prepare the servo

Find the servo in your Maker Kit.

![Emax ES08A II Servo from the Particle Maker Kit](/assets/images/maker-kit-servo-box.jpg)

Use tape to attach the chopstick to the long white servo horn, then attach the servo horn to the servo by pressing it onto the servo drive gear.

![Attach the servo horn with the chopstick to the servo](/assets/images/maker-kit-attach-horn-to-servo.jpg)

### Connect the servo to the Photon

Insert jumper wires into the servo connector. It's easiest to use jumper wires whose colors match the color of the servo's wires.

![Insert jumper wires into the servo connector](/assets/images/maker-kit-servo-wires.jpg)

Connect the the black jumper wire to the GND pin on the Photon, the red wire to the Vin pin, and the yellow wire to D0.

![Insert jumper wires into the breadboard](/assets/images/servo-fritzing.png)

### Flash code to the Photon

Now that the servo is connected electrically, we’ll connect it in software. Log into the [Particle online IDE](http://build.particle.io) and make a new app. Copy and paste the example code below into the new file.

```
Servo myservo;  // create servo object to control a servo
                // a maximum of eight servo objects can be created

int pos = 0;    // variable to store the servo position

void setup()
{
    Particle.function("gong", gong);  // create a function called "gong" that
                                      // can be called from the cloud
                                      // connect it to the gong function below

    myservo.attach(D0);   // attach the servo on the D0 pin to the servo object
    myservo.write(25);    // test the servo by moving it to 25°
    pinMode(D7, OUTPUT);  // set D7 as an output so we can flash the onboard LED
}

int gong(String command)   // when "gong" is called from the cloud, it will
{                          // be accompanied by a string.
    if(command == "now")   // if the string is "now", ring the gong once.
    {                            
        myservo.write(0);       // move servo to 0° - ding!
        digitalWrite(D7, HIGH); // flash the LED (as an indicator)
        delay(100);             // wait 100 ms
        myservo.write(25);      // move servo to 25°
        digitalWrite(D7, LOW);  // turn off LED
        return 1;               // return a status of "1"
    }
    else if(command == "alarm")     // if the string is "alarm",
    {                               
        for (int i = 0; i < 3; i++) // ring the gong 3 times.
        {
            myservo.write(0);       // move servo to 0° - ding!
            digitalWrite(D7, HIGH); // flash the LED
            delay(100);             // wait 100 ms
            myservo.write(25);      // move servo to 25°
            digitalWrite(D7, LOW);  // turn off LED
            delay(1000);            // wait 1 second between gongs
        }
        return 2;                   // return a status of "2"
    }
}

void loop()
{
  // empty because we call the gong function via the cloud
}
```
Save the code, then flash the firmware to the Photon. (If you have multiple Photons, click the **Devices** icon in the sidebar and put a **star** next to the Photon you'd like to upload to.) The servo should move a little bit, which indicates that it's connected correctly.

### Set up remote control

One of the easiest ways to control a Particle device remotely is by using the [Do Button](https://ifttt.com/products/do/button). The Do Button is a smartphone app made by [IFTTT](http://ifttt.com) (If This Then That) that can be set to trigger events, which they call recipes, when you press the button inside the app. In this case, we’ll make a recipe that activates the servo.

First, download the Do Button app to your phone, make an account or log into your existing IFTTT account if you have one, and flip through the examples in the app. (Optionally, swipe left on the example recipe to delete it and reduce clutter.)

Next, make a new recipe in the Do Button app:

![Create a new Do Button recipe](/assets/images/new-do-button-recipe-numbers.png)

1. Click the **+** button to start a new recipe
2. Find **Particle** under Channels
3. Tap **Create a New Recipe**
4. Tap **Call a Function**

If this is your first time using IFTTT with Particle, you'll be prompted to enter your Particle username and password so that IFTTT can connect to your Particle account and all your devices. Then you'll return to the Do Button app to finish the recipe.

![Connect Particle to IFTTT](/assets/images/connect-particle-to-ifttt-numbers.png)

1. Tap **Continue** to start process of connecting IFTTT to Particle
2. Enter your Particle username and password, then tap **Sign In**
3. Tap **Okay** to connect your accounts
4. Enter a **title** for your recipe
5. Select the **gong** function
6. Under Input, enter “**now**” to match the command in our code
7. Tap **Add** to finish creating the recipe.

### Test it!

Now tap the Do Button and watch what happens (sometimes it takes 5-10 seconds). The little LED next to pin D7 should blink and the servo should move. Congratulations, you just actuated a servo over the internet! If the LED blinks but the servo doesn't move, check the wiring from your servo to the Photon.

![Do Button app ready next to servo](/assets/images/maker-kit-servo-gong-set-up.jpg)

There are a few ways to secure the servo so it swings the chopstick properly. Taping it to the side of the breadboard works pretty well in a pinch, but the servo also comes with mounting screws if you have something to mount it to. If you're taping it to the breadboard, you'll also want to put a rolled-up piece of tape under the breadboard so it doesn't move.

### Going further

You can also do other fun things using IFTTT without the Do Button, such as turning this gong into an alarm that goes off at 8am:

![Making an alarm recipe in IFTTT](/assets/images/ifttt-alarm-recipe.jpg)

1. Log into [ifttt.com](http://ifttt.com)
2. Make a new recipe
3. Choose **Date and Time** as the trigger
4. Choose **Particle** as the action
5. Choose **Call a function**
6. Select the **gong** function
7. Enter "**alarm**" in the input field (the code makes it ring three times instead of one)
8. Click **Create Action**, then click **Create Recipe** to finish the process

Discover more projects at [particle.hackster.io](http://particle.hackster.io), and join our community at [community.particle.io](http://community.particle.io).

### Troubleshooting

**I don't see my function listed when making my Do Button recipe.** This can happen if you connect IFTTT to your Particle account before flashing code to your Photon, or if you add a new Photon to your account after connecting IFTTT. This can often be fixed by going to [ifttt.com/particle](https://ifttt.com/particle) and clicking the **Reconnect Channel** button.

**When I press the Do Button, the D7 LED blinks but the servo doesn't move.** IFTTT is communicating successfully with the Photon, but the Photon is not communicating with the servo. Double-check your wiring: the servo's brown or black wire should go to GND, the orange wire to Vin, and the yellow wire to D0.

**When I press the Do Button, nothing happens.** If you were able to successfully create a recipe for your device but nothing happens when you press the Do Button, try moving your device closer to your wifi router or access point.

**I get an error when I try to flash the code to my Photon.** There could be many reasons for this. If your Photon is not breathing cyan, check the [device modes guide](https://docs.particle.io/guide/getting-started/modes/photon/). Search our [forums](http://community.particle.io) for your error or ask a question, or send an email to [support@particle.io](mailto:support@particle.io) with your error message.

## Tutorial #2: Display next bus time on the OLED screen

Welcome to the second tutorial in our Maker Kit tutorial series. In this tutorial, you’ll use Particle webhooks to get the estimated time until the bus comes to a stop of your choosing. Then you’ll display it on the Maker Kit OLED screen with fancy marquee scrolling, which is made possible by the use of a software timer.

### Discover your prediction URL

The **NextBus Public XML Feed** allows anyone to get prediction times for many municipal transit agencies. But in order to use it to get times for a specific bus at a specific stop, we first have to use the feed itself to figure out what information to send to it. NextBus provides a [document](https://www.nextbus.com/xmlFeedDocs/NextBusXMLFeed.pdf) that shows how to enter query URLs to get back the information we need. While the document may look intimidating, setting up our prediction URL only requires five relatively simple steps, all of which can be done with a web browser. We'll look up the agency tag, find the route tag, find the stop tag, and finally create the full prediction URL. The relevant URLs have been pulled from the document and into the steps below, but feel free to reference the indicated page numbers if you'd like more information.

1. Choose the **agency**, **bus route**, and **bus stop** that you’d like to get times for. For this example, we'll use the Santa Clara Ave & Crescent St stop for the AC Transit #57 bus in Oakland, California.

2. Use the following URL to locate your transit **agency tag**: [http://webservices.nextbus.com/service/publicXMLFeed?command=agencyList](http://webservices.nextbus.com/service/publicXMLFeed?command=agencyList) (see page 8).
>    
>    **Example:** the agency tag for AC Transit is `actransit`.

3. Find your **route tag** by replacing `AGENCYTAG` in the following URL with the agency tag from Step 2:
[http://webservices.nextbus.com/service/publicXMLFeed?command=routeList&a=AGENCYTAG](http://webservices.nextbus.com/service/publicXMLFeed?command=routeList&a=AGENCYTAG) (see page 8).
>    
>    **Example:** For AC Transit, the URL would look like this:
>    [http://webservices.nextbus.com/service/publicXMLFeed?command=routeList&a=actransit](http://webservices.nextbus.com/service/publicXMLFeed?command=routeList&a=actransit)
>    The route tag for the #57 bus in this example is `57`.

4. Find your **stop tag** here: [http://webservices.nextbus.com/service/publicXMLFeed?command=routeConfig&a=AGENCYTAG&r=ROUTETAG](http://webservices.nextbus.com/service/publicXMLFeed?command=routeConfig&a=AGENCYTAG&r=ROUTETAG). Replace `AGENCYTAG` with your agency tag and `ROUTETAG` with your route tag (see page 9).
>    
>    **Example:** For AC Transit’s 57 bus, the URL would look like: [http://webservices.nextbus.com/service/publicXMLFeed?command=routeConfig&a=actransit&r=57](http://webservices.nextbus.com/service/publicXMLFeed?command=routeConfig&a=actransit&r=57).
>    The stop tag for Santa Clara Ave & Crescent St in Oakland is `1018530`. If you know your **stop ID** (it’s printed on bus stop signs and can also be located via Google Maps), you can search for it on the page to verify you have the right stop.

5. Create your full **prediction URL** by substituting in your agency tag, route tag, and stop tag into the following URL: [http://webservices.nextbus.com/service/publicXMLFeed?command=predictions&a=AGENCYTAG&r=ROUTETAG&s=STOPTAG](http://webservices.nextbus.com/service/publicXMLFeed?command=predictions&a=AGENCYTAG&r=ROUTETAG&s=STOPTAG) (see pages 13 - 15).
>    
>    **Example:** Using the examples in steps 1-4, we get [http://webservices.nextbus.com/service/publicXMLFeed?command=predictions&a=actransit&r=57&s=1018530&useShortTitles=true](http://webservices.nextbus.com/service/publicXMLFeed?command=predictions&a=actransit&r=57&s=1018530&useShortTitles=true).

Your data should look like this:
```
<body copyright="All data copyright AC Transit 2016.">
<predictions agencyTitle="AC Transit" routeTitle="57" routeTag="57" stopTitle="Santa Clara Av & Crescent St" stopTag="1018530">
<direction title="To Emeryville Public Market">
<prediction epochTime="1467312925628" seconds="10" minutes="0" isDeparture="false" dirTag="57_13_1" vehicle="2018" block="57008" tripTag="4722183"/>
<prediction epochTime="1467313850776" seconds="935" minutes="15" isDeparture="false" dirTag="57_13_1" vehicle="2050" block="57010" tripTag="4722088"/>
<prediction epochTime="1467314908196" seconds="1993" minutes="33" isDeparture="false" dirTag="57_13_1" vehicle="2001" block="57001" tripTag="4722114"/>
<prediction epochTime="1467315592048" seconds="2676" minutes="44" isDeparture="false" affectedByLayover="true" dirTag="57_13_1" vehicle="2218" block="57003" tripTag="4722223"/>
<prediction epochTime="1467316406048" seconds="3490" minutes="58" isDeparture="false" affectedByLayover="true" dirTag="57_13_1" vehicle="2107" block="57005" tripTag="4722144"/>
</direction>
<message text="Service changes 6/26. For info visit actransit.org or call 510-891-4777" priority="Normal"/>
</predictions>
</body>
```

If you get data that looks like the data below, your URL is not formed correctly:
```
<body copyright="All data copyright agencies listed below and NextBus Inc 2016.">
<Error shouldRetry="false">
agency parameter "a" must be specified in query string
</Error>
</body>
```
If you get an error, the feed will give you an indication of what's wrong. In the example error above, it didn't get an agency tag. Check your URL to make sure you haven't deleted any of the & or = symbols, and that everything is spelled correctly.

If it works, you're done creating your prediction URL!

### Create a webhook to retrieve prediction times

Great, so we’ve got our prediction URL and we can access it from a browser, but how do we access it from the Photon? The answer is to use a **webhook**.

Currently, webhooks can only be created via the Particle command line interface **(CLI)**. To install the Particle CLI for Windows, simply [download the installer](https://www.particle.io/cli). For Mac and Linux, first install [Node.js](https://nodejs.org/en/download/), then open a Terminal and enter `sudo npm install -g particle-cli` to install the CLI (you'll need to enter your password).

Now we'll use the CLI to create a webhook to retrieve prediction times. In your Terminal (Windows users hit **[Windows Logo Key] + R** and enter **CMD** in the Run box to open a command prompt), enter the following command (substitute with your prediction URL): `particle webhook GET get_nextbus http://webservices.nextbus.com/service/publicXMLFeed?command=predictions\&a=actransit\&r=57\&s=1018530\&useShortTitles=true` **(note the use of \& instead of just &. Backslashes are required in order for the URL to be interpreted correctly)**.

You’ll get some output that ends with `“Successfully created webhook with ID XXXXX...”` Great! Your webhook is created. Now let’s access it from the Photon.

### Code

```
/*****************************************************************************
Particle Maker Kit Tutorial #2: Next Bus Alert

This tutorial uses a Particle Photon and the OLED screen from the Particle
Maker Kit. It uses a webhook to retrieve bus prediction times from the
NextBus Public XML feed, which must be set up first along with the webhook.
See [http://docs.particle.io/tutorials/maker-kit/#tutorial-2-display-next-bus-time-on-the-oled-screen] to learn how!
******************************************************************************/

#include "Adafruit_SSD1306/Adafruit_GFX.h"
#include "Adafruit_SSD1306/Adafruit_SSD1306.h"

// use hardware SPI
#define OLED_DC     D3
#define OLED_CS     D4
#define OLED_RESET  D5
Adafruit_SSD1306 display(OLED_DC, OLED_RESET, OLED_CS);

String busName = "57"; // name of your bus -- FILL THIS IN!
int leadTime = 5; // #minute you need to get to your bus -- FILL THIS IN!
int soonestBusTime = 99; // #minutes until next bus (99 is a placeholder)
int nextSoonestBusTime = 88; // #minutes until bus after next (88 = placeholder)
int gaveWarning = false; // to make sure we don't give bus warning too often
int  x, minX; // variables for scrolling code

void getBusTimes() {
    // publish the event that will trigger our Webhook
    Particle.publish("get_nextbus");
}

// create a software timer to get new prediction times every minute
Timer timer(60000, getBusTimes);

// create another software timer to reset the warning beep so it only beeps
// once per bus that's close by
//Timer timer2(leadTime*60000, resetWarning);

void setup()   {                
  Serial.begin(9600);

  //retrieve the webhook data and send it to the gotNextBusData function
  Particle.subscribe("hook-response/get_nextbus/0", gotNextBusData, MY_DEVICES);

  // by default, we'll generate the high voltage from the 3.3v line internally!
  display.begin(SSD1306_SWITCHCAPVCC);

  display.setTextSize(7);       // text size
  display.setTextColor(WHITE); // text color
  display.setTextWrap(false); // turn off text wrapping so we can do scrolling
  x    = display.width(); // set x to display width
  minX = -1500; // 1500 = 6 pixels/character * text size 7 * 15 chars * 2x slow

  timer.start(); // start the data retrieval timer
}

void loop() {

  // this code displays next bus times on the OLED screen with fancy scrolling
  display.clearDisplay();
  display.setCursor(x/2, 8);
  display.print(busName);
  display.print(" in ");
  display.print(soonestBusTime);
  display.print(", ");
  display.print(nextSoonestBusTime);
  display.print(" min   ");
  display.display();
  if(--x < minX) x = display.width()*2;

  // give a "time to leave!" beeping warning, but only once per bus
  if(soonestBusTime < leadTime && gaveWarning == false)
  {
      for (int i=0; i<3; i++)
      {
        tone(D0, 5000, 100);
        delay(200);
      }
      gaveWarning = true;
  }

  // reset the beeping warning flag so we can warn about the next bus
  else if(soonestBusTime > leadTime && gaveWarning == true)
  {
      gaveWarning == false;
  }
}

// This function will get called when NextBus webhook data comes in.
// It turns the full NextBus XML page into numbers to be displayed on the screen
void gotNextBusData(const char *name, const char *data) {

    // put the incoming data (the XML page) into a string called "str"
    String str = String(data);

    // send str to the tryExtractString function,
    //looking for the first instance (0) of "minutes=\""
    String soonestStr = tryExtractString(0, str, "minutes=\"", "\"");
    // turn extracted bus time into an integer and store it in soonestBusTime
    soonestBusTime = soonestStr.toInt();

    // send str to the tryExtractString function,
    // looking for the second instance (1) of "minutes=\""
    String nextSoonestStr = tryExtractString(1, str, "minutes=\"", "\"");
    // turn extracted bus time into integer and store it in nextSoonestBusTime
    nextSoonestBusTime = nextSoonestStr.toInt();
}

// this function gets called by gotNextBusData to
// extract the bus times from the NextBus XML page
String tryExtractString(int matchNum, String str, const char* start, const char* end) {
    if (str == NULL) {
        return NULL;
    }

    int count = 0;
    int lastIdx = 0;

    while (count <= matchNum) {
        int idx = str.indexOf(start, lastIdx);

        int endIdx = str.indexOf(end, lastIdx + idx + strlen(start));

        lastIdx = endIdx;

        if (count == matchNum) {
            return str.substring(idx + strlen(start), endIdx);
        }
        count++;
    }
}
```

### Fill in your bus name and lead time
Near the top of the code above, you'll see:
```
String busName = "57"; // name of your bus -- FILL THIS IN!
int leadTime = 5; // #minutes you need to get to your bus -- FILL THIS IN!
```
* **busName:** Later, once you set everything up, the name of your bus will display on the screen along with the prediction time. Using the example above, you would see something like `57 in 5, 15 min`. Change it to match the name of your bus.
* **leadTime:** This is used to alert you with beeps that it's time to leave. Change it to the number of minutes you'll need in order to get comfortably to the bus stop. Don't forget to leave time to put on your shoes!

### Publish and subscribe to the webhook

In the example code for this project, you’ll see
```
void getBusTimes() {
    // publish the event that will trigger our Webhook
    Particle.publish("get_nextbus");
}
```
This function **publishes** an **event** called *get_nextbus* to the Particle cloud. If you remember, we used this event name when we created the webhook. Further down, you'll see
```
// retrieve the webhook data and send it to the gotNextBusData function
Particle.subscribe("hook-response/get_nextbus", gotNextBusData, MY_DEVICES);
```
This line **subscribes** your device to the *get_nextbus* event, which pulls in data coming from the webhook attached to it. It then sends that data to a function called *gotNextBusData*, which parses all the XML and pulls out the tiny bits we need, which are the number of **minutes** for the next two buses. See our [publish and subscribe](https://docs.particle.io/guide/getting-started/examples/photon/#the-buddy-system-publish-and-subscribe) guide for more info on publishing and subscribing.

### Connecting the OLED screen
Now that the webhook is ready, we'll wire up the **OLED screen**. Press the OLED screen into the breadboard, then connect the pins according to this diagram.

![Fritzing diagram - how to hook up the Particle Photon to the Maker Kit LED screen](/assets/images/nextbus-fritzing.png)

Wiring (Photon ⇒ OLED screen):
* D4 ⇒ CS
* D3 ⇒ DC
* D5 ⇒ RST
* A5 ⇒ D1
* A3 ⇒ D0
* 3V3 ⇒ VCC
* GND ⇒ GND

Then press the piezo buzzer into the breadboard and connect the long pin to D0 and the short pin to GND. The long pin has a plus sign over it on the top of the buzzer.

### Upload and test!
Plug in your Photon and upload the code! If all goes well, the screen will immediately start scrolling `[bus number] in xx and yy min`, where xx and yy are the times for the next two buses.

[GIF of scrolling]

### Cool feature: software timer
The reason we're able to have scrolling code that runs constantly in our *loop()* function, yet still be able to trigger the webhook every 60 seconds, is that we're using a **software timer**. Software timers are hugely powerful because they allow functions to be triggered independently of other code. It's possible to do this without a software timer by using *millis()*, but a bonafide software timer makes it much neater.

If you look in the code for this project, you'll see:
```
// create a software timer to get new prediction times every minute
// by calling the getBusTimes() function
Timer timer(60000, getBusTimes);
```

Above it, you'll see:
```
void getBusTimes() {
    // when the timer goes off, publish the event that triggers our webhook
    Particle.publish("get_nextbus");
}
```
By keeping these functions separate from the main *loop()* function, code can be made much neater and more flexible. For more complex code, software timers are essential because they save you from having to weave timed events (which are sometimes blocking) into code that needs to run continuously. To learn more, read our [software timers guide](https://docs.particle.io/reference/firmware/photon/#software-timers).

### Troubleshooting

**My OLED screen doesn't turn on.**
* Re-check your wiring. "DC" and "D0" look pretty similar, so make sure you haven't swapped any pins.
* If your Photon is not breathing cyan, check the [device modes guide](https://docs.particle.io/guide/getting-started/modes/photon/).

**My OLED screen works, but it shows 0 for both prediction times.**
* First enter your prediction URL into your web browser to make sure it's working properly.
* If the URL returns good data when viewed from a browser, check your webhook by entering `particle webhook list` in your Terminal or command prompt. It should say `Hook ID XXXXXX is watching for "get_nextbus" and sending to: http://webservices.nextbus.com/service/publicXMLFeed?command=predictions&a=actransit&r=57&s=1018530`. If the URL cuts off at `command=predictions`, you probably didn't put backslashes before the & symbols. To fix this, first delete the bad webhook by entering `particle webhook delete XXXXXXX`, where XXXXXXX is the ID of your webhook. Then repeat the "Create a webhook" step in this tutorial.

**I missed my bus because I was hypnotized by the fancy scrolling OLED screen.**
* Don't worry, it happens to the best of us.
