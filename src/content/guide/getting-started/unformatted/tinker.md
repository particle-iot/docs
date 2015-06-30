---
word: Tinker
title: Tinker (Particle app)
order: 5
columns: 2
---

#Tinkering with "Tinker"

##The Particle app

![Tinker selection]({{assets}}/images/tinker.png)

The Tinker section of the Particle mobile app makes it very easy to start playing with your Particle device without writing any code. It's great for early development, and often it will do everything you need to get your project off of the ground.

If you don't yet have it, go ahead and grab the Particle App if you have a Photon and Spark Core App if you have a Core.
- Particle App for Photon: [iPhone](https://itunes.apple.com/us/app/particle-build-photon-electron/id991459054?ls=1&mt=8) | [Android](https://play.google.com/store/apps/details?id=io.particle.android.app)
- Spark Core App for Core: [iPhone](https://itunes.apple.com/us/app/spark-core/id760157884) | [Android](https://play.google.com/store/apps/details?id=io.spark.core.android)

The app consists of 16 pins in vertical rows - 8 analog pins on the left, 8 digital pins on the right. These pins represent the 16 GPIO (General Purpose Input and Output) pins on your device.

To begin, tap any of the pins. A menu will pop up showing the functions that pin has available, tap a function name to select the pin functionality. You can reset the pin function by long-pressing it. Each pin can have up to four possible functions:

- **digitalWrite**: Sets the pin to HIGH or LOW, which either connects it to 3.3V (the maximum voltage of the system) or to GND (ground). Pin D7 is connected to an on-board LED; if you set pin D7 to HIGH, the LED will turn on, and if you set it to LOW, it will turn off.
- **analogWrite**: Sets the pin to a value between 0 and 255, where 0 is the same as LOW and 255 is the same as HIGH. This is sort of like sending a voltage between 0 and 3.3V, but since this is a digital system, it uses a mechanism called Pulse Width Modulation, or PWM. You could use *analogWrite* to dim an LED, as an example. **Note:** Photon (only) has two DACs (Digital to Analog converters) onboard connected to pin DAC (A6) and A3, when you select **analogWrite** on those two pins you can set a value between 0 to 4095 (12bit resolution) and continous analog voltage will be applied at the pin output (not PWM), you can use it for controlling electronic devices that require precision analog voltage setting. Those two pins will be marked in orange color when activated in analogWrite mode (instead of yellow color for the rest of the PWM-enabled pins).
- **digitalRead**: This will read the digital value of a pin, which can be read as either HIGH or LOW. If you were to connect the pin to 3.3V, it would read HIGH; if you connect it to GND, it would read LOW. Anywhere in between, it'll probably read whichever one it's closer to, but it gets dicey in the middle.
- **analogRead**: This will read the analog value of a pin, which is a value from 0 to 4095, where 0 is LOW (GND) and 4095 is HIGH (3.3V). All of the analog pins (A0 to A7) can handle this. *analogRead* is great for reading data from sensors.

In other words, Tinker lets you control and read the voltage of the pins on your device. You can choose to send a lot of voltage to an LED to light it up, or read the voltage at a sensor. Let's do that now!


##digitalWrite: LED On/Off

The easiest thing we can do is to turn the D7 LED on and off. The first step is to [connect your device](/photon/connect). Then, open your Particle mobile app and select your device.

To turn on the LED, tap the D7 pin on the mobile app. Then tap `digitalWrite` to let it know that you want to send high or low voltage to that pin.

Once you have done that, try tapping the D7 pin. It will change its status to `HIGH` and your device's D7 LED will turn on. Tapping it again will change the status to `LOW` and the LED will turn off.

`digitalWrite` only has two options: `HIGH` and `LOW`. When we speak to our pins digitally, we can only send the maximum voltage or no voltage. That's great for when you only need two settings-- like if you had a light switch that could only go on and off, or locks that could only be open or closed. For everything in between, we use `analogWrite`.


##analogWrite: LED Dimming

In this example, we'll plug an LED into D0 and change its brightness with analogWrite.

![LED fritzing]({{assets}}/images/photon-led-fritzing.png)

Pick a resistor between 220 and 1000 Ohms (we're using 330 Ohms) and set up your device just like the picture to the right.

Then, pull up your mobile app and select D0 this time. Instead of `digitalWrite`, select `analogWrite`.

_NOTE:_  You get this option on the D0 pin because D0 is a PWM pin and D7 is not. Don't worry about this too much if you're a beginner.

You should now be able to set the D0 pin to any number between 0 and 255. It basically divides the maximum voltage by 255 and allows us to set the slider to any fraction of the voltage between minimum and maximum. Pretty cool, right?

By sliding and releasing the slider, you should be able to see the LED dim and glow at different levels.

If we wanted to, we could also switch modes and `digitalWrite` this LED to turn it on or off. To change the function of the pin, simply tap and hold on the pin, and the function select menu will come back up.


##digitalRead: The One Wire Test

We can also use Tinker to check to see if a pin is on or off. `digitalRead` is great for checking things that only have two states-- switches and buttons for example.

![One Wire Fritzing]({{assets}}/images/photon-onewire-fritzing.png)

In this case, we're going to do the simplest thing possible and simply use one wire. Plug a wire into D0 of your device as show in the image to the right.

As you can see, one side of the wire is plugged inot 3v3 and the other is plugged into D0. 3V3 sends the maximum voltage out. We've plugged it into D0, so D0 is receiving the maximum voltage.

Let's read that. Go into your mobile app and tap D0. Hold it to reset it first if you were previously using D0 in Tinker for something else. Once the menu comes up, select `digitalRead`.

If your wire is plugged in, you'll see the word `HIGH` next to the D0 pin. Now unplug the wire and tap the D0 pin on the mobile app once more. Now the pin will say `LOW`.

_NOTE:_  If you don't get `LOW` right away, give it a moment. There's still some residual voltage hanging out in the pin, but in a second or two that will disperse and it should read as `LOW`.


##analogRead: Reading a Sensor

If we want to read a sensor, like a temperature or light sensor, we will need our device to give us more details than than just "It's on!" or "It's off!" When you want to read a value between `LOW` and `HIGH`, use `analogRead`.

Plug in a sensor. In this example, we'll use a photoresistor.
![Photoresistor Only Fritzing]({{assets}}/images/photon-photores-only-fritzing.png)

Wire it up as pictured on the right. You can use any resistor for this; a larger resistor (like 10K Ohms) will give you a wider range of values whereas a smaller resistor (like 330 Ohms) will give you lower range of values.

Tap the A5 pin and set it to `digitalWrite` and `HIGH`. This essentially gives us a consistent power source from A5 that will go to our photoresistor. (We are doing this because sometimes an on-board power source like 3v3 has small fluctuations in power that could affect our photoresistor readings.)

Now tap A0 and set it to `analogRead`. Hold your breadboard with the photoresistor on it up to a light source and tap A0 again to get the reading of the photoresistor. Now cover the photoresistor and tap A0 again. See the difference?

You can try testing different kinds of light, or you can even swap out your photoresistor for another kind of fluctuating resistor like a thermistor or a force sensitive resistor.



##The Tinker firmware

Pretty cool examples, but what's actually happening here?

When you tap a pin on the mobile app, it sends a message up to the cloud. Your device is always listening to the cloud and waiting for instructions-- like "write D7 HIGH" or "read the voltage at A0".

Your device already knows how to communicate with the mobile app because we've put firmware on your device already. We call this the Tinker firmware. It's just like the user firmware you might load onto your device later, to blink and LED, drive a robot, monitor the temperature of your basement, or whatever you like. It's just that with the Tinker firmware, we've specified special `Spark.function`s that the mobile app knows and understands.

If your device is new, it already has the Tinker firmware on it. It's the default firmware stored on your device right from the factory. When you put your own user firmware on your device, you'll rewrite the Tinker firmware. (That means that your device will no longer understand commands from the Particle mobile app.) However, you can always get the Tinker firmware back on your device by putting it in [factory reset mode](/photon/modes/#selecting-various-modes-factory-reset), or by re-flashing your device with Tinker in the Particle app.

To reflash Tinker from within the app:

- **iOS Users**: Tap the list button at the top left. Then tap the arrow next to your desired device and tap the "Re-flash Tinker" button in the pop out menu.
- **Android Users**: With your desired device selected, tap the options button in the upper right and tap the "Reflash Tinker" option in the drop down menu.


The Tinker app is a great example of how to build a very powerful application with not all that much code. If you're a technical person, you can have a look at the latest release [here.](https://github.com/spark/firmware/blob/master/src/application.cpp)


<a id="annotated-tinker-firmware" data-firmware-example-url="http://docs.particle.io/photon/tinker/#annotated-tinker-firmware" data-firmware-example-title="Tinker" data-firmware-example-description="The factory default firmware that mobile apps interact with">

##Using Tinker with Your Code

I know what you're thinking: this is amazing, but I really want to use Tinker *while* my code is running so I can see what's happening! Now you can.

Combine your code with this framework, flash it to your device, and Tinker away.

<a data-firmware-example-code-block=true>

```cpp
int tinkerDigitalRead(String pin);
int tinkerDigitalWrite(String command);
int tinkerAnalogRead(String pin);
int tinkerAnalogWrite(String command);

//PUT YOUR VARIABLES HERE

void setup()
{
	Spark.function("digitalread", tinkerDigitalRead);
	Spark.function("digitalwrite", tinkerDigitalWrite);
	Spark.function("analogread", tinkerAnalogRead);
	Spark.function("analogwrite", tinkerAnalogWrite);

	//PUT YOUR SETUP CODE HERE


}

void loop()
{
	//PUT YOUR LOOP CODE HERE


}

int tinkerDigitalRead(String pin) {
	int pinNumber = pin.charAt(1) - '0';
	if (pinNumber< 0 || pinNumber >7) return -1;
	if(pin.startsWith("D")) {
		pinMode(pinNumber, INPUT_PULLDOWN);
		return digitalRead(pinNumber);}
	else if (pin.startsWith("A")){
		pinMode(pinNumber+10, INPUT_PULLDOWN);
		return digitalRead(pinNumber+10);}
	return -2;}

int tinkerDigitalWrite(String command){
	bool value = 0;
	int pinNumber = command.charAt(1) - '0';
	if (pinNumber< 0 || pinNumber >7) return -1;
	if(command.substring(3,7) == "HIGH") value = 1;
	else if(command.substring(3,6) == "LOW") value = 0;
	else return -2;
	if(command.startsWith("D")){
		pinMode(pinNumber, OUTPUT);
		digitalWrite(pinNumber, value);
		return 1;}
	else if(command.startsWith("A")){
		pinMode(pinNumber+10, OUTPUT);
		digitalWrite(pinNumber+10, value);
		return 1;}
	else return -3;}

int tinkerAnalogRead(String pin){
	int pinNumber = pin.charAt(1) - '0';
	if (pinNumber< 0 || pinNumber >7) return -1;
	if(pin.startsWith("D")){
		pinMode(pinNumber, INPUT);
		return analogRead(pinNumber);}
	else if (pin.startsWith("A")){
		pinMode(pinNumber+10, INPUT);
		return analogRead(pinNumber+10);}
	return -2;}

int tinkerAnalogWrite(String command){
	int pinNumber = command.charAt(1) - '0';
	if (pinNumber< 0 || pinNumber >7) return -1;
	String value = command.substring(3);
	if(command.startsWith("D")){
		pinMode(pinNumber, OUTPUT);
		analogWrite(pinNumber, value.toInt());
		return 1;}
	else if(command.startsWith("A")){
		pinMode(pinNumber+10, OUTPUT);
		analogWrite(pinNumber+10, value.toInt());
		return 1;}
	else return -2;}
```



