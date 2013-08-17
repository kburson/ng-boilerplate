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

# ngMidwayTester

