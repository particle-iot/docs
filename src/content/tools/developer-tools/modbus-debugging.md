---
title: Modbus debugging
columns: two
layout: commonTwo.hbs
description: Modbus debugging
includeDefinitions: [api-helper,api-helper-projects,modbus,usb-serial]
---

# {{title}}

This page contains tools that are useful for debugging issues with Modbus devices.

Modbus is a protocol for communicating with remote devices such as sensors, relays, etc.. Two common variations are:

- Modbus RTU, which uses RS-485 serial to connect up to 32 Modbus devices to a single serial connection
- Modbus TCP, which uses TCP, typically over Ethernet, to connect Modbus devices.

There are two sides Modbus communication:

The server is the sensor side. It receives requests from the client and affects an action (such as turning on a relay), or returns data (such as temperature) on request. The server side never spontaneously sends data, it can only be polled from the client. On a Modbus RTU (RS-485) network, there can be multiple servers. With Modbus TCP, the server listens for connections on a known port (502). This was formerly known as the Modbus slave.

The client is the controller side. It makes requests to the server(s) on the network to affect an action or request sensor or input data. This was formerly known as the Modbus master.

Modbus RTU is a half-duplex serial protocol using differential signaling. Because of this, an adapter is required to connect the Particle device serial port to an RS-485 bus. In addition to the TX and RX lines, an additional GPIO is typically needed to signal the direction.

Most commonly the Particle device is the client or controller. However it is also possible for it to be the server, with some limitations.

{{> sso}}

## Web-based RTU client

If you have a USB to RS485 adapter, you can test your Modbus RTU server devices from this browser-based tool. One such adapter is the [DTech DT-5019](https://www.amazon.com/gp/product/B0195ZD3P4/ref=ppx_yo_dt_b_search_asin_title). It uses the FTDI USB serial chipset and works on Windows, Linux, and Mac.

{{> modbus-client}}

## Web-based RTU analyzer

Using the same adapter, you can also monitor communication and passively analyze Modbus RTU traffic with this tool. This is handy if you implement Modbus RTU client on your Particle device and are having trouble communicating with a server (sensor, etc.).

{{> modbus-analyzer}}


## Particle RTU adapter

If you have a spare Particle device an a 3.3V TTL to RS-485 adapter, you can use that instead of the DTech USB to RS485 adapter by flashing this firmware to a device and connecting it by USB to your computer. You can then select it in the Web-based RTU client or Web-based RTU analyzer tools.


{{> project-browser project="modbus-adapter" default-file="src/modbus-adapter.cpp" height="400" flash="true"}}





