
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
