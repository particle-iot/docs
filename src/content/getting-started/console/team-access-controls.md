---
title: Team access controls
columns: two
layout: commonTwo.hbs
description: Learn about team access controls, managing access different members of your product team
---

# {{title}}

Particle offers functionality to help you manage levels of access for
your team members. This is helpful when overseeing a team of
people who should have varying permissions with respect to Particle
devices in your fleets.

This guide breaks down into two parts:
- A [summary of the available roles](#roles) and a description of each
- A [permissions matrix](#permissions-matrix) for an in-depth look at what each role as
access to

Team access controls was previously available to enterprise customers only but
is now available to all products.

## Roles

Roles represent a set of permissions that can be applied to a member of
your product team.

You can view and set team-member-specific roles for each product on the
**Team** page for the product in the Console:

<img class="full-width"
src="/assets/images/team-access-controls/teams-view.png"/>

A team member's role can also be set when inviting the user to your
team.

The set of roles available to you are:

- **View-only**: Read-only access to all information in the account, but
cannot take any action.
- **Support**: View access plus the ability to perform basic
diagnostic and troubleshooting tasks.
- **Developer**: Most create, view, update, and deletion abilities, without the
ability to take major administrative actions.
- **Administrator**: Full administrative access, including team
management and irreversible destructive actions.

### View-only
View-only is the most strict of the three product team member roles. It
is designed specifically for people on your team that you'd only like to
_see_ information about your device fleet — but don't need to make
updates.

Someone with the View-only role can:
- List and inspect information about devices in the product
- Observe a stream of events from devices in the product
- View product configuration and settings

For team members who receive the View-only role, the actions they are
not allowed to take will be disabled in the Console interface:

![Disabled Access Controls
UI](/assets/images/team-access-controls/disabled-ui.png)

### Support

The Support role is best for the members of your team who specialize in
providing customer service and "front line" support to deployed Particle
devices in the field. The permissions associated with this role give
these members of your team tools to interact with single devices, but
limit access to fleet-wide management tools.

Someone with the Support role can:
- Do everything a Read-only teammate can do **+**
- Ping, call functions on, and read variables from individual devices
- Use Diagnostics tools, like Device Vitals
- Manage the lifecycle state and data limit of SIM cards

### Developer
Developer is a role that is meant for the engineers on your team that
are actively building and managing IoT projects with Particle. With this role, a
person is granted both read & write access to Console and APIs, without the ability to take administrative
actions. This includes team management and irreversible destructive
actions.

Someone with the Developer role can:
- Do everything a Support teammate can do **+**
- Take fleet management actions — like
adding a devices to groups or provision new devices into a Product
- Create and manage OAuth clients on behalf of products
- Create and manage Integrations
- Upload and release product firmware to the fleet
- Add/remove devices and SIM cards to and from the product

### Administrator

The Owner of the product represents the highest level of access. There is one single
owner for each product. The Owner role is automatically given to the
creator of the product.

Someone with the Administrator role can:
- Do everything a Developer teammate can do **+**
- Manage the product team and teammates' roles
- Edit product configuration and settings

There is also a special type of Administrator, reserved for the person
acting as the account owner. This will appear as **Administrator
(Owner)** in the Console. There will only be a single Owner assigned
(multiple team members cannot have this role simultaneously).

- Manage billing information related to the product

The Owner's role cannot be changed. The Owner also cannot be removed
from the product team.

## Permissions Matrix

### Product permissions

| Action                     | Administrator (Owner) | Administrator | Developer | Support | View-only |
|----------------------------|:---------------------:|:-------------:|:---------:|:-------:|:---------:|
|          **Team**          |                       |               |           |         |           |
|      View Product team     | &check;               | &check;       | &check;   | &check; | &check;   |
| Manage Product team        | &check;               | &check;       |           |         |           |
|         **Fleet Health**   |                       |               |           |         |           |
| View fleet health          | &check;               | &check;       | &check;   | &check; | &check;   |
|         **Devices**        |                       |               |           |         |           |
| View device                | &check;               | &check;       | &check;   | &check; | &check;   |
| Subscribe to device events | &check;               | &check;       | &check;   | &check; | &check;   |
| View Device Vitals         | &check;               | &check;       | &check;   | &check; | &check;   |
| Refresh Device Vitals      | &check;               | &check;       | &check;   | &check; |           |
| View Fleet Health          | &check;               | &check;       | &check;   | &check; | &check;   |
| Check device variables     | &check;               | &check;       | &check;   | &check; |           |
| Call device functions      | &check;               | &check;       | &check;   | &check; |           |
| Ping device                | &check;               | &check;       | &check;   | &check; |           |
| Add devices to Product     | &check;               | &check;       | &check;   |         |           |
| Edit device info           | &check;               | &check;       | &check;   |         |           |
| Flash firmware to devices  | &check;               | &check;       | &check;   |         |           |
| Remove/unclaim devices     | &check;               | &check;       | &check;   |         |           |
| Create device group        | &check;               | &check;       | &check;   |         |           |
| Edit/delete device group   | &check;               | &check;       | &check;   |         |           |
| Publish event              | &check;               | &check;       | &check;   |         |           |
|        **SIM cards**       |                       |               |           |         |           |
| View SIM card              | &check;               | &check;       | &check;   | &check; | &check;   |
| Update SIM lifecycle state | &check;               | &check;       | &check;   | &check; |           |
| Change SIM data limit      | &check;               | &check;       | &check;   | &check; |           |
| Add new SIMs to Product    | &check;               | &check;       | &check;   |         |           |
| Remove SIMs from Product   | &check;               | &check;       | &check;   |         |           |
|        **Firmware**        |                       |               |           |         |           |
| View Product firmware      | &check;               | &check;       | &check;   | &check; | &check;   |
| Upload firmware version    | &check;               | &check;       | &check;   |         |           |
| Release firmware           | &check;               | &check;       | &check;   |         |           |
| Edit firmware info         | &check;               | &check;       | &check;   |         |           |
|      **Integrations**      |                       |               |           |         |           |
| View Integrations          | &check;               | &check;       | &check;   | &check; | &check;   |
| Create new Integration     | &check;               | &check;       | &check;   |         |           |
| Edit/delete Integration    | &check;               | &check;       | &check;   |         |           |
|      **OAuth clients**     |                       |               |           |         |           |
| View OAuth clients         | &check;               | &check;       | &check;   | &check; | &check;   |
| Create OAuth client        | &check;               | &check;       | &check;   |         |           |
| Edit/delete OAuth client   | &check;               | &check;       | &check;   |         |           |
|        **Customers**       |                       |               |           |         |           |
| View Customers             | &check;               | &check;       | &check;   | &check; | &check;   |
| Create Customers           | &check;               | &check;       | &check;   |         |           |
| Edit/delete Customers      | &check;               | &check;       | &check;   |         |           |
|        **Settings**        |                       |               |           |         |           |
| View Product settings      | &check;               | &check;       | &check;   | &check; | &check;   |
| Edit Product settings      | &check;               | &check;       |           |         |           |
|        **Billing & Usage** |                       |               |           |         |           |
| View Billing & Usage       | &check;               | &check;       |           |         |           |

### Organization permissions

| Action                                     | Administrator (Owner) | Administrator | Developer | Support | View-only |
|--------------------------------------------|:---------------------:|:-------------:|:---------:|:-------:|:---------:|
|                **Team**                    |                       |               |           |         |           |
| View org team                              | &check;               | &check;       | &check;   | &check; | &check;   |
| Manage org team                            | &check;               | &check;       |           |         |           |
|           **Owned Products**               |                       |               |           |         |           |
| Create new Product                         | &check;               | &check;       | &check;   |         |           |
| Administrator role for all Products in org | &check;               | &check;       |           |         |           |
| Developer role for all Products in org     |                       |               | &check;   |         |           |
| Support role for all Products in org       |                       |               |           | &check; |           |
| View-only role for all Products in org     |                       |               |           |         | &check;   |
