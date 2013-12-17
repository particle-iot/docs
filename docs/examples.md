Annotated examples
=======

Here you will find a bunch of examples to get you started with your all new Spark Core!

Blink an LED
===

![One LED illustration](images/annotated-example1.jpg)

Blinking an LED is the ["Hello World"](http://en.wikipedia.org/wiki/Hello_world_program) example of the microcontroller  world. It's a nice way to warm up and start your journey into the land of embedded hardware.

For this example, you will need a Spark Core (duh!), a Breadboard, an LED, a Resistor (we will soon find out a suitable value) and an USB cable.

Connect everything together as shown in the picture. The LED is connected to pin D0 of the Core. The positive (longer pin) of the LED is connected to D0 and its negative pin (shorter) is connected to ground via a resistor.

![One LED setup](images/breadboard-one-led.jpg)

But wait, whats the value of the resistor again?

*Heres how we find that out:*

According to [Ohm's Law](http://en.wikipedia.org/wiki/Ohm%27s_law) : Voltage = Current x Resistance

Therefore, Resistance = Voltage/ Current

In our case, the output voltage of the Core is 3.3V but the LED (typically) has a forward voltage drop of around 2.0V. So the actual voltage would be:

3.3V - 2.0V = 1.3V

The required current to light up an LED varies any where between 2mA to 20mA. More the current, brighter the intensity. But generally its a good idea to drive the LED at a lower limit to prolong its life span. We will choose a drive current of 5mA.

Hence, Resistance = 1.3V/ 5mA = 260 Ohms

**NOTE:** Since there is so much variation in the values of the forward voltage drop of the LEDs depending upon type, size, color, manufacturer, etc., you could successfully use a resistor value from anywhere between 220Ohms to 1K Ohms.

In the picture above, we used a 1K resistor (Brown Black Red)

Now on to the actual program:

```C++
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

Control LEDs over the 'net
===

![Two LED setup](images/breadboard-two-leds.jpg)

Now that we know how to blink an LED, how about we control it over the Internet? This is where the fun begins.

Lets hook up two LEDs this time.

Here is the algorithm: 

- Set up the pins as outputs that have LEDs connected to them
- Create and register a Spark function ( this gets called automagically when you make an API request to it)
- Parse the incoming command and take appropriate actions

```C++
// -----------------------------------
// Controlling LEDs over the Internet
// -----------------------------------

// name the pins
int led1 = D0;
int led2 = D1;


// Function prototypes
int ledControl(String command);

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
   int pinNumber = command.charAt(1) - '0';
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
# Core ID is 0123456789abcdef01234567
# Your access token is 1234123412341234123412341234123412341234
curl https://api.spark.io/v1/devices/0123456789abcdef01234567/led \
  -d access_token=1234123412341234123412341234123412341234 \
  -d params=l1,HIGH
```

Note that the API endpoint is 'led', not 'ledControl'. This is because the endpoint is defined by the first argument of Spark.function(), which is a string of characters, rather than the second argument, which is a function.

To better understand the concept of making API calls to your Core over the cloud checkout the [Cloud API reference.](/#/api)

Measuring the temperature
===

![Read Sensor](images/annotated-example3.jpg)

We have now learned how to send custom commands to the Core and control the hardware. But how about reading data back from the Core?

In this example, we will hook up a temperature sensor to the Core and read the values over the internet with a web browser.

![Read Temperature](images/breadboard-temp-sensor.jpg)

We have used a widely available analog temperature called TMP36 from Analog Devices. You can download the [datasheet here.](http://www.analog.com/static/imported-files/data_sheets/TMP35_36_37.pdf)

Notice how we are powering the sensor from 3.3V\* pin instead of the regular 3.3V. This is because the 3.3V\* pin gives out a (LC) clean filtered  voltage, ideal for analog applications like these.

```C++
// -----------------
// Read temperature
// -----------------

// Create a variable that will store the temperature value
int temperature = 0;

void setup()
{
  // Register a Spark variable here
  Spark.variable("temperature", &temperature, INT);

  // Connect the temperature sensor to A0 and configure it
  // to be an input
  pinMode(A0, INPUT);
}

void loop()
{
  // Keep reading the temperature so when we make an API
  // call to read its value, we have the latest one
  temperature = analogRead(A0);
}
```

The returned value from the Core is going to be in the range from 0 to 4095. You can easily convert this value to actual temperature reading by using the following formula:

```
voltage = (sensor reading x 3.3)/4095  
Temperature (in Celsius) = (voltage - 0.5) X 100
```

---

The API request will look something like this:

```json
GET /v1/devices/{DEVICE_ID}/temperature

# EXAMPLE REQUEST IN TERMINAL
# Core ID is 0123456789abcdef01234567
# Your access token is 1234123412341234123412341234123412341234
curl "https://api.spark.io/v1/devices/0123456789abcdef01234567/temperature?access_token=1234123412341234123412341234123412341234"
```

Texting the Core
===

**coming soon!**

An internet button
===

**coming soon!**
