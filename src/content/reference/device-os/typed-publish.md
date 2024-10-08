---
title: Typed publish
layout: commonTwo.hbs
columns: two
description: Typed publish for Particle IoT devices
---

# {{title}}

Starting with Device OS 6.2.0, a number of enhancements were made to allow data types other than 
plain text to be sent and allow for more efficient transmission of structured data.

Enhancement in later versions of Device OS will allow for larger payloads, and limits exceeding 1 publish per second.

## Data types

There are currently five data types, including the following:

{{!-- BEGIN shared-blurb 7cb44006-ca2e-4ab9-8bf3-6ee0f405a64f --}}
| Content Type Constant | MIME Type |
| :--- | :--- |
| `ContentType::TEXT` | `text/plain; charset=utf-8` |
| `ContentType::JPEG` | `image/jpeg` |
| `ContentType::PNG` | `image/png` |
| `ContentType::BINARY` | `application/octet-stream` |
{{!-- END shared-blurb --}}

The `TEXT` format is what was used prior to Device OS 6.2.

The image data types are not particularly useful in Device OS 6.2, as the publish is limited to 1024 bytes still,
and those would be very small images. However, they will become more useful with large publish payloads in the 
future. By specifying the data type, it allows the receiver to better handle the data. It also allows the console
to render the data within the console!

For the first time, you can now send binary data! This is sent in binary format over the air (in CoAP packets), so it does not
expand the data as encoding with Base64 and Base85 would. Once the data is received by the cloud, it is then encoded in 
Base 64 format for compatibility with the existing infrastructure such as webhooks, SSE, and the console which would not
work well with binary data, which cannot be represented directly in JSON. The maximum size of the event is based on the binary
size, however, and the size after Base 64 encoding can exceed 1024 bytes.




