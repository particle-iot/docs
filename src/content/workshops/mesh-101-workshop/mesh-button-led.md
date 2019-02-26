---
word: Putting it all together
title: Putting it all together
order: 9
columns: two
layout: workshops.hbs
---

# Putting it all together

In this session, it will all come together. One device is measuring a distance and broadcasting the value, while another is listening for updates and displaying them on a digital display.

### Partner up with your neighbor

For this session, it is necessary to cooperate in groups of at least two participants. Group members will have to implement different code depending on the role of their device. One group member should implement the _remote distance sensor_ code, the other(s) should implement the _remote display_ code.

::: tip Did you come prepared?
It is assumed that you come to this session with an Argon and a Xenon on the same mesh network, and have working code from the previous sessions.
:::

## Remote distance sensor

In a [previous session](grove-kit-distance-display.md) you wrote code that read the distance from the ultrasonic distance sensor in the Grove sensor kit. Now we take those capabilities to the mesh. If you get stuck in the code, the final code for the remote distance measurer is [available here](https://go.particle.io/shared_apps/5c0718d14e3594c0cf00082f).

1. In the [Particle Web IDE](https://build.particle.io), make a new app and call it "RemoteDistanceSensor" (or come up with a more creative name).

2. Add the Grove-Ultrasonic-Ranger library to the app.

3. Copy paste the part of the code that did the reading of the sensor in the 2nd lab. It should look something like the following (delete the automatically added `#include` line when importing the library).

```cpp
#include "Ultrasonic.h"

Ultrasonic ultrasonic(D2);

int lastRange = 0;

void setup() {
    Serial.begin(9600);
}

void loop() {
	int range;

	Serial.println("Obstacle found at:");

	range = ultrasonic.MeasureInCentimeters();
	Serial.print(range); //0~400cm
	Serial.println(" cm");

	if (range != lastRange) {
	    lastRange = range;

        // Publish measurement

	}

	delay(250);
}
```

2. Now take that reading and publish it to the mesh network. The group needs to agree on a name for the event – in the example we will use `distance`. Insert the `mesh.publish` function instead of the _Publish measurement_ comment line. Convert the range number to a _String_ before publishing it.

```cpp
Mesh.publish("distance",String(range));
```

3. Upload this code to the device connected to the distance sensor.

You now have a working distance sensor publishing its readings to the network.

## Remote display

Let's build a remote distance display. If you get stuck in the code, the final code for the remote distance measurer is [available here](https://go.particle.io/shared_apps/5c0711444e3594b2630006e0).

1. Make a new app for the displaying device and call it "Remote4DigitDisplay" (feel free to freestyle the name though).

2. Add the `Grove_4Digit_Display` library to the app.

3. Replace the include statement that was added with `#include "TM1637.h"`.

4. Define the pins used for the display, create a display variable and initialize the display. The app should now look something like this.

```cpp
#include "TM1637.h"

#define CLK D4
#define DIO D5

TM1637 disp(CLK,DIO);

void setup() {
	Serial.begin(9600);

	disp.init();
    disp.set(BRIGHT_TYPICAL);
}

void loop() {

}
```

5. You can now run the code, but it will not do anything interesting. So let's subscribe to the event data pulished by the other device in our mesh network. Add the subscription line to the `setup` function.

```cpp
Mesh.subscribe("distance", displayDistance);
```

6. Now, every time the device receives a `distance` event, the function `displayDistance` will be called. We will write this function now. Insert the function above the `setup` function, and simply just write the received String to the terminal.

```cpp
void displayDistance(const char *event, const char *data) {
    Serial.print("Mesh 'distance' event received with data: ");
    Serial.println(data);
}
```

7. Right now the number is stored as a String, so it needs to be converted to an integer (int). This is simply done by the build-in `atoi` function. Insert the following line right before the print statements.

```cpp
// Convert String (data) to int (range)
int range = atoi(data);
```

8. Now that you have an interger, you can display the value in the 4-digit display. First declare these two variables in the beginning of the `displayDistance` function.

```cpp
int digit;
int pos = 3;
```

9. Then paste the `for`and `while` loop you used previously with the display, to the bottom of the `displayDistance` function.

```cpp
// Fill display with zeros
for (int i = 0; i < 4; i++) {
    disp.display(i, 0);
}

// Extract each digit from the range and write it to the display
while (range >= 1) {
    // Get the current digit by performing modulo (%) division on the range
    digit  = range % 10;
    // Remove the trailing digit by whole-number division
    range /= 10;

    disp.display(pos, digit);
    pos--;
}
```

10. Upload this code to the device connected to the distance sensor.

Now, every time a distance measurement is broadcasted by the sensor device, the display is updated, hooray!!!

This concludes the workshop :tada:

::: tip Feedback for the workshop

If you fill out this [5 question survey](https://particleiot.typeform.com/to/JiF8xM), we may improve this workshop to benefit future _workshoppers_, or just pat ourselves on the back for doing great.
:::

## More mesh?

Feel you want more mesh? Try adding features to your IoT mesh solution see these [hidden hints](extra.md).
