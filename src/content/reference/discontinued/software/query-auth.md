---
title: Query authentication
columns: two
layout: commonTwo.hbs
description: Authentication by query parameter deprecation
---

# {{title}}


For accounts created after December 2024, passing an access token by query parameter will no longer be available for security reasons. There is currently no schedule to disable query parameter authentication for existing accounts, but we do recommend changing to an `Authorization` header.

If you are using a URL like this, with an access_token in the URL for a GET request, you are using a query parameter.

```
https://api.particle.io/v1/devices/?access_token=f8a4d380cb6ffffffffffffffffffaf5e496ddf0c0
```

The reason for the change is that passing authentication information in the URL can often make it easier to leak account credentials unintentionally.

- It may appear in your browser history
- Often URLs are logged which would cause authentication tokens to be leaked via logging

For new accounts that have access to an older product, the query authentication restriction will not be applied for API requests to that product
even if made by a new account.

For more information about ways to pass an access token, see the [access token tutorial](/getting-started/cloud/cloud-api/#access-tokens).
