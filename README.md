# Angular-Cafe

An opinionated kickstarter for [AngularJS](http://angularjs.org) projects.

***

This Project was forked from [Josh Millers ng-Boilerplate](http://joshdmiller.github.com/ng-boilerplate) by [Neoskop GmbH](http://github.com/neoskop/ng-boilerplate)
which was then forked and customized as [ng-cafe](http://github.com/kburson/ng-cafe)

If you want to learn more about the foundation of this project template please reference the documentation from the
fork parents:

* [Neoksop Readme.md](http://github.com/neoskop/ng-boilerplate/README.md)
* [Josh Millers Readme.md](http://joshdmiller.github.com/ng-boilerplate/README.md)

***

# Why Angular-Cafe

This document will outline the de

***


## Why midway testing?

http://blogs.burnsidedigital.com/2013/07/setting-up-midway-testing-to-angularjs-app/

    When Unit testing your application it sometimes may get too complicated when you
    want to test a application-level operation (like a page loading or XHR request)
    because you will need to use interceptors and mocks to make requests and
    templating work (basically anything XHR’ish). E2E testing may not also be the
    best option because it may be too high level to capture to test for certain
    features. For example, how do you test a controller on your website that
    performs a XHR request which downloads the user’s session details on every page? …

## TODO:
   get code coverage with istanbul working

***

## Quick Start

### Installation

Following global Tools are needed, if you do not have them already:

```sh
$ npm install -g grunt-cli # Grunt Task Manager
```

Clone the repository and install all dependencies:

```sh
$ git clone git@github.com:kburson/ng-cafe.git
$ cd ng-cafe
$ npm install
```

To develop within this project you need [Grunt](http://gruntjs.com), the following Tasks are available:

```sh
$ grunt
```

The bower install will download the Angular libraries.  At this time angular is at 1.2.0rc1 while some of the
dependent libraries are still referencing 1.0.6.  The bower install will attempt to resolve all peer dependencies
but you will have to answer some interacive questions regarding this mismatch of the angular versions:

```sh
Unable to find a suitable version for angular, please choose one:
    1) angular#1.2.0rc1 which resolved to 1.2.0rc1 and has angular-mocks#1.2.0rc1, angular-resource#1.2.0rc1, angular-scenario#1.2.0rc1, ng-cafe as dependants
    2) angular#>= 1.0.6 which resolved to 1.0.7 and has angular-ui-router#0.0.1 as dependants
    3) angular#>=1 which resolved to 1.0.7 and has angular-bootstrap#0.5.0 as dependants
    4) angular#>= 1.0.2 which resolved to 1.0.7 and has angular-ui-utils#0.0.4 as dependants
```

if you run into trouble you may need to run bower again from the command line

```sh
$ node_modules/grunt-bower-task/node_modules/bower/bin/bower install
```

or if you have bower installed globally:

```sh
$ bower install
```

to install bower globally use:

```sh
$ npm install -g bower
```


To develop within this project you need [Grunt](http://gruntjs.com), the following Tasks are available:

```sh
$ grunt
$ grunt <target>
```

replace **target** with one or more of the following:

* **dev**           # [reset build karma:unit karma:unit:run karma:midway karma:midway:run watch] builds the app, starts the test servers and starts the watch process to wait for changes
* **dev_server**    # [express:livereload express-keepalive open]starts an express livereload server to view changes to the app as they happen.
* **test_server**   # [shell:start_selenium] start the selenium webdriver server
* **e2e_mocha**     # [express:e2e simplemocha] run all e2e tests using mocha (only tests under the e2e test folder named *.mocha.spec.[js|coffee])
* **e2e_karma**     # [express:e2e karma:ci_e2e] run all e2e tests using karma (only tests under the e2e test folder named *.scenario.[js|coffee])
* **test**          # [reset karma:ci_unit karma:ci_midway] clear all previous running servers, start test server, run unit + midway tests
* **run_test**      # [karma:unit:run karma:midway:run] this requires the test servers to be running in the background
* **build**         # [clean html2js jshint coffeelint coffee recess:build copy index]
* **compile**       # [compile:debug recess copy ngmin concat uglify index]
* **compile:debug** # [compile recess copy ngmin concat uglify index]
* **release**       # [changelog]


### Testing (Unit, E2E, Midway)

All Test are located in the `test` folder and Test-Runner for this project is 
[Karma](http://karma-runner.github.io/).

TODO: update for local karma under grunt-karma tasks....

```sh
$ karma start # starts watching filechanges and runs trough all test
$ karma run   # if you want to run tests manually (without watch changes)
```




***

# THE FOLLOWING IS A COPY OF THE PARENT README

## ng-cafe in depth

## Purpose

`AngularCafe` is designed to make life easy by providing a basic framework
with which to kickstart AngularJS projects. It contains a best-practice
directory structure to ensure code reusability and maximum scalability.
AngularCafe also comes prepackaged with the most popular design frameworks
around: [Twitter Bootstrap](http://getbootstrap.com),
[Angular UI](http://angular-ui.github.io),
[Angular Bootstrap](http://angular-ui.github.io/bootstrap),
[Font Awesome](http://fortawesome.github.com/Font-Awesome), and
[LESS](http://lesscss.org). Lastly, it contains a sophisticated
[Grunt](http://gruntjs.org)-based build system to ensure maximum productivity.
All you have to do is clone it and start coding!

## Philosophy

The principal goal of `AngularCafe` is to set projects up for long-term
success.  So `AngularCafe` tries to follow best practices everywhere it can.
These are:

- Properly orchestrated modules to encourage drag-and-drop component re-use.
- Tests exist alongside the component they are testing with no separate `test`
  directory required; the build process should be sophisticated enough to handle
  this.
- Speaking of which, the build system should work automagically, without
  involvement from the developer. It should do what needs to be done, while
  staying out of the way. Components should end up tested, linted, compiled,
  and minified, ready for use in a production environment.
- Integration with popular tools like Bower, Karma, and LESS.
- *Encourages* test-driven development. It's the only way to code.
- A directory structure that is cogent, meaningful to new team members, and
  supporting of the above points.
- Well-documented, to show new developers *why* things are set up the way they
  are.
- It should be responsive to evidence. Community feedback is therefore crucial
  to the success of `AngularCafe`.

But `AngularCafe` is not an example of an AngularJS app: this is a
kickstarter. If you're looking for an example of what a complete, non-trivial
AngularJS app that does something real looks like, complete with a REST backend
and authentication and authorization, then take a look at
[`angular-app`](http://github.com/angular-app/angular-app), which does just
that - and does it well.

## Learn

### Overall Directory Structure

At a high level, the structure looks roughly like this:

### Structure
```
ng-cafe/
  |
  +- config/
  |  |- build.config.js
  |  |- coffeelint.json
  |  |- jshint.json
  |  |- karma.config.tpl.coffee
  |  |- changelog.tpl
  |  |- module.prefix
  |  |- module.suffix
  |  |- <build config and template files>
  +- docs/
  |  +- <generated docs for this project>
  +- src/
  |  +- assets/
  |    +- img/
  |    -- faviocon.ico
  |  +- app/
  |  |  +- <app logic >
  |  +- common/
  |  |  +- <reusable code>
  |  +- less/
  |  |  +- <stylesheets as less preprocessor>
  |  +- test/
  |  |  +- <tests written in jasmine/mocha, not part of a specific feature>
  |  |- index.html
  +- vendor/
  |  +- <bower components>
  |- .bowerrc
  |- .editorconfig
  |- .gitignore
  |- .gitmodules
  |- .travis.yml;
  |- Gruntfile.js
  |- package.json
  |- bower.json
  |- LICENSE
  |- README.md
```
What follows is a brief description of each entry, but most directories contain
their own `README.md` file with additional documentation, so browse around to
learn more.

- `build/` - files needed to make everything happen, but *not* libraries our
  application uses. [Read more &raquo;](build/README.md)
- `karma/` - test configuration.
- `src/` - our application sources. [Read more &raquo;](src/README.md)
- `vendor/` - third-party libraries. [Bower](http://bower.io) will install
  packages here. Anything added to this directory will need to be manually added
  to `Gruntfile.js` and `karma/karma-unit.js` to be picked up by the build
  system.
- `.bowerrc` - the Bower configuration file. This tells Bower to install
  components into the `vendor/` directory.
- `bower.js` - this is our project configuration for Bower and it contains the
  list of Bower dependencies we need.
- `build.config.js` - our customizable build settings; see "The Build System"
  below.
- `Gruntfile.js` - our build script; see "The Build System" below.
- `module.prefix` and `module.suffix` - our compiled application script is
  wrapped in these, which by default are used to place the application inside a
  self-executing anonymous function to ensure no clashes with other libraries.
- `package.json` - metadata about the app, used by NPM and our build script. Our
  NPM dependencies are listed here.


### Detailed Installation
This section provides a little more detailed understanding of what goes into
getting `AngularCafe` up and running. Though `AngularCafe` is really simple
to use, it might help to have an understanding of the tools involved here, like
Node.js and Grunt and Bower. If you're completely new to highly organized,
modern JavaScript development, take a few short minutes to read [this overview
of the tools](tools.md) before continuing with this section.

Okay, ready to go? Here it is:

This section provides a little more detailed understanding of what goes into
getting `AngularCafe` up and running. Though `AngularCafe` is really simple
to use, it might help to have an understanding of the tools involved here, like
Node.js and Grunt and Bower. If you're completely new to highly organized,
modern JavaScript development, take a few short minutes to read [this overview
of the tools](tools.md) before continuing with this section.

Okay, ready to go? Here it is:

`AngularCafe` uses [Grunt](http://gruntjs.org) as its build system, so
[Node.js](http://nodejs.org) is required. Also, Grunt by default no longer comes
with a command-line utility and Karma and Bower must end up in your global path
for the build system to find it, so they must be installed independently. Once
you have Node.js installed, you can simply use `npm` to make it all happen:

```sh
$ npm -g install grunt-cli karma bower
```

If you're on Linux (like I am) then throw `sudo` in front of that command.  If
you're on Windows, then you're on your own.

Next, you can either clone this repository using Git, download it as a zip file
from GitHub, or merge the branch into your existing repository. Assuming you're
starting from scratch, simply clone this repository using git:

```sh
$ git clone git://github.com/kburson/ng-cafe    my-project-name
$ cd my-project-name
```

And then install the remaining build dependencies locally:

```sh
$ npm install
```

This will read the `dependencies` (empty by default) and the `devDependencies`
(which contains our build requirements) from `package.json` and install
everything needed into a folder called `node_modules/`.

Twitter Bootstrap and AngularUI Bootstrap are Bower packages listed in
`bower.js`. Since they are already listed, simply run this to install them into
the `vendor/` directory:

```sh
$ bower install
```

In the future, should you want to add a new Bower package to your app, run the
`install` command:

```sh
$ bower install packagename --save-dev
```

The `--save-dev` flag tells Bower to add the package at its current version to
our project's `bower.js` file so should another developer download our
application (or we download it from a different computer), we can simply run the
`bower install` command as above and all our dependencies will be installed for
us. Neat!

Technically, `AngularCafe` is now ready to go.

However, prior to hacking on your application, you will want to modify the
`package.json` file to contain your project's information. Do not remove any
items from the `devDependencies` array as all are needed for the build process
to work.

To ensure your setup works, launch grunt:

```sh
$ grunt watch
```

The built files are placed in the `build/` directory by default. Open the
`build/index.html` file in your browser and check it out! Because everything is
compiled, no XHR requests are needed to retrieve templates, so until this needs
to communicate with your backend there is no need to run it from a web server.

`watch` is actually an alias of the `grunt-contrib-watch` that will first run a
partial build before watching for file changes. With this setup, any file that
changes will trigger only those build tasks necessary to bring the app up to
date. For example, when a template file changes, the templates are recompiled
and concatenated, but when a test/spec file changes, only the tests are run.
This allows the watch command to complete in a fraction of the time it would
ordinarily take.

In addition, if you're running a Live Reload plugin in your browser (see below),
you won't even have to refresh to see the changes! When the `watch` task detects
a file change, it will reload the page for you. Sweet.

When you're ready to push your app into production, just run the `compile`
command:

```sh
$ grunt compile
```

This will concatenate and minify your sources and place them by default into the
`bin/` directory. There will only be three files: `index.html`,
`your-app-name.js`, and `your-app-name.css`. All of the vendor dependencies like
Bootstrap styles and AngularJS itself have been added to them for super-easy
deploying. If you use any assets (`src/assets/`) then they will be copied to
`bin/` as is.

Lastly, a complete build is always available by simply running the default
task, which runs `build` and then `compile`:

```sh
$ grunt
```

### The Build System (Grunt Tasks)

The best way to learn about the build system is by familiarizing yourself with
[Grunt](http://gruntjs.com) and then reading through the heavily documented build
script, `Gruntfile.js`. But what follows in this section is a quick introduction to 
the tasks provided.

The driver of the process is the `delta` multi-task, which watches for file
changes using `grunt-contrib-watch` and executes one of nine tasks when a file
changes:

* `delta:gruntfile` - When `Gruntfile.js` changes, this task runs the linter
  (`jshint`) on that one file and reloads the configuration.
* `delta:assets` - When any file within `src/assets/` changes, all asset files
  are copied to `build/assets/`.
* `delta:html` - When `src/index.html` changes, it is compiled as a Grunt
  template, so script names, etc., are dynamically replaced with the correct
  values configured dynamically by Grunt.
* `delta:less` - When any `*.less` file within `src/` changes, the
  `src/less/main.less` file is linted and copied into
  `build/assets/ng-cafe.css`.
* `delta:jssrc` - When any JavaScript file within `src/` that does not end in
  `.spec.js` changes, all JavaScript sources are linted, all unit tests are run,
  and the all source files are re-copied to `build/src`.
* `delta:coffeesrc` - When any `*.coffee` file in `src/` that doesn't match
  `*.spec.coffee` changes, the Coffee scripts are compiled independently into
  `build/src` in a structure mirroring where they were in `src/` so it's easy to
  locate problems. For example, the file
  `src/common/titleService/titleService.coffee` is compiled to
  `build/src/common/titleService/titleService.js`.
* `delta:tpls` - When any `*.tpl.html` file within `src/` changes, all templates
  are put into strings in a JavaScript file (technically two, one for
  `src/common/` and another for `src/app/`) that will add the template to
  AngularJS's
  [`$templateCache`](http://docs.angularjs.org/api/ng.$templateCache) so
  template files are part of the initial JavaScript payload and do not require
  any future XHR.  The template cache files are `build/template-app.js` and
  `build/template-common.js`.
* `delta:jsunit` - When any `*.spec.js` file in `src/` changes, the test files
  are linted and the unit tests are executed.
* `delta:coffeeunit` - When any `*.spec.coffee` file in `src/` changes, the test
  files are linted, compiled their tests executed.

As covered in the previous section, `grunt watch` will execute a full build
up-front and then run any of the aforementioned `delta:*` tasks as needed to
ensure the fastest possible build. So whenever you're working on your project,
start with:

```sh
$ grunt watch
```

And everything will be done automatically!

### Build vs. Compile

To make the build even faster, tasks are placed into two categories: build and
compile. The build tasks (like those we've been discussing) are the minimal
tasks required to run your app during development.

Compile tasks, however, get your app ready for production. The compile tasks
include concatenation, minification, compression, etc. These tasks take a little
bit longer to run and are not at all necessary for development so are not called
automatically during build or watch.

To initiate a full compile, you simply run the default task:

```sh
$ grunt
```

This will perform a build and then a compile. The compiled site - ready for
uploading to the server! - is located in `bin/`, taking a cue from
traditional software development. To test that your full site works as
expected, open the `bin/index.html` file in your browser. Voila!

### Live Reload!

`AngularCafe` also includes [Live Reload](http://livereload.com/), so you no
longer have to refresh your page after making changes! You need a Live Reload
browser plugin for this:

- Chrome - [Chrome Webstore](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei)
- Firefox - [Download from Live Reload](http://download.livereload.com/2.0.8/LiveReload-2.0.8.xpi)
- Safari - [Download from Live Reload](http://download.livereload.com/2.0.9/LiveReload-2.0.9.safariextz)
- Internet Explorer - Surely you jest.

Note that if you're using the Chrome version with `file://` URLs (as is the
default with `AngularCafe`) you need to tell Live Reload to allow it. Go to
`Menu -> Tools -> Extensions` and check the "Allow access to file URLs" box next
to the Live Reload plugin.

When you load your page, click the Live Reload icon in your toolbar and
everything should work magically. w00t!

If you'd prefer to not install a browser extension, then you must add the
following to the end of the `body` tag in `index.html`:

```html
<script src="http://localhost:35729/livereload.js"></script>
```

Boom!

## Roadmap

This is a project that is not broad in scope, so there's not really much of a
wish list here. But I would like to see a couple of things:

I'd like it to be a little simpler. I want this to be a universal starting
point. If someone is starting a new AngularJS project, she should be able to
clone, merge, or download its source and immediately start doing what she needs
without renaming a bunch of files and methods or deleting spare parts. What I
have works for a first release, but I just think there is a little too much here
right now.

I'd also like to see a simple generator. Nothing like Yeoman, as there already
is one of those, but just something that allows the user to say "I want
Bootstrap but not Font Awesome and my app is called 'coolApp'. Gimme." Perhaps a
custom download builder like UI Bootstrap has. Like that. Then again, perhaps
some Yeoman generators wouldn't be out of line. I don't know. What do you think?

Naturally, I am open to all manner of ideas and suggestions. See the
"Contributing" section below.

### To Do

See the [issues list](http://github.com/kburson/ng-cafe/issues). And
feel free to submit your own!

* **e2e** tests: what is a good name ? [ Acceptance, Functional, UI, Browser, Protractor]
    * get e2 tests working under protractor

* **contrib-imagemin**
* **grunt-usemin** instead of 'index' task in grunt file

* **grunt-cdn2** to prep assets for cdn deployment
* **grunt-rev** for cache-busting

* **grunt-contrib-jade** for index.html templating (similar to maven filters)


### Contributing

This is an opinionated kickstarter, but the opinions are fluid and
evidence-based. Don't like the way I did something? Think you know of a better
way? Have an idea to make this more useful? Let me know! You can contact me
through all the usual channels or you can open an issue on the GitHub page. If
you're feeling ambitious, you can even submit a pull request - how thoughtful
of you!

So join the team! We're good people.
