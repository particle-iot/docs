---
word: Event Logs
title: Event Logs
order: 12 
columns: two
layout: guide.hbs
---

# {{title}}

As your IoT fleet grows, the number of events sent by devices also increases. Having to browse through a big list of events is cumbersome. The new Event Logs page is tailored around improving this experience. It provides a handful of tools, like filtering, modifiers which enable you to narrow down your search for events, making it easier to view only the data that is relevant to you. Because the page was developed with scalability in mind it is now able to handle hundreds of events coming from your devices at the same time.

To visit the new page go to [https://console.particle.io/events](https://console.particle.io/events)

<img src="/assets/images/eventlogs/full.png" class="full-width" />

### Filtering the events

Filters are a great way to narrow down your search and only see events that are relevant.

You can filter the events by writing anything in the input. Your query will be compared with the event name, data, publisher, and date.
<img src="/assets/images/eventlogs/filter_word.png" class="full-width" />

#### Modifiers

Besides writing in the input, you can use modifiers to narrow down your search even further.

<img src="/assets/images/eventlogs/filters.png" class="full-width" />

- `product` Filter by product (example: `product:my-product`)
- `device` Filter by device ID (example: `device:34003d001647353236343012`)
- `event` Filter by event name (example: `event:status`)
- `range` Only show events that have a number value between min and max (`range:min-max`, example: `range:20-100`)
- `data` Filter by data (example: `data:device-is-ok`)

Modifiers can be grouped: `device:34003d001647353236343012 event:temperature range:30-50`

** Note: Having multiple modifiers of the same type is not yet supported (you can not filter by 2 device IDs) **

You can combine modifiers with a query. In this example, we combine the query '35' with the modifier 'event:temperature'. The page will only show events named `temperature` that have `35` as their data.
<img src="/assets/images/eventlogs/filter_multiple.png" class="full-width" />

### Viewing event data

To view more details about an event, click on it. If the event data is a valid JSON string, it will be displayed in a way that makes it easier to read and understand.

<img src="/assets/images/eventlogs/eventdata_pretty.png" class="full-width" />

To view the raw version of the JSON, click on the `RAW` button.

<img src="/assets/images/eventlogs/eventdata_raw.png" class="full-width" />

You can copy the data to the clipboard if you click on the copy button.

### Pausing the event stream

If lots of events are coming through, you can put events in a queue by clicking on the Pause button. This should help you navigate through the list of events that you have already received.

To make the events from the queue visible click on the Play button.

<img src="/assets/images/eventlogs/queue.png" class="full-width" />

### How to publish events

Publishing events can be achieved in multiple ways:
- Using `particle.publish` in firmware ([docs](https://docs.particle.io/reference/firmware/#particle-publish-))
- Using Particle API JS's `publishEvent`  ([docs](https://docs.particle.io/reference/javascript/#publishevent))
- Using the Publish event button in the Event Logs page:
<img src="/assets/images/eventlogs/publish.png" class="full-width" />
