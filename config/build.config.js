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
        build: '_build',
        compile: '_dist',
        config: 'config',
        docs: 'docs',
        vendor: 'vendor',
        assets: '<%= folders.src %>/assets',
        src: 'src',
        test: {
            test: '<%= folders.src %>/test',
            unit: '<%= folders.test.test %>/unit',
            midway: '<%= folders.test.test %>/midway',
            e2e: '<%= folders.test.test %>/e2e'
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
        app: {
            js:     ['<%= folders.src %>/**/*.js',     '!<%= folders.src %>/**/*.spec.js',     '!<%= folders.src %>/**/*.scenario.js'],
            coffee: ['<%= folders.src %>/**/*.coffee', '!<%= folders.src %>/**/*.spec.coffee', '!<%= folders.src %>/**/*.scenario.coffee']
        },
        test: {
            unit: {
                js:    ['<%= folders.src %>/**/*.unit.spec.js',       '<%= folders.test.unit %>/**/*.spec.js'],
                coffee:['<%= folders.src %>/**/*.unit.spec.coffee',   '<%= folders.test.unit %>/**/*.spec.coffee']
            },
            midway: {
                js:     ['<%= folders.src %>/**/*.midway.spec.js',     '<%= folders.test.midway %>/**/*.spec.js'],
                coffee: ['<%= folders.src %>/**/*.midway.spec.coffee', '<%= folders.test.midway %>/**/*.spec.coffee']
            },
            e2e: {
                js:     ['<%= folders.src %>/**/*.scenario.js',        '<%= folders.test.e2e %>/**/*.scenario.js'],
                coffee: ['<%= folders.src %>/**/*.scenario.coffee',    '<%= folders.test.e2e %>/**/*.scenario.coffee']
            }
        },

        templates: {
            app:    ['<%= folders.src %>/app/**/*.tpl.html'],
            common: ['<%= folders.src %>/common/**/*.tpl.html']
        },

        html: ['<%= folders.src %>/index.html'],
        less: ['<%= folders.src %>/less/**/*.less'],

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
            js: [
                '<%= folders.vendor %>/angular/angular.js',
                '<%= folders.vendor %>/angular/index.js',
                '<%= folders.vendor %>/angular-resource/index.js',
                '<%= folders.vendor %>/angular-placeholders/angular-placeholders.js',
                '<%= folders.vendor %>/angular-ui-router/release/angular-ui-router.js',
                '<%= folders.vendor %>/angular-ui-utils/modules/route.js',

                /* with angular-boostrap, do we need bootstrap-less ? */
                '<%= folders.vendor %>/angular-bootstrap/ui-bootstrap-tpls.min.js'

                /* pick and choose the boostrap modules you need */
                //,'<%= folders.vendor %>/bootstrap-less/js/*.js'
            ],
            less: [
                /* include bootstrap-less files to make 'less' variables available to app styles */
                /* pick and choose the stylesheets you need */
                '<%= folders.vendor %>/bootstrap-less/less/*.less'
            ],
            css: [],
            img: [
                '<%= folders.vendor %>/bootstrap-less/img/*.*'
            ]
        }
    }
};
