---
title: Enterprise Order Placement
layout: commonTwo.hbs
columns: two
includeDefinitions: [api-helper, api-helper-extras, api-helper-troubleshooting]

---

# {{{title}}}

## First thirty (30) days

Enterprise customers are required to submit a Blanket Purchase Order for contracted hardware minimums. This Blanket PO is not binding but should include your desired shipment dates and quantities for all hardware contracted to purchase in the first contract year. 

Particle uses the information from your Blanket PO to forecast accurately, reduce lead times as much as possible and ultimately make your desired demand on your requested schedule.

## Ongoing order placement

Enterprise customers are required to issue committed (binding) purchase orders throughout the year and Particle must accept these POs in writing, which will initiate the hardware shipments. These confirmed PO’s draw from the total quantity noted on the original Blanket PO. PO’s should be submitted to support@particle.io.

Changes to the original Blanket PO can be made throughout the year by sending a revised through the [purchase order submission page](/troubleshooting/troubleshooting/?p=101,107,227,). Please review your contract on file with Particle for more information on rescheduling or canceling committed orders.

## Annually

A new Blanket PO must be provided by the customer within 30 days of the start date for each subsequent contract year to ensure accurate forecasting by Particle.

## Additional resources

- [Shipping FAQs](/troubleshooting/faqs/shipping/what-shipping-options-does-particle-offer/)

Sample purchase order:

{{imageOverlay src="/assets/images/support/purchase-order-example.png" alt="Example purchase order" }}

You can also download an [Excel Purchase Order Template](/assets/files/enterprise-order-template.xlsx).


## Submit purchase order

{{> sso selectOrg="1"}}

{{content-guard op="start" mode="enterpriseRequired"}}

{{> troubleshooting page="227" options="noUpdateUrl,noScroll"}}
 
{{content-guard op="else"}}
Submitting a purchase order is only available when logged into an account that is part of an enterprise organization.
{{content-guard op="end"}}
