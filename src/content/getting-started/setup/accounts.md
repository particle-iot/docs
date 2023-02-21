---
title: Accounts and access controls
columns: two
layout: commonTwo.hbs
description: Accounts and access controls
---

# {{title}}

This document describes best practices for managing accounts and access controls in organizations.

## User accounts

It's recommended that every developer have their own Particle account. Enabling [two-step authentication](/getting-started/console/two-step-authentication/) is recommended as well.

For users who previously had a personal Particle account but will be working with company devices, it's recommended that they use two separate accounts so the company can deactivate their work Particle account if they leave without affecting personal devices.

For contractors working on a project, it may be desirable to create a separate account for the shared project, so they can transfer the whole account to the company upon completion of the project. 

If you are using Google Mail, you can create an alias using the plus sign and an additional word before the @ sign. Each alias can have a separate Particle account assigned to it.

Some non-developers such as those working will billing may need Particle accounts. There is no charge for additional accounts.

In some cases, you will claim all of the devices in a product to a single account. It's recommended that you create a separate account for this, not associated with any single user. Likewise, you may want to set up your product owner account not associated with any single user. An email alias or email group can be used for this purpose. If you are using Google Mail, a private Google Group can be used.

## Products

Products group devices with similar firmware and usage. It's recommended that you immediate start with using products instead of using the developer sandbox directly. 

Products allow a number of additional features over developer devices:

- [Team members](/getting-started/console/console/#adding-team-members), so multiple accounts can work with your product.
- [Product firmware](/getting-started/console/console/#rollout-firmware), so you can upgrade your fleet of devices automatically instead of one-by-one.
- [Device groups](/getting-started/console/device-groups/), so you can subdivide your fleet of devices with different firmware or features.
- [Team access controls](/getting-started/console/team-access-controls/), allowing you to grant specific permissions to team members.
- [Fleet health](/getting-started/console/fleet-health/), for monitoring the status of your fleet of devices.

You can use products of up to 100 devices in the free tier, and doing so greatly simplifies migrating to growth or enterprise later.

- [Learn more about products](/getting-started/products/introduction-to-products/) in general.
- Learn more about [creating a product](/getting-started/products/creating-a-product/).

## Team access controls

Team access controls allow role-based access to a product on a per-user basis:

- **View-only**: Read-only access to all information in the account, but
cannot take any action.
- **Support**: View access plus the ability to perform basic
diagnostic and troubleshooting tasks.
- **Developer**: Most create, view, update, and deletion abilities, without the
ability to take major administrative actions.
- **Administrator**: Full administrative access, including team
management and irreversible destructive actions.

In the growth or enterprise tiers, you can also set access at the organization level, allowing the user access to all products in the organization. 

It is also possible to combine both features, so by default employees would have access to all products, but in some cases, such as a contractor working on a specific product, that user would only have access to that single product.

- Learn more about [team access controls](/getting-started/console/team-access-controls/).

## API users

API users allow for very fine-grained access control to specific APIs. They are often used for external servers to access the Particle APIs for a specific product.

- Learn more about [API users](/reference/cloud-apis/api/#api-users).
- [API user management tool](/getting-started/cloud/cloud-api/#api-users).

