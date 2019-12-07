---
title: Organizations
columns: two
layout: tutorials.hbs
order: 50
---

# {{title}}

{{box op="start"}}
<p style="text-align:center;">Organizations is a feature available to
customers on Particle's Enterprise plan.<br/>Interested in using this feature?</p>

{{!-- TODO: Replace Contact Sales links with UTM links --}}
<a class="btn"
href="https://particle.io/sales"
target="_blank" style="display:block;margin:0
auto;width:200px;text-align:center">Talk to an expert</a>
{{box op="end"}}

**Organizations** equip companies deploying large fleets of Particle devices
with sophisticated, Enterprise-grade administrative tools and
capabilities.

An Organization represent a top-level shared account,
distinct from any individual user, that can own many products, have a
team, and a centralized billing account. With an Organization, you can:
- **Centralize visibility and control** by housing many Particle projects underneath a single, shared account
- **Collaborate at scale** through tiered team management and cascading role based access controls (RBAC)

## Setting up your Organization

When you become an Enterprise customer with Particle, an Organization
will be created on your behalf. At this time, you will provide the
Particle team with some important information that will be used to
configure your Organization properly:
- **Name**: The name you'd like to use for your Organization, most often
matching the name of your company.
- **Owner**: The Particle username of the person you'd like to act as
the account owner. This is a person that will have the highest levels of
permissions for the Organization and all Products underneath it.
- **Products to transfer**: You likely have started scaling one or more
deployments using Products as a self-service customer before becoming an
Enterprise customer. These Products will be re-associated to be owned by
the Organization -- with access to those Products governed by RBAC rules
of the org.
- **Whitelisted users** (optional): A list of Particle users in which
all self-service platform usage should be automatically billed to the
Organization. This can be a helpful tool to centralize and simplify
billing administration of all team members' usage of the platform
(including devices/SIMs in the _Personal_ space, see below).


## Organization vs. Personal Space

With an Organization, you will now have two distinct **Spaces** within
the Console:
- _Personal space_: Everything owned by your Particle user
account intended for personal use of the platform. Personal devices, SIMs, and Products are associated and
are owned by a single individual.
- _Organization space_: Everything owned by an Organization intended for
business use of the platform. This is a shared account meant to centralize visibility and access across Particle
deployments amongst a group of team members.

Providing these two contexts allows you to use a single account for
multiple purposes -- namely for both business and personal use. In this
way, you can think of your Particle account as your _identity_ on the
platform, under which are the contexts in which you use the product.

In the Console, you will notice a dropdown in the top-left corner of the
navigation:

![Organizations space switcher](/assets/images/organizations/space-switcher-closed.png)

This is your _space switcher_ that will allow you to easily toggle
between your Organization and Personal spaces. When the space switcher
is expanded, you will see the Organization(s) that you are a member of:

![Expanded space
switcher](/assets/images/organizations/space-switcher-open.png)

## Organization owned Products
Clicking on the name of an Organization will expose the space for that
org. You will be directed to the list of Products that belong to the
Organization. You can also click on the **Products** icon (<i
class="im-product-icon"></i>) in the sidebar to reveal this list at any time.

<img src="/assets/images/organizations/organization-product-list.png"
alt="Org product list" class="full-width" />

All team members of the Organization will have access to these products in
accordance with their role. Platform usage associated with devices and
SIM data usage housed in these products will be automatically billed to
the Organization based on the parameters of your Enterprise
agreement with Particle.

New Products can be created from the Console (by clicking on the **+ New
Product** button here) or the API that will be assigned to the
Organization.

## Team Management

With an Organization, you get improved team management and access
controls capabilities. Each Organization has a team that can be managed
to grant access to the Products owned by the Organization. This is most
useful for core team members at your company that should have visibility
into all the IoT activity of your organization.

In the Organization space, click on the **Team** icon (<i
class="ion-person-stalker"></i>) in the sidebar to reveal your
Organization's team:

<img src="/assets/images/organizations/organization-team.png"
alt="Org team view" class="full-width" />

*Note*: When an Organization is first created on your behalf, a single
team member will be added -- the user who you've indicated should be the
Owner of the org. That Owner should then use the team management tools
in the Console to invite other team members to the Organization.

### Tiered Access
One of the main benefits of having an Organization team is the
introduction of tiered levels of access. This allows you to take a
_single_ action to grant access to many Products, instead of needing to
re-invite a team member separately each time.

Specifically, **permissions at
the Organization level cascade down to the Product level**. That is,
if you are invited to an Organization team,
you will automatically inherit access to the Products belonging to the
Organization.

<img src="/assets/images/organizations/organizations-tiered-access.jpg"
alt="Org tiered access control" class="full-width" />
<p class="caption">Organization team members will auto-inheret access to
Products owned by the org</p>

However, there may be cases when you specifically do not want to grant
Organization-wide access -- but instead are seeking to give access to
specific Products. **A separate, distinct team can also be defined at
the Product level to enable single-Product collaborators**.

This many be because you work with technical
contractors that engage for a short period of time in a specific
context. Or, you may have departments with team members who only
need access to a subset of the projects associated with your Organization.

To see the full list of who has access to a given Product, click on it from
the list on the Products view (<i
class="im-product-icon"></i>), then click on the Product's **Team** icon (<i
class="ion-person-stalker"></i>) in the sidebar. This will show you both
the Product team as well as the users who have inherited access to this
Product based on the Organization that it belongs to:

<img src="/assets/images/organizations/product-team.png"
alt="Org and Product Team" class="full-width" />

The combination of the Organization and Product Teams give you the
flexibility and fine-grained control needed to define the right
heirarchy and levels of access to meet your company's needs.

### Roles

Each person on the Organization team has a **role** that dictates their
level of permissions. The role assigned to an Organization team member
impacts both their permissions as it relates to the Organization _as well as each
Product belonging to the org_. This means team members will have the
same role both at the Organization and Product lavel.

There are four available roles:

- **View-only**: Read-only access to all information in the account, but
cannot take any action.
- **Support**: View access plus the ability to perform basic
diagnostic and troubleshooting tasks.
- **Developer**: Most create, view, update, and deletion abilities, without the
ability to take major administrative actions.
- **Administrator**: Full administrative access, including team
management and irreversible destructive actions.

For a comprehensive discussion of roles and permissions, please check
out the [tutorial on Team Access
Controls](/tutorials/product-tools/team-access-controls/).

To give a specific example,
if you are invited to an Organization team with the Administrator role,
you will automatically inherit access to the Products belonging to the
Organization with the same role (Administrator).

At the Organization level, being an Administrator means you can take all
actions like inviting new members to the org team. At the Product level,
you can take all fleet management actions like releasing a version of
firmware to devices as well as the ability to manage the Product team.

### Inviting Team Members

You can click on **Invite Team Member** to add new members to the
Organization team. Remember that this will grant this user access to
**all** Products owned by the org at the specified role. If you instead
only want to provide access to single Products, you should invite the
user as a Product team member instead.

When a person is invited to an Organization team, any existing memberships
to Product teams belonging to the Organization will be removed — this is
because an Organization team membership will grant access to all Products
owned by the org.

