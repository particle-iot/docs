---
word: Examples
title: Examples
order: 4
---

Annotated examples
=======

Here you will find a bunch of examples to get you started with your new Particle device! The diagrams here show the Photon, but these examples will work with either the Photon or the Core.


Blink an LED
===

![One LED illustration]({{assets}}/images/photon-led-fritzing.png)

Blinking an LED is the ["Hello World"](http://en.wikipedia.org/wiki/Hello_world_program) example of the microcontroller universe. It's a nice way to warm up and start your journey into the land of embedded hardware.

For this example, you will need:
- Your Particle device
- a Breadboard
- an LED
- a Resistor (between 220 and 1000 Ohms recommended, see note)
- a USB to micro-USB cable


**NOTE:** Since there is so much variation in the values of the forward voltage drop of the LEDs depending upon type, size, color, manufacturer, etc., you could successfully use a resistor value from anywhere between 220Ohms to 1K Ohms. The resistor included in the Photon Kit is 220 Ohms and should work for these examples with a red LED.


Connect everything together as shown in the picture. The negative (shorter) pin of the LED is connected to ground via a resistor and the positive (longer) pin is connected to D0.


Next, we're going to load code onto your core. Copy and paste this code into a new application on http://build.particle.io or on Particle Dev. We've heavily commented this code so that you can see what is going on in each line.

```cpp
// Program to blink an LED connected to pin D0
// of the Spark Core.

// We name pin D0 as led
int led = D0;

// This routine runs only once upon reset
void setup()
{
  // Initialize D0 pin as output
  pinMode(led, OUTPUT);
}

// This routine loops forever
void loop()
{
  digitalWrite(led, HIGH);   // Turn ON the LED
  delay(1000);               // Wait for 1000mS = 1 second
  digitalWrite(led, LOW);    // Turn OFF the LED
  delay(1000);               // Wait for 1 second
}
```

Go ahead and save this application, then flash it to your Core or Photon. You should be able to see that LED blinking away!

We know that's not enough for you, though. Let's add some sensors.


Learing about Particle with Photoresistors
===

![Fritzing Diagram]({{assets}}/images/photon-photoresistor-fritzing.png)

We have some heavily commented code for you (soon to be imported into the IDE) to help you learn about using Particle with two resistors, a photoresistor, and an LED.

Wire up your Photon or Core to look like the image on the right, and then follow the examples below.


Read your LED with your Photoresistor: Function and Variable
---
```
// We're going to start by declaring which pins everything is plugged into.

int led = D0; // This is where the long pin of your LED is plugged in. The other side goes to a resistor connected to GND.

int photoresistor = A0; // This is where your photoresistor is plugged in. The other side goes to the "power" pin (below).

int power = A5; // This is the other end of your photoresistor. The other side is plugged into the "photoresistor" pin (above).
// The reason we have plugged one side into an analog pin instead of to "power" is because we want a very steady voltage to be sent to the photoresistor.
// That way, when we read the value from the other side of the photoresistor, we can accurately calculate a voltage drop.

// The following values get set up when your device boots up and calibrates:
int ledOnValue; // This is the average value that the photoresistor reads when the LED is on.
int ledOffValue; // This is the average value that the photoresistor reads when the LED is off.
int ledThreshold; // This is a value halfway between ledOnValue and ledOffValue, above which we will assume the led is on and below which we will assume it is off.


// We start with the setup function.

void setup() {
  // The setup function is a part of every microcontroller app.
  // The setup function is called once when your device turns on or resets.
  // Steps taken in this function should be things you only want to have to do once, when your device starts running.
  // For this app, our steps are as follows:

  // First, declare all of our pins. This lets our device know which ones will be used for outputting voltage, and which ones will read incoming voltage.
  pinMode(led,OUTPUT); // Our LED pin is output (lighting up the LED)
  pinMode(photoresistor,INPUT);  // Our photoresistor pin is input (reading the photoresistor)
  pinMode(power,OUTPUT); // The pin powering the photoresistor is output (sending out consistent power)

  // Next, write the power of the photoresistor to be the maximum possible, which is 4095 in analog.
  analogWrite(power,4095);

  // Since everyone sets up their leds differently, we are also going to start by calibrating our photoresistor.
  digitalWrite(led,HIGH); // turn led on
  delay(300); // wait 300 milliseconds
  int on_1 = analogRead(photoresistor); // read photoresistor
  delay(300); // wait 300 milliseconds
  digitalWrite(led,LOW); // turn led off
  delay(300); // wait 300 milliseconds
  int off_1 = analogRead(photoresistor); // read photoresistor
  delay(300); // wait 300 milliseconds
  int on_2 = analogRead(photoresistor); // and do it all again...
  delay(300);
  digitalWrite(led,LOW);
  delay(300);
  int off_2 = analogRead(photoresistor);
  delay(300);

  // Now we average the "on" and "off" values to get an idea of what the resistance will be when the LED is on and off
  ledOnValue = (on_1+on_2)/2;
  ledOffValue = (off_1+off_2)/2;

  // Let's also calculate the value between ledOn and ledOff, above which we will assume the led is on and below which we assume the led is off.
  ledThreshold = (ledOnValue+ledOffValue)/2;

}

void loop() {
  /* The loop function is a part of every microcontroller app.
  After the setup function is done running, the loop function gets called
  as much as possible and as often as possible, over and over again
  until your device turns off or is reset.

  In this loop function, we're going to check to see if the LED is on or off.
  If it is on, we'll send a Spark.publish() to the cloud so that if we want to,
  we can check from other devices when the LED is on or off.

  We'll also turn the D7 LED on when the Photoresistor reads that the LED is off.
  
  */

  if (analogRead(photoresistor)>ledThreshold) {
    // If you are above the threshold, we'll assume the led is on.

    // Send a publish...
    Spark.publish("ledStatus","on",60,PRIVATE);
    
    // Wait a second, and then turn the LED off.
    delay(800);
    digitalWrite(led,LOW);
  }

  else {
    // If you are below the threshold, the led is probably off.

    // Send a publish...
    Spark.publish("ledStatus","off",60,PRIVATE);
    
    // Wait a second, and then turn the LED on.
    delay(800);
    digitalWrite(led,HIGH);
  }
  
}

/* Paste the code between the dashes below into a .txt file and save it as an .html file. Replace your-device-ID-goes-here with your actual device ID and your-access-token-goes-here with your actual access token.

---------------------------
<!-- Replace your-device-ID-goes-here with your actual device ID
and replace your-access-token-goes-here with your actual access token-->
<center>
<br>
<br>
<br>
<form action="https://api.particle.io/v1/devices/your-device-ID-goes-here/led?access_token=your-access-token-goes-here" method="POST">
Tell your device what to do!<br>
<br>
<input type="radio" name="args" value="on">Turn the LED on.
<br>
<input type="radio" name="args" value="off">Turn the LED off.
<br>
<br>
<input type="submit" value="Do it!">
</form>
</center>
---------------------------
*/

```

The code on the right shows you how to use `Spark.function` to create and register a function with the cloud. By telling the cloud "led on" you will be able to turn the LED on, and by telling it "led off" you can tell it to turn the LED off.

Meanwhile, the photoresistor will be putting its values into a variable called `analogvalue`. We also registered this variable to the cloud with `Spark.variable`, and now we can find out the value of that variable whenever we want to.

When we register a function or variable, we're basically making a space for it on the internet, similar to the way there's a space for a website you'd navigate to with your browser. Thanks to the REST API, there's a specific address that identifies you and your device. You can send requests, like `GET` and `POST` requests, to this URL just like you would with any webpage in a browser.

Remember the last time you submitted a form online? You may not have known it, but the website probably sent a `POST` request with the info you put in the form over to another URL that would store your data. We can do the same thing to send information to your device, telling it to turn the LED on and off.

Open a text editor and save the HTML code at the bottom of the example on the right as a .html file.

Edit the code in your text file so that "your-device-ID-goes-here" is your actual device ID, and "your-access-token-goes-here" is your actual access token. These things are accessible through your IDE at [build.particle.io](http://build.particle.io). Your device ID can be found in your Devices drawer (the crosshairs) when you click on the device you want to use, and your access token can be found in settings (the cogwheel).

Open that `.html` file in a browser. You'll see a very simple HTML form that allows you to select whether you'd like to turn the LED on or off.

When you click "Do it!" you are posting information to the URL `https://api.particle.io/v1/devices/your-device-ID-goes-here/led?access_token=your-access-token-goes-here`. The information you give is the `args`, or argument value, of `on` or `off`. This hooks up to your `Spark.function` that we registered with the cloud in our firmware, which in turn sends info to your device to turn the LED on or off.

You'll get some info back after you submit the page that gives the status of your device and lets you know that it was indeed able to post to the URL. If you want to go back, just click "back" on your browser.


If you are using the command line, you can also turn the LED on and off by typing:

`particle call device_name led on`

and

`particle call device_name led off`

Remember to replace `device_name` with either your device ID or the casual nickname you made for your device when you set it up.

This does the same thing as our HTML page, but with a more slick interface.


We can also check the value of the Photoresistor as we turn the LED on and off. Just as a URL was generated for our `led` function, a URL was generated for our `analogwrite` variable.

Try going to the URL:

`https://api.particle.io/v1/devices/your-device-ID-goes-here/analogvalue?access_token=your-access-token-goes-here`

That will give you an (albeit ugly) output of the value of your photoresistor, as read by your device.

You can also check out this value by using the command line. Type:

`particle variable get device_name analogvalue`

and make sure you replace `device_name` with either your device ID or the casual nickname you made for your device when you set it up.


Make a Motion Detector: Publish and the Dashboard
---
```
/*---OH HI THERE, WELCOME TO THE PHOTORESISTOR PROGRAM---

Part Two: Sensing motion with your photoresistor

We're going to assume that you've already checked out Part One!

This app will make it so that you know when the beam of light
between the LED and the photoresistor is broken.

It essentially makes a little tripwire sensor out of your LED and photoresistor.

We'll calibrate the light at the beginning so that even if your LED isn't that bright,
or if the levels of brightness in the room vary, you're still able to get an accurate
read of when the beam of light is and isn't blocked.

During calibration, the D7 LED (upper right hand corner on the Core and next to D7 on the Photon)
will turn on for two seconds. When it turns on, block the light
between the photoresistor and the LED with your finger.
Wait until the D7 LED turns off and then on again. When it turns back on,
remove your finger from the space between the photoresistor and LED.
The D7 LED will then blink three times to let you know calibration is finished.

If you mess up, don't worry-- you can just hit "reset" on your device and do it again!

Ready to start?
---------------------------------------*/

// Just like before, we're going to start by declaring which pins everything is plugged into.

int led = D0; // This is where your LED is plugged in. The other side goes to a resistor connected to GND.
int boardLed = D7; // This is the LED that is already on your device.
// On the Core, it's the LED in the upper right hand corner.
// On the Photon, it's next to the D7 pin.

int photoresistor = A0; // This is where your photoresistor is plugged in. The other side goes to the "power" pin (below).

int power = A5; // This is the other end of your photoresistor. The other side is plugged into the "photoresistor" pin (above).

// The following values get set up when your device boots up and calibrates:
int intactValue; // This is the average value that the photoresistor reads when the beam is intact.
int brokenValue; // This is the average value that the photoresistor reads when the beam is broken.
int beamThreshold; // This is a value halfway between ledOnValue and ledOffValue, above which we will assume the led is on and below which we will assume it is off.

bool beamBroken = false; // This flag will be used to mark if we have a new status or now. We will use it in the loop.

// We start with the setup function.

void setup() {
  // This part is mostly the same:
  pinMode(led,OUTPUT); // Our LED pin is output (lighting up the LED)
  pinMode(boardLed,OUTPUT); // Our on-board LED is output as well
  pinMode(photoresistor,INPUT);  // Our photoresistor pin is input (reading the photoresistor)
  pinMode(power,OUTPUT); // The pin powering the photoresistor is output (sending out consistent power)

  // Next, write the power of the photoresistor to be the maximum possible, which is 4095 in analog.
  analogWrite(power,4095);

  // Since everyone sets up their leds differently, we are also going to start by calibrating our photoresistor.
  // This one is going to require some input from the user!
  
  // First, the D7 LED will go on to tell you to put your hand in front of the beam.
  digitalWrite(boardLed,HIGH);
  delay(2000);
  
  // Then, the D7 LED will go off and the LED will turn on.
  digitalWrite(boardLed,LOW);
  digitalWrite(led,HIGH);
  delay(500);
  
  // Now we'll take some readings...
  int on_1 = analogRead(photoresistor); // read photoresistor
  delay(200); // wait 200 milliseconds
  int on_2 = analogRead(photoresistor); // read photoresistor
  delay(300); // wait 300 milliseconds
  
  // Now flash to let us know that you've taken the readings...
  digitalWrite(boardLed,HIGH);
  delay(100);
  digitalWrite(boardLed,LOW);
  delay(100);
  digitalWrite(boardLed,HIGH);
  delay(100);
  digitalWrite(boardLed,LOW);
  delay(100);
  
  // Now the D7 LED will go on to tell you to remove your hand...
  digitalWrite(boardLed,HIGH);
  delay(2000);
  
  // The D7 LED will turn off...
  digitalWrite(boardLed,LOW);
  
  // ...And we will take two more readings.
  int off_1 = analogRead(photoresistor); // read photoresistor
  delay(200); // wait 200 milliseconds
  int off_2 = analogRead(photoresistor); // read photoresistor
  delay(1000); // wait 1 second

  // Now flash the D7 LED on and off three times to let us know that we're ready to go!
  digitalWrite(boardLed,HIGH);
  delay(100);
  digitalWrite(boardLed,LOW);
  delay(100);
  digitalWrite(boardLed,HIGH);
  delay(100);
  digitalWrite(boardLed,LOW);
  delay(100);
  digitalWrite(boardLed,HIGH);
  delay(100);
  digitalWrite(boardLed,LOW);
  

  // Now we average the "on" and "off" values to get an idea of what the resistance will be when the LED is on and off
  intactValue = (on_1+on_2)/2;
  brokenValue = (off_1+off_2)/2;

  // Let's also calculate the value between ledOn and ledOff, above which we will assume the led is on and below which we assume the led is off.
  beamThreshold = (intactValue+brokenValue)/2;

}


// Now for the loop.

void loop() {
  /* In this loop function, we're going to check to see if the beam has been broken.
  When the status of the beam changes, we'll send a Spark.publish() to the cloud
  so that if we want to, we can check from other devices when the LED is on or off.

  We'll also turn the D7 LED on when the Photoresistor detects a beam breakagse.
  */

  if (analogRead(photoresistor)>beamThreshold) {
      
    /* If you are above the threshold, we'll assume the beam is intact.
    If the beam was intact before, though, we don't need to change anything.
    We'll use the beamBroken flag to help us find this out.
    This flag monitors the current status of the beam.
    After the beam is broken, it is set TRUE
    and when the beam reconnects it is set to FALSE.
    */
    
    if (beamBroken==true) {
        // If the beam was broken before, then this is a new status.
        // We will send a publish to the cloud and turn the LED on.
        
        // Send a publish to your devices...
        Spark.publish("beamStatus","intact",60,PRIVATE);
        // And flash the on-board LED on and off.
        digitalWrite(boardLed,HIGH);
        delay(500);
        digitalWrite(boardLed,LOW);
        
        // Finally, set the flag to reflect the current status of the beam.
        beamBroken=false;
    }
    else {
        // Otherwise, this isn't a new status, and we don't have to do anything.
    }
  }

  else {
      // If you are below the threshold, the beam is probably broken.
      if (beamBroken==false) {
        
        // Send a publish...
        Spark.publish("beamStatus","broken",60,PRIVATE);
        // And flash the on-board LED on and off.
        digitalWrite(boardLed,HIGH);
        delay(500);
        digitalWrite(boardLed,LOW);
        
        // Finally, set the flag to reflect the current status of the beam.
        beamBroken=true;
      }
      else {
          // Otherwise, this isn't a new status, and we don't have to do anything.
      }
  }

}
```

What if we simply want to know that something has happened, without all the information of a variable or all the action of a fuction? We might have a security system that tells us, "motion was detected!" or a smart washing machine that tells us "your laundry is done!" In that case, we might want to use `Spark.publish`.

`Spark.publish` sends a message to the cloud saying that some event has occured. We're allowed to name that event, set the privacy of that event, and add a little bit of info to go along with the event.

In the code on the right, we've created a system where you turn your LED and photoresistor to face each other, making a beam of light that can be broken by the motion of your finger. Every time the beam is broken or reconnected, your device will send a `Spark.publish` to the cloud letting it know the state of the beam.

For your convenience, we've set up a little calibrate function so that your device will work no matter how bright your LED is, or how bright the ambient light may be. Put your finger in the beam when the D7 LED goes on, and hold it in the beam until you see two flashes from the D7 LED. Then take your finger out of the beam.

You can check out the results on your dashboard at [dashboard.particle.io](https://dashboard.particle.io). As you put your finger in front of the beam, you'll see an event appear that says the beam was broken. When you remove your finger, the event says that the beam is now intact.

You can also hook up publishes to IFTTT! More info [here](/photon/ifttt).


The Buddy System: Publish and Subscribe
---

```
/*---OH HI THERE, WELCOME TO THE PHOTORESISTOR PROGRAM---

Part Three-- Publish and Subscribe with your Photoresistor and a Buddy

We will assume here that you've already done part one.
Now for Part Two-- the part where you get a buddy.

Go find a buddy who also has a Spark device.
Each of you will pick a unique event name
   (make it weird so that no one else will have it)
   (no more that 63 ASCII characters, and no spaces)

In the following code, replace "your_unique_event_name" with your chosen name.
Replace "buddy_unique_event_name" with your buddy's chosen name.

Have your buddy do the same on his or her IDE.

Then, each of you should flash the code to your device.

Breaking the beam on one device will turn on the D7 LED on the second device.

Now you can send each other morse code messages!


But how does this magic work? Through the miracle of publish and subscribe.

We are going to Spark.publish a public event to the cloud.
That means that everyone can see you event and anyone can subscribe to it.
You and your buddy will both publish an event, and listen for each others events.

---------------------------------------*/


int led = D0;
int boardLed = D7;
int photoresistor = A0;
int power = A5;

int intactValue;
int brokenValue;
int beamThreshold;

bool beamBroken = false;


void setup() {
  pinMode(led,OUTPUT);
  pinMode(boardLed,OUTPUT);
  pinMode(photoresistor,INPUT);
  pinMode(power,OUTPUT);
  
  analogWrite(power,4095);

  // Here we are going to subscribe to your buddy's event using Spark.subscribe
  Spark.subscribe("buddy_unique_event_name", myHandler);
  // Subscribe will listen for the event buddy_unique_event_name and, when it finds it, will run the function myHandler()
  // (Remember to replace buddy_unique_event_name with your buddy's actual unique event name that they have in their firmware.)
  // myHandler() is declared later in this app.

  // Calibrate:
// Just like before, we're going to start by declaring which pins everything is plugged into.

int led = D0; // This is where your LED is plugged in. The other side goes to a resistor connected to GND.
int boardLed = D7; // This is the LED that is already on your device.
// On the Core, it's the LED in the upper right hand corner.
// On the Photon, it's next to the D7 pin.

int photoresistor = A0; // This is where your photoresistor is plugged in. The other side goes to the "power" pin (below).

int power = A5; // This is the other end of your photoresistor. The other side is plugged into the "photoresistor" pin (above).

// The following values get set up when your device boots up and calibrates:
int intactValue; // This is the average value that the photoresistor reads when the beam is intact.
int brokenValue; // This is the average value that the photoresistor reads when the beam is broken.
int beamThreshold; // This is a value halfway between ledOnValue and ledOffValue, above which we will assume the led is on and below which we will assume it is off.

bool beamBroken = false; // This flag will be used to mark if we have a new status or now. We will use it in the loop.

// We start with the setup function.

void setup() {
  // This part is mostly the same:
  pinMode(led,OUTPUT); // Our LED pin is output (lighting up the LED)
  pinMode(boardLed,OUTPUT); // Our on-board LED is output as well
  pinMode(photoresistor,INPUT);  // Our photoresistor pin is input (reading the photoresistor)
  pinMode(power,OUTPUT); // The pin powering the photoresistor is output (sending out consistent power)

  // Next, write the power of the photoresistor to be the maximum possible, which is 4095 in analog.
  analogWrite(power,4095);

  // Since everyone sets up their leds differently, we are also going to start by calibrating our photoresistor.
  // This one is going to require some input from the user!
  
  // Calibrate:
  // First, the D7 LED will go on to tell you to put your hand in front of the beam.
  digitalWrite(boardLed,HIGH);
  delay(2000);
  
  // Then, the D7 LED will go off and the LED will turn on.
  digitalWrite(boardLed,LOW);
  digitalWrite(led,HIGH);
  delay(500);
  
  // Now we'll take some readings...
  int on_1 = analogRead(photoresistor); // read photoresistor
  delay(200); // wait 200 milliseconds
  int on_2 = analogRead(photoresistor); // read photoresistor
  delay(300); // wait 300 milliseconds
  
  // Now flash to let us know that you've taken the readings...
  digitalWrite(boardLed,HIGH);
  delay(100);
  digitalWrite(boardLed,LOW);
  delay(100);
  digitalWrite(boardLed,HIGH);
  delay(100);
  digitalWrite(boardLed,LOW);
  delay(100);
  
  // Now the D7 LED will go on to tell you to remove your hand...
  digitalWrite(boardLed,HIGH);
  delay(2000);
  
  // The D7 LED will turn off...
  digitalWrite(boardLed,LOW);
  
  // ...And we will take two more readings.
  int off_1 = analogRead(photoresistor); // read photoresistor
  delay(200); // wait 200 milliseconds
  int off_2 = analogRead(photoresistor); // read photoresistor
  delay(1000); // wait 1 second

  // Now flash the D7 LED on and off three times to let us know that we're ready to go!
  digitalWrite(boardLed,HIGH);
  delay(100);
  digitalWrite(boardLed,LOW);
  delay(100);
  digitalWrite(boardLed,HIGH);
  delay(100);
  digitalWrite(boardLed,LOW);
  delay(100);
  digitalWrite(boardLed,HIGH);
  delay(100);
  digitalWrite(boardLed,LOW);

  intactValue = (on_1+on_2)/2;
  brokenValue = (off_1+off_2)/2;
  beamThreshold = (intactValue+brokenValue)/2;

}


void loop() {
  // This loop sends a publish when the beam is broken.
  if (analogRead(photoresistor)>beamThreshold) {
    if (beamBroken==true) {
        Spark.publish("your_unique_event_name","intact");
        // publish this public event
        // rename your_unique_event_name with your actual unique event name. No spaces, 63 ASCII characters.
        // give your event name to your buddy and have them put it in their app.
        
        // Set the flag to reflect the current status of the beam.
        beamBroken=false;
    }
  }

  else {
      if (beamBroken==false) {
        // Same deal as before...
        Spark.publish("your_unique_event_name","broken");
        beamBroken=true;
      }
  }
}


// Now for the myHandler function, which is called when the cloud tells us that our buddy's event is published.
void myHandler(const char *event, const char *data)
{
  /* Spark.subscribe handlers are void functions, which means they don't return anything.
  They take two variables-- the name of your event, and any data that goes along with your event.
  In this case, the event will be "buddy_unique_event_name" and the data will be "intact" or "broken"
  
  Since the input here is a char, we can't do
     data=="intact"
    or
     data=="broken"
  
  chars just don't play that way. Instead we're going to strcmp(), which compares two chars.
  If they are the same, strcmp will return 0.
  */

  if (strcmp(data,"intact")==0) {
    // if your buddy's beam is intact, then turn your board LED off
    digitalWrite(boardLed,LOW);
  }
  else if (strcmp(data,"broken")==0) {
    // if your buddy's beam is broken, turn your board LED on
    digitalWrite(boardLed,HIGH);
  }
  else {
    // if the data is something else, don't do anything.
    // Really the data shouldn't be anything but those two listed above.
  }
}
```

In the last example, we sent a private publish. This publish went to you alone; it was just for you and your own apps, programs, integrations, and devices. We can also send a public publish, though, which allows anyone anywhere to see and subscribe to our event in the cloud. All they need is our event name.

Go find a buddy who has a Core or Photon. Your buddy does not have to be next to you-- he or she can be across the world if you like! All you need is Wi-Fi.

Connect your device and copy the firmware on the right into a new app. Pick a weird name for your event. If your core were named `starfish` for example, you could make your event name something like `starfish_special_event_20150515`. Have your buddy pick a name for their event as well.

Now replace `your_unique_event_name` with your actual event name and `buddy_unique_event_name` with your buddy's unique event name.

Have your buddy do the same thing, only with their event name and yours (swap 'em).

Flash the firmware to your devices. Calibrate your device when it comes online (same as in the previous example). When the beam is broken on your device, the D7 LED on your buddy's device will light up! Now you can send little messages to each other in morse code.

No photoresistors? Other examples are below!


Control LEDs over the 'net
===

Now that we know how to blink an LED, how about we control it over the Internet? This is where the fun begins.

Lets hook up two LEDs this time.


Here is the algorithm:
- Set up the pins as outputs that have LEDs connected to them
- Create and register a Spark function ( this gets called automagically when you make an API request to it)
- Parse the incoming command and take appropriate actions

```cpp
// -----------------------------------
// Controlling LEDs over the Internet
// -----------------------------------

// name the pins
int led1 = D0;
int led2 = D1;

// This routine runs only once upon reset
void setup()
{
   //Register our Spark function here
   Spark.function("led", ledControl);

   // Configure the pins to be outputs
   pinMode(led1, OUTPUT);
   pinMode(led2, OUTPUT);

   // Initialize both the LEDs to be OFF
   digitalWrite(led1, LOW);
   digitalWrite(led2, LOW);
}


// This routine loops forever
void loop()
{
   // Nothing to do here
}


// This function gets called whenever there is a matching API request
// the command string format is l<led number>,<state>
// for example: l1,HIGH or l1,LOW
//              l2,HIGH or l2,LOW

int ledControl(String command)
{
   int state = 0;
   //find out the pin number and convert the ascii to integer
   int pinNumber = (command.charAt(1) - '0') - 1;
   //Sanity check to see if the pin numbers are within limits
   if (pinNumber < 0 || pinNumber > 1) return -1;

   // find out the state of the led
   if(command.substring(3,7) == "HIGH") state = 1;
   else if(command.substring(3,6) == "LOW") state = 0;
   else return -1;

   // write to the appropriate pin
   digitalWrite(pinNumber, state);
   return 1;
}
```

---

The API request will look something like this:

```json
POST /v1/devices/{DEVICE_ID}/led

# EXAMPLE REQUEST IN TERMINAL
# Core ID is 0123456789abcdef
# Your access token is 123412341234
curl https://api.particle.io/v1/devices/0123456789abcdef/led \
  -d access_token=123412341234 \
  -d params=l1,HIGH
```

Note that the API endpoint is 'led', not 'ledControl'. This is because the endpoint is defined by the first argument of [Spark.function() PLACEHOLDER], which is a string of characters, rather than the second argument, which is a function.

To better understand the concept of making API calls to your device over the cloud checkout the [Cloud API reference.](../api)

Measuring the temperature
===

We have now learned how to send custom commands to our device and control the hardware. But how about reading data back from our device?

In this example, we will hook up a temperature sensor to your device and read the values over the internet with a web browser.

We have used a widely available analog temperature sensor called TMP36 from Analog Devices, and is the temperature sensor that comes with your Spark Maker Kit! You can download the [datasheet here.](http://www.analog.com/media/en/technical-documentation/data-sheets/TMP35_36_37.pdf)

Notice how we are powering the sensor from 3.3V\* pin instead of the regular 3.3V. This is because the 3.3V\* pin gives out a (LC) clean filtered  voltage, ideal for analog applications like these. If the readings you get are noisy or inconsistent, add a 0.01uF (10nF) ceramic capacitor between the analog input pin (in this case, A7) and GND as shown in the set up. Ideally, the sensor should be placed away from the Core so that the heat dissipated by the Core does not affect the temperature readings.

```C++
// -----------------
// Read temperature
// -----------------

// Create a variable that will store the temperature value
double temperature = 0.0;

void setup()
{
  // Register a Spark variable here
  Spark.variable("temperature", &temperature, DOUBLE);

  // Connect the temperature sensor to A7 and configure it
  // to be an input
  pinMode(A7, INPUT);
}

void loop()
{
  int reading = 0;
  double voltage = 0.0;
  
  // Keep reading the sensor value so when we make an API
  // call to read its value, we have the latest one
  reading = analogRead(A7);
  
  // The returned value from the Core is going to be in the range from 0 to 4095
  // Calculate the voltage from the sensor reading
  voltage = (reading * 3.3) / 4095;
  
  // Calculate the temperature and update our static variable
  temperature = (voltage - 0.5) * 100;
}
```

---

The API request will look something like this:

```json
GET /v1/devices/{DEVICE_ID}/temperature

# EXAMPLE REQUEST IN TERMINAL
# Core ID is 0123456789abcdef
# Your access token is 123412341234
curl -G https://api.particle.io/v1/devices/0123456789abcdef/temperature \
  -d access_token=123412341234
```
