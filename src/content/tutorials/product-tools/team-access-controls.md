---
title: Team Access Controls
columns: two
layout: tutorials.hbs
order: 43
---

# Team Access Controls <small class="beta">beta</small>

Particle offers functionality to help you manage levels of access for
your product team members. This is helpful when overseeing a team of
people who should have varying permissions with respect to Particle
devices in your fleets.

Team Access Controls is an **Enterprise only** feature and is currently
in a private beta. If interested in
this feature, please [consult our team of IoT
experts](https://particle.io/sales).

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

- **Read-only**: View only permissions within the product.
- **Member**: Full read and write permissions within the product.
- **Owner**: Full read and write permissions + billing administration
privileges for the product.

### Read-only
Read-only is the most strict of the three product team member roles. It
is designed specifically for people on your team that you'd only like to
_view_ information about your product. Team members given the Read-only
role will not be able to take any action within the product.

Someone with the Read-only role can:
- List and inspect information about devices in the product
- Observe a stream of events from devices in the product
- View product configuration and settings

For team members who receive the Read-only role, the actions they are
not allowed to take will be disabled in the Console interface:

![Disabled Access Controls
UI](/assets/images/team-access-controls/disabled-ui.png)

### Member
Member is a role that provides a team member with full access to the
product, its devices, and its configuration. The Member role is ideal
for folks on your team that you trust and will be working regularly with your Particle
deployment.

Someone with the Member role can:
- Do everything a Read-only teammate can do **+**
- Take action on one or more devices in the product fleet
- Add/remove devices and SIM cards to and from the product
- Upload and release product firmware to the fleet
- Manage the product team and teammates' roles
- Change product configuration and settings

### Owner

The Owner of the product represents the highest level of access. There is one single
owner for each product. The Owner role is automatically given to the
creator of the product.

Someone with the Owner role can:
- Do everything a Member teammate can do **+**
- View and manage billing information related to the product

The Owner's role cannot be changed. The Owner also cannot be removed
from the product team.

