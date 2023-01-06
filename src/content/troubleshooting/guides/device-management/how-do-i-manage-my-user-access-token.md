---
title: How do I manage my User Access Token?
layout: commonTwo.hbs
columns: two
---

# {{{title}}}
Until recently, Particle users were able to access their User Access Token from the Web IDE. In the interest of security, we have removed this display. We encourage our users to generate and manage access tokens using the Particle CLI or directly via our Cloud API.

1. **Using the Particle CLI.**  
    
Follow the instructions to [install the Particle CLI](/getting-started/developer-tools/cli/).
    
Once you have the CLI installed, open up your command line (for Mac OS, the Terminal, for Windows, cmd.exe) and use the following command to **log in**:  
particle login  

You can then **list your current tokens** with:  

```
particle token list  
```

and create a new token with:  

```
particle token create
```

2. **Using the Cloud API**  
    
Follow the instructions here: [Cloud API Reference](/reference/cloud-apis/api/#generate-an-access-token).  
    
For controlling your user access token, pass particle:particle as your authorization header. See the cURL example below:  

```
$ curl https://api.particle.io/oauth/token \  
-u particle:particle \  
-d grant_type=password \  
-d "username=joe@example.com" \  
-d "password=SuperSecret"  
```

and pass your Particle Username and Password as request arguments.

**Note**, users can still quickly grab an access token by going to [the console events page](https://console.particle.io/events) and selecting the "View Events from a Terminal" button. However, this token will expire in 15 minutes.
