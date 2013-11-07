Spark Core Firmware
==========

Functions
=====

Cloud
---

### Spark.variable()

Expose a *variable* through the Spark Cloud so that it can be called with `GET device/{VARIABLE}`.

```C++
SYNTAX
Spark.variable(var);

EXAMPLE USAGE
int temp_sensor = 0;
int temp;
Spark.variable(temp);

void loop() {
  temp = analogRead(temp_sensor);
}

COMPLEMENTARY API CALL
GET https://api.sprk.io/v1/devices/abcd1234/temp
```

**TO BE RESOLVED: How do we handle typing?**



### Spark.function()

Expose a *function* through the Spark Cloud so that it can be called with `POST device/{FUNCTION}`.

Currently the application supports the creation of upto 4 different Spark functions.

```C++
SYNTAX TO REGISTER A SPARK FUNCTION
Spark.function("funcKey", funcName);
                  ^
                  |
     (max of 12 characters long)
```

In order to register a Spark function, the user provides the `funcKey`, which is the string name used to make a POST request and a `funcName`, which is the actual name of the function that gets called in the Spark app. The Spark function must always return an `INT` value of either `1` (success) or `-1` (failure).

The length of the `funcKey` is limited to a max of 12 characters.

A Spark function is set up to take one argument of the [String](http://arduino.cc/en/Reference/StringObject) datatype. This argument length is limited to a max of 64 characters.

```C++
EXAMPLE USAGE
int brewCoffee(String command);

void setup()
{
  //register the Spark function
  Spark.function("brew", brewCoffee);
}

void loop()
{
  //this loops forever
}

//this function automagically gets called upon a matching POST request
int brewCoffee(String command) 
{
  //look for the matching argument "coffee" <-- max of 64 characters long
  if(command == "coffee")
  {
    //do something here
    activateWaterHeater();
    activateWaterPump();
    return 1;
  }
  else return -1;
}
```

```C++
COMPLEMENTARY API CALL
POST https://api.sprk.io/v1/devices/abcd1234/brew -d params=coffee
```

### Spark.event()

Send an *event* through the Spark Cloud that will be forwarded to registered callbacks and server-sent event streams.

```C++
SYNTAX
Spark.event(event_name, event_result);

EXAMPLE USAGE
int motion_sensor = 0;
int sensor_value = 0;

void loop() {
  sensor_value = analogRead(motion_sensor);

  if (sensor_value == 1) {
    Spark.event("motion", "motion detected");
  }
}

COMPLEMENTARY API CALL
I guess this should be callback registration...?
```

### Spark.connected()

Returns `true` when connected to the Spark Cloud, and `false` when disconnected to the Spark Cloud.

```C++
SYNTAX
Spark.connected();

RETURNS
boolean (true or false)

EXAMPLE USAGE
void setup() {
  Serial.begin(9600);
}

void loop() {
  if (Spark.connected()) {
    Serial.println("Connected!");
  }
  delay(1000);
}
```

### Spark.disconnect()

Disconnects the Spark Core from the Spark Cloud.

```C++
SYNTAX
Spark.disconnect()

EXAMPLE USAGE
Hmm, not sure what this one should look like...
```

NOTE: When the Core is disconnected, over-the-air updates are no longer possible. To re-enable over-the-air firmware updates, initiate a factory reset.



### Spark.connect()

Re-connects the Spark Core to the Spark Cloud after `Spark.disconnect()` is called.

```C++
SYNTAX
Spark.connect()

EXAMPLE USAGE
Not sure about this one either...
```

The Spark Core connects to the cloud by default, so it's not necessary to call `Spark.connect()` unless you have explicitly disconnected the Core.



### Spark.print()

Prints to the debug console in Spark's web IDE.

### Spark.println()

Prints to the debug console in Spark's web IDE, followed by a *newline* character.

Sleep
---

### Spark.sleep()

`Spark.sleep()` can be used to dramatically improve the battery life of a Spark-powered project by temporarily deactivating the Wi-Fi module, which is by far the biggest power draw.

```C++
SYNTAX
Spark.sleep(int millis);
Spark.sleep(int millis, array peripherals);
```

`Spark.sleep()` takes one argument, an `int`, for the number of milliseconds to sleep.

`Spark.sleep()` can also take an optional second argument, an `array` of other peripherals to deactivate. Deactivating unused peripherals on the micro-controller can take its power consumption into the micro-amps.

Input/Output
---

### pinMode()

`pinMode()` configures the specified pin to behave either as an input or an output. 

```C++
SYNTAX
pinMode(pin,mode);
```

`pinMode()` takes two arguments, `pin`: the number of the pin whose mode you wish to set and `mode`: `INPUT, INPUT_PULLUP, INPUT_PULLDOWN or OUTPUT.`

`pinMode()` does not return anything.

```C++
EXAMPLE USAGE
int button = D0;                       // button is connected to D0
int LED = D1;                          // LED is connected to D1 

void setup()
{
  pinMode(LED, OUTPUT);               // sets pin as output
  pinMode(button, INPUT_PULLDOWN);    // sets pin as input
}

void loop()
{
  while(digitalRead(button) == HIGH)  // blink the LED as long as the button is pressed
  {
    digitalWrite(LED, HIGH);          // sets the LED on
    delay(200);                       // waits for 200mS
    digitalWrite(LED, LOW);           // sets the LED off
    delay(200);                       // waits for 200mS
  }
}
```

### digitalWrite()

Write a `HIGH` or a `LOW` value to a digital pin.

```C++
SYNTAX
digitalWrite(pin, value);
```

If the pin has been configured as an OUTPUT with pinMode(), its voltage will be set to the corresponding value: 3.3V for HIGH, 0V (ground) for LOW.

`digitalWrite()` takes two arguments, `pin`: the number of the pin whose value you wish to set and `value`: `HIGH` or `LOW`.

`digitalWrite()` does not return anything.

```C++
EXAMPLE USAGE
int LED = D1;                       // LED is connected to D1

void setup()
{
  pinMode(LED, OUTPUT);             // sets pin as output
}

void loop()
{
  digitalWrite(LED, HIGH);          // sets the LED on
  delay(200);                       // waits for 200mS
  digitalWrite(LED, LOW);           // sets the LED off
  delay(200);                       // waits for 200mS
}
```

### digitalRead()

Reads the value from a specified digital `pin`, either `HIGH` or `LOW`.

```C++
SYNTAX
digitalRead(pin);
```

`digitalRead()` takes one argument, `pin`: the number of the digital pin you want to read.

`digitalRead()` returns `HIGH` or `LOW`.

```C++
EXAMPLE USAGE
int button = D0;                       // button is connected to D0
int LED = D1;                          // LED is connected to D1 
int val = 0;                           // variable to store the read value

void setup()
{
  pinMode(LED, OUTPUT);               // sets pin as output
  pinMode(button, INPUT_PULLDOWN);    // sets pin as input
}

void loop()
{
  val = digitalRead(button);          // read the input pin
  digitalWrite(LED, val);             // sets the LED to the button's value
}

```

### analogWrite()

Writes an analog value (PWM wave) to a pin. Can be used to light a LED at varying brightnesses or drive a motor at various speeds. After a call to analogWrite(), the pin will generate a steady square wave of the specified duty cycle until the next call to analogWrite() (or a call to digitalRead() or digitalWrite() on the same pin). The frequency of the PWM signal is approximately 500 Hz.

On the Spark Core, this function works on pins A0, A1, A4, A5, A6, A7, D0 and D1.

You do not need to call pinMode() to set the pin as an output before calling analogWrite().

The analogWrite function has nothing to do with the analog pins or the analogRead function. 

```C++
SYNTAX
analogWrite(pin, value);
```

`analogWrite()` takes two arguments, `pin`: the number of the pin whose value you wish to set and `value`: the duty cycle: between 0 (always off) and 255 (always on).

`analogWrite()` does not return anything.

```C++
EXAMPLE USAGE
int ledPin = D1;                // LED connected to digital pin D1
int analogPin = A0;             // potentiometer connected to analog pin A0
int val = 0;                    // variable to store the read value

void setup()
{
  pinMode(ledPin, OUTPUT);      // sets the pin as output
}

void loop()
{
  val = analogRead(analogPin);  // read the input pin
  analogWrite(ledPin, val/16);  // analogRead values go from 0 to 4095, analogWrite values from 0 to 255
}
```

### analogRead()

Reads the value from the specified analog pin. The Spark Core has 8 channels (A0 to A7) with a 12-bit resolution. This means that it will map input voltages between 0 and 3.3 volts into integer values between 0 and 4095. This yields a resolution between readings of: 3.3 volts / 4096 units or, 0.0008 volts (0.8 mV) per unit.

```C++
SYNTAX
analogRead(pin);
```

`analogRead()` takes one argument `pin`: the number of the analog input pin to read from ('A0 to A7'.)

`analogRead()` returns an integer value ranging from 0 to 4095.

```C++
EXAMPLE USAGE
int ledPin = D1;                // LED connected to digital pin D1
int analogPin = A0;             // potentiometer connected to analog pin A0
int val = 0;                    // variable to store the read value

void setup()
{
  pinMode(ledPin, OUTPUT);      // sets the pin as output
}

void loop()
{
  val = analogRead(analogPin);  // read the input pin
  analogWrite(ledPin, val/16);  // analogRead values go from 0 to 4095, analogWrite values from 0 to 255
}
```


Communication
===

TCP
-----

### TCPClient()
### TCPServer()

UDP
-----

TBD

Serial
-----

TBD

Other functions
====

Time
---

### millis()
### micros()
### delay()
### delayMicroseconds()


Interrupts
---

### attachInterrupt()
### detatchInterrupt()

Math
---

### min()
### max()
### abs()
### constrain()
### map()
### pow()
### sqrt()

Language Syntax
========
The following documentation is based on the Arduino reference which can be found [here.](http://arduino.cc/en/Reference/HomePage)

Structure
---
### setup()
The setup() function is called when an application starts. Use it to initialize variables, pin modes, start using libraries, etc. The setup function will only run once, after each powerup or reset of the Spark Core.

```C++
EXAMPLE USAGE
int button = D0;
int LED = D1;
//setup initializes D0 as input and D1 as output
void setup()
{
  pinMode(button, INPUT_PULLDOWN);
  pinMode(LED, OUTPUT);
}

void loop()
{
  // ...
}
```

### loop()
After creating a setup() function, which initializes and sets the initial values, the loop() function does precisely what its name suggests, and loops consecutively, allowing your program to change and respond. Use it to actively control the Spark Core.

```C++
EXAMPLE USAGE
int button = D0;
int LED = D1;
//setup initializes D0 as input and D1 as output
void setup()
{
  pinMode(button, INPUT_PULLDOWN);
  pinMode(LED, OUTPUT);
}

//loops to check if button was pressed,
//if it was, then it turns ON the LED,
//else the LED remains OFF
void loop()
{
  if (digitalRead(button) == HIGH)
    digitalWrite(LED,HIGH);
  else
    digitalWrite(LED,LOW);
}
```

Control structures
---

### if

`if`, which is used in conjunction with a comparison operator, tests whether a certain condition has been reached, such as an input being above a certain number. 

```C++
SYNTAX
if (someVariable > 50)
{
  // do something here
}
```
The program tests to see if someVariable is greater than 50. If it is, the program takes a particular action. Put another way, if the statement in parentheses is true, the statements inside the brackets are run. If not, the program skips over the code. 

The brackets may be omitted after an *if* statement. If this is done, the next line (defined by the semicolon) becomes the only conditional statement. 

```C++
if (x > 120) digitalWrite(LEDpin, HIGH); 

if (x > 120) 
digitalWrite(LEDpin, HIGH); 

if (x > 120){ digitalWrite(LEDpin, HIGH); } 

if (x > 120)
{ 
  digitalWrite(LEDpin1, HIGH);
  digitalWrite(LEDpin2, HIGH); 
}                                 // all are correct
```
The statements being evaluated inside the parentheses require the use of one or more operators:

### Comparison Operators

```C++
x == y (x is equal to y)
x != y (x is not equal to y)
x <  y (x is less than y)  
x >  y (x is greater than y) 
x <= y (x is less than or equal to y) 
x >= y (x is greater than or equal to y)
```

**WARNING:**
Beware of accidentally using the single equal sign (e.g. `if (x = 10)` ). The single equal sign is the assignment operator, and sets x to 10 (puts the value 10 into the variable x). Instead use the double equal sign (e.g. `if (x == 10)` ), which is the comparison operator, and tests whether x is equal to 10 or not. The latter statement is only true if x equals 10, but the former statement will always be true.

This is because C evaluates the statement `if (x=10)` as follows: 10 is assigned to x (remember that the single equal sign is the assignment operator), so x now contains 10. Then the 'if' conditional evaluates 10, which always evaluates to TRUE, since any non-zero number evaluates to TRUE. Consequently, `if (x = 10)` will always evaluate to TRUE, which is not the desired result when using an 'if' statement. Additionally, the variable x will be set to 10, which is also not a desired action.

`if` can also be part of a branching control structure using the `if...else`] construction. 

### if...else

*if/else* allows greater control over the flow of code than the basic *if* statement, by allowing multiple tests to be grouped together. For example, an analog input could be tested and one action taken if the input was less than 500, and another action taken if the input was 500 or greater. The code would look like this: 

```C++
SYNTAX
if (pinFiveInput < 500)
{
  // action A
}
else
{
  // action B
}
```
`else` can proceed another `if` test, so that multiple, mutually exclusive tests can be run at the same time. 

Each test will proceed to the next one until a true test is encountered. When a true test is found, its associated block of code is run, and the program then skips to the line following the entire if/else construction. If no test proves to be true, the default else block is executed, if one is present, and sets the default behavior. 

Note that an *else if* block may be used with or without a terminating *else* block and vice versa. An unlimited number of such else if branches is allowed. 

```C++
if (pinFiveInput < 500)
{
  // do Thing A
}
else if (pinFiveInput >= 1000)
{
  // do Thing B
}
else
{
  // do Thing C
}
```

Another way to express branching, mutually exclusive tests, is with the [`switch case`](http://spark.github.io/docs/#control-structures-switch-case) statement.

### for

The `for` statement is used to repeat a block of statements enclosed in curly braces. An increment counter is usually used to increment and terminate the loop. The `for` statement is useful for any repetitive operation, and is often used in combination with arrays to operate on collections of data/pins. 

There are three parts to the for loop header: 

```C++
SYNTAX
for (initialization; condition; increment) 
{
  //statement(s);
} 
```
The *initialization* happens first and exactly once. Each time through the loop, the *condition* is tested; if it's true, the statement block, and the *increment* is executed, then the condition is tested again. When the *condition* becomes false, the loop ends.

```C++
EXAMPLE USAGE
// Dim an LED using a PWM pin
int ledPin = D1; // LED in series with 470 ohm resistor on pin D1

void setup()
{
  // no setup needed
}

void loop()
{
   for (int i=0; i <= 255; i++){
      analogWrite(ledPin, i);
      delay(10);
   } 
}
```
The C `for` loop is much more flexible than for loops found in some other computer languages, including BASIC. Any or all of the three header elements may be omitted, although the semicolons are required. Also the statements for initialization, condition, and increment can be any valid C statements with unrelated variables, and use any C datatypes including floats. These types of unusual for statements may provide solutions to some rare programming problems.

For example, using a multiplication in the increment line will generate a logarithmic progression:

```C++
for(int x = 2; x < 100; x = x * 1.5)
{
  Serial.print(x);
}
//Generates: 2,3,4,6,9,13,19,28,42,63,94 
```
Another example, fade an LED up and down with one for loop: 

```C++
void loop()
{
   int x = 1;
   for (int i = 0; i > -1; i = i + x)
   {
      analogWrite(ledPin, i);
      if (i == 255) x = -1;     // switch direction at peak
      delay(10);
   } 
}
```

### switch case

Like `if` statements, `switch`...`case` controls the flow of programs by allowing programmers to specify different code that should be executed in various conditions. In particular, a switch statement compares the value of a variable to the values specified in case statements. When a case statement is found whose value matches that of the variable, the code in that case statement is run.

The `break` keyword exits the switch statement, and is typically used at the end of each case. Without a break statement, the switch statement will continue executing the following expressions ("falling-through") until a break, or the end of the switch statement is reached. 

```C++
SYNTAX
switch (var) 
{
  case label:
    // statements
    break;
  case label:
    // statements
    break;
  default: 
    // statements
}
```
`var` is the variable whose value to compare to the various cases 
`label` is a value to compare the variable to

```C++
EXAMPLE USAGE
switch (var) 
{
    case 1:
      //do something when var equals 1
      break;
    case 2:
      //do something when var equals 2
      break;
    default: 
      // if nothing else matches, do the default
      // default is optional
}
```

### while

`while` loops will loop continuously, and infinitely, until the expression inside the parenthesis, () becomes false. Something must change the tested variable, or the `while` loop will never exit. This could be in your code, such as an incremented variable, or an external condition, such as testing a sensor.

```C++
SYNTAX
while(expression)
{
  // statement(s)
}
```
`expression` is a (boolean) C statement that evaluates to true or false.

```C++
EXAMPLE USAGE
var = 0;
while(var < 200)
{
  // do something repetitive 200 times
  var++;
}
```

### do... while

The `do` loop works in the same manner as the `while` loop, with the exception that the condition is tested at the end of the loop, so the do loop will *always* run at least once. 

```C++
SYNTAX
do
{
    // statement block
} while (test condition);
```

```C++
EXAMPLE USAGE
do
{
  delay(50);          // wait for sensors to stabilize
  x = readSensors();  // check the sensors

} while (x < 100);
```

### break

`break` is used to exit from a `do`, `for`, or `while` loop, bypassing the normal loop condition. It is also used to exit from a `switch` statement.

```C++
EXAMPLE USAGE
for (int x = 0; x < 255; x ++)
{
    digitalWrite(ledPin, x);
    sens = analogRead(sensorPin);  
    if (sens > threshold)         // bail out on sensor detect
    {      
       x = 0;
       break;
    }  
    delay(50);
}
```

### continue

The continue statement skips the rest of the current iteration of a loop (`do`, `for`, or `while`). It continues by checking the conditional expression of the loop, and proceeding with any subsequent iterations.

```C++
EXAMPLE USAGE
for (x = 0; x < 255; x ++)
{
    if (x > 40 && x < 120) continue;    // create jump in values
    
    digitalWrite(PWMpin, x);
    delay(50);
}
```

### return

Terminate a function and return a value from a function to the calling function, if desired.

```C++
EXAMPLE
// A function to compare a sensor input to a threshold 
 int checkSensor()
 {       
    if (analogRead(0) > 400) return 1;
    else return 0;
}
```
The return keyword is handy to test a section of code without having to "comment out" large sections of possibly buggy code. 

```C++
void loop()
{
  // brilliant code idea to test here

  return;

  // the rest of a dysfunctional sketch here
  // this code will never be executed
}
```

### goto

Transfers program flow to a labeled point in the program

```C++
USAGE
label:

goto label; // sends program flow to the label 
```

**TIP:**
The use of `goto` is discouraged in C programming, and some authors of C programming books claim that the `goto` statement is never necessary, but used judiciously, it can simplify certain programs. The reason that many programmers frown upon the use of `goto` is that with the unrestrained use of `goto` statements, it is easy to create a program with undefined program flow, which can never be debugged.

With that said, there are instances where a `goto` statement can come in handy, and simplify coding. One of these situations is to break out of deeply nested `for` loops, or `if` logic blocks, on a certain condition. 

```C++
EXAMPLE USAGE
for(byte r = 0; r < 255; r++){
    for(byte g = 255; g > -1; g--){
        for(byte b = 0; b < 255; b++){
            if (analogRead(0) > 250){ goto bailout;}
            // more statements ... 
        }
    }
}
bailout:
```

Further syntax
---

### ; (semicolon)

Used to end a statement.

`int a = 13;`

**Tip:**
Forgetting to end a line in a semicolon will result in a compiler error. The error text may be obvious, and refer to a missing semicolon, or it may not. If an impenetrable or seemingly illogical compiler error comes up, one of the first things to check is a missing semicolon, in the immediate vicinity, preceding the line at which the compiler complained. 

### {} (curly braces)

Curly braces (also referred to as just "braces" or as "curly brackets") are a major part of the C programming language. They are used in several different constructs, outlined below, and this can sometimes be confusing for beginners. 

```C++
//The main uses of curly braces

//Functions
  void myfunction(datatype argument){
    statements(s)
  }

//Loops
  while (boolean expression)
  {
     statement(s)
  }

  do
  {
     statement(s)
  } while (boolean expression);

  for (initialisation; termination condition; incrementing expr)
  {
     statement(s)
  } 

//Conditional statements
  if (boolean expression)
  {
     statement(s)
  }

  else if (boolean expression)
  {
     statement(s)
  } 
  else
  {
     statement(s)
  }

```

An opening curly brace "{" must always be followed by a closing curly brace "}". This is a condition that is often referred to as the braces being balanced. 

Beginning programmers, and programmers coming to C from the BASIC language often find using braces confusing or daunting. After all, the same curly braces replace the RETURN statement in a subroutine (function), the ENDIF statement in a conditional and the NEXT statement in a FOR loop. 

Because the use of the curly brace is so varied, it is good programming practice to type the closing brace immediately after typing the opening brace when inserting a construct which requires curly braces. Then insert some carriage returns between your braces and begin inserting statements. Your braces, and your attitude, will never become unbalanced. 

Unbalanced braces can often lead to cryptic, impenetrable compiler errors that can sometimes be hard to track down in a large program. Because of their varied usages, braces are also incredibly important to the syntax of a program and moving a brace one or two lines will often dramatically affect the meaning of a program.


### // (single line comment)
### /\* \*/ (multi-line comment)

Comments are lines in the program that are used to inform yourself or others about the way the program works. They are ignored by the compiler, and not exported to the processor, so they don't take up any space on the Spark Core.

Comments only purpose are to help you understand (or remember) how your program works or to inform others how your program works. There are two different ways of marking a line as a comment:

```C++
EXAMPLE USAGE
 x = 5;  // This is a single line comment. Anything after the slashes is a comment 
         // to the end of the line

/* this is multiline comment - use it to comment out whole blocks of code

if (gwb == 0){   // single line comment is OK inside a multiline comment
x = 3;           /* but not another multiline comment - this is invalid */
}
// don't forget the "closing" comment - they have to be balanced!
*/
```

**TIP:**
When experimenting with code, "commenting out" parts of your program is a convenient way to remove lines that may be buggy. This leaves the lines in the code, but turns them into comments, so the compiler just ignores them. This can be especially useful when trying to locate a problem, or when a program refuses to compile and the compiler error is cryptic or unhelpful. 


### #define

`#define` is a useful C component that allows the programmer to give a name to a constant value before the program is compiled. Defined constants don't take up any program memory space on the chip. The compiler will replace references to these constants with the defined value at compile time.

`#define constantName value`  
Note that the # is necessary.

This can have some unwanted side effects though, if for example, a constant name that had been `#defined` is included in some other constant or variable name. In that case the text would be replaced by the #defined number (or text).

```C++
EXAMPLE USAGE
#define ledPin 3
// The compiler will replace any mention of ledPin with the value 3 at compile time.
```

In general, the [const]() keyword is preferred for defining constants and should be used instead of #define. 

**TIP:**
There is no semicolon after the #define statement. If you include one, the compiler will throw cryptic errors further down the page. 

`#define ledPin 3;    // this is an error`

Similarly, including an equal sign after the #define statement will also generate a cryptic compiler error further down the page. 

`#define ledPin  = 3  // this is also an error`

### #include

`#include` is used to include outside libraries in your application code. This gives the programmer access to a large group of standard C libraries (groups of pre-made functions), and also libraries written especially for Spark Core.

Note that #include, similar to #define, has no semicolon terminator, and the compiler will yield cryptic error messages if you add one.

Arithmetic operators
---

### = (assignment operator)

Stores the value to the right of the equal sign in the variable to the left of the equal sign.

The single equal sign in the C programming language is called the assignment operator. It has a different meaning than in algebra class where it indicated an equation or equality. The assignment operator tells the microcontroller to evaluate whatever value or expression is on the right side of the equal sign, and store it in the variable to the left of the equal sign. 

```C++
EXAMPLE USAGE
int sensVal;                // declare an integer variable named sensVal
senVal = analogRead(A0);    // store the (digitized) input voltage at analog pin A0 in SensVal
```
**TIP:**
The variable on the left side of the assignment operator ( = sign ) needs to be able to hold the value stored in it. If it is not large enough to hold a value, the value stored in the variable will be incorrect.

Don't confuse the assignment operator `=` (single equal sign) with the comparison operator `==` (double equal signs), which evaluates whether two expressions are equal. 

### + - / (additon subtraction division)

These operators return the sum, difference, product, or quotient (respectively) of the two operands. The operation is conducted using the data type of the operands, so, for example,`9 / 4` gives 2 since 9 and 4 are ints. This also means that the operation can overflow if the result is larger than that which can be stored in the data type (e.g. adding 1 to an int with the value 32,767 gives -32,768). If the operands are of different types, the "larger" type is used for the calculation.

If one of the numbers (operands) are of the type float or of type double, floating point math will be used for the calculation. 

```C++
EXAMPLE USAGES
y = y + 3;
x = x - 7;
i = j * 6;
r = r / 5;
```

```C++
SYNTAX
result = value1 + value2;
result = value1 - value2;
result = value1 * value2;
result = value1 / value2;
```
`value1` and `value2` can be any variable or constant.

**TIPS:** 

  - Know that integer constants default to int, so some constant calculations may overflow (e.g. 60 * 1000 will yield a negative result).
  - Choose variable sizes that are large enough to hold the largest results from your calculations  
  - Know at what point your variable will "roll over" and also what happens in the other direction e.g. (0 - 1) OR (0 - - 32768)  
  - For math that requires fractions, use float variables, but be aware of their drawbacks: large size, slow computation speeds  
  - Use the cast operator e.g. (int)myFloat to convert one variable type to another on the fly.  

### % (modulo)

Calculates the remainder when one integer is divided by another. It is useful for keeping a variable within a particular range (e.g. the size of an array).

`result = dividend % divisor`

`dividend` is the number to be divided and  
`divisor` is the number to divide by.

`result` is the remainder

```C++
EXAMPLE USAGES
x = 7 % 5;   // x now contains 2
x = 9 % 5;   // x now contains 4
x = 5 % 5;   // x now contains 0
x = 4 % 5;   // x now contains 4
```

```C++
EXAMPLE CODE
//update one value in an array each time through a loop

int values[10];
int i = 0;

void setup() {}

void loop()
{
  values[i] = analogRead(A0);
  i = (i + 1) % 10;   // modulo operator rolls over variable  
}
```

**TIP:**
The modulo operator does not work on floats.

Comparison operators
---

Boolean operators
---

Bitwise operators
---

Compound operators
---


Variables
========

Libraries
========
