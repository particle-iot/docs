# Zendesk Guide Migration Tool

This tool is used to do one-time migration of docs markdown files into Zendesk Guide. Initially, the content in the Support menu will be migrated. Eventually, other tutorial content could be migrated as well.

This tool is designed to migrate simple style and image content. It cannot migrate content that uses the platform selector and things like `{{device}}` that have no equivalent to translate to. Also in most cases `{{#if}}` expressions will always evaluate to false and not render.

## Usage

You need to have a valid Zendesk API key in order to run this tool. 

```
export ZENDESK_USER=user@particle.io
export ZENDESK_API_TOKEN=xxxx

node app.js ../../src/content/support/general/pricing.md
```

Or a whole directory:

```
node app.js ../../src/content/support/general
node app.js ../../src/content/support/particle-tools-faq
```



