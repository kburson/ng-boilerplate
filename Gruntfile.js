'use strict';
/* jslint camelcase: false */


module.exports = function (grunt) {

    var _ = grunt.util._;

    /**
     * Load in our build configuration file.
     */
    var userConfig = require('./config/gruntConfig/build.config.js');


    /******************************************************************************
     *
     * This is the configuration object Grunt uses to give each plugin its instructions.
     *
     ******************************************************************************/
    var taskConfig = {

        bowerrc: grunt.file.readJSON('./.bowerrc'),

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
                    //cleanTargetDir: true,
                    //cleanBowerDir: true,
                    layout: 'byComponent',
                    targetDir: '<%= bowerrc.directory %>',
                    verbose: true,
                    copy: false
                }
            },
            prune: {
                options: {
                    install: false,
                    prune: true,
                    targetDir: '<%= bowerrc.directory %>',
                    verbose: true
                }
            }
        },

        wait: {
            selenium: {
                options: {
                    before: function () {
                        console.log(' ---------- Start Selenium Server ---------- ');
                        grunt.task.run('shell:start_selenium');
                    },
                    delay: 10000,
                    after: function () {
                        console.log(' ---------- Selenium Server Started ---------- ');
                    }
                }
            }
        },

        shell: {
            options: {
                failOnError: false,
                stderr: true,
                stdout: true
            },
            bower_prune: {
                command: 'node_modules/bower/bin/bower prune --verbose'
            },
            kill_phantom: {
                command: 'pkill phantomjs'
            },
            kill_port: {
                command: 'lsof -i -P | grep <%= grunt.option("port") %> | tee /dev/tty | awk \'{print $2}\' | xargs echo | sed "s/ /, /g" | xargs kill -9'
            },
            echo: {command: 'echo port=<%= grunt.option("port")%>'},

            install_selenium: {
                command: './node_modules/protractor/bin/install_selenium_standalone'
            },
            start_selenium: {
                options: {
                    async: true
                },
                command: 'java -jar selenium/selenium-server-standalone-2.33.0.jar -Dwebdriver.chrome.driver=./selenium/chromedriver'
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
                commit: true,
                commitMessage: 'chore(release): v%VERSION%',
                commitFiles: [
                    'package.json',
                    'bower.json'
                ],
                createTag: true,
                tagName: 'v%VERSION%',
                tagMessage: 'Version %VERSION%',
                push: true,
                pushTo: 'origin'
            }
        },


        /**
         * The directories to delete when `grunt clean` is executed.
         */
        clean: {
            build: ['<%= folders.build %>'],
            dist: ['<%= folders.distribution %>'],
            reports: ['./*-test-results.xml']
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
                        src: ['**', '!README.md', '!favicon.ico'],
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

            build_vendor_assets: {
                files: [
                    {
                        src: ['<%= files.vendor.img %>'],
                        dest: '<%= folders.build %>/assets/img/',
                        cwd: '.',
                        flatten: true,
                        expand: true
                    },
                    {
                        src: ['<%= files.vendor.font %>'],
                        dest: '<%= folders.build %>/assets/font/',
                        cwd: '.',
                        flatten: true,
                        expand: true
                    },
                    {
                        src: ['<%= files.vendor.css %>'],
                        dest: '<%= folders.build %>/assets/',
                        cwd: '.',
                        expand: true
                    }
                ]
            },
            runtime_configuration: {
                files: [
                    {
                        src: ['runtime.json'],
                        dest: '<%= folders.build %>/',
                        cwd: '<%=folders.src %>',
                        expand: true
                    }
                ]
            },

            dist_assets: {
                files: [
                    {
                        src: [ '**' ],
                        dest: '<%= folders.distribution %>/assets',
                        cwd: '<%= folders.build %>/assets',
                        expand: true
                    },
                    {
                        src: [ 'favicon.ico' ],
                        dest: '<%= folders.distribution %>',
                        cwd: '<%= folders.assets %>',
                        expand: true
                    },
                    {
                        src: [ '<%= files.vendor.img %>' ],
                        dest: '<%= folders.distribution %>/assets/img',
                        //cwd: '<%= folders.assets %>',
                        expand: true,
                        flatten: true
                    }
                ]
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
            app: {
                options: {
                    bare: true,
                    sourceMap: true
                },
                expand: true,
                cwd: '.',
                src: [ '<%= files.app %>', '<%= files.main %>'],
                dest: '<%= folders.build %>',
                ext: '.js'
            }
        },


        useminPrepare: {
            html: '<%= folders.app %>/index.html',
            options: {
                dest: '<%= folders.distribution %>'
            }
        },

        usemin: {
            html: ['<%= folders.distribution %>/{,**/}*.html'],
            css: ['<%= folders.distribution %>/styles/{,**/}*.css'],
            options: {
                dirs: ['<%= folders.distribution %>']
            }
        },

        imagemin: {
            release: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= folders.app %>/images',
                        src: '{,**/}*.{png,jpg,jpeg}',
                        dest: '<%= folders.distribution %>/images'
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
            compiled_app_js: {
                options: {
                    banner: '<%= meta.banner %>'
                },
                src: [
                    '<%= folders.config %>/module.prefix',
                    '<%= folders.build %>/src/app/app.js',
                    '<%= folders.build %>/src/*/**/*.js',
                    '<%= html2js.app.dest %>',
                    '<%= html2js.common.dest %>',
                    '<%= folders.config %>/module.suffix'
                ],
                dest: '<%= folders.distribution %>/assets/<%= pkg.name %>.min.js'
            },

            vendor_min_js: {
                src: [ '<%= files.vendor.min_js %>'],
                dest: '<%= folders.distribution %>/assets/vendors.min.js'
            },

            vendor_js: {
                src: [ '<%= files.vendor.js %>'],
                dest: '<%= folders.distribution %>/assets/vendors.min.js'
            },
            vendor_css: {
                src: [ '<%= files.vendor.css %>'],
                dest: ['<%= folders.build %>/assets/vendor.css']
            }
        },

        /**
         * `ng-min` annotates the sources before minifying.
         * That is, it allows us to code without the angular injection array syntax.
         */
        ngmin: {
            dist: {
                files: [
                    {
                        src: [ 'assets/*.js' ],
                        cwd: '<%= folders.distribution %>',
                        dest: '<%= folders.distribution %>',
                        expand: true
                    }
                ]
            }
        },

        /**
         * Minify the concatenated sources!
         */
        uglify: {
            options: {
                banner: '<%= meta.banner %>'
                //,sourceMap: '<%= folders.distribution %>',
            },
            debug: {
                options: {
                    mangle: false
                },
                files: {
                    '<%= concat.compiled_app_js.dest %>': ['<%= concat.compiled_app_js.dest %>']
                }
            },
            dist: {
                files: {
                    //'<%= concat.vendor_js.dest %>': ['<%= concat.vendor_js.dest %>'],
                    '<%= concat.compiled_app_js.dest %>': ['<%= concat.compiled_app_js.dest %>']
                }
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
                src: ['<%= files.main %>','<%= files.app %>', '<%= folders.docs %>/content/api/*.ngdoc'],
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
                src: [ '<%= folders.styles %>/main.less', '<%= files.vendor.css %>'],
                dest: '<%= folders.build %>/assets/css/<%= pkg.name %>.css',
                options: {
                    compile: true,
                    compress: false,
                    noUnderscores: false,
                    noIDs: false,
                    zeroUnits: false
                }
            },
            dist: {
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
                    bases: [ userConfig.folders.build, '.' ]
                }
            },

            dist: {
                options: {
                    livereload: false,
                    port: 9500,
                    hostname: 'localhost', // '*',  change this to '0.0.0.0' to access the server from outside
                    bases: [ userConfig.folders.distribution, '.' ]
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
                    {src: [ '<%= files.main %>','<%= files.app %>']}
                ]
            },
            test: {
                nonull: true,
                expand: true,
                files: [
                    {src: ['<%= files.test.unit %>']},
                    {src: ['<%= files.test.e2e %>']}
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
                    '<%= folders.build %>/src/app/app.js',
                    '<%= folders.build %>/src/app/*/**/*.js',
                    '<%= folders.build %>/src/common/**/*.js',
                    '<%= html2js.common.dest %>', // not needed, already included with build/src/**/*.js
                    '<%= html2js.app.dest %>',    // ditto
                    '<%= files.vendor.css %>',      // any included library js files
                    '<%= recess.build.dest %>'      // compiled/concatenated app css files
                ]
            },

            /**
             * When it is time to have a completely compiled application, we can
             * alter the above to include only a single JavaScript and a single CSS
             * file. Now we're back!
             */
            dist: {
                dest: '<%= folders.distribution %>',
                src: [
                    '<%= concat.vendor_js.dest %>',
                    '<%= concat.compiled_app_js.dest %>',
                    '<%= recess.dist.dest %>'
                ]
            }
        },

        open: {// open browser to hosted location
            dev: {
                path: 'http://localhost:<%=express.livereload.options.port%>',
                app: 'Google Chrome'
            },
            dist:   {
                path: 'http://localhost:<%=express.dist.options.port%>',
                app:  'Google Chrome'
            }
        },

        concurrent: {
            tests: [
                'karma:ci_unit',
                'karma:ci_e2e'
            ]
        }
    };

    /******************************************************************************
     * Load required Grunt tasks. These are installed based on the versions listed
     * in `package.json` when you do `npm install --save-dev` in this directory.
     ******************************************************************************/
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    // Load in our build configuration files.
    var watchWithTestsConfig = require('./config/gruntConfig/watch_with_tests.js');
    var watchNoTestsConfig = require('./config/gruntConfig/watch_no_tests.js');
    var testConfig = require('./config/gruntConfig/test_config.js');

    /**
     * Load user custom grunt task definitions
     */
    grunt.loadTasks('./config/gruntTasks');


    // #########################################################
    grunt.initConfig(_.merge(taskConfig, userConfig, testConfig, watchWithTestsConfig, watchNoTestsConfig));

    /******************************************************************************
     *
     * DEFINE TASK ALIASES (groups of tasks run together under an alias target)
     *
     ******************************************************************************/

    grunt.registerTask('default', ['init', 'build', 'karma:ci_unit', 'compile_dist']);
    //grunt.registerTask('default', ['build', 'karma:ci_unit', 'compile_dist']);

    //grunt.registerTask('dev', [ 'init','reset', 'build', 'karma:unit',  'watch']);
    //grunt.registerTask('dev', [ 'reset', 'build', 'karma:unit',  'watch']);
    grunt.registerTask('dev', function () {
        grunt.renameTask('watch', 'watch_no_tests');
        grunt.task.run('reset', 'build', 'watch_no_tests');
    });

    grunt.registerTask('dev_with_tests', function () {
        grunt.renameTask('watch', 'watch_with_tests');
        grunt.task.run('reset', 'build', 'karma:unit',  'watch_with_tests');
    });

    // This allows you to see your changes live in the hosted web app
    grunt.registerTask('dev_server', [ 'express:livereload', 'open:dev', 'express-keepalive']);

    grunt.registerTask('dist_server', [ 'express:dist', 'open:dist', 'express-keepalive']);

    // these tasks will start a test server and keep it running so you can capture the browser and debug.
    grunt.registerTask('debug_unit', [ 'reset', 'karma:debug_unit', 'karma:debug_unit:run' ]);

    // If you are running e2e tests you will need to start the selenium server first
    grunt.registerTask('e2e_server', [ 'shell:start_selenium']);
    grunt.registerTask('e2e_mocha', ['express:e2e', 'simplemocha']);


    // quick run of unit tests then quit.  This will kill any other karma/phantomjs processes running.
    //grunt.registerTask('test_watch', [ 'karma:unit:run' ]);
    grunt.registerTask('test', [ 'reset', 'karma:ci_unit' ]);


    // If running unit tests leave behind orhpaned phantomjs processes, this will find and kill them all
    grunt.registerTask('reset', [ 'shell:kill_phantom' ]);

    //The `build` task gets your app ready to run for development and testing.
    grunt.registerTask('build', [ 'quick-build', 'assemble' ]);

    /**
     * quick-build task which gets executed by travis. We have to decouple this one
     * from build task, because travis ci can't handle less etc.
     */
    grunt.registerTask('quick-build', ['clean', 'html2js', 'jshint', 'coffeelint', 'coffee']);

    grunt.registerTask('assemble', ['recess:build', 'copy:build_assets', 'copy:build_vendorjs',
        'copy:build_vendor_assets', 'copy:runtime_configuration', 'index:build'
    ]);

    /**
     * The `compile_dist` task gets your app ready for deployment by concatenating and
     * minifying your code.
     */
    grunt.registerTask('package:debug', [
        'recess:dist', 'copy:dist_assets',
        'concat:compiled_app_js','ngmin',
        'uglify:debug',
        'concat:vendor_min_js',
        'index:dist'
    ]);

    grunt.registerTask('package', [
        'recess:dist', 'copy:dist_assets',
        'concat:compiled_app_js', 'ngmin',
        'uglify:dist',
        'concat:vendor_min_js',
        'index:dist'
    ]);


    grunt.registerTask('release', ['bump', 'changelog']);

};
