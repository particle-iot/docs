Particle Documentation [![CircleCI](https://circleci.com/gh/particle-iot/docs/tree/master.svg?style=shield)](https://circleci.com/gh/particle-iot/docs/tree/master)
======================

Here you'll find the documentation for the Particle platform, including
the Particle Device Cloud, Photon, Electron, and Spark Core.

To view this documentation, visit [our website](https://docs.particle.io), where the documentation is hosted.

Local Hosting
-------------

This documentation uses a fabulous tool from the folks at Segment called [Metalsmith](http://www.metalsmith.io). Metalsmith is a static site generator that builds static HTML sites from source material in other formats; in this case, Markdown and Handlebars.

To set up a server running at `http://localhost:8080`, follow the installation instructions below...

> _**NOTE:** Any changes made to the source content should be automatically picked up by the browser via `livereload`._

### Bare-metal Hosting

#### Device Setup

To host this documentation locally, you'll need Node.js and npm (see the `engines` section of `package.json` for the exact versions):

If you don't have node.js installed, you can download the installer (LTS recommended) from [nodejs.org](https://nodejs.org/en/).

Once you have Node.js set up, navigate to the `docs` directory on your machine, and use the following commands:

#### Install Dependencies

To install any other necessary dependencies, run:

```none
npm install
```

#### Spell checking

**Note: This does not currently work due to the parser getting confused while processing firmware.md**

To check the spelling of all Markdown files, run:

```none
npm run spell
```

#### Testing

If you are making non-trivial changes, it’s a good idea to check links using the crawler. This takes a number of minutes to run:

```none
npm test
```

If errors are reported, fix them and run the test again. The second time it will be much faster because it will have cached many of the lookups.

Link checking is not done on commits or pull requests due to the variable amount of time it takes and that it may randomly fail, making it hard to publish at a specific time.

#### Running locally

```none
npm start
```

Once the output stops, 

#### Generate PDF datasheets

```none
npm run pdf-generation
```


### Containerized Hosting

If you have Docker installed, then you can simply run the following commands to get started...

```none
$ cd <particle-iot/docs>/
$ scripts/docker-server.sh --help

usage: particle-docs [--build] [--deploy] [--run-tests] [--spell-check]

Build, test and deploy a local documentation server.

  -b, --build           Build and install documentation packages.
  -d, --deploy          Launch documentation server at https://localhost:8080.
  -h, --help            Display this help and exit.
  -s, --spell-check     Run the spell-checker to verify spelling and update dictionary file.
  -t, --run-tests       Run CI tests.

NOTE: If no options are specified, then ALL options will be selected.
```

> _**NOTE:** Containerized hosting is currently only available on Linux devices. Mac is has an [open issue](https://github.com/docker/for-mac/issues/2965) involving `localhost`, and Windows has not been tested at this time._

The containerized version is not regularly used. It will probably work, but is not guaranteed to.


Updating Production Documentation
---------------------------------

When updated documentation is pushed to the `master` branch, it is automatically pushed to Amazon S3 by Circle CI.


Organization
------------

The majority of the content herein is stored in the `src/content` directory as a set of Markdown files. Assets such as images and javascript are stored in the `src/assets` directory.

### Structuring your content

The docs dynamically generate a table of contents for navigation purposes based on the headers (i.e. `###`) that you use on each page. It is important to note that _order and hierarchy matters_ when you are designing the organization of content on your page. Your page should include the following:

* 1 `h1` at the top of the page that will serve as the title of the page. You can even copy the `title` directly from the front-matter of the markdown file like this: `# {{title}}`

* As many `h2`s (`##`) as you'd like to serve as the section headers for the page.

* Underneath every `h2`, if applicable, as many `h3`s (`###`) as you'd like to serve as sub-sections within the section. These will appear as nested within the navigation on the left.

Note that there are only 2 levels of navigation that will appear in the table of contents. *`h4`s and below will not appear in the table of contents*.


### Redirects

When moving pages around or defining the default page for a section, add redirect links to [`redirects.json`](config/redirects.json).

Attributions
------------

Some of this documentation is derived from the [Arduino documentation](http://arduino.cc/en/Reference), as the Arduino/Wiring language and libraries are used extensively on the Spark Core.

This documentation was originally built using [Flatdoc](http://ricostacruz.com/flatdoc/), an awesome tool for building beautiful documentation from simple Markdown files. We have made many modifications since, but the inspiration remains.

Contributions
-------------

This documentation is managed by Particle, but supported by the community. We welcome contributions such as:

* Edits to improve grammar or fix typos (run `npm run spell` for automated spell check)
* Edits to improve clarity
* Additional annotated examples for others to follow
* Additional content that would help provide a complete understanding of the Particle platform
* Translations to other languages

Making a contribution is as simple as forking this repository, making edits to your fork, and contributing those edits as a pull request. For more information on how to make a pull request, see [Github's documentation](https://help.github.com/articles/using-pull-requests/).

License
-------

These files have been made available online through a [Creative Commons Attribution-ShareAlike 3.0 license](http://creativecommons.org/licenses/by-sa/3.0/us/).

You are welcome to distribute, remix, and use these files for commercial purposes. If you do so, please attribute the original design to Particle both on the website and on the physical packaging of the product or in the instruction manual. All derivative works must be published under the same or a similar license.
