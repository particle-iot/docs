---
title: Enterprise Customer Hub
columns: two
layout: commonTwo.hbs
description: Enterprise Hub
includeDefinitions: [api-helper, api-helper-extras, api-helper-troubleshooting]

---

# {{title}}
<h3>Everything You Need to Transition to Your Enterprise Account</h3>
{{> sso selectOrg="1"}}

{{content-guard op="start" mode="enterpriseRequired"}}

<div><h2 style="text-align:center;">Inventory</h2></div>
<div class="inventory">
    <a class="card" href="#https://wholesale.particle.io/">
        <h5>Particle Wholesale Store</h5>
        <p class="small">Order Your Device Accessories</p>
         <div class="dimmer"></div>
        <div class="go-corner" href="#">
            <div class="go-arrow">
                →
            </div>
        </div>
  </a>
  <a class="card" href="#">
    <h5>Returns and Replacements</h5>
    <p class="small">Return or Exchange a Device</p>
    <div class="go-corner" href="#">
      <div class="go-arrow">
        →
      </div>
    </div>
  </a>
  
  <a class="card" href="">
    <h5>Device Sample Request</h5>
    <p class="small">Request an Engineering Sample</p>
    <div class="go-corner" href="#">
      <div class="go-arrow">
        →
      </div>
    </div>
  </a>
  
  
</div>

---

<div>
<div><h2 style="text-align:center;">Useful Tools</h2></div>
<div class="containerTool">
    <div class="itemTool">
        <a href="" >
            <h5>Device Compatibility by Region</h5>
            <p class="text">Check Which Devices Work Where</p>
        </a>
    </div>
    <div class="itemTool">
        <a href="" >
            <h5>Particle Device Doctor</h5>
            <p>Troubleshoot Your Device Issues</p>
        </a>
    </div>
    <div class="itemTool">
        <a href="" >
            <h5>Device Vitals and Diagnostics</h5>
            <p>Check the Health of Your Devices</p>
        </a>
    </div>
    <div class="itemTool">
        <a href="https://community.particle.io" >
            <h5>Particle Community Forums</h5>
            <p>Connect with Other Particle Users</p>
        </a>
    </div>
    <div class="itemTool">
        <a href="" >
            <h5>Cloud Debug Tool</h5>
            <p>Remotely Debug Your Devices</p>
        </a>
    </div>
    <div class="itemTool">
        <a href="https://github.com/particle-iot" >
            <h5>Particle Github</h5>
            <p>Check Out Code Examples</p>
        </a>
    </div>
    <div class="itemTool">
        <a href="" >
            <h5>Device Removal</h5>
            <p>Remove a Device From Your Product</p>
        </a>
    </div>
    <div class="itemTool">
        <a href="" >
            <h5>Particle API Documentation</h5>
            <p>WHAT SHOULD I WRITE HERE</p>
        </a>
    </div>
</div>
</div>

---

<div>
<div><h2 style="text-align:center;">Guides to Get You Started </h2></div>
<div class="container">
    <div class="item">
        <a href="/scaling/quick-start-guide/organizations/" >
            <h5>Intro to Particle Organizations</h5>
        </a>
    </div>
    <div class="item">
        <a href="/getting-started/setup/accounts/" >
            <h5>Getting Started with Team Access Controls</h5>
        </a>
    </div>
    <div class="item">
        <a href="/getting-started/setup/accounts/" >
            <h5>How to Program Your First Particle Fleet</h5>
        </a>
    </div>
    <div class="item">
        <a href="/scaling/quick-start-guide/organizations/" >
            <h5>Overview of Manufacturing Best Practices</h5>
        </a>
    </div>
    <div class="item">
        <a href="" >
            <h5>How to Check Your Device/Fleet Health</h5>
        </a>
    </div>
        <div class="item">
        <a href="" >
            <h5>Billing and Data Consumption 101</h5>
        </a>
    </div>
</div>
</div>

---

<h2 style="text-align:center;"> Purchase order submission</h2>

You can submit your initial blanket PO or order PO using this form:

- Be sure your purchase order matches the details of your contract.
- [Additional purchase order details](/scaling/quick-start-guide/enterprise-order-placement/).
- [Example purchase order](/assets/images/support/Screen_Shot_2022-01-24_at_11.09.03_AM.png) or [Excel Purchase Order Template](/assets/files/enterprise-order-template.xlsx).

{{> troubleshooting page="227" options="noUpdateUrl,noScroll"}}
 

{{content-guard op="else"}}
The Enterprise Hub is only available when logged into an account that is part of an enterprise organization.
{{content-guard op="end"}}
