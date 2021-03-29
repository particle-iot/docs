---
title: JSON
order: 12
columns: two
layout: tutorials.hbs
description: Using JSON with Particle Devices
includeDefinitions: [api-helper,api-helper-json,codemirror]
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
```

Note the need to escape all of the double quotes in the formatting string using backslashes.

You can also do this using String::format, which does not require allocating a buffer:

```cpp
int a = 123;
int b = 456;

Particle.publish("testEvent", String::format("{\"a\":%d,\"b\":%d}", a, b);
```

If you need to include a c-string (const char *), use `%s` but don't forget to double
quote escape the output.


