'use strict';
/* jslint camelcase: false */

/**
 * This file/module contains all configuration for the build process.
 */
module.exports = {

    /**
     * The `build_dir` folder is where our projects are compiled during
     * development and the `compile_dir` folder is where our app resides once it's
     * completely built.
     *
     * In addition to that, we have a `sass_dir` where all our sass files waiting
     * for their pre-compilation. We also pulled out all test file from `src` and
     * put'em in their own directory `test`.
     */
    folders: {
        build: '_compiled',
        distribution: '_dist',
        config: 'config',
        customTasks: '<%= folders.config %>/gruntTasks',
        docs: 'docs',
        vendor: 'vendor',
        src: 'src',
        server: 'server',
        assets: '<%= folders.src %>/assets',
        styles: '<%= folders.src %>/styles',
        test: {
            all: '<%= folders.src %>/test',
            midway: '<%= folders.test.all %>/integration',
            e2e: '<%= folders.test.all %>/e2e'
        }
    },

    /* *
     * This is a collection of file patterns that refer to our app code (the
     * stuff in `src/`). These file paths are used in the configuration of
     * build tasks. `js` is all project javascript, less tests. `ctpl` contains
     * our reusable components' (`src/common`) template HTML files, while
     * `atpl` contains the same, but for our app's code. `html` is just our
     * main HTML file, `less` is our main stylesheet, and `unit`, `midway` as
     * well as `e2e` contains our app's unit tests.
     */
    files: {

        main: '<%= folders.src %>/app/app.coffee',
        app: [
                '<%= folders.src %>/**/*.coffee',
                '!<%= folders.src %>/app/app.coffee',
                '!<%= folders.src %>/**/*.spec.coffee',
                '!<%= folders.src %>/**/*.scenario.coffee',
                '!<%= folders.test.midway %>/**/*.coffee',
                '!<%= folders.test.e2e %>/**/*.coffee'
            ],
        test: {
            unit: ['<%= folders.src %>/**/*.unit.spec.coffee'],
            e2e: ['<%= folders.src %>/**/*.scenario.coffee', '<%= folders.test.e2e %>/**/*.scenario.coffee']
        },

        templates: {
            app: ['<%= folders.src %>/app/**/*.html',
                '!<%= folders.src %>/app/**/index*.html',
                '!<%= folders.src %>/app/**/404.html'],
            common: ['<%= folders.src %>/common/**/*.tpl.html']
        },

        index: ['<%= folders.src %>/index.html'],
        less: ['<%= folders.src %>/**/*.less'],

        /**
         * This is the same as `app_files`, except it contains patterns that
         * reference vendor code (`vendor/`) that we need to place into the build
         * process somewhere. While the `app_files` property ensures all
         * standardized files are collected for compilation, it is the user's job
         * to ensure non-standardized (i.e. vendor-related) files are handled
         * appropriately in `vendor_files.js`.
         *
         * The `vendor_files.js` property holds files to be automatically
         * concatenated and minified with our project source files.
         *
         * The `vendor_files.css` property holds any CSS files to be automatically
         * included in our app.
         */
        vendor: {
            min_js: [
                '<%= folders.vendor %>/jquery/jquery.min.js',                   // jquery need to load first
                '<%= folders.vendor %>/jquery-ui/ui/minified/jquery-ui.min.js', // jquery need to load first

                '<%= folders.vendor %>/lodash/dist/lodash.min.js',

                '<%= folders.vendor %>/angular/angular.min.js',
                '<%= folders.vendor %>/angular-route/angular-route.min.js', // TODO: Do we need this

                '<%= folders.vendor %>/angular-resource/angular-resource.min.js',
                '<%= folders.vendor %>/angular-sanitize/angular-sanitize.min.js',

                '<%= folders.vendor %>/angular-bootstrap/ui-bootstrap-tpls.min.js',

                '<%= folders.vendor %>/angular-ui-router/release/angular-ui-router.min.js',

                '<%= folders.vendor %>/angular-ui-sortable/index.js',                 // NO Minified version available

                '<%= folders.vendor %>/angulartics/src/angulartics.js',               // NO Minified version available
                '<%= folders.vendor %>/angulartics/src/angulartics-ga.js',            // NO Minified version available
                '<%= folders.vendor %>/angulartics/src/angulartics-mixpanel.js',      // NO Minified version available

                '<%= folders.vendor %>/angular-placeholders/angular-placeholders.js'  // NO Minified version available
            ],
            js: [
                '<%= folders.vendor %>/jquery/jquery.js',          // jquery need to load first
                '<%= folders.vendor %>/jquery-ui/ui/jquery-ui.js', // jquery need to load first

                '<%= folders.vendor %>/lodash/dist/lodash.js',

                '<%= folders.vendor %>/angular/angular.js',
                '<%= folders.vendor %>/angular-route/angular-route.js', // TODO: Do we need this

                '<%= folders.vendor %>/angular-resource/angular-resource.js',
                '<%= folders.vendor %>/angular-sanitize/angular-sanitize.js',

                '<%= folders.vendor %>/angular-bootstrap/ui-bootstrap-tpls.js',

                '<%= folders.vendor %>/angular-ui-router/release/angular-ui-router.js',

                '<%= folders.vendor %>/angular-ui-sortable/index.js',

                '<%= folders.vendor %>/angulartics/src/angulartics.js',
                '<%= folders.vendor %>/angulartics/src/angulartics-ga.js',
                '<%= folders.vendor %>/angulartics/src/angulartics-mixpanel.js',

                '<%= folders.vendor %>/angular-placeholders/angular-placeholders.js'
            ],
            css: [
                // '<%= folders.vendor %>/**/*.css'
                '<%= folders.vendor %>/angular-ui/build/angular-ui.min.css'

            ],
            img: [
                '<%= folders.vendor %>/bootstrap-less/**/*.png'
                //'<%= folders.vendor %>/**/*.gif',
                //'<%= folders.vendor %>/**/*.png'
            ],
            font: [
                '<%= folders.vendor %>/font-awesome/font/*.*'
            ]
        }
    }
};
