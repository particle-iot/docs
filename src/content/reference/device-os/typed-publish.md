---
title: Typed and extended publish
layout: commonTwo.hbs
columns: two
description: Typed publish for Particle IoT devices
---

# {{title}}

In Device OS 6.2.0, a number of enhancements were made to allow data types other than 
plain text to be sent and allow for more efficient transmission of structured data.

## Extended publish 

In Device OS 6.3.0 and later, extended publish builds upon typed publish and provides additional features when using the [CloudEvent](/reference/device-os/api/cloudevent/) API.

### Large events - Extended publish

In Device OS 6.3.0 and later, events can be up to 16,384 bytes in size and can contain binary data. Previously, event payloads were limited to 1024 bytes or less.

Large events count as 1 data operation for each 1024 bytes of data, rounded up. A publish of 1000 bytes count as a 1 data operation, but 1300 bytes counts as 2 data operations. A maximum event size of 16 Kbytes counts as 16 data operations.

Some Boron and B-Series SoM with an older version of the SARA-R410M-02B modem (LTE Cat M1) may have a limit of 782 bytes instead of 1024 bytes. These devices cannot use the large publish feature as it requires being able to send 1024 byte events. See [Particle.maxEventDataSize()](/reference/device-os/api/cloud-functions/particle-maxeventdatasize/) for more information.

### Increased rate limits - Extended publish

Prior to Device OS 6.3.0, there was a rate limit of approximately 1 publish for second, with greater bursts.

With Device OS 6.3.0 and extended publish, there is a limit of approximately 32 Kbytes of data in transit at a time. It is no longer necessary
to wait a specific amount of time.

The [canPublish](/reference/device-os/api/cloudevent/publish-status-cloudevent/#canpublish-cloudevent) method can be used to check
if a publish of a given size would be allowed at the current time. It it returns false, you should wait and check again later 
after the queued data has been sent.

More specifically, the limit is 32 logical blocks of data, rounded up to 1024 bytes. An event without payload data takes 1 block, 1024 bytes of payload data is still 1 block, 1025 bytes is 2 blocks, and so on. If there are 32 logical data blocks in flight already, canPublish will return false or an attempt to publish without checking will fail.

## Data types

There are currently five data types, including the following:

{{!-- BEGIN shared-blurb 7cb44006-ca2e-4ab9-8bf3-6ee0f405a64f --}}
| Content Type Constant | MIME Type | Value |
| :--- | :--- | ---: |
| `ContentType::TEXT`   | `text/plain; charset=utf-8` | 0 |
| `ContentType::JPEG`   | `image/jpeg` | 22 |
| `ContentType::PNG`    | `image/png` | 23 |
| `ContentType::BINARY` | `application/octet-stream` | 42 |
| `ContentType::STRUCTURED` | | 65001 |
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

```html
0000: a7 22 98 1c 40 1b 9b 80 bb 9d d9 c0 13 bb 4e d0   |  "  @         N 
0010: a3 c0 ae 81 c5 93 91 2a 83 8e 69 27 b0 c6 17 26   |        *  i'   &
0020: 85 93 b7 a6 f5 69 c0 4c 9e 3d 53 49 b5 47 f0 44   |      i L =SI G D
0030: 26 9b 8a 1d e4 bc 73 f9 4d a4 e8 34 c2 56 17 c9   | &     s M  4 V  
```

A webhook using \{{{PARTICLE_EVENT_VALUE}}} will receive this payload:

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

If you are using Logic, there are [data URL decoding functions](/getting-started/logic-ledger/logic/#dataurldecode)
included in Logic.

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

The JSON data above encodes to 21 bytes of binary CBOR data, 51% of the original size!

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

See [Publish](/reference/device-os/api/publish/) in the Device OS firmware API for additional information.

{{!-- BEGIN shared-blurb a4ba4dbe-045f-41b7-8314-5a46809fc859 --}}
You typically store a `CloudEvent` object as a global variable or class member variable. You should not allocate a
`CloudEvent` as a non-static local variable within a function because it not only holds the data, but it is also
used to convey whether the publish succeeded or not. The `Particle.publish()` overload that takes a `CloudEvent` is asynchronous 
and returns before the publish has completed. The `CloudEvent` must remain allocated until the publish is actually complete, 
by success or failure. 
{{!-- END shared-blurb --}}

### Legacy publish

Using the legacy API for publish typically looks like this:

{{> codebox content="/assets/files/extended-publish/LegacyPublish.cpp" format="cpp" height="400" flash="true"}}

### Blocking publish

This example shows how to do a blocking publish, similar to how the legacy publish worked.

{{> codebox content="/assets/files/extended-publish/SimplePublishBlocking.cpp" format="cpp" height="400" flash="true"}}

### Non-blocking publish

This example shows how to do a non-blocking publish.

{{> codebox content="/assets/files/extended-publish/SimplePublishNonBlocking.cpp" format="cpp" height="400" flash="true"}}

### Binary publish

This example sends binary data in a publish.

{{> codebox content="/assets/files/extended-publish/BinaryData.cpp" format="cpp" height="400" flash="true"}}

### JSON with binary publish

This example includes JSON data that includes binary data.

{{> codebox content="/assets/files/extended-publish/JsonWithBinary.cpp" format="cpp" height="400" flash="true"}}

### Image publish

This example publishes a small png image using typed publish.

{{> codebox content="/assets/files/extended-publish/ImagePublish.cpp" format="cpp" height="400" flash="true"}}


The event viewer in the console can display the image when you view its details.

![](/assets/images/png-event.png)

### Simple publish callback

This example uses the [onStatusChange](/reference/device-os/api/cloudevent/publish-status-cloudevent/#onstatuschange-cloudevent) 
method of `CloudEvent` to be notified when the publish status changes via a callback, instead of polling.

{{> codebox content="/assets/files/extended-publish/SimplePublishCallback.cpp" format="cpp" height="400" flash="true"}}

### State machine publish

This example uses a simple finite state machine to handle publishing.

{{> codebox content="/assets/files/extended-publish/StateMachine.cpp" format="cpp" height="400" flash="true"}}

### State machine class publish

This example uses a finite state machine implemented in a C++ class.

{{> codebox content="/assets/files/extended-publish/StateMachineClass.cpp" format="cpp" height="400" flash="true"}}

## Subscribe

See [Subscribe](/reference/device-os/api/subscribe/) in the Device OS firmware API for additional information.

### Simple subscription

This example uses the subscribe with cloud event API.

{{> codebox content="/assets/files/extended-publish/SimpleSubscription.cpp" format="cpp" height="400" flash="true"}}

### Structured subscription

This example shows how to subscribe to structured data. This is used if you want to subscribe to events containing JSON data.

{{> codebox content="/assets/files/extended-publish/StructuredSubscription.cpp" format="cpp" height="400" flash="true"}}

## Community projects

### File upload example

Github: [file-upload-example](https://github.com/rickkas7/file-upload-example)

This is an example of using large events in Device OS 6.3.0 and later for uploading files to the cloud and processing them using Logic. It's not a standalone library because there are some limitations of this method that make it a little less useful than you'd think, but you may want to use some of the techniques in this example in your code.

### PublishQueueExtRK

Github: [PublishQueueExtRK](https://github.com/rickkas7/PublishQueueExtRK)

Queued publish for Particle devices using typed and extended publish

- Fire and forget publishing, with automatic queue to the flash file system when disconnected from the cloud
- Increased publish rate limit, no longer limited to 1 publish per second
- Increased event data size, up to 16384 bytes
- Binary and structured values in event data


