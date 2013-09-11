/**
 * And for rapid development, we have a watch set up that checks to see if
 * any of the files listed below change, and then to execute the listed
 * tasks when they do. This just saves us from having to type "grunt" into
 * the command-line every time we want to see what we're working on; we can
 * instead just leave "grunt watch" running in a background terminal. Set it
 * and forget it, as Ron Popeil used to tell us.
 *
 * But we don't need the same thing to happen for all the files.
 */
module.exports = { // watch_no_tests.js

    /**
     * By default, we want the Live Reload to work for all tasks; this is
     * overridden in some tasks (like this file) where browser resources are
     * unaffected. It runs by default on port 35729, which your browser
     * plugin should auto-detect.
     */
    options: {
        livereload: true
    },

    /**
     * When the bower.json changes, we want to lint it and execute bower_install
     * to get any new dependencies
     */
    bowerfile: {
        files: [ 'bower.json' ],
        tasks: [ 'bower'],
        options: { livereload: false }
    },

    /**
     * When the Gruntfile changes, we just want to lint it.
     * In fact, when your Gruntfile changes, it will automatically be reloaded!
     * When the build.conf.js changes, we just want to lint it.
     * When the jshint rules change, relint everything
     */
    buildconf: {
        files: [ '<%= folders.config %>/gruntConfig/*.js', 'Gruntfile.js', '<%= folders.config %>/jshint.json' ],
        tasks: ['jshint:buildconf'],
        options: { livereload: false }
    },

    /**
     * When our CoffeeScript source files change, we want to run lint them and
     * run our unit tests.
     * When the coffeelint rules change, relint everything
     */
    coffeesrc: {
        files: ['<%= files.app %>', '<%= folders.config %>/coffeelint.json'],
        tasks: [ 'coffeelint:src',
            'coffee:app',
            //'test_watch'
        ]
    },

    /**
     * When assets are changed, copy them. Note that this will *not* copy new
     * files, so this is probably not very useful.
     */
    assets: {
        files: [ '<%= folders.assets %>/**/*' ],
        tasks: [ 'copy:build_assets' ]
    },

    /**
     * When index.html changes, we need to compile it.
     */
    index: {
        files: [ '<%= files.index %>' ],
        tasks: [ 'index:build' ]
    },

    /**
     * When our templates change, we only rewrite the template cache.
     */
    templates: {
        files: [
            '<%= files.templates.app %>',
            '<%= files.templates.common %>'
        ],
        tasks: [ 'html2js' ]
    },

    /**
     * When the CSS files change, we need to compile and minify them.
     */
    less: {
        files: [ '<%=files.less%>' ],
        tasks: [ 'recess:build' ]
    },

    /** The following watch targets are tests, so they do NOT trigger livereload **/

    /**
     * When a CoffeeScript test file changes, we only want to lint it and
     * run the unit tests. We don't want to do any live reloading.
     */
    coffeeunit: {
        files: [ '<%= files.test.unit %>' ],
        tasks: [ 'coffeelint:test'
            //, 'karma:unit:run'
        ],
        options: { livereload: false }
    },

    coffeee2e: {
        files: [ '<%= files.test.e2e %>' ],
        tasks: [ 'coffeelint:test'
            //, 'karma:e2e:run'
        ],
        options: { livereload: false }
    }
};