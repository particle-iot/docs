---
title: JSON
order: 12
columns: two
layout: tutorials.hbs
description: Using JSON with Particle Devices
includeDefinitions: [api-helper, api-helper-events, api-helper-json, api-helper-primitives, codemirror]
---

# JSON (JavaScript Object Notation)

## Introduction

[JSON](https://www.json.org/) is a text-based format for exchanging data. It's useful because 
while it's mainly used for machine-to-machine data transfer, it's easy for humans to read and 
generate as well. 

It's a well-defined standard (ECMA 404) and is implemented compatibly across operating
systems, web services, and IoT devices. On Particle devices, you can use it with the
cloud primitives including publish, subscribe, functions, and variables. Webhooks and
SSE (server-sent-events) also can take advantage of JSON. 

It's the native format for Tracker configuration, and you can use it in many other places
like device notes, NFC data, the possibilities are endless! 

Commonly used data types include:

- Number (integer or floating point)
- String (UTF-16)
- Boolean (`true` or `false`)
- `null` (less commonly used)

You can group together data types in an object, which consist of key/value pairs, or
an array of just values.

Objects and arrays can contain both simple types (number, string) as well as more objects
or arrays. Nested objects are allowed, but you cannot represent circular data objects.

The use of key/value pairs is helpful for client-server and similar situations because 
you can easily add new data (more key/value pairs) later without breaking things as long 
as both sides ignore keys they don't understand. 


## JSON Examples

Here's a JSON object containing a key `a` and a value `123`:

```json
{
  "a":123
}
```

Multiple values are separated by commas:

```json
{
  "a": 123,
  "b": 456
}
```

The whitespace and multiple lines are optional, and this is equivalent:

```json
{"a":123,"b":456}
```

The keys are always surrounded by double quotes. If you're familiar with Javascript JSON will 
look familiar, however Javascript is more lax and allows, for example, single quotes surrounding 
keys and strings. That is not allowed in JSON!

It's also worth nothing that you cannot have comments in JSON data.

Numbers can be decimal as well as integer:

```json
{
  "value":33.333
}
```

The JSON format does not specify a maximum precision, however when converted the destination 
may impose limits. For example, your Particle device may save the value in a float or double,
which does have limits. 

As you might guess, strings are also surrounded by double quotes:

```json
{
  "value":"this is a test"
}
```

What happens if you need to include a double quote in a JSON value? You escape it with a backslash:

```json
{
  "value":"Call me \"Al\""
}
```

But what if you want to encode a backslash? You double it.

```json
{
  "value":"Ends with a backlash\\"
}
```

There are a bunch of valid backslash escapes:

| Character | Name | ASCII Code |
| :---: | :--- | :---: |
| \b | Backspace | 8 (0x08) |
| \n | Newline | 10 (0x0a) |
| \f | Formfeed | 12 (0x0c)|
| \r | Carriage Return | 13 (0x0d) |
| \/ | Solidus (forward slash) | 27 (0x2f) |
| \" | Double Quote | 34 (0x22)|
| \\\\ | Reverse Solidus (backslash) | 92 (0x5c) |
| \u | 4 hex digits, Unicode UTF-16 | &nbsp; | 

Note that you cannot continue a string across multiple lines. But you can insert a new line (`\n`) in a string.

Arrays are surrounded by square bracket:

```json
[
    1,
    2,
    3
]
```

And you can include an array in an object:

```json
{
  "a": [
    1,
    2,
    3
  ],
  "b": "testing!"
}
```

Note that arrays and objects can't end in a trailing comma in JSON, but can in Javascript. 

You can nest objects and arrays as deeply as you want:

```json
{
  "a": {
    "inner1": 123,
    "inner2": 456,
    "innerArray": [
      555.5,
      666.6
    ]
  }
}
```

There is no limit to the length of keys and data elements imposed by the JSON standard. However, using 
extremely long key names and very nested objects will use up more space if you're trying to fit the data 
in a 622-character publish.

It's also important to note that binary data cannot be stored in JSON! You must instead encode the binary data
in a text-based format and store it in a string. Some formats you might want to use include:

- Hex encoding
- Base 64
- Base 85 (Ascii85)

### Try It!

Enter JSON in the box below to validate it. If there is a syntax error, there will be a red x in a circle 
on the line with the syntax error.
 
{{> json-linter rows="10" cols="60" defaultValue="{\"a\":123,\"b\":\"test\",\"c\":true,\"d\":[1,2,3]}"}}


- The **Prettify** button reformats the JSON to be one key/value pair per line, which is easier to read.
- The **Compact** button removes the excess whitespace and converts everything to a single line.
- The **Stringify** button converts JSON into a string, escaping double quotes and backslashes, and Unicode.
- The **Unstringify** button converts a string back into JSON, removing the escaping.
- The **Escape Unicode** button converts characters >= 127 to a four-digit hex Unicode escape sequence.

The five buttons only work when the JSON is valid. If there are syntax errors, the buttons will be grayed out.


Try some other experiments:

- The buttons are mostly non-destructive so try them out!
- Try copying and pasting the examples above or your own JSON file into the box.
- Try typing some diacritical marks (like jalapeño).

Try intentionally creating syntax errors:

- Try adding a trailing comma after the last array element.
- Try adding a key not in double quotes.
- Try using single quotes instead of double quotes.

## Generate using sprintf

A common use case is to generate JSON on your Particle device and send it to the cloud using `Particle.publish()`.

For simple data, using the standard C library function `sprintf()` or `String::format()` are a convenient 
method. 

One important caveat: Once you start getting into strings that might contain a double quote, 
backslash, or other character that must be escaped, things start to get complicated very quickly
and you are much better off using the JSON generator in the next step. In fact, once you get
used to using the JSON generator you'll probably want to use it for all cases, since it really
makes life simpler.

If you use `sprintf`, you must allocate a buffer big enough to hold your output. Furthermore, you
should always use `snprintf` which includes a length field, which prevents buffer overruns if
your buffer is too small. A buffer overrun could cause your code to crash, or worse yet,
crash sometimes later for unknown reasons because of heap corruption.

```cpp
int a = 123;
int b = 456;

char buf[256];
snprintf(buf, sizeof(buf), "{\"a\":%d,\"b\":%d}", a, b);
Particle.publish("testEvent", buf);
// {"a":123,"b":456}
```

Note the need to escape all of the double quotes in the formatting string using backslashes.

You can also do this using String::format, which does not require allocating a buffer:

```cpp
int a = 123;
int b = 456;

Particle.publish("testEvent", String::format("{\"a\":%d,\"b\":%d}", a, b);
// {"a":123,"b":456}
```

If you need to include a c-string (const char *), use `%s` but don't forget to double
quote escape the output.

```cpp
int a = 123;
const char *b = "testing!";

char buf[256];
snprintf(buf, sizeof(buf), "{\"a\":%d,\"b\":\"%s\"}", a, b);
// {"a":123,"b":"testing!"}
```

If the source is a `String` make sure you use `.c_str()` when using `%s`:

```cpp
int a = 123;
String b = "testing!";

char buf[256];
snprintf(buf, sizeof(buf), "{\"a\":%d,\"b\":\"%s\"}", a, b.c_str());
// {"a":123,"b":"testing!"}
```

You can output floating point numbers:

```cpp
float a = 12.333333;

char buf[256];
snprintf(buf, sizeof(buf), "{\"a\":%f}", a);
// {"a":12.333333}
```

Floating point numbers with a limited number of decimal points:

```cpp
float a = 12.333333;

char buf[256];
snprintf(buf, sizeof(buf), "{\"a\":%.2f}", a);
// {"a":12.33}
```

For `double` use `%lf` (long float):

```cpp
double a = 12.333333;

char buf[256];
snprintf(buf, sizeof(buf), "{\"a\":%lf}", a);
//{"a":12.333333}
```

For booleans you might do something like this. Note that the `true` and `false` are not enclosed in double 
quotes in the JSON output.

```cpp
 bool a = false;

char buf[256];
snprintf(buf, sizeof(buf), "{\"a\":%s}", (a ? "true" : "false"));
// {"a":false}
```

Putting it all together:

```cpp
int a = 123;
float b = 5.5;
bool c = true;
const char *d = "testing";

char buf[256];
snprintf(buf, sizeof(buf), "{\"a\":%d,\"b\":%.1f,\"c\":%s,\"d\":\"%s\"}", 
    a, b, (c ? "true" : "false"), d);
// {"a":123,"b":5.5,"c":true,"d":"testing"}
```

There are so many options to sprintf but fortunately there are many good references online
including the one at [cplusplus.com](http://www.cplusplus.com/reference/cstdio/printf/).

## JSON Troubleshooting

As generating JSON that way is error-prone, some debugging techniques can help.

This is a code sample for generating some JSON publish data. You can flash right
from here, though you will probably want to copy this into Particle Workbench or
the Web IDE so you can edit the code to try out new things.

{{codebox content="/assets/files/cloud-communication/publish3.cpp" format="cpp" height="400" flash="true"}}

### The console 

The [Particle Console](https://console.particle.io/) as an **Events** tab that allows you to see recent events.

![Events](/assets/images/json/events1.png)

Clicking on a row will show the details. Important note: The **Pretty** view is not actually JSON! It's missing the comma-separators, for example.

![Detail Pretty](/assets/images/json/detail1.png)

The **Raw** view is the actual string received in the event.

![Detail Raw](/assets/images/json/detail2.png)

### The event

The Particle event payload may contain JSON, as the code above shows. However, there is no requirement that
the event data be JSON, and may only be a string of data. It could be a single data element, or something like 
comma-separated values. While the console decodes JSON if detected, the data does not have to be JSON.

Because of this, the data is treated as a JSON string value, not a JSON object value. The double quotes, in particular,
as backslash escaped in the event payload.

This applies when getting the data from most sources:

- `\{\{PARTICLE_EVENT_DATA}}` in a webhook
- The `.data` field of the event in SSE (Server-Sent-Events)
- The `.data` from Particle API JS event when using `getEvent()`

If you are processing an event payload that you know is JSON, you will need to parse it. For example, when
using a browser or node.js, you will probably use `JSON.parse(event.data)`.

### Event decoder

What if you are having trouble with your event JSON. It's easy to make a mistake in encoding the
JSON by hand using `sprintf`. This online viewer will print the most recently received event in 
the box and attempt to parse it as JSON. If there are errors, they will be flagged which will
hopefully make it easier to figure out what you did wrong.

{{> sso }}
{{> event-viewer-json height="300"}}

## Using JSONWriter

Instead of using `sprintf` you can use the `JSONWriter` class in the Device OS API.

In the example above we wanted to output these values:

```cpp
int a = rand() % 10000;
float b = ((float)rand()) / 100.0;
bool c = (bool)(rand() % 2);
String d(String::format("testing %d", rand() % 1000));
```

This is the `sprintf` version:

```cpp
char buf[256];
snprintf(buf, sizeof(buf), 
    "{\"a\":%d,\"b\":%.3f,\"c\":%s,\"d\":\"%s\"}", 
    a, b, (c ? "true" : "false"), d.c_str());
```

And the equivalent JSONWriter:

```cpp
char buf[256];
JSONBufferWriter writer(buf, sizeof(buf));
writer.beginObject();
    writer.name("a").value(a);
    writer.name("b").value(b, 3);
    writer.name("c").value(c);
    writer.name("d").value(d);
writer.endObject();
writer.buffer()[std::min(writer.bufferSize(), writer.dataSize())] = 0;
```

It's more verbose, but it's also much more readable and less error-prone. The big
advantage is that if the String (`d`) may contain special characters that need to 
be escaped like double quotes and backslash characters.

Also, if you have arrays, especially variable-length arrays, or nested objects, 
it is much easier to use the JSONWriter.

The [Device OS Firmware API Reference](/reference/device-os/firmware/boron/#jsonwriter) has
more information on JSONWriter.

## Receiving JSON

You may want to receive JSON data on your Particle device using a Particle.function or
subscribing to a Particle event.

### Subscription logger

This sample device firmware just subscribes to the event `testEvent` and prints out JSON to 
the USB serial debug log.

{{codebox content="/assets/files/cloud-communication/subscribe3.cpp" format="cpp" height="400" flash="true"}}

### Sample event sender

This box allows you to enter JSON and publish it:

{{> publish-event-json defaultName="testEvent" defaultData="{\"a\":123,\"b\":\"test\",\"c\":true,\"d\":[1,2,3]}"}}

```
{"a":123,"b":"test","c":true,"d":[1,2,3]}
```

Combining the two, you should see a decoded event like this in the USB serial debug log:

```
0000010859 [app] INFO: Object
0000010859 [app] INFO:   key="a" Number: 123
0000010860 [app] INFO:   key="b" String: "test"
0000010860 [app] INFO:   key="c" Bool: true
0000010860 [app] INFO:   key="d" Array
0000010861 [app] INFO:     Number: 1
0000010861 [app] INFO:     Number: 2
0000010861 [app] INFO:     Number: 3
```

### Looking for values

In most cases you won't just be logging your event out to the USB serial debug log, you'll
actually want to extract the values you care about.

{{codebox content="/assets/files/cloud-communication/subscribe4.cpp" format="cpp" height="400" flash="true"}}

The important part of the code is here:

We initialize the values to good default. There's no guarantee the JSON object will have every element we expect.

```cpp
int a = 0;
String b;
bool c = false;
```

This parses the JSON and sets up an iterator:

```cpp
JSONValue outerObj = JSONValue::parseCopy(data);
JSONObjectIterator iter(outerObj);
while (iter.next())
{
```

For each item in the `outerObj` we check the name (key) of the key/value. If it's one we're expecting
we decode it and store it in our local variable we defined above.

```cpp    
    if (iter.name() == "a") 
    {
        a = iter.value().toInt();
    }
    else
    if (iter.name() == "b") 
    {
        b = iter.value().toString().data();
    }
    else
    if (iter.name() == "c") 
    {
        c = iter.value().toBool();
    }
}
```

Finally, outside of the iterator we print out all of the values we obtained.

```cpp
Log.info("a=%d", a);
Log.info("b=%s", b.c_str());
Log.info("a=%s", (c ? "true" : "false"));
```

And the USB serial debug output should look like this:

```
0000007544 [app] INFO: a=123
0000007544 [app] INFO: b=test
0000007544 [app] INFO: a=true
```

