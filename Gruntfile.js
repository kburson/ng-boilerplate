'use strict';
/* jslint camelcase: false */

var path = require('path');

module.exports = function (grunt) {

    /**
     * Load in our build configuration file.
     */
    var userConfig = require('./config/build.config.js');


    /**
     * This is the configuration object Grunt uses to give each plugin its
     * instructions.
     */
    var taskConfig = {

        /**
         * We read in our `package.json` file so we can access the package name and
         * version. It's already there, so we don't repeat ourselves here.
         */
        pkg: grunt.file.readJSON('package.json'),

        /**
         * The banner is the comment that is placed at the top of our compiled
         * source files. It is first processed as a Grunt template, where the `<%=`
         * pairs are evaluated based on this very configuration object.
         */
        meta: {
            banner: '/**\n' +
                ' * <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
                ' * <%= pkg.homepage %>\n' +
                ' *\n' +
                ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
                ' * Licensed <%= pkg.licenses.type %> <<%= pkg.licenses.url %>>\n' +
                ' */\n'
        },

        /**
         * Creates a changelog on a new version.
         */
        changelog: {
            options: {
                dest: '<%= folders.docs %>/CHANGELOG.md',
                template: '<%= folders.config %>/changelog.tpl',
                github: '<%= pkg.repository.url %>',
                version: '<%= pkg.version %>'
            }
        },

        /*
        browser dependency manager.  Download frameworks and libraries that used by the browser.
        This is different than npm package manager used for build and dev tools.
        use :  grunt bower
        this depends on the component packages having a properly formatted bower.json file with a 'main' attribute
        set to the list of files that are necessary for deployment.
        If the library you are useing does not have a properly formmatted bower.json file then you must override
        the export functionality in your bower.json to identify which library files you want copied to your project.
         */
        bower: {
            install: {
                //just run 'grunt bower:install' and you'll see files from your Bower packages in lib directory
                options: {
                    install: true,
                    cleanTargetDir: true,
                    cleanBowerDir: true,
                    layout: 'byComponent',
                    targetDir: 'vendor',
                    verbose: true
                }
            }
        },

        shell: {
            options: {
                failOnError:true,
                stderr: true,
                stdout: true
            },
            bower_prune: {
                command: 'node_modules/bower/bin/bower prune --verbose'
            },
            kill_phantom: {
                command: [
                    'ps -eo pid,command | grep "phantomjs" | grep -v "grep" ',
                    'ps -eo pid,command | grep "phantomjs" | grep -v "grep" | awk "{ print $1 }" | xargs kill -9'
                ].join('&&')
            },
            install_selenium: {
                command: './node_modules/protractor/bin/install_selenium_standalone'
            },
            start_selenium: {
                command: 'java -jar selenium/selenium-server-standalone-2.33.0.jar -Dwebdriver.chrome.driver=./selenium/chromedriver 2> /dev/null :3 &'
            },
            stop_selenium: {
                command: 'curl "http://localhost:4444/selenium-server/driver/?cmd=shutDownSeleniumServer"'
            }
        },

        /**
         * Increments the version number, etc.
         */
        bump: {
            options: {
                files: [
                    'package.json',
                    'bower.json'
                ],
                commit: false,
                commitMessage: 'chore(release): v%VERSION%',
                commitFiles: [
                    'package.json',
                    'bower.json'
                ],
                createTag: false,
                tagName: 'v%VERSION%',
                tagMessage: 'Version %VERSION%',
                push: false,
                pushTo: 'origin'
            }
        },


        /**
         * The directories to delete when `grunt clean` is executed.
         */
        clean: {
            build: ['<%= folders.build %>'],
            compile: ['<%= folders.compile %>']
        },

        /**
         * The `copy` task just copies files from A to B. We use it here to copy
         * our project assets (images, fonts, etc.) and javascripts into
         * `folders.build`, and then to copy the assets to `folders.compile`.
         */
        copy: {

            build_assets: {
                files: [
                    {
                        src: ['**', '!README.md'],
                        dest: '<%= folders.build %>/assets/',
                        cwd: '<%= folders.assets %>',
                        expand: true
                    },
                    {
                        src: [ 'favicon.ico' ],
                        dest: '<%= folders.build %>',
                        cwd: '<%= folders.assets %>',
                        expand: true
                    }
                ]
            },

            build_appjs: {
                files: [
                    {
                        src: [ '<%= files.app.js %>' ],
                        dest: '<%= folders.build %>/',
                        cwd: '.',
                        expand: true
                    }
                ]
            },

            build_vendorjs: {
                files: [
                    {
                        src: [ '<%= files.vendor.js %>' ],
                        dest: '<%= folders.build %>/',
                        cwd: '.',
                        expand: true
                    }
                ]
            },

            build_vendorcss: {
                files: [
                    {
                        src: ['<%= files.vendor.css %>'],
                        dest: '<%= folders.build %>/',
                        cwd: '.',
                        expand: true
                    }
                ]
            },

            compile_assets: {
                files: [
                    {
                        src: [ '**' ],
                        dest: '<%= folders.compile %>/assets',
                        cwd: '<%= folders.build %>/assets',
                        expand: true
                    }
                ]
            }
        },

        /**
         * `grunt concat` concatenates multiple source files into a single file.
         */
        concat: {
            /**
             * The `folders.compile` target is the concatenation of our application source code
             * into a single file. All files matching what's in the `src.js`
             * configuration property above will be included in the final build.
             *
             * In addition, the source is surrounded in the blocks specified in the
             * `module.prefix` and `module.suffix` files, which are just run blocks
             * to ensure nothing pollutes the global namespace.
             *
             * The `options` array allows us to specify some customization for this
             * operation. In this case, we are adding a banner to the top of the file,
             * based on the above definition of `meta.banner`. This is simply a
             * comment with copyright information.
             */
            compile_js: {
                options: {
                    banner: '<%= meta.banner %>'
                },
                src: [
                    '<%= files.vendor.js %>',
                    '<%= folders.config %>/module.prefix',
                    '<%= folders.build %>/src/**/*.js',
                    '<%= html2js.app.dest %>',
                    '<%= html2js.common.dest %>',
                    '<%= folders.config %>/module.suffix'
                ],
                dest: '<%= folders.compile %>/assets/<%= pkg.name %>.js'
            }
        },

        /**
         * `grunt coffee` compiles the CoffeeScript sources. To work well with the
         * rest of the build, we have a separate compilation task for sources and
         * specs so they can go to different places. For example, we need the
         * sources to live with the rest of the copied JavaScript so we can include
         * it in the final build, but we don't want to include our specs there.
         */
        coffee: {
            source: {
                options: {
                    bare: true,
                    sourceMap: true
                },
                expand: true,
                cwd: '.',
                src: [ '<%= files.app.coffee %>' ],
                dest: '<%= folders.build %>',
                ext: '.js'
            }
        },

        /**
         * `ng-min` annotates the sources before minifying.
         * That is, it allows us to code without the angular injection array syntax.
         */
        ngmin: {
            compile: {
                files: [
                    {
                        src: [ '<%= files.app.js %>' ],
                        cwd: '<%= folders.build %>',
                        dest: '<%= folders.build %>',
                        expand: true
                    }
                ]
            }
        },

        ngdocs: {
            /**
             * Basic ngdocs configuration. Contains a temporary `site_tmp` folder which
             * gets later committed to gh-pages branch. The nav-template modifies the standard
             * ngdocs navigation template to add additional markup for example.
             *
             * html5Mode controls if pushState is active or not. We set this to `false` by default
             * to make sure the generated site works well on github pages without routing
             * problems.
             *
             * `styles` let you manipulate the basic styles that come with ngdocs, we made
             * the font-sizes in particular cases a bit smaller so that everything looks
             * nice.
             *
             * `api`, `guide` and `tutorial` configure the certain sections. You could either
             * declare some source files as `src` which contain ngdoc comments, or simply
             * *.ngdoc files which also get interpreted as ngdoc files.
             */
            options: {
                dest: 'site_tmp',
                title: '<%= pkg.name %>',
                navTemplate: '<%= folders.docs %>/html/navigation.html',
                html5Mode: false,
                startPage: '/guide',
                styles: ['<%= folders.docs %>/css/styles.css']
            },

            /*
             * API section configuration. Defines source files and a section title.
             */
            api: {
                src: ['<%= files.app.js %>', '<%= folders.docs %>/content/api/*.ngdoc'],
                title: 'API Reference'
            },

            /*
             * Guide section configuration. Defines source files and a section title.
             */
            guide: {
                src: ['<%= folders.docs %>/content/guide/*.ngdoc'],
                title: 'Guide'
            },
            /*
             * Tutorial section configuration. Defines source files and a section title.
             */
            tutorial: {
                src: ['<%= folders.docs %>/content/tutorial/*.ngdoc'],
                title: 'Tutorial'
            }
        },

        /**
         * Minify the concatenated sources!
         */
        uglify: {
            compile: {
                options: {
                    banner: '<%= meta.banner %>'
                },
                files: {
                    '<%= concat.compile_js.dest %>': '<%= concat.compile_js.dest %>'
                }
            }
        },

        /**
         * `recess` handles our LESS compilation and uglification automatically.
         * Only our `main.less` file is included in compilation; all other files
         * must be imported from this file.
         * Default configuration values;
         * compile: false              // Compiles CSS or LESS. Fixes white space and sort order.
         * compress: false             // Compress your compiled code
         * noIDs: true                 // Doesn't complain about using IDs in your stylesheets
         * noJSPrefix: true            // Doesn't complain about styling .js- prefixed classnames
         * noOverqualifying: true      // Doesn't complain about overqualified selectors (ie: div#foo.bar)
         * noUnderscores: true         // Doesn't complain about using underscores in your class names
         * noUniversalSelectors: true  // Doesn't complain about using the universal * selector
         * prefixWhitespace: true      // Adds whitespace prefix to line up vender prefixed properties
         * strictPropertyOrder: true   // Complains if not strict property order
         * zeroUnits: true             // Doesn't complain if you add units to values of 0
         */
        recess: {
            build: {
                src: [ '<%= files.less %>' ],
                dest: '<%= folders.build %>/assets/<%= pkg.name %>.css',
                options: {
                    compile: true,
                    compress: false,
                    noUnderscores: false,
                    noIDs: false,
                    zeroUnits: false
                }
            },
            compile: {
                src: ['<%= recess.build.dest %>' ],
                dest: '<%= recess.build.dest %>',
                options: {
                    compress: true
                }
            }
        },

        /**
         * `jshint` defines the rules of our linter as well as which files we
         * should check. This file, all javascript sources, and all our tests
         * are linted based on the policies listed in `options`. But we can also
         * specify exclusionary patterns by prefixing them with an exclamation
         * point (!); this is useful when code comes from a third party but is
         * nonetheless inside `src/`.
         */
        jshint: {

            options: {
                jshintrc: '<%= folders.config %>/jshint.json'
            },

            src: {
                files: {
                    src: ['<%= files.app.js %>']
                }
            },

            test: {
                files: {
                    src: [
                        '<%= files.test.unit.js %>',
                        '<%= files.test.midway.js %>',
                        '<%= files.test.e2e.js %>'
                    ]
                }
            },

            gruntfile: {
                files: {
                    src: ['Gruntfile.js']
                }
            },

            buildconf: {
                files: {
                    src: ['<%= folders.config %>/build.config.js']
                }
            }
        },

        /**
         * express-server instance, by default listening to port 9000
         */
        express: {
            /**
             * express server instance for unit tests.
             */
            test: {
                options: {
                    port: 9200,
                    hostname: 'localhost',
                    bases: ['<%= folders.build %>']
                }
            },

            /**
             * express server instance for unit tests.
             */
            e2e: {
                options: {
                    port: 9300,
                    hostname: 'localhost',
                    bases: ['<%= folders.build %>']
                }
            },

            livereload: {
                options: {
                    livereload: true,
                    port: 9400,
                    hostname: 'localhost', // '*',  change this to '0.0.0.0' to access the server from outside
                    bases: [ userConfig.folders.build ]
                }
            }
        },

        /**
         * `coffeelint` does the same as `jshint`, but for CoffeeScript.
         */
        coffeelint: {
            options: {
                configFile: '<%= folders.config %>/coffeelint.json'
            },
            src: {
                nonull: true,
                expand: true,
                files: [
                    {src: [ '<%= files.app.coffee %>']}
                ]
            },
            test: {
                nonull: true,
                expand: true,
                files: [
                    {src: ['<%= files.test.unit.coffee %>']},
                    {src: ['<%= files.test.midway.coffee %>']},
                    {src: ['<%= files.test.e2e.coffee %>']}
                ]
            }
        },

        /**
         * HTML2JS is a Grunt plugin that takes all of your template files and
         * places them into JavaScript files as strings that are added to
         * AngularJS's template cache. This means that the templates too become
         * part of the initial payload as one JavaScript file. Neat!
         */
        html2js: {
            /**
             * These are the templates from `src/app`.
             */
            app: {
                options: {
                    base: 'src/app'
                },
                src: [ '<%= files.templates.app %>' ],
                dest: '<%= folders.build %>/templates-app.js'
            },

            /**
             * These are the templates from `src/common`.
             */
            common: {
                options: {
                    base: 'src/common'
                },
                src: ['<%= files.templates.common %>'],
                dest: '<%= folders.build %>/templates-common.js'
            }
        },


        // use gunt-usemin

        /**
         * The `index` task compiles the `index.html` file as a Grunt template. CSS
         * and JS files co-exist here but they get split apart later.
         * With this method you specify your application sources in the build.config.js file.
         * These identified (minimatch/glob) source files are inserted into script tags in
         * the index.html file.  The css files are inserted into style tags in the index.html.
         *
         * Another option is to use the usemin task.  With usemin you identify specific resources
         * manually in the index.html, but you can wrap specific groups of scripts and css files
         * in html comment directives to identify which groups to concatenate for the final product.
         * When compile the distribution source these groups are compressed into single files and the
         * script tags are replaced with references to the single files.
         *
         * You will still need to identify the folders and source patterns in the build.config.js
         * for the rest of the build system to manage.  grunt-usemin provides more flexability
         * in how you package your sources, but you are required to maange the individual script/css
         * tag inclusions in the main app index.html files.
         */
        index: {

            /**
             * During development, we don't want to have wait for compilation,
             * concatenation, minification, etc. So to avoid these steps, we simply
             * add all script files directly to the `<head>` of `index.html`. The
             * `src` property contains the list of included files.
             */
            build: {
                dest: '<%= folders.build %>',
                src: [
                    '<%= files.vendor.js %>',
                    '<%= folders.build %>/src/**/*.js',
                    '<%= html2js.common.dest %>',
                    '<%= html2js.app.dest %>',
                    '<%= files.vendor.css %>',
                    '<%= recess.build.dest %>'
                ]
            },

            /**
             * When it is time to have a completely compiled application, we can
             * alter the above to include only a single JavaScript and a single CSS
             * file. Now we're back!
             */
            compile: {
                dest: '<%= folders.compile %>',
                src: [
                    '<%= concat.compile_js.dest %>',
                    '<%= recess.compile.dest %>'
                ]
            }
        },

        open: {// open browser to hosted location
            server: { url: 'http://localhost:9400' }
        },

        /**
         * The Karma configurations.
         *
         * The list of browsers to launch to test on. This includes only "Firefox" by
         * default, but other browser names include:
         * Chrome, ChromeCanary, Firefox, Opera, Safari, PhantomJS
         *
         * Note that you can also use the executable name of the browser, like "chromium"
         * or "firefox", but that these vary based on your operating system.
         *
         * You may also leave this blank and manually navigate your browser to
         * http://localhost:9018/ when you're running tests. The window/tab can be left
         * open and the tests will automatically occur there during the build. This has
         * the aesthetic advantage of not launching a browser every time you save.
         *
         * basePath From where to look for files, starting with the location of karma config file.
         *
         * port: On which port should the browser connect,
         * runnerPort: on which port is the test runner operating
         * rootUrl:  and what is the URL path for the browser to use.
         */

        karma: {
            options: {
                basePath: '../', // project root relative to karma.config file, prepend to all file paths
                urlRoot: '/',    // how to get to this app from the browser

                hostname: 'localhost',

                frameworks: ['jasmine'],   // mocha, jasmine, ng-scenario
                browsers: [ 'PhantomJS'], // Chrome, ChromeCanary, Firefox, Opera, Safari, PhantomJS

                background: true,
                singleRun: false,
                autoWatch: false,

                loggers: [ {type: 'console'} ],
                logLevel: 'WARN',
                colors: true,

                reporters: ['progress'], // 'dots','progress'
                reportSlowerThan: 500,
                captureTimeout: 5000,

                //plugins: [
                //    //'karma-jasmine',
                //    'karma-mocha',
                //    'karma-chai',
                //    //'karma-ng-scenario',
                //    //'karma-chrome-launcher',
                //    //'karma-firefox-launcher',
                //    //'karma-safari-launcher',
                //    //'karma-phantomjs-launcher',
                //    //'karma-script-launcher',
                //    'karma-coffee-preprocessor',
                //    'karma-html2js-preprocessor',
                //    'karma-requirejs'
                //],
                preprocessors: {
                    '**/*.coffee': 'coffee',
                    'src/**/*.js': ['coverage']
                },
                coffeePreprocessor: {
                    options: {
                        sourceMap: true,
                        bare: true
                    }
                },
                coverageReporter: {
                    type : 'html',
                    dir : '<%folders.build%>/coverage/'
                }
            },

            watch_unit: {
                configFile: '<%= folders.build %>/karma.unit.conf.coffee',
                plugins: [
                    'karma-mocha',
                    'karma-chai',
                    'karma-coverage',
                    'karma-phantomjs-launcher',
                    'karma-coffee-preprocessor',
                    'karma-html2js-preprocessor',
                    'karma-requirejs'
                ],
                //frameworks: ['jasmine'],
                frameworks: ['mocha','chai'], // mocha only for coffee tests
                background: true,
                //browsers: [ 'Chrome'],
                port: 9001, // server listening on port
                runnerPort: 9101
            },

            watch_midway: {
                configFile: '<%= folders.build %>/karma.midway.conf.coffee',
                plugins: [
                    'karma-mocha',
                    'karma-chai',
                    'karma-coverage',
                    'karma-phantomjs-launcher',
                    'karma-coffee-preprocessor',
                    'karma-html2js-preprocessor',
                    'karma-requirejs'
                ],
                //frameworks: ['jasmine'],
                frameworks: ['mocha','chai'], // mocha only for coffee tests
                background: true,
                port: 9002, // server listening on port
                runnerPort: 9102
            },

//            watch_e2e: {
//                configFile: '<%= folders.build %>/karma.e2e.conf.coffee',
//                plugins: [
//                    'karma-jasmine',
//                    'karma-ng-scenario',
//                    'karma-coverage',
//                    'karma-chrome-launcher',
//                    'karma-coffee-preprocessor',
//                    'karma-html2js-preprocessor',
//                    'karma-requirejs'
//                ],
//                frameworks: ['ng-scenario','mocha','chai'],
//                background: false,
//                port: 9003, // where karma runs
//                runnerport: '<%= express.e2e.options.port %>', // where the app runs
//                urlRoot: '/_karma.e2e_/',
//                proxies:{ '/': 'http://localhost:<%= karma.watch_e2e.runnerPort %>/'},
//                browsers: ['Chrome'],
//                autowatch: true
//            },

            ci_unit: {
                configFile: '<%= folders.build %>/karma.unit.conf.coffee',
                plugins: [
                    'karma-mocha',
                    'karma-chai',
                    'karma-coverage',
                    'karma-phantomjs-launcher',
                    'karma-coffee-preprocessor',
                    'karma-html2js-preprocessor',
                    'karma-requirejs'
                ],
                //frameworks: ['jasmine'],
                frameworks: ['mocha','chai'], // mocha only for coffee tests
                port: 9011,
                runnerPort: 9111,
                singleRun: true,
                background: false
            },

            ci_midway: {
                configFile: '<%= folders.build %>/karma.midway.conf.coffee',
                plugins: [
                    'karma-mocha',
                    'karma-chai',
                    'karma-coverage',
                    'karma-phantomjs-launcher',
                    'karma-coffee-preprocessor',
                    'karma-html2js-preprocessor',
                    'karma-requirejs'
                ],
                //frameworks: ['jasmine'],
                frameworks: ['mocha','chai'], // mocha only for coffee tests
                port: 9012,
                runnerPort: 9112,
                singleRun: true,
                background: false

            }

//            ci_e2e: {
//                configFile: '<%= folders.build %>/karma.e2e.conf.coffee',
//                plugins: [
//                    'karma-jasmine',
//                    'karma-ng-scenario',
//                    'karma-coverage',
//                    'karma-chrome-launcher',
//                    'karma-coffee-preprocessor',
//                    'karma-html2js-preprocessor',
//                    'karma-requirejs'
//                ],
//                frameworks: ['ng-scenario'],
//                port: 9013, // where karma runs
//                runnerPort: '<%= express.e2e.options.port %>', // where the app runs
//                urlRoot: '/_karma.e2e_/',
//                proxies:{ '/': 'http://localhost:<%= karma.ci_e2e.runnerPort %>/'},
//                browsers: ['Chrome'],
//                singleRun: true,
//                background: false
//            }
        },


        /**
         * This task compiles the karma template so that changes to its file array
         * don't have to be managed manually.
         */
        karmaconfig: {
            options: {
                patterns: [
                    //{pattern: '<%=folders.test.test %>/mocha.conf.coffee', watched: false, served: false},
                    //{pattern: '<%=folders.test.test %>/chai.helpers.coffee', watched: false, served: false},
                    {pattern: '<%= files.vendor.js %>', watched: false},
                    {pattern: '<%= html2js.app.dest %>', watched: true},
                    {pattern: '<%= html2js.common.dest %>', watched: true},
                    {pattern: '<%= files.app.js %>', watched: true},
                    {pattern: '<%= files.app.coffee %>', watched: true}
                ]
            },

            unit: {
                template: '<%= folders.config %>/karma.config.tpl.coffee',
                dest: '<%= folders.build %>/karma.unit.conf.coffee',
                patterns: [
                    /*{pattern: '<%= files.vendor.js %>', watched: false},
                    {pattern: '<%= html2js.app.dest %>', watched: true},
                    {pattern: '<%= html2js.common.dest %>', watched: true},
                    {pattern: '<%= files.app.js %>', watched: true},
                    {pattern: '<%= files.app.coffee %>', watched: true},
                    */
                    {pattern: 'vendor/angular-mocks/index.js', watched: false},
                    {pattern: 'node_modules/sinon/pkg/sinon.js', watched: false},

                    {pattern: '<%= files.test.unit.js %>', watched: true},
                    {pattern: '<%= files.test.unit.coffee %>', watched: true}
                ]
            },

            midway: {
                template: '<%= folders.config %>/karma.config.tpl.coffee',
                dest: '<%= folders.build %>/karma.midway.conf.coffee',
                patterns: [
                    {pattern: '<%= files.vendor.js %>', watched: false},
                    {pattern: '<%= html2js.app.dest %>', watched: false},
                    {pattern: '<%= html2js.common.dest %>', watched: false},
                    {pattern: '<%= files.app.js %>', watched: true},
                    {pattern: '<%= files.app.coffee %>', watched: true},

                    {pattern: 'vendor/ngMidwayTester/Source/ngMidwayTester.js', watched: false},
                    {pattern: 'node_modules/sinon/pkg/sinon.js', watched: false},

                    {pattern: '<%= files.test.midway.js %>', watched: true},
                    {pattern: '<%= files.test.midway.coffee %>', watched: true}
                ]
            }

//            e2e: {
//                template: '<%= folders.config %>/karma.config.tpl.coffee',
//                dest: '<%= folders.build %>/karma.e2e.conf.coffee',
//                patterns: [
//                   /* {pattern: '<%= files.vendor.js %>', watched: false},
//                    {pattern: '<%= html2js.app.dest %>', watched: false},
//                    {pattern: '<%= html2js.common.dest %>', watched: false},
//                    {pattern: '<%= files.app.js %>', watched: true},
//                    {pattern: '<%= files.app.coffee %>', watched: true},
//                    */
//                    {pattern: '<%= files.test.e2e.js %>', watched: true},
//                    {pattern: '<%= files.test.e2e.coffee %>', watched: true}
//                ]
//            }
        },

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
        delta: {

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
             * When the Gruntfile changes, we just want to lint it. In fact, when
             * your Gruntfile changes, it will automatically be reloaded!
             */
            gruntfile: {
                files: [ 'Gruntfile.js' ],
                tasks: ['jshint:gruntfile'],
                options: { livereload: false }
            },

            /**
             * When the bower.json changes, we want to lint it and execute bower_install
             * to get any new dependencies
             */
            bowerfile: {
                files: [ 'bower.json' ],
                tasks: ['shell:bower_prune', 'bower'],
                options: { livereload: false }
            },

            /**
             * When the build.conf.js changes, we just want to lint it. In fact, when
             */
            buildconf: {
                files: [ '<%= folders.config %>/build.config.js' ] ,
                tasks: ['jshint:buildconf'],
                options: { livereload: false }
            },

            /**
             * When our source files change,
             * we want to lint them and run our tests.
             */
            jssrc: {
                files: [ '<%= files.app.js %>' ],
                tasks: ['jshint:src',
                        'karma:watch_unit:run',
                        'karma:watch_midway:run',
                        //'karma:watch_e2e:run',
                        'copy:build_appjs'
                ]
            },

            /**
             * When our CoffeeScript source files change, we want to run lint them and
             * run our unit tests.
             */
            coffeesrc: {
                files: ['<%= files.app.coffee %>'],
                tasks: [ 'coffeelint:src',
                         'coffee:source',
                         'karma:watch_unit:run',
                         'karma:watch_midway:run',
                         //'karma:watch_e2e:run',
                         'copy:build_appjs'
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
            html: {
                files: [ '<%= files.html %>' ],
                tasks: [ 'index:build' ]
            },

            /**
             * When our templates change, we only rewrite the template cache.
             */
            tpls: {
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

            /**
             * When a JavaScript test file changes, we only want to lint it and
             * run the tests. We don't want to do any live reloading.
             */
            jsunit: {
                files: [ '<%= files.test.unit.js %>' ],
                tasks: [ 'jshint:test', 'karma:watch_unit:run' ],
                options: { livereload: false }
            },

            jsmidway: {
                files: [ '<%= files.test.midway.js %>' ],
                tasks: [ 'jshint:test', 'karma:watch_midway:run' ],
                options: { livereload: false }
            },

            jse2e: {
                files: [ '<%= files.test.e2e.js %>' ],
                tasks: [ 'jshint:test'], //, 'karma:watch_e2e:run' ],
                options: { livereload: false }
            },

            /**
             * When a CoffeeScript test file changes, we only want to lint it and
             * run the unit tests. We don't want to do any live reloading.
             */
            coffeeunit: {
                files: [ '<%= files.test.unit.coffee %>' ],
                tasks: [ 'coffeelint:test', 'karma:watch_unit:run' ],
                options: { livereload: false }
            },

            coffeemidway: {
                files: [ '<%= files.test.midway.coffee %>' ],
                tasks: [ 'coffeelint:test', 'karma:watch_midway:run' ],
                options: { livereload: false }
            },

            coffeee2e: {
                files: [ '<%= files.test.e2e.coffee %>' ],
                tasks: [ 'coffeelint:test'],//, 'karma:watch_e2e:run' ],
                options: { livereload: false }
            }
        },

        concurrent: {
            tests: [
                'karma:ci_unit',
                'karma:ci_midway'//,
                //'karma:ci_e2e'
            ]
        }
    };

    /**
     * Load required Grunt tasks. These are installed based on the versions listed
     * in `package.json` when you do `npm install --save-dev` in this directory.
     */
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig(grunt.util._.merge(taskConfig, userConfig));


    /**
     * In order to make it safe to just compile or copy *only* what was changed,
     * we need to ensure we are starting from a clean, fresh build. So we rename
     * the `watch` task to `delta` (that's why the configuration var above is
     * `delta`) and then add a new task called `watch` that does a clean build
     * before watching for changes.
     */
    grunt.renameTask('watch', 'delta');


    grunt.registerTask('dev_server', function(){
        grunt.task.run([ 'open', 'express:livereload', 'express-keepalive']);
    });

    /*
    The test servers stay in process as long as the grunt process is running.
    When running with the 'grunt-watch' (renamed 'delta') this holds the grunt process alive forever.
    The build target executes the 'ci' versions of the karma tests, this means they are scheduled for a single run only,
    although the servers are held in processes until the watch process completes.
    This effectively blocks the tests from running a subsequent time when any files change.
    To solve this you MUST run build separately from
     */
    grunt.registerTask('watch', function () {
        grunt.task.run([
            'build',
            'shell:kill_phantom',
            'karma:watch_unit',            // single_run = false
            'karma:watch_midway',          // single_run = false
            //'express:e2e',  // to serve app to e2e tests
            //'karma:watch_e2e',             // acceptance tests
            //'express:livereload',    // allow dev to see ui changes live
            'delta'                  // watch for file changes and trigger build events
        ]);
    });

    /**
     * The `build` task gets your app ready to run for development and testing.
     */
//    grunt.registerTask('watch_e2e', function () {
//        grunt.task.run([ 'express:e2e', 'karma:watch_e2e' ]);
//    });


    /**
     * The default task is to build and compile.
     */
    grunt.registerTask('default', function () {
        //grunt.task.requires('build');
        grunt.task.run(['init', 'build', 'test', 'compile']);
    });

    grunt.registerTask('init', 'install bower components if not already installed', function() {
        if(!grunt.file.isDir(grunt.config('folders.vendor'))) {
            grunt.task.run('bower');
        }
    });

    /**
     * The `build` task gets your app ready to run for development and testing.
     */
    grunt.registerTask('build', function () {
        grunt.task.run([ 'quick-build', 'assemble' ]);
    });


    /**
     * quick-build task which gets executed by travis. We have to decouple this one
     * from build task, because travis ci can't handle less etc.
     */
    grunt.registerTask('quick-build', function () {
        grunt.task.run([
            'clean',
            'html2js',
            'jshint',
            'coffeelint',
            'coffee',
            'karmaconfig'
        ]);
    });

    grunt.registerTask('assemble', function() {
        grunt.task.requires('quick-build');
        grunt.task.run([
            'recess:build',
            'copy:build_assets',
            'copy:build_appjs',
            'copy:build_vendorjs',
            'copy:build_vendorcss', // ??
            'index:build'
        ]);
    });

    grunt.registerTask('test', function() {
        grunt.task.requires('quick-build');
        grunt.task.run([
            'karma:ci_unit',
            'karma:ci_midway'//,
            //'express:e2e',
            //'karma:ci_e2e'
        ]);
    });


    /**
     * The `compile` task gets your app ready for deployment by concatenating and
     * minifying your code.
     */
    grunt.registerTask('compile', function () {
        grunt.task.requires('build');
        grunt.task.run([
            'recess:compile',
            'copy:compile_assets',
            'ngmin',
            'concat:compile_js',
            'uglify',
            'index:compile'
        ]);
    });

    grunt.registerTask('release', function () {
        //grunt.task.requires('build');
        grunt.task.run(['changelog']);
    });


    /**
     * A utility function to get all app JavaScript sources.
     */
    function filterForJS(srcFiles) {
        return srcFiles.filter(function (file) {
            return file.match(/\.js$/);
        });
    }

    /**
     * A utility function to get all app JavaScript sources.
     */
    function filterForCoffee(srcFiles) {
        return srcFiles.filter(function (file) {
            return file.match(/\.coffee$/);
        });
    }

    /**
     * A utility function to get all app CSS sources.
     */
    function filterForCSS(srcFiles) {
        return srcFiles.filter(function (file) {
            return file.match(/\.css$/);
        });
    }


    /**
     * The index.html template includes the stylesheet and javascript sources
     * based on dynamic names calculated in this Gruntfile. This task assembles
     * the list into variables for the template to use and then runs the
     * compilation.
     */
    grunt.registerMultiTask('index', 'Process index.html template', function () {

        var dirRegEx = new RegExp('^(' + grunt.config('folders.build') + '|' + grunt.config('folders.compile') + ')\/', 'g');

        var jsFiles = filterForJS(this.filesSrc).map(function (file) {
            return file.replace(dirRegEx, '');
        });

        var cssFiles = filterForCSS(this.filesSrc).map(function (file) {
            return file.replace(dirRegEx, '');
        });

        var coffeeFiles = filterForCoffee(this.filesSrc).map(function (file) {
            return file.replace(dirRegEx, '');
        });
        console.log('coffee files for index?: \n', coffeeFiles);

        grunt.file.copy(grunt.config('folders.src') + '/index.html', this.data.dest + '/index.html', {
            process: function (contents) {
                return grunt.template.process(contents, {
                    data: {
                        scripts: jsFiles,
                        styles: cssFiles,
                        version: grunt.config('pkg.version')
                    }
                });
            }
        });
    });


    /**
     * In order to avoid having to specify manually the files needed for karma to run,
     * we use grunt to manage the list for us.
     * The `karma/*` files are compiled as grunt templates for use by Karma. Yay!
     */
    grunt.registerMultiTask('karmaconfig', 'Process karma config templates', function () {

        //console.log("karma config: \n",this);

        var patterns = this.data.patterns;
        //console.log("karma target patterns: \n",patterns);

        var options = this.options();
        //console.log("karma config options: \n",options);
        if (options !== undefined && options.patterns !== undefined) {
            patterns = options.patterns.concat(patterns);
        }
        //console.log("karma combined patterns: \n",patterns);

        var files = [];
        patterns.forEach( function(item){
            /**
             * @attribute: watched, @type: boolean, @default: true
             * @description: If karma autoWatch is true all files that have set watched
             * to true will be watched for changes.
            **/
            var watched = item.watched === undefined ? true: item.watched;
            /**
             * @attribute: served, @type: boolean, @default: true
             * @description: Should the files be served by Karma's webserver?
             */
            var served = item.served === undefined ? true : item.served;
            /**
             * @attribute: included, @type: Boolean, @default:  true
             * @description: Should the files be included in the browser using <script> tag?
             * Use false if you wanna load them manually, eg. using Require.js.
            **/
            var included = item.included === undefined ? true : item.included;
            // get the list of files for this pattern
            //console.log('get list for [',item.pattern,']');
            var list = grunt.file.expand(item.pattern);
            //console.log('files: [', list, ']');

            list.forEach(function(file) {
                var obj = {pattern:  '' + file + ''};
                if (!watched) { obj.watched = false;}
                if (!served) { obj.watched = false;}
                if (!included) { obj.included = false;}
                //console.log("add pattern: ", obj);
                files.push(obj);
            });
        });
        grunt.file.copy(this.data.template, this.data.dest, {
            process: function (contents) {
                //console.log("\n-------------\ncontents:\n", contents,"\n--------------\n")
                return grunt.template.process(contents, {
                    data: {
                        patterns: files
                    }
                });
            }
        });
    });


    // NOTES: These are experimental only to help me learn the grunt universe
    grunt.registerTask('print', function (grunt) {
        //console.log("this.data.*:", this.data);
        //console.log("print config:\n",userConfig,"\n\n");
        //console.log('print grunt: ', grunt);
        console.log('print config.folders:\n', grunt.config('folders'), '\n\n');
        console.log('print config.files:\n', grunt.config('files'), '\n\n');
    });

    grunt.registerTask('displayFiles', 'Display config files', function () {
        var files = grunt.file.expand(grunt.config('files.app.coffee'));
        console.log('files: ', files);
        var i = 0;
        for (var file in files) {
            console.log('file ', ++i, path.resolve(file), file);
        }
    });
};
