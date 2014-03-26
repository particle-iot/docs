Trying out stuff in your Maker Kit!
=======

### Activity 1: Blinking an LED ###

**Description**

In this activity, we will construct a simple circuit for you to turn on and off an LED. It's like the 'Hello world' example for any beginner in electronics!

**Items required:**
 - 330 Ohm Resistor 
 - LED of your color choice
 - Tinker App or Cloud IDE

**Schematic diagram:**

![Example LED](https://github.com/kennethlimcp/docs/blob/master/docs/example-images/ex-led.png?raw=true)


**Tinker App:**
 1. In your Tinker App, press on DO and make it a 'digitalwrite'
 2. Toggle the DO pin and see that the LED turns On and Off

**Example Code in Cloud IDE:**
```
  void setup(){
    pinMode(D0,OUTPUT);   //Set D0 as an Output pin
    digitalWrite(D0,LOW); //Set D0 to be LOW(0V) at start 
   }
  
  void loop(){            
    digitalWrite(D0,LOW);  //turn off LED
    delay(500);            //wait for 500ms
    digitalWrite(D0,HIGH); //turn on LED
    delay(500);            //wait for 500ms
   }
```

**Things you can modify:**

On Tinker App: NIL
 
In example code:

 1. Change the `500` in the `delay(500)` to `250`
 2. You will notice that the led blinks faster!
 3. Try other values but keep it below `2000`
 4. You can also make it turn on/off longer or shorter be varying the 2 numbers in `delay()`

    eg. Slow blink (Short On, Long Off)
   ```
    digitalWrite(D0,LOW);  //turn off LED
    delay(500);            //wait for 500ms
    digitalWrite(D0,HIGH); //turn on LED
    delay(1000);            //wait for 1s
   ``` 
   
 5. Change the 300 Ohm resistor to a 1K Ohm. You will notice that the LED becomes much dimmer.

**Congratulations for completing your very 1st Spark activity!!**



