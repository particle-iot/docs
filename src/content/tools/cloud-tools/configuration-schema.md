---
title: Configuration schema
columns: two
layout: commonTwo.hbs
description: Configuration schema
includeDefinitions: [api-helper, api-helper-config, api-helper-json, api-helper-tracker, codemirror, zip]
---

# {{title}}

Tracker One and Monitor One devices share the same platform ID, and by default new products default to being Tracker One products.

To enable the Monitor One features, use this control to change the product schema to Monitor One and add the additional tabs shown below.

{{> sso}}

{{> config-schema options="noDownloadUpload,backup"}}

- To learn more about the configuration settings, see the [console documentation](/getting-started/console/console/#asset-tracker-features)
- To learn more about configuration schemas for the Tracker One and Monitor One, see [Tracker configuration](/reference/tracker/tracker-configuration/).
- To set your own custom schema, use [custom schema tool](/reference/tracker/tracker-configuration/#restore-default-schema).

