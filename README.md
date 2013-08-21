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

### --- NOTE: This document is under construction ---

# Why Angular-Cafe

This project template is to support front end (client-side) web application development using the **AngularJS** framework.
This template also uses **CoffeeScript**, **MochaJS** with **ChaiJS** for testing, as well as the **KarmaJS** test runner.

So, all told we have a javascript dev environment using angular, coffee, mocha, chai with a little karma on the side...
Sounds like an angular cafe ;-)

Throw in **NodeJS** and **GruntJS** as a build and development framework and we have a fairly robust front-end development environment.

***

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

# Using Grunt

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






***

## TODO:
   get code coverage with istanbul working
