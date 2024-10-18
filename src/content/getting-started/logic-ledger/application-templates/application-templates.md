---
title: Application templates
columns: two
layout: commonTwo.hbs
description: Application templates for logic and ledger
includeDefinitions: []
---

# {{title}}

Managing and monitoring device fleets can be complex and time-consuming. Particle’s self-service application templates simplify this process by providing pre-built solutions that you can quickly deploy and customize. By leveraging these templates, you can efficiently implement common functionalities without starting from scratch.

## What Are Application Templates?

Application templates are practical examples of code and configuration that show how you can use Particle's cloud components together to build powerful cloud solutions. These templates combine [Logic](/getting-started/logic-ledger/logic/) functions—serverless functions that execute custom logic in response to events or on a schedule with [Ledger](/getting-started/logic-ledger/ledger/), which are data stores that maintain state and configuration for your applications, and [integrations](/integrations/introduction/) that allow your applications to interact with external services like Slack, email, or custom APIs. Each application template may include multiple Logic functions, Ledgers, and Integrations, depending on the specific use case.

These templates are intended to be customized to fit your unique requirements. You can modify notification destinations by changing where alerts are sent—for example, switching from Slack to email. You can adjust the logic to alter the conditions that trigger alerts or actions, and you can change integrations to connect with different external services as needed.

## Templates

- [Integration Monitor](/getting-started/logic-ledger/application-templates/integration-monitor/): Monitor error rates in Particle Integrations and trigger alerts when thresholds are exceeded.


## Getting Help

Join the [Particle community](https://community.particle.io/) for help with these templates.

For custom applications, contact your Particle account team. Managed deployment is available for customers with Watchdog services.

## License

These templates are provided under the Apache 2.0 license. See the [LICENSE](https://github.com/particle-iot/cloud-app-templates/blob/main/LICENSE) file for details.

## Contributing

You are welcome to use, modify, and extend this code, which can be found in the 
[cloud-app-templates Github repository](https://github.com/particle-iot/cloud-app-templates/).

If you have an additional template you think would be valuable, please submit a pull request.

See the [CONTRIBUTING](https://github.com/particle-iot/cloud-app-templates/blob/main/CONTRIBUTING.md) file for details on how to contribute.
