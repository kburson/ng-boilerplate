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
