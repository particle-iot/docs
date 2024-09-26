---
title: Integration monitor
columns: two
layout: commonTwo.hbs
description: Integration monitor
includeDefinitions: []
---

# {{title}}

Monitors Particle integrations for elevated error rates and alert when the error rate exceeds a threshold.

See also the [Integration Monitor Github page](https://github.com/particle-iot/cloud-app-templates/tree/main/apps/integration-monitor) 
for the latest updates.


## Logic function

A scheduled function queries the integration error rates from the cloud. When the alerting error rate 
is exceeded, a notification is sent.

This is the code to use in your Logic block:

{{> codebox content="/assets/files/cloud-app-templates/integration-monitor/integration-monitor.js" format="js" height="600" flash="false"}}


## Cloud ledger

A cloud ledger is used to store the configuration for this application. 

{{> codebox content="/assets/files/cloud-app-templates/integration-monitor/config.json" format="json" height="600" flash="false"}}

## Integration

You can send notifications to Slack, Sendgrid, or PagerDuty, or you can add your own.

The integrations for Slack and PagerDuty are built into the [Integration gallery](http://localhost:8080/integrations/introduction/).


