---
title: Cloud secrets
columns: two
layout: commonTwo.hbs
description: Managing secrets across integrations and logic
---

# {{title}}

{{!-- BEGIN shared-blurb c2b1a838-446a-4cf6-8692-d1cfb424035a --}}
The cloud secrets feature allows you to:

- Securely store secret data like passwords, API keys, and authorization tokens for external services.
- Share secrets across [integrations](/integrations/introduction/) and [Logic](/getting-started/logic-ledger/logic/).
- Prevent even authorized users from viewing the secrets once created.
- Updating a secret immediately takes effect in all things that use it.
{{!-- END shared-blurb --}}

## Managing cloud secrets

Cloud secrets are available both in the sandbox level for individual accounts and in the organization level for basic, plus, and enterprise users in the **Cloud Services** section in the [Particle console](https://console.particle.io/).

{{imageOverlay src="/assets/images/secrets/cloud-services-secrets.png" class="no-darken"}}

### Creating a cloud secret

To create a cloud secret you first give it a name. The name can consist only of uppercase letters, numbers, and underscore. It cannot begin with a number.

The value is the secret value, such as the password, API key, or authorization token. 

{{imageOverlay src="/assets/images/secrets/create-cloud-secret.png" class="no-darken"}}

Once you create the secret you will not be able to see the value again, but you will be able to change the value, for example if the authorization token needs to be updated.

### Cloud secrets list

Once you have created one or more cloud secrets, they will appear in the **Cloud secrets** list.

{{imageOverlay src="/assets/images/secrets/cloud-secrets-list.png" class="no-darken"}}

- The **Usage Count** indicates how many places the secret is used, such as integrations and Logic. 
- **Updated at** indicates when the secret was last updated.
- **Last accessed** indicates the last time the secret was used by an integration or Logic.

The **...** button contains the options:

#### View details

{{imageOverlay src="/assets/images/secrets/secret-details.png" class="no-darken"}}

#### Edit (Edit secret)

You can change the value using the **Edit** option. You cannot see the previous value.

{{imageOverlay src="/assets/images/secrets/edit-secret.png" class="no-darken"}}

### Delete (Delete secret)

You can only delete a secret if the usage count is 0, that is to say it's not currently in use by integrations or Logic.

## Secrets in integration templates

If the integration template you are using requires an auth token, you can select your token right from the integration template editor.

{{imageOverlay src="/assets/images/secrets/blynk-token.png" class="no-darken"}}

Clicking **click here to create a new secret** will open a new browser tab to allow you to create a new cloud secret. Once you've created it, 
you can switch back to the edit integration tab and it will be immediately available to use.

## Secrets in webhooks

{{imageOverlay src="/assets/images/secrets/webhook-secrets.png" class="no-darken"}}

Clicking **click here to create a new secret** will open a new browser tab to allow you to create a new cloud secret. Once you've created it, 
you can switch back to the edit integration tab and it will be immediately available to use.

You can select zero or more secrets to be made available to your webhook integration. 

{{imageOverlay src="/assets/images/secrets/webhook-enable-auth-key.png" class="no-darken"}}

If you select **AUTH_KEY**, it will be available as the Mustache variable `\{{{AUTH_KEY}}}` in your integration. You can use this in any of the configurable fields. One common use is added an Authorization header:

{{imageOverlay src="/assets/images/secrets/webhook-authorization.png" class="no-darken"}}

You can also use it for basic authentication, within the URL field, etc..

The same secret can be shared by multiple logic blocks and integrations. Editing the secret value will cause the new value to be used in all locations. Since cloud secrets are scoped to your sandbox or organization, they can be shared across multiple product integrations as well.

Cloud secrets used from integrations will be hidden from the in integration logs. The log will instead contain `[[SENSITIVE]]` instead of the secret value.


## Secrets in Logic

{{!-- BEGIN shared-blurb e47a842c-7161-4e9b-9d1f-0953da11af88 --}}
{{imageOverlay src="/assets/images/secrets/logic-secrets.png" class="no-darken"}}

Clicking **click here to create a new secret** will open a new browser tab to allow you to create a new cloud secret. Once you've created it, 
you can switch back to the Logic tab and it will be immediately available to use.


You can select zero or more secrets to be made available to your logic block.

{{imageOverlay src="/assets/images/secrets/logic-secret-list.png" class="no-darken"}}

If you select **TEST_1**, it will be available as the Javascript variable `secrets.TEST_1` in your logic block.

{{imageOverlay src="/assets/images/secrets/logic-test.png" class="no-darken"}}

The same secret can be shared by multiple logic blocks and integrations. Editing the secret value will cause the new value to be used in all locations. Since cloud secrets are scoped to your sandbox or organization, they can be shared across multiple product integrations as well.

Cloud secrets used from logic blocks will be hidden from the logs. For example, if you use `console.log` to attempt to print the secret, the log will instead contain `[[SENSITIVE]]`.
{{!-- END shared-blurb --}}


