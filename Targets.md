# Grunt Targets

***

What are the grunt targets that can be run from the command line (or from other targets)



##custom tasks

***

- default:
- watch:
- init:
- quick-build:
- assemble:
- test:
- compile:
- release
- index:
- karmaconfig

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

- gruntfile:
- bowerfile:
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






