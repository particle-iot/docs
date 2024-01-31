---
title: API Users
columns: two
layout: commonTwo.hbs
description: API Users
includeDefinitions: [api-helper, api-helper-cloud,  api-helper-extras, api-helper-json, codemirror, usb-serial]
---

# {{title}}

An [API User Account](/reference/cloud-apis/api/#api-users) is a specific type of user account in the Particle platform that is designed to replace using 'human' accounts for programmatic tasks. The controls in this section will allow you to add API users without having to use the `curl` command.

{{> sso}}

### Create API user

{{> cloud-api-user-create}}

### List or delete API users

{{> cloud-api-user-list}}

To delete an API user, list the users in the product or organization. If there are API users defined, a user selector and a **Delete User** button will appear.
