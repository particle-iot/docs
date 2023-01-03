---
title: Enterprise Hub
columns: two
layout: commonTwo.hbs
description: Enterprise Hub
includeDefinitions: [api-helper, api-helper-extras, api-helper-troubleshooting]

---

# {{title}}

{{> sso selectOrg="1"}}

{{content-guard op="start" mode="enterpriseRequired"}}

## Quickstart

&nbsp;

<div>
    <div class="mainGrid" style="padding-bottom:40px;">
        <div class="mainNoPicRect">
            <a href="x" class="mainGridButton">
                <div class="mainContent">
                    <div class="mainNoPicTopBottom">
                        <div class="mainNoPicTop">Organizations</div>
                        <div class="mainNoPicBottom">How your products are grouped for billing and access purposes.</div>
                    </div>
                </div>
            </a>
        </div>
        <div class="mainNoPicRect">
            <a href="x" class="mainGridButton">
                <div class="mainContent">
                    <div class="mainNoPicTopBottom">
                        <div class="mainNoPicTop">Team Access</div>
                        <div class="mainNoPicBottom">How to control access to products and features.</div>
                    </div>
                </div>
            </a>
        </div>
        <div class="mainNoPicRect">
            <a href="x" class="mainGridButton">
                <div class="mainContent">
                    <div class="mainNoPicTopBottom">
                        <div class="mainNoPicTop">Billing</div>
                        <div class="mainNoPicBottom">Billing, data operations, and data consumption.</div>
                    </div>
                </div>
            </a>
        </div>
    </div>
</div>

&nbsp;

---

## Inventory

&nbsp;

<div>
    <div class="mainGrid" style="padding-bottom:40px;">
        <div class="mainNoPicRect">
            <a href="x" class="mainGridButton">
                <div class="mainContent">
                    <div class="mainNoPicTopBottom">
                        <div class="mainNoPicTop">Returns and replacements</div>
                        <div class="mainNoPicBottom">TBD</div>
                    </div>
                </div>
            </a>
        </div>
        <div class="mainNoPicRect">
            <a href="x" class="mainGridButton">
                <div class="mainContent">
                    <div class="mainNoPicTopBottom">
                        <div class="mainNoPicTop">Sample request</div>
                        <div class="mainNoPicBottom">TBD</div>
                    </div>
                </div>
            </a>
        </div>
        <div class="mainNoPicRect">
            <a href="x" class="mainGridButton">
                <div class="mainContent">
                    <div class="mainNoPicTopBottom">
                        <div class="mainNoPicTop">Wholesale store</div>
                        <div class="mainNoPicBottom">TBD</div>
                    </div>
                </div>
            </a>
        </div>
    </div>
</div>

&nbsp;

---

## Purchase order submission

Enterprise customers are required to submit a Blanket Purchase Order for contracted hardware minimums. This Blanket PO is not binding but should include your desired shipment dates and quantities for all hardware contracted to purchase in the first contract year. 

- [Additional purchase order details](scaling/quick-start-guide/enterprise-order-placement/)
- [Example purchase order](/assets/images/support/Screen_Shot_2022-01-24_at_11.09.03_AM.png) or [Excel Purchase Order Template](/assets/files/enterprise-order-template.xlsx).

{{> troubleshooting page="227" options="noUpdateUrl,noScroll"}}
 



{{content-guard op="else"}}
The Enterprise Hub is only available when logged into an account that is part of an enterprise organization.
{{content-guard op="end"}}
