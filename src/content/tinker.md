---
word: Tinker
title: Tinker
order: 11
---

Tinkering with "Tinker"
======

The Tinker app
---

![Tinker selection]({{assets}}/images/tinker.png)

The Tinker section of the Spark mobile app makes it very easy to start playing with your Spark Core without writing any code. It's great for early development, and often it will do everything you need to get your project off of the ground.

The app consists of 16 pins in vertical rows - 8 analog pins on the left, 8 digital pins on the right. These pins represent the 16 GPIO (General Purpose Input and Output) pins on the Spark Core, and are organized the same way.

To begin, tap any of the pins. A menu will pop up showing the functions that pin has available. Each pin can have up to four possible functions:

- **digitalWrite**: Sets the pin to HIGH or LOW, which either connects it to 3.3V (the maximum voltage of the system) or to GND (ground). Pin D7 is connected to an on-board LED; if you set pin D7 to HIGH, the LED will turn on, and if you set it to LOW, it will turn off.
- **analogWrite**: Sets the pin to a value between 0 and 255, where 0 is the same as LOW and 255 is the same as HIGH. This is sort of like sending a voltage between 0 and 3.3V, but since this is a digital system, it uses a mechanism called Pulse Width Modulation, or PWM. You could use *analogWrite* to dim an LED, as an example.
- **digitalRead**: This will read the digital value of a pin, which can be read as either HIGH or LOW. If you were to connect the pin to 3.3V, it would read HIGH; if you connect it to GND, it would read LOW. Anywhere in between, it'll probably read whichever one it's closer to, but it gets dicey in the middle.
- **analogRead**: This will read the analog value of a pin, which is a value from 0 to 4095, where 0 is LOW (GND) and 4095 is HIGH (3.3V). All of the analog pins (A0 to A7) can handle this. *analogRead* is great for reading data from sensors.

To change the function of the pin, simply tap and hold on the pin, and the function select menu will come back up. Any further questions? Come talk to us in the [forums!](https://community.sparkdevices.com/)

The Tinker firmware
---

The Tinker firmware is the default application program stored in the Spark Core upon its commissioning from the factory assembly line. You can always get back to it by putting the Core in the [factory reset mode](#buttons), or by re-flashing your Core with Tinker in the Spark app.

To reflash Tinker from within the app:

- **iOS Users**: Tap the list button at the top left. Then tap the arrow next to your desired Core and tap the "Re-flash Tinker" button in the pop out menu.
- **Android Users**: With your desired Core selected, tap the options button in the upper right and tap the "Reflash Tinker" option in the drop down menu.

The Tinker app is a great example of how to build a very powerful application with not all that much code. You can have a look at the latest release [here.](https://github.com/spark/core-firmware/blob/master/src/application.cpp)

Using Tinker with Your Code
---

I know what you're thinking: this is amazing, but I really want to use Tinker *while* my code is running so I can see what's happening! Now you can.

Combine your code with this framework, flash it to your Core, and Tinker away.

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

The Tinker API
---

When the Tinker firmware is installed on your Spark Core, it will respond to certain API requests from your mobile app, which mirror the four basic GPIO functions (digitalWrite, analogWrite, digitalRead, analogRead). These API requests can also be made from another application, so you can build your own web or mobile app around the Tinker firmware.

### digitalWrite

Sets the pin to HIGH or LOW, which either connects it to 3.3V (the maximum voltage of the system) or to GND (ground). Pin D7 is connected to an on-board LED; if you set pin D7 to HIGH, the LED will turn on, and if you set it to LOW, it will turn off.

    POST /v1/devices/{DEVICE_ID}/digitalwrite

    # EXAMPLE REQUEST IN TERMINAL
    # Core ID is 0123456789abcdef
    # Your access token is 123412341234
    curl https://api.spark.io/v1/devices/0123456789abcdef/digitalwrite \
      -d access_token=123412341234 -d params=D0,HIGH

The parameters must be the pin (A0 to A7, D0 to D7), followed by either HIGH or LOW, separated by a comma. The return value will be 1 if the write succeeds, and -1 if it fails.



### analogWrite

Sets the pin to a value between 0 and 255, where 0 is the same as LOW and 255 is the same as HIGH. This is sort of like sending a voltage between 0 and 3.3V, but since this is a digital system, it uses a mechanism called Pulse Width Modulation, or PWM. You could use *analogWrite* to dim an LED, as an example.

    POST /v1/devices/{DEVICE_ID}/analogwrite

    # EXAMPLE REQUEST IN TERMINAL
    # Core ID is 0123456789abcdef
    # Your access token is 123412341234
    curl https://api.spark.io/v1/devices/0123456789abcdef/analogwrite \
      -d access_token=123412341234 -d params=A0,215

The parameters must be the pin (A0 to A7, D0 to D7), followed by an integer value from 0 to 255, separated by a comma. The return value will be 1 if the write succeeds, and -1 if it fails.




### digitalRead

This will read the digital value of a pin, which can be read as either HIGH or LOW. If you were to connect the pin to 3.3V, it would read HIGH; if you connect it to GND, it would read LOW. Anywhere in between, it'll probably read whichever one it's closer to, but it gets dicey in the middle.

    POST /v1/devices/{DEVICE_ID}/digitalread

    # EXAMPLE REQUEST IN TERMINAL
    # Core ID is 0123456789abcdef
    # Your access token is 123412341234
    curl https://api.spark.io/v1/devices/0123456789abcdef/digitalread \
      -d access_token=123412341234 -d params=D0


The parameter must be the pin (A0 to A7, D0 to D7). The return value will be 1 if the pin is HIGH, 0 if the pin is LOW, and -1 if the read fails.



### analogRead

This will read the analog value of a pin, which is a value from 0 to 4095, where 0 is LOW (GND) and 4095 is HIGH (3.3V). All of the analog pins (A0 to A7) can handle this. *analogRead* is great for reading data from sensors.

    POST /v1/devices/{DEVICE_ID}/analogread

    # EXAMPLE REQUEST IN TERMINAL
    # Core ID is 0123456789abcdef
    # Your access token is 123412341234
    curl https://api.spark.io/v1/devices/0123456789abcdef/analogread \
      -d access_token=123412341234 -d params=A0

The parameters must be the pin (A0 to A7, D0 to D7). The return value will be between 0 and 4095 if the read succeeds, and -1 if it fails.
