---
title: Cloud secrets
columns: two
layout: commonTwo.hbs
description: Managing secrets across integrations and logic
---

# {{title}}

The cloud secrets feature allows you to:

- Securely store secret data like passwords, API keys, and authorization tokens for external services.
- Share secrets across [integrations](/integrations/introduction/) and [Logic](/getting-started/logic-ledger/logic/).
- Prevent even authorized users from viewing the secrets once created.
- Updating a secret immediately takes effect in all things that use it.



## Managing cloud secrets

Cloud secrets are available both in the sandbox level for individual accounts and in the organization level for basic, plus, and enterprise users in the **Cloud Services** section in the [Particle console](https://console.particle.io/).

{{imageOverlay src="/assets/images/secrets/cloud-services-secrets.png" class="no-darken"}}

### Creating a cloud secret

To create a cloud secret you need to give it a name. The name can consist only of uppercase letters, numbers, and underscore. It cannot begin with a number.

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

## Secrets in webhooks


## Secrets in Logic



