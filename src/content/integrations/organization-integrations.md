---
title: Organization integrations
shared: true
columns: two
layout: commonTwo.hbs
description: Integrations across multiple products
---

Organization integrations allow you to manage the integrations across all your products in one place.

- Available on basic (formerly growth) and enterprise plans
- Changing an integration in the organization view affects all the products where this integration executes
- Ideal if your product runs on multiple devices and requires separate console products but share the same integrations parameters

Organization integrations use the same endpoints as product integrations you don't need to make any changes to your firmware or API calls in order to use them. See also [product vs. sandbox integrations](integrations/webhooks/#product-vs-sandbox-integrations).

## Organization integration list

At the organization level in the Particle Console, the **Integrations** icon lists the integrations across all your products, and shows if an integration executes on one or multiple products. Additionally, the traffic (success, error, and skipped) is the sum of all products in the list view. When you view an integration, you can get a breakdown by product.

![](/assets/images/integrations/org-list.png)

## Creating an organization integration

The configuration for creating an integration is the same as a product integration, except for the additional field **Product(s) where the integration will execute**. This is how you configure which product or products the integration will be used for. 

You can create a organization integration that is only used for one product if you anticipate that you might be adding more product for other devices later. There is no wildcard; you must explicitly select all products you want the integration to be used for.

![](/assets/images/integrations/org-create-integration.png)

## Viewing an organization integration

The fields for viewing an integration are nearly the same a product integration, however you will see a banner at the top so you can easily see that this integration is used by different products. 

![](/assets/images/integrations/org-view-integration.png)

Both an aggregate history across all products, as well as a per-product history, is shown in the view integration page. In the per-product history the product name is a link that takes you to the product page.

## Editing an organization integration

Editing an organization integration works the same as a product integration, except the change applies to all products where this integration is being executed.

![](/assets/images/integrations/org-edit-integration.png)


## Separating an integration

If you wish to adjust an integration so different products can have different settings, you need to separate the integration.

You must open the product, then the integration you want to separate from the shared integration. When you edit a single product's shared integration the banner at the top shows that the integration is shared. Click the **separate integration** button.

![](/assets/images/integrations/org-edit-integration2.png)

In order to separate the integration, you must change at least one field so it no longer matches the shared integration. For example, you can change the name which won't affect the operation of the integration.

![](/assets/images/integrations/org-edit-separate.png)

