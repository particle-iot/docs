---
title: Typed publish
layout: commonTwo.hbs
columns: two
description: Typed publish for Particle IoT devices
---

# {{title}}

In Device OS 6.2.0, a number of enhancements were made to allow data types other than 
plain text to be sent and allow for more efficient transmission of structured data.

Enhancement in later versions of Device OS will allow for larger payloads, and limits exceeding 1 publish per second.

## Data types

There are currently five data types, including the following:

{{!-- BEGIN shared-blurb 7cb44006-ca2e-4ab9-8bf3-6ee0f405a64f --}}
| Content Type Constant | MIME Type |
| :--- | :--- |
| `ContentType::TEXT`   | `text/plain; charset=utf-8` |
| `ContentType::JPEG`   | `image/jpeg` |
| `ContentType::PNG`    | `image/png` |
| `ContentType::BINARY` | `application/octet-stream` |
{{!-- END shared-blurb --}}

The `TEXT` format is what was used prior to Device OS 6.2.

The image data types are not particularly useful in Device OS 6.2.0, as the publish is limited to 1024 bytes still,
and those would be very small images. However, they will become more useful with large publish payloads in the 
future. By specifying the data type, it allows the receiver to better handle the data. It also allows the console
to render the data within the console.

For the first time, you can now send binary data! This is sent in binary format over the air (in the CoAP packet), so it does not
expand the data as encoding with Base64 and Base85 would. Once the data is received by the cloud, it is then encoded in 
Base 64 format for compatibility with the existing infrastructure such as webhooks, server-sent-events (SSE), and the console which would not
work well with binary data, which cannot be represented directly in JSON. The maximum size of the event is based on the binary
size, however, and the size after Base 64 encoding can exceed 1024 bytes.

### Binary example

Say you have this binary data that you publish from a device:

```
0000: a7 22 98 1c 40 1b 9b 80 bb 9d d9 c0 13 bb 4e d0   |  "  @         N 
0010: a3 c0 ae 81 c5 93 91 2a 83 8e 69 27 b0 c6 17 26   |        *  i'   &
0020: 85 93 b7 a6 f5 69 c0 4c 9e 3d 53 49 b5 47 f0 44   |      i L =SI G D
0030: 26 9b 8a 1d e4 bc 73 f9 4d a4 e8 34 c2 56 17 c9   | &     s M  4 V  
```

A webhook using \{{{PARTICLE_EVENT_VALUE}} will receive this payload:

```
data:application/octet-stream;base64,pyKYHEAbm4C7ndnAE7tO0KPAroHFk5Eqg45pJ7DGFyaFk7em9WnATJ49U0m1R/BEJpuKHeS8c/lNpOg0wlYXyQ==
```

This is encoded in the [Data URL](https://developer.mozilla.org/en-US/docs/Web/URI/Schemes/data) format. 

Specifically, the cloud encodes binary data in Base 64 in a Data URL. This can easily be parsed by most services. Since the Base 64 data is still
text and valid JSON, it is compatible with both the default webhook template, as well as custom templates that use Mustache templates.

```json
{
  "event": "\{{{PARTICLE_EVENT_NAME}}}",
  "data": "\{{{PARTICLE_EVENT_VALUE}}}",
  "coreid": "\{{{PARTICLE_DEVICE_ID}}}",
  "published_at": "\{{{PARTICLE_PUBLISHED_AT}}}"
}
```

## Structured data

Particle has long-recommended using JSON format for sending data from your device to the cloud using Particle.publish.

With Device OS 6.2 and later, you can now send structured data more efficiently over-the-air without affecting your
back-end services and webhooks.

Say, for example, your device publishes this JSON data currently:

```json
{"a":123,"b":"test","c":true,"d":[1,2,3]}
```

This is 41 characters of JSON data in the compact form, above.

With Device OS 6.2 structured data, this will be converted into CBOR format instead of JSON over-the-air. 
[CBOR](https://cbor.io/), the Concise Binary Object Representation (RFC 8949) can be converted to and from
JSON without loss.

The JSON data above encodes to 21 bytes of binary CBOR data, a savings of 51%!

Since CBOR and be converted to and from JSON transparently, that is exactly what the cloud does before sending the data to
webhooks and SSE. Your webhook will continue to see JSON data as before, but it will be transmitted more efficiently over-the-air.

Furthermore, the 1024 byte publish limit in 6.2.x and earlier occurs after the conversion to CBOR, so you can publish significantly
larger JSON data than before.

To see how much smaller your JSON data will be in CBOR, you can use the [JSON tool](/tools/developer-tools/json/) which can now convert to CBOR and compare
the sizes.

If you have a JSON object and want to create code stubs for generating a `Variant` with the same
shape, the [JSON tool](/tools/developer-tools/json/) also has a Variant code generator.


### Structured binary data

Additionally, you can include binary data ("buffer") in your structured data. This is kept in binary format in the CBOR data stream so it
does not use additional data over-the-air, as was the case when encoding to hex, Base64, or Base85 on-device. When the cloud 
receives the binary data, it expands it into a JSON object containing meta information and Base64 encoded data. This allows
for easy processing in Logic, webhooks, or SSE.

For example, you could use this code:

```cpp
Variant map;
map.set("a", Variant(1234));
map.set("b", Variant(Buffer::fromHex("9dcae4dfe9af57338b5755d67e51771c")));

bool res = Particle.publish("myEvent", map);
```

When the event is received by a webhook, it would receive this data. The `_data` is Base 64 encoded.

```json
{"a":1234,"b":{"_type":"buffer","_data":"ncrk3+mvVzOLV1XWflF3HA=="}}
```

To decode these events for troubleshooting, you can use the [Event decoder](/tools/cloud-tools/event-decoder/) tool.

Binary buffer data should be used for individual binary data elements, and arrays of small values. Because each element
of a Variant is a separate block of memory on the heap, creating a VariantArray of small data elements like byte
values or integers is memory inefficient.

You generally should not store a C/C++ `struct`, because things like byte order, alignment, and version compatibility
can make passing a struct between a device an an external service difficult.

### Using Variant

See [Variant](/reference/device-os/api/variant/) in the Device OS firmware API.

If you have a JSON object and want to create code stubs for generating a `Variant` with the same
shape, the [JSON tool](/tools/developer-tools/json/) also has a Variant code generator.

For example, to create this JSON data:

```json
{"a":123,"b":"test","c":true,"d":[1,2,3]}
```

You could start with this basic code and modify it for your needs. Instead of hardcoding the values, you'd
probably calculate them, and instead of using a fixed array of numbers, you'd probably have a loop.

```cpp
Variant obj;
obj.set("a", Variant(123));
obj.set("b", Variant("test"));
obj.set("c", Variant(true));
{
    Variant obj1;
    obj1.append(Variant(1));
    obj1.append(Variant(2));
    obj1.append(Variant(3));
    obj.set("d", obj1);
}
```


## Publish

See [Publish](/reference/device-os/api/publish/) in the Device OS firmware API.


## Subscribe

See [Subscribe](/reference/device-os/api/subscribe/) in the Device OS firmware API.

