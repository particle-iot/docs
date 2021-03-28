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
| \\\\ | Reverse Solidus (backslash) | 134 (0x92) |
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

## Try It!

Try copying and pasting the examples above or your own JSON file into the box below.

{{> json-linter rows="10" cols="60"}}

If there is a syntax error, there will be a red x in a circle on the line with the syntax error.

- The **Prettify** button reformats the JSON to be one key/value pair per line, which is easier to read. This only works if the JSON is valid.
- The **Compact** button removes the excess whitespace and converts everything to a single line. This only works if the JSON is valid.
- The **Stringify** button converts JSON into a string, escaping the double quotes. 
- The **Unstringify** button converts a string back into JSON, removing the escaping.

Try some other experiments:

- The four buttons are mostly non-destructive so try them out!
- Try adding a trailing comma after the last array element. It should generate a syntax error.
- Try adding a key not in double quotes. It should generate a syntax error.
- Try using single quotes instead of double quotes. It should generate a syntax error.

