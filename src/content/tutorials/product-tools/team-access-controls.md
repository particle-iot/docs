---
title: Team Access Controls
columns: two
layout: tutorials.hbs
order: 43
---

# Team Access Controls

Particle offers functionality to help you manage levels of access for
your team members. This is helpful when overseeing a team of
people who should have varying permissions with respect to Particle
devices in your fleets.

Team Access Controls is an **Enterprise only** feature. If interested in
this feature, please [consult our team of IoT
experts](https://particle.io/sales).

This guide breaks down into two parts:
- A [summary of the available roles](#roles) and a description of each
- A [permissions matrix](#permissions-matrix) for an in-depth look at what each role as
access to

## Roles

Roles represent a set of permissions that can be applied to a member of
your product team.

You can view and set team-member-specific roles for each product on the
**Team** page for the product in the Console:

<!-- TODO: REPLACE THIS IMAGE WHEN THE UPDATED ROLES ARE SEEDED -->
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
actions. This includes team management and irreversable destructive
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
|----------------------------|-----------------------|---------------|-----------|---------|-----------|
|          **Team**          |                       |               |           |         |           |
|      View Product team     | X                     | X             | X         | X       | X         |
| Manage Product team        | X                     | X             |           |         |           |
|         **Devices**        |                       |               |           |         |           |
| View device                | X                     | X             | X         | X       | X         |
| Subscribe to device events | X                     | X             | X         | X       | X         |
| View Device Vitals         | X                     | X             | X         | X       | X         |
| Refresh Device Vitals      | X                     | X             | X         | X       |           |
| Check device variables     | X                     | X             | X         | X       |           |
| Call device functions      | X                     | X             | X         | X       |           |
| Ping device                | X                     | X             | X         | X       |           |
| Add devices to Product     | X                     | X             | X         |         |           |
| Edit device info           | X                     | X             | X         |         |           |
| Flash firmware to devices  | X                     | X             | X         |         |           |
| Remove/unclaim devices     | X                     | X             | X         |         |           |
| Create device group        | X                     | X             | X         |         |           |
| Edit/delete device group   | X                     | X             | X         |         |           |
| Publish event              | X                     | X             | X         |         |           |
|        **SIM cards**       |                       |               |           |         |           |
| View SIM card              | X                     | X             | X         | X       | X         |
| Update SIM lifecycle state | X                     | X             | X         | X       |           |
| Change SIM data limit      | X                     | X             | X         | X       |           |
| Add new SIMs to Product    | X                     | X             | X         |         |           |
| Remove SIMs from Product   | X                     | X             | X         |         |           |
|        **Firmware**        |                       |               |           |         |           |
| View Product firmware      | X                     | X             | X         | X       | X         |
| Upload firmware version    | X                     | X             | X         |         |           |
| Release firmware           | X                     | X             | X         |         |           |
| Edit firmware info         | X                     | X             | X         |         |           |
|      **Integrations**      |                       |               |           |         |           |
| View Integrations          | X                     | X             | X         | X       | X         |
| Create new Integration     | X                     | X             | X         |         |           |
| Edit/delete Integration    | X                     | X             | X         |         |           |
|      **OAuth clients**     |                       |               |           |         |           |
| View OAuth clients         | X                     | X             | X         | X       | X         |
| Create OAuth client        | X                     | X             | X         |         |           |
| Edit/delete OAuth client   | X                     | X             | X         |         |           |
|        **Customers**       |                       |               |           |         |           |
| View Customers             | X                     | X             | X         | X       | X         |
| Create Customers           | X                     | X             | X         |         |           |
| Edit/delete Customers      | X                     | X             | X         |         |           |
|        **Settings**        |                       |               |           |         |           |
| View Product settings      | X                     | X             | X         | X       | X         |
| Edit Product settings      | X                     | X             |           |         |           |

### Organization permissions

| Action                                     | Administrator (Owner) | Administrator | Developer | Support | View-only |
|--------------------------------------------|-----------------------|---------------|-----------|---------|-----------|
|                **Team**                    |                       |               |           |         |           |
| View org team                              | X                     | X             | X         | X       | X         |
| Manage org team                            | X                     | X             |           |         |           |
|           **Owned Products**               |                       |               |           |         |           |
| Create new Product                         | X                     | X             | X         |         |           |
| Administrator role for all Products in org | X                     | X             |           |         |           |
| Developer role for all Products in org     |                       |               | X         |         |           |
| Support role for all Products in org       |                       |               |           | X       |           |
| View-only role for all Products in org     |                       |               |           |         | X         |
