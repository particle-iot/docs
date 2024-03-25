---
title: Organization integrations
shared: true
columns: two
layout: commonTwo.hbs
description: Integrations across multiple products
---

An organization integration groups together product integrations that are identical.

- Available on basic (formerly growth) and enterprise plans
- Changes to a shared integration are automatically reflected across all products it is shared with
- Ideal if your product runs on multiple devices and requires separate console products but share the same integrations parameters

Organization integrations uses the same endpoints as product integrations you don't need to make any changes to your firmware or API calls in order to use them. See also [product vs. sandbox integrations](integrations/webhooks/#product-vs-sandbox-integrations).

## Org integration list

At the organization level in the Particle console, the **Integrations** icon lists integrations like the product and sandbox level. However, an org integration can apply to multiple products. Additionally, the traffic (success, error, and skipped) is the sum of all products in the list view. When you view an integration, you can get a breakdown by product.

![](/assets/images/integrations/org-list.png)

## Creating an org integration

The configuration for creating an integration is the same as a product integration, except for the additional field **Product(s) where the integration will execute**. This is how you configure which product or products the integration will be used for. 

You can create a org integration that is only used for one product if you anticipate that you might be adding more product for other devices later. There is no wildcard; you must explicitly select all products you want the integration to be used for.

![](/assets/images/integrations/org-create-integration.png)

## Viewing an org integration

The fields for viewing an integration are nearly the same a product integration, however you will see a banner at the top so you can easily see that this is a shared (organization) integration. Additionally, both an aggregate history across all products, as well as a per-product history, will be shown in the view integration page.

![](/assets/images/integrations/org-view-integration.png)


## Editing an org integration

Editing an org integration works the same as a product integration, except the change affects all products this integration is shared with.

![](/assets/images/integrations/org-edit-integration.png)


## Separating an org integration

If you wish to make a shared integration no longer shared, so different products can have different settings, you need to separate the integration.

You must open the product, then the integration you want to separate from the shared integration. When you edit a single product's shared integration the banner at the top shows that the integration is shared. Click the **separate integration** button.

![](/assets/images/integrations/org-edit-integration2.png)

In order to separate the integration, you must change at least one field so it no longer matches the shared integration. For example, you can change the name which won't affect the operation of the integration.

![](/assets/images/integrations/org-edit-separate.png)

