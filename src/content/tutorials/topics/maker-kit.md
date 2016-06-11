---
title: Maker Kit
template: tutorials.hbs
columns: two
order: 10
---

# {{title}}

This section provides tutorials for new users of the [Particle Maker Kit](https://store.particle.io/collections/shields-and-kits#particle-maker-kit) to get started quickly and build some projects using the contents of the kit.

```
Note: take a better photo of the kit.
```

![Photon Maker Kit](/assets/images/maker-kit-photon.jpg)

## Web-connected servo gong

In this beginner tutorial, you’ll learn how to connect the Maker Kit servo to your Photon, and how to control it via the web to ring a gong or other noise-making object.

<iframe width="500" height="180" src="https://www.youtube.com/embed/SAE3dq_ChZw?rel=0" frameborder="0" allowfullscreen></iframe>

```
Note: see if we can make the video larger on the page.
```

This tutorial assumes you’ve gone through the [Getting Started](/guide/getting-started/intro/photon/) guide, have set up your Photon, and are familiar with using the online IDE. If not, head over there first.

### What you'll need

In addition to your Maker Kit, you’ll need something that makes noise, like a bell or wine glass or gong, and something to strike it with, like a chopstick or mallet if you have one. You’ll also need some tape.

```
Note: take a better photo in the light tent.
```

![Maker Kit, wine glass, chopstick, and tape](/assets/images/maker-kit-wineglass-chopstick-tape.jpg)

### Prepare the servo

Find the servo in your Maker Kit.

![Emax ES08A II Servo from the Particle Maker Kit](/assets/images/maker-kit-servo.jpg)

Use tape to attach the chopstick to the long white servo horn, then attach the servo horn to the servo by pressing it onto the servo drive gear.

![Attaching the servo horn with the chopstick to the servo](/assets/images/attach-horn-to-servo.jpg)

### Connect the servo to the Photon

Insert jumper wires into the servo connector. It's easiest to use jumper wires whose colors match the color of the servo's wires.

![Insert jumper wires into the servo connector](/assets/images/jumpers-servo-connector.jpg)

Connect the the black jumper wire to the GND pin on the Photon, the red wire to the Vin pin, and the yellow wire to D0.

![Insert jumper wires into the breadboard](/assets/images/servo-fritzing.png)

### Flash code to the Photon

Now that the servo is connected electrically, we’ll connect it in software. Go to the [Particle online IDE](http://build.particle.io) and make a new app. Copy and paste the example code below into the new file.

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

int gong(String command)        // when "gong" is called from the cloud, it will
{                               // by accompanied by a string.
    if(command == "now")        // if the string is "now", ring the gong once.
    {                            
        myservo.write(0);       // move servo to 0° - ding!
        digitalWrite(D7, HIGH); // flash the LED (as an indicator)
        delay(100);             // wait 100 ms
        myservo.write(25);      // move servo to 25°
        digitalWrite(D7, LOW);  // turn off LED
        return 1;               // return a status of "1"
    }
    else if(command == "alarm")     // if the accompanying string is "alarm",
    {                               // ring the gong 3 times.
        for (int i = 0; i < 3; i++) // loop three times
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
Save the code, then flash the firmware to the Photon. The servo should move a little bit, which indicates that it's connected correctly.

### Set up remote control

One of the easiest ways to control a Particle device remotely is by using the [Do Button](https://ifttt.com/products/do/button). The Do Button is a smartphone app made by [IFTTT](http://ifttt.com) (If This Then That) that can be set to trigger events, which they call recipes, when you press the button inside the app. In this case, we’ll make a recipe that activates the servo.

First, download the Do Button app to your phone, make an account or log into your existing IFTTT account if you have one, and flip through the examples in the app. (Optionally, swipe left to delete the example from your recipes to reduce clutter.)

Next, make a new recipe in the Do Button app:

![Create a new Do Button recipe](/assets/images/new-do-button-recipe.png)

* Click the + button to start a new recipe
* Find Particle under Channels
* Tap Create a New Recipe
* Tap Call a Function

If this is your first time using IFTTT with Particle, you'll be prompted to enter your Particle username and password so that IFTTT can connect to your Particle account and all your devices. Then you'll return to the Do Button app to finish the recipe.

![Connect Particle to IFTTT](/assets/images/connect-particle-to-ifttt.png)

* Tap Continue to start process of connecting IFTTT to Particle
* Enter your Particle username and password, then tap Sign In
* Tap Okay to connect your accounts
* Enter a title for your recipe
* Select the gong function
* Under Input, enter “now” to match the command in our code
* Tap Add to finish creating the recipe.

### Test it!

Now tap the Do Button and watch what happens. Sometimes it takes 5-10 seconds. Congratulations, you just actuated a servo over the internet!

![Do Button app ready next to servo](/assets/images/do-button-ready.jpg)

There are a few ways to secure the servo so it swings the chopstick properly. Taping it to the side of the breadboard works pretty well in a pinch, but the servo also comes with mounting screws if you have something to mount it to. If you're taping it to the breadboard, you'll also want to put a rolled-up piece of tape under the breadboard so it doesn't move.

### Going further

You can also do other fun things using IFTTT without the Do Button, such as turning this gong into an alarm that goes off at 8am:

![Making an alarm recipe in IFTTT](/assets/images/ifttt-alarm-recipe.jpg)

* Log into [ifttt.com](http://ifttt.com)
* Make a new recipe
* Choose Date and Time as the trigger
* Choose Particle as the action
* Choose Call a function
* Select the gong function
* Enter "alarm" in the input field (our code makes it ring three times instead of one)
* Click Create Action, then click Create Recipe to finish the process

Discover more projects at [particle.hackster.io](http://particle.hackster.io), and join our community at [community.particle.io](http://community.particle.io).
