# Carrier List Generator

This simple node.js app that queries Airtable, which is the source of truth for the list of carriers, 
and uses it to generate the carrier list in the docs.

You must set your Airtable API key in an environment variable before calling this app

```
export AIRTABLE_API_KEY=YOUR_SECRET_API_KEY
```

The key is in the settings in Airtable. Keep this secret as it grants full access to your account.

Then install dependencies and run:

```
npm install
npm start
```

The output is the carriers.md file in this directory.

This must be copied and pasted into:

src/content/tutorials/cellular-connectivity/cellular-carriers.md

Note that there's material before and after it that needs to remain, so make sure you follow the instructions 
for what to replace within cellular-carriers.md. There are comments surrounding the block to replace.
