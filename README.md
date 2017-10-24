## Particle Documentation [![Build Status](https://travis-ci.org/spark/docs.svg?branch=master)](https://travis-ci.org/spark/docs)
=======

Here you'll find the documentation for the Particle platform, including the Particle Cloud, Photon, Electron, and Spark Core.

To view this documentation, visit [our website](https://docs.particle.io), where the documentation is hosted.

### Installation

To host this documentation locally, you'll need Node.js and npm:

    brew install nodejs

Once you have Node.js set up, navigate to this repository's directory on your machine, and then:

    npm install

to install any other necessary dependencies.

### Hosting locally

This documentation uses a fabulous tool from the folks at Segment called [Metalsmith](http://www.metalsmith.io). Metalsmith is a static site generator that builds static HTML sites from source material in other formats; in this case, Markdown and Handlebars.

To run a locally hosted version of the documentation, follow the installation instructions above, and then within the 'docs' directory type in your terminal:

```
export SEARCH_INDEX=0 # optional. speeds up the build if you don't need the search
npm start
```

This will set up a server running at `http://localhost:8080`. If you make changes to the source content, your browser should automatically refresh using `livereload`.

### Spell checking

To check the spelling of all Markdown files, run `npm run spell`.

### Testing

To run the tests locally, run `npm test` from the root of the
repository. This will tell you whether the build will pass on Travis or
not.

### Deployment

When updated documentation is pushed to the master branch, it is automatically pushed to Amazon S3 by Travis CI.

To see the latest build, visit the [Travis CI page](https://travis-ci.org/spark/docs).

### Organization

The majority of the content herein is stored in the `src/content` directory as a set of Markdown files. Assets such as images and javascript are stored in the `src/assets` directory.

### Structuring your content

The docs dynamically generate a table of contents for navigation purposes based on the headers (i.e. `###`) that you use on each page. It is important to note that _order and hierarchy matters_ when you are designing the organization of content on your page. Your page should include the following:

* 1 `h1` at the top of the page that will serve as the title of the page. You can even copy the `title` directly from the front-matter of the markdown file like this: `# {{title}}`

* As many `h2`s (`##`) as you'd like to serve as the section headers for the page.

* Underneath every `h2`, if applicable, as many `h3`s (`###`) as you'd like to serve as sub-sections within the section. These will appear as nested within the navigation on the left.

Note that there are only 2 levels of navigation that will appear in the table of contents. *`h4`s and below will not appear in the table of contents*.

### Device Specific Content

If you are working on a page that has device-specific content, the
first thing you need to do is add the relevant device names to the
front-matter of the MD file, like this:

```
devices: [ photon, electron, core ]
```
Where Photon, Electron and Core are the relevant devices to this page.

Then add a new key to [`device_features.json`](config/device_features.json) for each device that
supports the feature:
```
{
  "Core": [
    ...
  ],
  "Photon": [
    ..
    "backup-ram"
  ],
  "Electron": [
    ...
    "backup-ram"
  ]
}
```

Then, in the body of the page, you can specify feature-specific content by using:
```
{{#if has-backup-ram}}
## Backup RAM

...
{{/if}} {{!-- has-backup-ram --}}
```

For content that is exclusively for one device and where defining a new
feature name doesn't make sense (for example, which pins have PWM
support for a device), you can also device-specific content by using:

```
{{#if photon}}
  PHOTON SPECIFIC STUFFZ
{{/if}}

{{#if core}}
  CORE SPECIFIC STUFFZ
{{/if}}

{{#if electron}}
  ELECTRON SPECIFIC STUFFZ
{{/if}}
```
Prefer defining new feature names over using device-specific sections.

You can also insert the selected device name into text like this:
```
Without a doubt, the {{device}} rocks!
```


### Adding a new device

When the firmware is available on a new device, add that device to the docs in these places:

- Make the firmware docs available for the new device by adding an entry to the `devices` frontmatter in <src/content/reference/firmware.md>
- Also update `devices` in the guides and tools frontmatter as appropriate
- Update the device selection dropdown in <templates/partials/header.hbs>
- Add the device in <src/assets/js> `rememberDevices()`
- Add a new SVG in <src/assets/image> named `<device>.svg`
- Tell the tests to crawl the new device page in <test/crawler.js>

### Redirects

When moving pages around or defining the default page for a section, add redirect links to [`redirects.json`](config/redirects.json). 

### Attributions

Some of this documentation is derived from the [Arduino documentation](http://arduino.cc/en/Reference), as the Arduino/Wiring language and libraries are used extensively on the Spark Core.

This documentation was originally built using [Flatdoc](http://ricostacruz.com/flatdoc/), an awesome tool for building beautiful documentation from simple Markdown files. We have made many modifications since, but the inspiration remains.

### Contributions

This documentation is managed by Particle, but supported by the community. We welcome contributions such as:

* Edits to improve grammar or fix typos (run `npm run spell` for automated spell check)
* Edits to improve clarity
* Additional annotated examples for others to follow
* Additional content that would help provide a complete understanding of the Particle platform
* Translations to other languages

Making a contribution is as simple as forking this repository, making edits to your fork, and contributing those edits as a pull request. For more information on how to make a pull request, see [Github's documentation](https://help.github.com/articles/using-pull-requests/).

### License

These files have been made available online through a [Creative Commons Attribution-ShareAlike 3.0 license](http://creativecommons.org/licenses/by-sa/3.0/us/).

You are welcome to distribute, remix, and use these files for commercial purposes. If you do so, please attribute the original design to Particle both on the website and on the physical packaging of the product or in the instruction manual. All derivative works must be published under the same or a similar license.
