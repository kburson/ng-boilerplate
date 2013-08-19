# Angular-Cafe

An opinionated kickstarter for [AngularJS](http://angularjs.org) projects.

***

This Project was forked from Josh Millers [ng-Boilerplate](http://joshdmiller.github.com/ng-boilerplate) by [Neoskop GmbH](http://github.com/neoskop/ng-boilerplate)
which was then forked and customized as [ng-cafe](http://github.com/kburson/ng-cafe)

If you want to learn more about the foundation of this project template please reference the documentation from the
fork parents:

* Neoksop/ng-boilerplate/[Readme.md](http://github.com/neoskop/ng-boilerplate/README.md)
* Josh Miller/ng-boilerplate/[Readme.md](http://joshdmiller.github.com/ng-boilerplate/README.md)

***

### --- This document is under construction ---

# Why Angular-Cafe

This project template is to support front end (client-side) web application development using the **AngularJS** framework.
This template also uses **CoffeeScript**, **MochaJS** with **ChaiJS** for testing, as well as the **KarmaJS** test runner.

So, all told we have a javascript dev environment using angular, coffee, mocha, chai with a little karma on the side...
Sounds like an angular cafe ;-)

Throw in **NodeJS** and **GruntJS** as a build and development framework and we have a fairly robust front-end development environment.

***

## Why CoffeeScript ?

My team has chosen to work with CoffeeScript as an intermediary to the Javascript language:


| Positives | Negatives |
|-----------|-----------|
|it is easy to write, less code, less boilerplate | it is easy to write but difficult to read |
| it handles self referencing (this pointer) easily { * '@' with -> or => }| it is a space-delimited language |
| classes are simple, with inheritance | it requires an extra compile step |
| it has powerful collections processing.   |  the support tools available are not yet mature <br/> * you often have to think in 2 languages when debugging (even with sourceMaps) <br/> * auto-formatting source code just does not work. |

***

## Why MochaJS ?
I am promoting the use of mocha as a test framework over the jasmine test framework.
MochaJS is built for the NodeJS development environment and is under active development.
Jasmine is the incumbent test js test framework targetting BDD style of testing.
Both Jasmine and Mocha are open source frameworks. Jasmine is owned by Pivotal labs, MochaJS by VisionMedia.

| Github Metric | **Jasmine**   | **MochaJS** |
|:------------- |:------------- | ----------- |
 first commit   | 11/27/2008    | 8/28/2011 |
 repo age       | 5 years       | 2 years   |
 watch count    |   251         |   173     |
 star count     | 5,356         | 3,166     |
 forks          |   666         |   545     |
 contributors   |    48         |   115     |
 branches       |    18         |     8 |
 releases       |    25         |    66 |
 commits        |   825         | 1,224 |

* MochaJS is more flexible than Jasmine supporting not only the BDD style of testing, but TDD, QUnit and Exports styles as well.
* In addition MochaJS promotes use of 3rd party assertion libraries, hence **ChaiJS**, choosing to focus on running tests.
* MochaJS has a plethora of reporting plugins to display tests results in various formats.

There are other test runners out there, the venerable **JSTD**, and the less heard of **Testem**.
Each has positive features unto their own, but only the Mocha framework is built with the NodeJS environment.

***

## Why ChaiJS ?

ChaiJS is an assertion library used with MochaJS. It has 3 specific styles of assertions, **assert**, **expect** and **should**.
Each of these supports a specific style of testing ( **QUnit**, **TDD**, **BDD**, ...).  The expect and should styles allow
chaining of matchers to make sentence structures for your tests:

* expect(myValue).to.be.at.least(minimum);
* myValue.should.be.at.least(minimum)

which are both easier to read than the classic

* assert(myValue >= minimum,"error message")

whereas the Jasmine expect assertion matchers look like:

* expect(myValue).toBeGreaterThan(minimum-1)

***

## Why Karma ?

Karma is the test runner created by one of the members of the angularJS team at google.  It started as a univerisity masters degree thesis and was adopted by the AngularJS team as their preferred test runner.
Karma is highly configurable and very fast.  It has plugins for various frameworks, including jasmine and mocha.
Because Karma is the preferred test runner for the AngularJS team, we want to follow suit.  "When in Rome..."

Karma has supported functional/acceptance/end-to-end user interface tests using the ngScenario framework.

In January of 2013 Julie Ralph at google started work on the protractor library.
Protractor is a wrapper around the WebDriverJS library.
It has a dependency of a running selenium server to proxy requests to your web page.
Selenium/WebDriver is one of the most supported and accepted UI testing frameworks for web application development.

The AngularJS team is deprecating the use of ngScenario with Karma in favor of the protractor library.
Unfortunately protractor uses a standalone command-line interface to startup selenium and execute your jasmine tests.
From what I can see, the real value of protractor is the protractor library, not the test execution.
Furthermore, the protractor test runner only supports jasmine tests.  This limitation leads me to look for other solutions.

Hopefully the angular team will create a plugin for karma to allow the karma test runner to start the selenium server,
wrap protractor around the WebDriverJS library and feed that into your tests, regardless is they are jasmine, mocha or other.

Until that time we can add a small amount of boilerplate to the top of each of our test fixtures to wrap protractor
around webdriver and connect to a running selenium server.

***
## 4 levels of testing:

In professional software development there are 4 basic levels of testing, although some larger organizations my subdivide
some of these levels, there is still essentially 4 basic levels.

* Manual/Exploratory
* Functional/End-to-End
* Integration
* Unit

These levels are layered on top of one another,
the higher more abstract levels depend on the lower levels.  This is to say that any test at any level can be condifent
that all tests below them have passed and the application functionality has been verified for that level.
Thus, an integration test does not need to worry if a specific module or class has any specific bugs, it can focus on
integrating the various modules into a (semi)-working application.

This 4 layer cake resembles a pyramid as each subsequent layer is smaller, has fewer tests, than the layers below it.
This is because more abstract testing levels will cover more code statements in a single action than lower levels, and
because the abstract layer involve so much more code these tests are generally slower by a magnitude.



## Why midway testing?

http://blogs.burnsidedigital.com/2013/07/setting-up-midway-testing-to-angularjs-app/

>When Unit testing your application it sometimes may get too complicated when you
>want to test an application-level operation (like a page loading or XHR request)
>because you will need to use interceptors and mocks to make requests and
>templating work (basically anything XHR’ish). E2E testing may not also be the
>best option because it may be too high level to capture to test for certain
>features. For example, how do you test a controller on your website that
>performs a XHR request which downloads the user’s session details on every page? …

## TODO:
   get code coverage with istanbul working

***

## Quick Start

### Installation

To develop within this project you need NodeJS, which comes with the npm pacakge manager, and [Grunt](http://gruntjs.com).
If you do not have NodeJS installed there are a variety of ways to install it, I recommend using nvm (Node Version Manager).

** find instructions for install NVM **

Once you have NodeJS install you will need to install the grunt command line tool in your global node_modules

```sh
$ npm install -g grunt-cli
```

Clone this project template and install all dependencies:

```sh
$ git clone git@github.com:kburson/ng-cafe.git
$ cd ng-cafe
$ npm install
```

Note: you will need to change the remote location to your personal git repository



Next you can initialize the project by running the default task

```sh
$ grunt
```

This will execute bower to download all your client side run-time dependencies,
then download a copy of selenium standalone server and chrome webdriver (to be used for e2e tests).
Finally the sample code will be compiled, packaged and unit tests executed to assure everything is where it should be.

You can remove the sample code, customize the project layout using the value assignments in config/build.config.js.

if you want to see the list of grunt commands available run the following command:

```sh
$ grunt --help
```

### What is bower ?


The bower install will download the Angular libraries.  At this time angular is at 1.2.0rc1 while some of the
dependent libraries are still referencing 1.0.6.  The bower install will attempt to resolve all peer dependencies
but you will have to answer some interacive questions regarding this mismatch of the angular versions:

```sh
Unable to find a suitable version for angular, please choose one:
    1) angular#1.2.0rc1 which resolved to 1.2.0rc1 and has angular-mocks#1.2.0rc1, angular-resource#1.2.0rc1, angular-route#1.2.0rc1, angular-scenario#1.2.0rc1, ng-cafe as dependants
    2) angular#>=1 which resolved to 1.0.7 and has angular-bootstrap#0.5.0 as dependants
    3) angular#>= 1.0.6 which resolved to 1.0.7 and has angular-ui-router#0.0.1 as dependants
    4) angular#>= 1.0.2 which resolved to 1.0.7 and has angular-ui-utils#0.0.4 as dependants

Prefix the choice with ! to persist it to bower.json
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

| target alias     | alias expanded|
|------------------|---------------|
|**dev**           |[reset build karma:unit karma:unit:run karma:midway karma:midway:run watch] builds the app, starts the test servers and starts the watch process to wait for changes|
|**dev_server**    |[express:livereload express-keepalive open]starts an express livereload server to view changes to the app as they happen.|
|**test_server**   |[shell:start_selenium] start the selenium webdriver server|
|**e2e_mocha**     |[express:e2e simplemocha] run all e2e tests using mocha (only tests under the e2e test folder named \*.mocha.spec.[js\|coffee]) |
|**e2e_karma**     |[express:e2e karma:ci_e2e] run all e2e tests using karma (only tests under the e2e test folder named \*.scenario.[js\|coffee]) |
|**test**          |[reset karma:ci_unit karma:ci_midway] clear all previous running servers, start test server, run unit + midway tests |
|**run_test**      |[karma:unit:run karma:midway:run] this requires the test servers to be running in the background|
|**build**         |[clean html2js jshint coffeelint coffee recess:build copy index]|
|**compile**       |[compile:debug recess copy ngmin concat uglify index]|
|**compile:debug** |[compile recess copy ngmin concat uglify index]|
|**release**       |[changelog]|


### Testing (Unit, E2E, Midway)

All Test are located in the `test` folder and Test-Runner for this project is 
[Karma](http://karma-runner.github.io/).

TODO: update for local karma under grunt-karma tasks....

```sh
$ karma start # starts watching filechanges and runs trough all test
$ karma run   # if you want to run tests manually (without watch changes)
```

***

# ngMidwayTester



# The Tools Used in `AngularCafe`

## Introduction

`AngularCafe` is standards-based, so it uses all the usual tools to manage
and develop client-side code. If you've developed modern, highly-organized
JavaScript projects before, you are probably already familiar with at least most
of these tools. What follows is a simple description of the tools of which this
project makes use and how they fit in to the `AngularCafe` picture.

## Git

[Git](http://git-scm.com/) is a distributed version control system.
`AngularCafe` uses git to manage its codebase. While in theory you don't have
to use Git once you download `AngularCafe`, this project makes the assumption
that you do. If you're on GitHub, I assume you already have a basic
understanding of Git, which is all you need to make effective use of this
project. You just need to be able to commit and push and junk - nothing funky.
If you're not familiar with it, check out the documentation linked to above.
GitHub also has a great [help section](https://help.github.com/).

## Node.js & NPM

[Node.js](http://nodejs.org) is a platform based on Chrome's JavaScript runtime,
called [V8](http://code.google.com/p/v8/). It allows you to develop all kinds of
software using the JavaScript you already know and love.

A great feature of Node.js is its wide variety of existing libraries and tools.
As the developer community is absolutely massive and incredibly active, Node.js
has a basic package manager called NPM that you can use to install Node.js-based
software and libraries from the command line.

While `AngularCafe` makes heavy use of Node.js behind the scenes, you as the
application developer don't need to really think about it much. Most of the
interaction with Node.js will occur through Grunt (see next section), so you
really only need to know how get the initial setup working.

`package.json` is an NPM package description file written in JSON. It contains
basic metadata about your application, like its name, version, and dependencies.
By default, several packages are required for the build process to work; so when
you first start with `AngularCafe` you have to tell NPM to install the
packages; this is covered in detail in the [main README](README.md). Some of
the required packages are Grunt build tasks (see below), while others are
command-line tools either we (or the build system) need, like Karma, Grunt, and
Bower.

Don't worry about knowing Node.js in order to use `AngularCafe`; Grunt is
where the magic happens.

## Grunt.js

[Grunt](http://gruntjs.com) is a JavaScript task runner that runs on top of
Node.js. Most importantly, Grunt brings us automation. There are lots of steps
that go into taking our manageable codebase and making it into a
production-ready website; we must gather, lint, test, annotate, and copy files
about. Instead of doing all of that manually, we write (and use others') Grunt
tasks to do things for us.

When we want to build our site, we can just type:

```sh
$ grunt
```

This will do everything needed and place our built code inside a folder called
`bin/`. Even more magical, we can tell Grunt to watch for file changes we make
so it can re-build our site on-the-fly:

```sh
$ grunt watch
```

The built files will be in `build/`. See the main [README](README.md) for more
info.

The next time we change a source file, Grunt will re-build the changed parts of
the site. If you have a Live Reload plugin installed in your browser, it will
even auto-refresh your browser for you. You lazy bum.

Grunt is controlled through `Gruntfile.js`. This file is heavily documented in
the source, so I will only provide a high-altitude overview here. Also note that
unless you need to modify the build process, you don't need to know anything
else from this section. The two commands above really are all you need to know
to get started with `AngularCafe`. But for those curious or looking to go a
little more advanced, here's what you'll find.

First, we tell Grunt which tasks we might want to use:

```js
// ...
grunt.loadNpmTasks('grunt-recess');
grunt.loadNpmTasks('grunt-contrib-clean');
grunt.loadNpmTasks('grunt-contrib-copy');
grunt.loadNpmTasks('grunt-contrib-jshint');
// ...
```

Each of these tasks must already be installed. Remember the dependencies from
`package.json` that NPM installed for us? Well, this is where they get used!

Then we get the opportunity to tell the tasks to behave like we want by
defining a configuration object. While we can (and do) define all sorts of
custom configuration values that we reference later on, tasks look for
configuration properties of their own name. For example, the `clean` task just
takes an array of files to delete when the task runs:

```js
clean: [ '<%= build_dir %>', '<%= compile_dir %>' ],
```

In Grunt, the `<%= varName %>` is a way of re-using configuration variables.
In the `build.config.js`, we defined what `build_dir` meant:

```js
build_dir: 'build',
```

When the clean task runs, it will delete the `build/` folder entirely so that
when our new build runs, we don't encounter any problems with stale or old
files. Most tasks, however, have considerably more complicated configuration
requirements, but I've tried to document what each one is doing and what the
configuration properties mean. If I was vague or ambiguous or just plain
unclear, please file an issue and I'll get it fixed. Boom - problem solved.

After our configuration is complete, we can define some of our own tasks. For
example, we could do the build by running all of the separate tasks that we
installed from NPM and configured as above:

```sh
$ grunt clean
$ grunt html2js
$ grunt jshint
$ grunt karma:continuous
$ grunt concat
$ grunt ngmin:dist
$ grunt uglify
$ grunt recess
$ grunt index
$ grunt copy
```

But how automated is that? So instead we define a composite task that executes
all that for us. The commands above make up the `default` tasks, which can be
run by typing *either* of these commands:

```js
$ grunt
$ grunt default
```

We also define the `watch` task discussed earlier. This is covered in more
detail in the main (README)[README.md].

Grunt is the engine behind `AngularCafe`. It's the magic that makes it move.
Just getting started, you won't need to alter `Gruntfile.js` at all, but
as you get into more advanced application development, you will probably need to
add more tasks and change some steps around to make this build your own.
Hopefully, this readme and the documentation within `Gruntfile.js` (as well as
of course the documentation at gruntjs.com) will set you on the right path.

## Bower

[Bower](bower.io) is a package manager for the web. It's similar in many
respects to NPM, though it is significantly simpler and only contains code for
web projects, like Twitter Bootstrap and its AngularJS counterpart Angular
Bootstrap. Bower allows us to say that our app depends in some way on these
other libraries so that we can manage all of them in one simple place.

`AngularCafe` comes with a `bower.json` file that looks something like this:

```js
{
  "name": "ng-cafe",
  "version": "0.2.0-SNAPSHOT",
  "devDependencies": {
    "angular": "~1.0.7",
    "angular-mocks": "~1.0.7",
    "bootstrap": "~2.3.2",
    "angular-bootstrap": "~0.3.0",
    "angular-ui-router": "~0.0.1",
    "angular-ui-utils": "~0.0.3"
  },
  "dependencies": {}
}
```

This file is fairly self-explanatory; it gives the package name and version
(duplicated from `package.json`, but this is unavoidable) as well as a list of
dependencies our application needs in order to work. If we simply call

```sh
$ bower install
```

it will read these three dependencies and install them into the `vendor/` folder
(along with any dependencies they have) so that we can use them in our app. If
we want to add a new package like AngularUI's
[ngGrid](http://angular-ui.github.io/ng-grid/), then we can tell Bower to
install that from the web, place it into the `vendor/` folder for us to use, and
then add it as a dependency to `bower.json`:

```js
$ bower install angular-grid --save-dev
```

Bower can also update all of our packages for us at a later date, though that
and its many other awesome features are beyond the scope of this simple
overview.

One last thing to note is that packages installed with Bower are not
standardized, so we cannot automatically add them to the build process; anything
installed with Bower (or placed in the `vendor/` directory manually) *must* be
added to your `build.config.js` file manually; look for the Bower libs included
in `AngularCafe` by default in there to see what I mean.

## Where to Go From Here

That's it! Now that you have a basic understanding of the tools involved, read
through the [main README](README.md) to dive another level deeper and apply what
you've learned for great good. I promise it will all make sense in short order.

Happy programming!

#Protractor:

For more information about protractor please reference the following video presentation from the
[Aug 2013 DFW area AngularJS Meetup](http://codingsmackdown.tv/blog/2013/08/16/an-introduction-to-angularjs-end-to-end-testing-with-protractor/).

## locators

* waitForAngular
* findElement
* findElements

## client side mocking

* addMockModule
* clearMockModules

## Selectors:

### Protractor Locators

#### inherited from webDriver: same as webdriver.By.*

* protractor.By.className('redBtn')
* protractor.By.css('.redBtn')
* protractor.By.id('loginButton')
* protractor.By.linkText('Go Home')
* protractor.By.partialLinkText('Home')
* protractor.By.name('email')
* protractor.By.tagName('h2')
* protractor.By.xpath('xpath')

#### extended by protractor for AngularJS

* protractor.By.binding('{{status}}'
* protractor.By.select("user")
* protractor.By.seletedOption("red")
* protractor.By.input("user")
* protractor.By.repeater("cat in pets")
* protractor.By.repeater("cat in pets").row(1).column("{{cat.name}}")


### Web Element Methods:

| Method | Description |
|--------|-------------|
clear() |If this element is a text entry element, this will clear the value. |
click() | Click this element.|
getAttribute(name) | Get the value of the fiven attribute of the element |
getCssValue(propertyName) |Get the value of a given CSS property |
getLocation() | Where on the page is the top left-hand corner of the rendered element ? |
getSize() | What is the width and height of the rendered element ? |
getTagName() | Ge the tag name of this element. |
getText() | Get the visible (i.e. not hidden by CSS) innerText of this element, including subelements, without any leading or trailing whitespace|
isDisplayed() | Is this element displayed or not? This method avoids the problem of having to parse an element's "style" attribute.|
isEnabled() | Is the leement currently enabled or not? This will generally return true for everything but disabled input elements.|
isSelected() | Determine whether or not this element is selected or not.|
sendKeys(keystoSend) | Use this method to simulate typiung into an element, whicy may set its value.|


## Migrating Existing Test Scripts from ngScenario to Protractor

because most examples on the web today are for ngScenario e2e tests under Karma I have copied this table of conversions
from the ngScenario style of test statements to the new Protractor style .

| ng-scenario | protractor |
|-------------|------------|
|brower().navigateTo(url) | ptor.get(url) |
|browser().location().url() | ptor.getCurrentUrl() |
|binding(name) | ptor.findElement(protractor.By.binding('{{status}}')).getText() |
|input(name).enter(value) | ptor.findElement(protractor.By.input("user")).click()|
|input(name).check() | ptor.findElement(protractor.By.input("user")).click()|
|input(name).select(value) | see select below |
|input(name).val() |ptor.findElement(protractor.By.input("user")).getText() |
|repeater(selector, label).count() | ptor.findElements(protractor.By.repeater("cat in pets")).length() |
|repeater(selector, label).row(index)| ptor.findElements(protractor.By.repeater("cat in pets")).row(index)|
|repeater(selector, label).column(binding) | ptor.findElements(protractor.By.repeater("cat in pets")).row(index).column(binding)|
|select(name).option(value) | ptor.findElement(protractor.By.id('selectId').click(); <br/>ptor.findElement(protractor.By.css('option [value="0"]').click()|
|select(name).options(value1, value2...) | ptor.findElement(protractor.By.id('selectId').click() <br/>ptor.findElement(protractor.By.id('selectId').click() <br/>ptor.findElement(protractor.By.css('option [value="0"]').click() <br/>ptor.findElement(protractor.By.css('option [value="2"]').click() <br/>ptor.findElement(protractor.By.css('option [value="4"]').click()|
|element(selector, label) | see WebElement methods mentioned earlier |

# Grunt Targets


***

What are the grunt targets that can be run from the command line (or from other targets)



##custom tasks

***

- default:
    - init:
    - build:
        - quick-build:
            - clean
            - html2js
            - jshint
            - coffeelint
            - coffee
        - assemble:
            - recess
            - copy [build_assets, buiodl_appjs, build_vendorjs, build_vendorcss]
            - index
    - compile:
        - recess
        - copy [compile, compile_assets]
        - ngmin
        - concat
        - uglify
        - index
- release:
    - changelog
- test:
- reset:
- dev_server:
- karmaconfig:
- watch:

***

## Task configurations

***

### changelog:
auto create a changelog file with the git commit history since the last tag.

### bower:
install / update/ prune : manage runtime javascript dependencies.

### shell
- shell:**bower_prune**
    - When bower installs/ updates your run-time dependencies it only adds frameworks listed in your bower.json file,
    it does not remove existing libraries that no longer are listed in the bower.json file.
    This target asks bower to trim anything not explicitly listed.

- shell:**kill_phantom**
    - There are occaisions where you will have multiple phantomjs processes that have been orphaned.
    This target will find them and kill -9 them all.

- shell:**install_selenium**
    - To do end-to-end tests (functional/acceptance/ browser ui tests) we are using protractor with webdriver. WebDriver
    depends on a selenium server to be running.  This target will install a selenium server on your local box.

- shell:**start_selenium**

- shell:**stop_selenium**
    - These targets start and stop the selenium server.

### bump:
- Increment the version number in both the package.json and the bower.json files.
This target can also create a git tag for the current version and push to github prior to incrementing the version number.

### clean:
- Delete all build artifacts, put the project back to pristine shape (except for grunt task modules and bower runtime components)

### copy
- copy:build_assets
- copy:build_appjs
- copy:build_vendorjs
- copy:build_vendorcss
- copy:compile_assets

### concat
- concat:compile_js

### coffee:

### coffeelint:
- src:
- test:

###ngmin

###ngdocs
- ngdocs:api
- ngdocs:guide
- ngdocs:tutorial

###uglify

###recess
- recess:build
- recess:compile

###jshint:
- jshint:src
- jshint:test
- jshint:gruntfile
- jshint:buildconf

###express
- test
- e2e
- livereload

###html2js:
- app:
- common:

### index:
- build:
- compile:

### open:
Open a web browser to the expres:livereload start page.  This is used for watching changes in the page as you write code.

### karma:
- watch_unit:
- watch_midway:
- ci_unit:
- ci_midway:

### karamconfig
- unit
- midway

### delta
Alias for the grunt-contrib-watch task. This configuration lists the different types of files that will be watched
and what tasks will be executed for each file type when changes occur.

Splitting the watch configuration into
multiple sub-configs allows each set of file types to trigger specific actions
(so you do not re-compile your coffeescript if you change a template or a json file).

- gruntfile: -> jshint
- bowerfile: -> bower:prune
- buildconf:
- jssrc:
- coffeesrc:
- assets:
- html:
- tpls:
- less:
- jsunit:
- jsmidway:
- jse2e:
- coffeeunit:
- coffeemidway:
- coffeee2e:


### concurrent:
- tests:





#Build Tools used in this project:

Build tools are used only in the dev and build environment, they are defined to make development and delivery of solutions more streamlined while provide a structured approach with a standardized set of tools and task options.  This structured approach will make it easier for developers to get up to speed when starting or switch projects.

All the build tools referenced for this project template are installed using the npm tool and are stored in the project node_modules folder.  These tools are not delivered with the final product of any specific project.
#node_modules

below is a listing of the tools used in this project template:  Each subsection includes a link to a detail section that follows that gives more information on the individual tools, their value and why they were chosen.

##[Build Script automation](#buildAutomationTools)
+ grunt

##[Component library manager](#componentLibraryManager)
+ bower

##[Build Management Tools](#buildManagementTools)
+ matchdep
+ grunt-env
+ grunt-shell
+ grunt-concurrent
+ grunt-contrib-clean
+ grunt-contrib-copy
+ grunt-angular-templates
+ grunt-flyway

## [Language Tools](#languageTools)
+ grunt-contrib-jade
+ grunt-contrib-less
+ grunt-contrib-coffee

##[Syntax Validation Tools](#syntaxValidationTools)
+ grunt-coffeelint
+ grunt-lesslint
+ grunt-contrib-jshint

##[Package Distribution Tools](#packageDistributionTools)
+ grunt-contrib-cssmin
+ grunt-contrib-htmlmin
+ grunt-contrib-imagemin
+ grunt-contrib-uglify
+ grunt-contrib-compress
+ grunt-contrib-concat
+ grunt-cdn2
+ grunt-ngmin
+ grunt-html2js
+ grunt-usemin
+ grunt-rev

##[Testing Tools](#testingTools)
+ grunt-devtools
+ grunt-contrib-watch
+ grunt-open
+ grunt-karma
+ karma
+ karma browser launchers
+ karma-chrome-launcher
+ karma-safari-launcher
+ karma-firefox-launcher
+ karma-phantomjs-launcher
+ karma-script-launcher
+ karma language preprocessors
+ karma-coffee-preprocessor
+ karma-html2js-preprocessor
+ karma-requirejs
+ karma test frameworks
+ karma-ng-scenario
+ karma-jasmine
+ karma-mocha
+ mocha
+ chai
+ phantomjs

##[Application hosting services](#applicationHostingTools)
+ connect-livereload
+ express-livereload
+ grunt-express
+ grunt-express-server
+ grunt-contrib-connect





# Details on Tool selection and use.


##<a id="buildAutomationTools"></a>Build Script automation
###grunt

Grunt is a build automation tool for javascript projects. It is very similar to Ant, Gradle and maven in that it identifies build tasks with targets and dependencies. It is executed from the command line with a list of targets desired:

`$ grunt verify test build package publish`

1. This would verify that all known sources (coffee, less, html) satisfy a proscribed set of syntax rules,
2. test the various source elements using the karma test runner,
3. compile the sources into executable javascript/css
4. publish the results to github and/or the defined CDN/server location.

##<a id="componentLibraryManager"></a>Component library manager
###bower

Bower is a javascript framework dependency management tool. This allows a project to easily identify the dependencies on 3rd party tools, have them automatically downloaded and installed ready for use by the project.
This is a convenience to the approach of manually downloading each framework separately and committing the individual framework source into the project source control repository, which is a massive waste of space and time.


##<a id="buildManagementTools"></a>Build Management Tools

###matchdep:
grunt task to quickly filter file sets and execute a common command on each entry in list:

`require("matchdep").filterDev("grunt-*").forEach grunt.loadNpmTasks`

finds an loads all grunt tasks in local project.


###grunt-concurrent

###grunt-shell:
grunt task to execute command on local shell (bash).
This is useful for build environment commands like kill all orphaned test browser processes, or install all local bower component libraries

###grunt-env
grunt task to allow creation of operating system shell environment variables that are used by various tools (including CI).

###grunt-contrib-clean
similar to `make clean`, `mvn clean` etc.  Deletes specified build artifacts to assure the subsequent build is working in a clean environment.

###grunt-angular-templates
###grunt-contrib-copy
task to copy elements from a source or build folder into a test or distribution folder.
This is used here to make sure the distribution folder contains all the application resources prior to package and distribution.

###grunt-flyway:
database versioning task.  Creates tables in database to monitor which schema/data update scripts have been executed against database.
When you create your update scripts for a database schema and annotate them for db version, flyway will automate running only the scripts
that have not been executed against the specific target database, thus allowing an automated versioning of the data
schema and content.

## <a id="languageTools"></a>Language Tools

###grunt-contrib-jade
task to compile html templates; this is similar to the maven filter build task where html templates are processed and
merged with specific build environment properties to create a custom index file.
This is useful for changing deployment addresses, ports and urls identified in the application html index or templates,
creating a specific version per deployment
###grunt-contrib-less
less is a dynamic stylesheet language that allows nested styles, variables, branching and logic within an application stylesheet collection

###grunt-contrib-coffee


##<a id="syntaxValidationTools"></a>Syntax Validation Tools
###grunt-coffeelint
###grunt-contrib-csslint
###grunt-contrib-jshint
###grunt-lesslint:
syntax checker for less style sheets.  The rules to verify are configurable.
In the build process we check all stylesheet files for valid syntax before we compile them into css, concatenate and minify for distribution.

##<a id="packageDistributionTools"></a>Package Distribution Tools
###grunt-contrib-cssmin
###grunt-contrib-htmlmin
###grunt-contrib-imagemin
###grunt-contrib-uglify
###grunt-contrib-compress
###grunt-contrib-concat
###grunt-cdn2

###grunt-ngmin:
angular minification support.  This task automatically annotates module definitions with injection dependencies to safegaurd against minification name mangling.

###grunt-html2js:
task to compile all html templates into javascript files that can be concatenated and minified with the other application javascript files.
This will reduce the number of resource files a browser needs to download before the application can run.

###grunt-usemin:

###grunt-rev:



##<a id="testingTools"></a>Testing Tools


###grunt-devtools

###grunt-contrib-watch

###grunt-open:
This plugin registers a task to open a browser to and navigating to a specific start page.

###grunt-karma:
grunt-karma creates a wrapper that provides a karma task that can be called from a gruntfile.

###karma:
karma is a javascript test runner used for unit/integration tests.
You can also install this globally using:

```bash
$ npm install -g karma
```
The latest version (~0.9.5) changes the config file to use a module export format using
either javascript or coffeescript as opposed to the prior flat js config file format.

**karma.conf.js**

```javascript
module.exports = function(config) {
  return config.set({
    frameworks: ["mocha", "chai"],
    reporters: ["dots"],
    browsers: ["Chrome"],
    files: [
      {pattern: "app/lib/angularjs/index.js",          watched: false},
      {pattern: "app/lib/angular-mocks/index.js",      watched: false},
      {pattern: "app/scripts/{,**/}*.coffee",          watched: true},
      {pattern: "test/unit/{,**/}*.spec.mocha.coffee", watched: true}
    ]
  });
};
```

###karma browser launchers

config plugins to give to karma process to target a specific browser to execute tests on.

- karma-chrome-launcher
- karma-safari-launcher
- karma-firefox-launcher
- karma-phantomjs-launcher
- karma-script-launcher

###karma language preprocessors
these are needed to pre-process compiled languages so they can be executed by the browser.

- karma-coffee-preprocessor
    - pre-compile coffeescript to javascript prior to executing in browser.
- karma-html2js-preprocessor
    - pre-compile html into javascript files for faster loading of templates.

###karma-requirejs

** ???? **

### karma test frameworks:
+ karma-ng-scenario
    - the angular framework for end-to-end (functional / acceptance) tests
+ karma-jasmine
    - the standard karma framework for unit tests (BDD style)
+ karma-mocha
    - karma plugin to layer mocha test framework on top of karma test runner.
    - Mocha supports both BDD and TDD style tests as well as a host of report formats.

###mocha:
extensible open javascript test framework (similar to jasmine)  that can be run on top of karma.
- Supports both TDD and BDD style tests
- Multiple extensible test report formats
- Simplified asynchronous tests
- ...

###chai
Extensible test assertion library that currently supports:
- *assert* (TDD style)
    - assert(object.value == expectedValue, 'value != ' + expectedValue)
    - assert.equal(object.value, expectedValue, 'value not calculated properly')
- *expect* (BDD style)
    - expect(object.value).equal(expectedValue)
- *should* (lexical sentence form of BDD)
    - object.value.should.equal(expectedValue)


###phantomjs:
Headless webkit test browser for unit testing.



##<a id="applicationHostingTools"></a>Application hosting services
###connect-livereload
###express-livereload
###grunt-express
###grunt-express-server
###grunt-contrib-connect








| col | col |  col ||
------|:---:|-------|
data  | cell| data 2|




#Angular Cafe

A client side development scaffold for projects using angular with less, coffeescript, mocha, chai and karma, with bower and grunt plugins to support the development stream.

This scaffold assumes the development team wants to use:

##AngularJS
client side javascript MVC framework

##CoffeeScript
Terse intermediary language that compiles into javascript.
CoffeeScript is a whitespace (indent) delimited language with powerful collection management, branch and loop syntactic sugar.

##Less
Intermediary language that compiles to css stylesheets.
Less supports variables, branching and nested styles.

##MochaJS
Javascript test runner that supports BDD and TDD styles of testing with multiple configurable report formats.

##ChaiJS
Unit test assertion library that supports BDD and TDD styles of testing

# Build Process

grunt tasks that can :

- compile intermediary languages into target languages
    - Coffeescript -> Javascript
    - Less -> Css
- Check for syntax errors in scripts
- Auto-annotate angular modules for minification safety
- Concatenate compiled/validated script files
    - this reduces the number of resource files a browser must download
- Minify script files
    - this reduces the size of the script files to speed up browser resource downloads.
- Minify images
- Compile html into javascript and pre-load into angulars $templateCache
    - these javascript artifacts are included in the concatenated/ minified javascript
        - this makes for a single javascript file necessary to download for the application
        - if using asynchonous loading you might not want to concatenate the resource files.
- Replace resource addresses within html files to point to a specified CDN root.
- Execute shell commands.
- Deploy distribution file
    - revision files
    - check-in to github




