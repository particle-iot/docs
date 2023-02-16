---
title: Enterprise Customer Hub
columns: two
layout: commonTwo.hbs
description: Enterprise Hub
includeDefinitions: [api-helper, api-helper-extras, api-helper-troubleshooting]

---

# {{title}}
<h4>Here are some essential Enterprise resources! Scroll below to submit POs, perform inventory-related actions, and access a suite of helpful tools and guides.</h4>
{{> sso selectOrg="1"}}

{{content-guard op="start" mode="enterpriseRequired"}}



<h2 style="text-align:center;">Inventory</h2>
<div class="containerInv">
    <div class="itemInv">
        <a class = "aHub" href="/troubleshooting/troubleshooting/?p=11779868461851" >
            <h5 class = "h5Hub">Device Sample Request</h5>
            <span class="itemInvTip">Request an Engineering Sample</span>
        </a>
    </div>
    <div class="itemInv">
        <a class = "aHub" href="/scaling/quick-start-guide/returns/" >
            <h5 class = "h5Hub" >Returns and Replacements</h5>
            <span class="itemInvTip">Return or Exchange a Device</span>
        </a>
    </div>
    <div class="itemInv">
        <a  class = "aHub" href="https://wholesale.particle.io/" >
            <h5 class = "h5Hub">Particle Wholesale Store</h5>
            <span class="itemInvTip">Order Your Device Accessories</span>
        </a>
    </div>
</div>

<h2 style="text-align:center;"> Purchase Order Submission</h2>
<p style="tect-align: center">
You can submit your initial blanket PO or order PO using this form:

- Be sure your purchase order matches the details of your contract.
- [Additional purchase order details](/scaling/quick-start-guide/enterprise-order-placement/).
- [Example purchase order](/assets/images/support/Screen_Shot_2022-01-24_at_11.09.03_AM.png) or [Excel Purchase Order Template](/assets/files/enterprise-order-template.xlsx).
</p>

{{> troubleshooting page="227" options="noUpdateUrl,noScroll,noTitle"}}
&nbsp;
<div class="containerCommunity">
     <div class="itemCommunity">
        <a class = "aHub" href="www.community.particle.io" >
            Connect with the Particle Community
        </a>
    </div>  
</div>

<h2 style="text-align:center;">Useful Tools</h2>
<div class="containerTool">
    <a class="card aHub" href="/reference/cellular/cellular-carriers/">
        <h5 class = "h5Hub">Regional Device Compatibility</h5>
        <p class="small  pHub">Check Which Devices Work Where</p>
         <div class="dimmer"></div>
        <div class="go-corner" href="#">
            <div class="go-arrow">
                →
            </div>
        </div>
  </a>
  <a class="card aHub" href="/tools/doctor/">
    <h5 class = "h5Hub">Particle Device Doctor</h5>
    <p class="small pHub">Troubleshoot Your Device Issues</p>
    <div class="go-corner" href="#">
      <div class="go-arrow">
        →
      </div>
    </div>
  </a>
  
  <a class="card aHub" href="/getting-started/console/device-vitals/">
    <h5 class = "h5Hub">Device Vitals and Diagnostics</h5>
    <p class="small pHub">Check the Health of Your Devices</p>
    <div class="go-corner" href="#">
      <div class="go-arrow">
        →
      </div>
    </div>
  </a>
      <a class="card aHub" href="/troubleshooting/connectivity/cloud-debug/">
        <h5 class = "h5Hub">Cloud Debug Tool</h5>
        <p class="small  pHub">Collect Debug Logs from Your Devices</p>
         <div class="dimmer"></div>
        <div class="go-corner" href="#">
            <div class="go-arrow">
                →
            </div>
        </div>
  </a>
  <a class="card aHub" href="https://github.com/particle-iot/releases/">
    <h5 class = "h5Hub">Particle Github</h5>
    <p class="small pHub">Device OS Changelog</p>
    <div class="go-corner" href="#">
      <div class="go-arrow">
        →
      </div>
    </div>
  </a>
  
  <a class="card aHub" href="/scaling/quick-start-guide/bulk-device-operations">
    <h5 class = "h5Hub">Bulk Operations</h5>
    <p class="small pHub">Adding and removing devices at scale</p>
    <div class="go-corner" href="#">
      <div class="go-arrow">
        →
      </div>
    </div>
  </a>
</div>

<h2 style="text-align:center;">Guides to Get You Started </h2>
<div class="container">
    <div class="item">
        <a  class = "aHub" href="/scaling/quick-start-guide/organizations/" >
            <h5 class = "h5Hub">Intro to Particle Organizations</h5>
        </a>
    </div>
    <div class="item">
        <a class = "aHub" href="/getting-started/setup/accounts/" >
            <h5 class = "h5Hub">Getting Started with Team Access Controls</h5>
        </a>
    </div>
    <div class="item">
        <a class = "aHub" href="/getting-started/products/creating-a-product/" >
            <h5 class = "h5Hub">How to Program Your First Particle Fleet</h5>
        </a>
    </div>
    <div class="item">
        <a class = "aHub" href="/scaling/manufacturing/manufacturing-cellular/" >
            <h5 class = "h5Hub">Overview of Manufacturing Best Practices</h5>
        </a>
    </div>
    <div class="item">
        <a class = "aHub" href="/getting-started/console/fleet-health/" >
            <h5 class = "h5Hub">How to Check Your Device/Fleet Health</h5>
        </a>
    </div>
        <div class="item">
        <a class = "aHub" href="/scaling/quick-start-guide/billing/" >
            <h5 class = "h5Hub" >Billing and Data Consumption 101</h5>
        </a>
    </div>
</div>
<br>



{{content-guard op="else"}}
The Enterprise Hub is only available when logged into an account that is part of an enterprise organization.
{{content-guard op="end"}}




