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

## Quick start

&nbsp;

<div>
    <div class="mainGrid" style="padding-bottom:40px;">
        <div class="mainNoPicRect">
            <a href="/scaling/quick-start-guide/organizations/" class="mainGridButton">
                <div class="mainContent">
                    <div class="mainNoPicTopBottom">
                        <div class="mainNoPicTop">Organizations</div>
                        <div class="mainNoPicBottom">How your products are grouped for billing and access purposes.</div>
                    </div>
                </div>
            </a>
        </div>
        <div class="mainNoPicRect">
            <a href="/getting-started/setup/accounts/" class="mainGridButton">
                <div class="mainContent">
                    <div class="mainNoPicTopBottom">
                        <div class="mainNoPicTop">Accounts</div>
                        <div class="mainNoPicBottom">How to set up accounts and access controls.</div>
                    </div>
                </div>
            </a>
        </div>
        <div class="mainNoPicRect">
            <a href="/scaling/quick-start-guide/billing/" class="mainGridButton">
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
            <a href="" class="mainGridButton">
                <div class="mainContent">
                    <div class="mainNoPicTopBottom">
                        <div class="mainNoPicTop">Returns and replacements</div>
                        <div class="mainNoPicBottom">TBD</div>
                    </div>
                </div>
            </a>
        </div>
        <div class="mainNoPicRect">
            <a href="/troubleshooting/troubleshooting/?p=11779868461851" class="mainGridButton">
                <div class="mainContent">
                    <div class="mainNoPicTopBottom">
                        <div class="mainNoPicTop">Sample request</div>
                        <div class="mainNoPicBottom">Request engineering samples of devices.</div>
                    </div>
                </div>
            </a>
        </div>
        <div class="mainNoPicRect">
            <a href="https://wholesale.particle.io/" class="mainGridButton">
                <div class="mainContent">
                    <div class="mainNoPicTopBottom">
                        <div class="mainNoPicTop">Wholesale store</div>
                        <div class="mainNoPicBottom">Easily order accessories not included in your contract.</div>
                    </div>
                </div>
            </a>
        </div>
    </div>
</div>

&nbsp;

---

## Purchase order submission

You can submit your initial blanket PO or order PO using this form:

- Be sure your purchase order matches the details of your contract.
- [Additional purchase order details](/scaling/quick-start-guide/enterprise-order-placement/).
- [Example purchase order](/assets/images/support/Screen_Shot_2022-01-24_at_11.09.03_AM.png) or [Excel Purchase Order Template](/assets/files/enterprise-order-template.xlsx).

{{> troubleshooting page="227" options="noUpdateUrl,noScroll"}}
 



{{content-guard op="else"}}
The Enterprise Hub is only available when logged into an account that is part of an enterprise organization.
{{content-guard op="end"}}
