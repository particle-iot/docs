---
word: Webhooks
title: Webhooks
order: 14
---

Webhooks
==========

Introduction
===

You've built an amazing device, and paired it with a powerful application online, and now you want to connect them.  You're in the right place!

Webhooks listen for events from your devices, and then make a request to somewhere online.  They make it easy to connect with anything online that accepts a web request style integration (which by now is most things).  So let's show you how to say, log events published from your devices, or let your devices make secure requests anywhere on the internet.

If you're totally new to Spark, that's okay!  Checkout our [Getting started guide here](http://docs.spark.io/start/) first, and come back when you're ready.

Lets go!  



Seriously what's a web request?
====

You're probably reading this documentation page with the help of a web browser.  Your browser sent a "GET" request when it asked for this page, which our web server recognized and so it sent the page back.  Most of your average requests to view a page or browse around online are "GET" requests.  This is all part of that hypertext ```http://``` thing that is at the front of the address in your browser.  When you fill out and submit a form, your browser tends to send "POST" requests.  POST requests are usually for sending data to a server.  You can read more about all the different types here ( http://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol#Request_methods ).

Webhooks lets you setup a web request that is tied to an event from your devices.  That means you can probably grab or send values to any web service or site with something as simple as ```Spark.publish("lets go!");```


Installing the CLI
===

We're still building the beautiful, intuitive web interface for creating and managing webhooks, but we didn't want you to wait any longer.  Grab the Spark-CLI for quick and easy access to managing your webhooks.  You'll need Node.js installed to use the CLI, but it's worth it and pretty easy to install.  At the moment you might also need to learn how to use the terminal.  Adafruit has a lovely intro to the command line here https://learn.adafruit.com/what-is-the-command-line/overview .


https://github.com/spark/spark-cli#installing



Your first webhook
===

