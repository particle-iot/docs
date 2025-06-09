---
title: Introduction
layout: commonTwo.hbs
columns: two
description: Introductions to integrations
---

# {{title}}

Integrations provide a way to easily and efficiently interact with an Internet-based service, including 
third-party services and your own custom services.

## Integration gallery

The **integration gallery** provides an easy way to access a number of third-party services.

{{imageOverlay src="/assets/images/integrations/integrations-gallery.png" alt="Integrations gallery" class="no-darken"}}

You are not restricted to only these services; using the generic webhook integration you can integrate with most third-party services as well as your own custom servers.

If you don't have any integrations configured, opening the **Integrations** icon in your developer sandbox, product, or organization product will immediately open the gallery. 

Once you have configured one or more integrations, clicking the  **+ ADD NEW INTEGRATION** button will open the Integration gallery.

## Configuring an integration

Once you select which integration you want to create, you will be presented with the options available for that integration. The right panel includes brief instructions and links to more detailed instructions.

In the Parameters section, fill in the values specific to that integration. For example, for PagerDuty, enter the **PagerDuty Routing Key**.

{{imageOverlay src="/assets/images/integrations/integrations-pagerduty.png" alt="Integrations options PagerDuty" class="no-darken"}}


### Fill-in fields

In some integrations, you'll notice fields like **WEBHOOK_ID** in all capital letters that you will need to fill in with the values for your configuration.

{{imageOverlay src="/assets/images/integrations/integrations-fill-in.png" alt="Integrations options" class="no-darken"}}

## Cloud secrets

{{!-- BEGIN shared-blurb c2b1a838-446a-4cf6-8692-d1cfb424035a --}}
The cloud secrets feature allows you to:

- Securely store secret data like passwords, API keys, and authorization tokens for external services.
- Share secrets across [integrations](/integrations/introduction/) and [Logic](/getting-started/logic-ledger/logic/).
- Prevent even authorized users from viewing the secrets once created.
- Updating a secret immediately takes effect in all things that use it.
{{!-- END shared-blurb --}}

{{imageOverlay src="/assets/images/secrets/webhook-secrets.png" class="no-darken"}}

For more information, see [cloud secrets](/getting-started/cloud/secrets/).

## Additional instructions

You can find additional instructions and tutorials for specific integrations in the navigation bar to the left under **Integrations** and **Community integrations**.

