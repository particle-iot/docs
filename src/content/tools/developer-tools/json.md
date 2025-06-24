---
title: JSON tools
columns: two
layout: commonTwo.hbs
description: JSON tools
includeDefinitions: [api-helper, api-helper-events, api-helper-json, api-helper-mustache, api-helper-primitives, cbor, codemirror]
---

# {{title}}


Enter JSON in the box below to validate it. If there is a syntax error, there will be a red x in a circle 
on the line with the syntax error.
 
{{> json-linter rows="10" cols="60" defaultValue="{\"a\":123,\"b\":\"test\",\"c\":true,\"d\":[1,2,3]}"}}


- The **Prettify** button reformats the JSON to be one key/value pair per line, which is easier to read.
- The **Compact** button removes the excess whitespace and converts everything to a single line.
- The **Stringify** button converts JSON into a string, escaping double quotes and backslashes, and Unicode.
- The **Unstringify** button converts a string back into JSON, removing the escaping.
- The **Escape Unicode** button converts characters >= 127 to a four-digit hex Unicode escape sequence.

The five buttons only work when the JSON is valid. If there are syntax errors, the buttons will be grayed out.


### Convert to code

Sometimes you will want to convert JSON data into static strings in your C++ application firmware. The
tool below will convert the JSON above into code.

{{> json-to-code rows="10" cols="90"}}

### Convert to CBOR

CBOR is a compact binary representation of structured data that can be converted to and from JSON.

{{> json-to-cbor rows="10" cols="90"}}

Note: This tool uses a publicly available CBOR encoding Javascript library running in your browser. 
It's intended to be a rough approximation of the data size and may not produce the same results as the Particle cloud 
code as it is not based on the same implementation.

### Variant generator

Using the Variant class to generate JSON data on-device can simplify your code and greatly reduce
data size, because in Device OS 6.2 and later, your object is transparently converted to CBOR over the
air and converted to JSON in the cloud.

{{> json-to-variant rows="10" cols="90"}}
