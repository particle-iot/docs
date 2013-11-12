Annotated examples
=======

TBD

Blink an LED
===

Blinking an LED is the ["Hello World"](http://en.wikipedia.org/wiki/Hello_world_program) example of the microcontroller  world. Its a nice way to warm up and start your journey into the land of embedded hardware.

For this example, you will need a Spark Core (duh!), a Breadboard, an LED, a Resistor (we will soon find out a suitable value) and an USB cable.

Connect everything together as shown in the picture. 

```
ADD IMAGE OF THE SETUP
```

But wait, whats the value of the resistor again?

*Heres how we find that out:*

According to [Ohm's Law](http://en.wikipedia.org/wiki/Ohm%27s_law) : Voltage = Current x Resistance

Therefore, Resistance = Voltage/ Current

In our case, the output voltage of the Core is 3.3V but the LED (typically) has a forward voltage drop of around 2.0V. So the actual voltage would be:

3.3V - 2.0V = 1.3V

The required current to light up an LED varies any where between 2mA to 20mA. More the current, brighter the intensity. But generally its a good idea to drive the LED at a lower limit to prolong its life span. We will choose a drive current of 5mA.

Hence, Resistance = 1.3V/ 5mA = 260 Ohms

**NOTE:** Since there is so much variation in the values of the forward voltage drop of the LEDs depending upon type, size, color, manufacturer, etc., you could successfully use a resistor value from anywhere between 220Ohms to 1K Ohms.

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


Measuring the temperature
===

Texting the Core
===

An internet button
===

