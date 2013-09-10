module.exports = {

    /*
     this.grep(options.grep);
     this.suite = new exports.Suite('', new exports.Context);
     this.ui(options.ui);
     this.bail(options.bail);
     this.reporter(options.reporter);
     if (options.timeout) this.timeout(options.timeout);
     if (options.slow) this.slow(options.slow);
     */
    simplemocha: {
        options: {
            //grep: '*-test',   // string or regexp to filter tests with
            ui: 'bdd',  // name "bdd", "tdd", "exports" etc
            //bail: true, // bail on the first test failure, default = true
            reporter: 'spec',//'tap',  // reporter instance, defaults to `mocha.reporters.Dot`
            timeout: 3000,   // timeout in milliseconds
            slow: 30000, // milliseconds to wait before considering a test slow

            // invert: true,
            ignoreLeaks: false,  // ignore global leaks
            //growl: false,
            globals: ['should', 'expect', 'assert'],
            //asyncOnly: true

            compiler: 'coffee-script'
        },

        e2e: {
            src: ['src/test/e2e/**/*.mocha.coffee']
        }
    },

    tests: {
        common: {
            files: [
                {pattern: '<%= files.vendor.js %>', watched: false},
                {pattern: '<%= html2js.app.dest %>', watched: true},
                {pattern: '<%= html2js.common.dest %>', watched: true},
                {pattern: '<%= files.app %>', watched: true}
            ]
        },
        unit: {
            port: 9010,
            files: [
                {pattern: 'vendor/angular-mocks/angular-mocks.js', watched: false},
                {pattern: 'node_modules/sinon/pkg/sinon.js', watched: false},
                '<%= files.test.unit %>'
            ],
            junitReporter: {
                outputFile: 'unit-test-results.xml',
                suite: ''
            }
        },
        midway: {
            port: 9020,
            files: [
                {pattern: 'vendor/ngMidwayTester/src/ngMidwayTester.js', watched: false},
                {pattern: 'node_modules/sinon/pkg/sinon.js', watched: false},
                '<%= files.test.midway %>'
            ],
            junitReporter: {
                outputFile: 'midway-test-results.xml',
                suite: ''
            }
        }
    },

    /**
     * The Karma options.
     *
     * The list of browsers to launch to test on. This includes only "Firefox" by
     * default, but other browser names include:
     * Chrome, ChromeCanary, Firefox, Opera, Safari, PhantomJS

     * basePath From where to look for files, starting with the location of karma config file.
     *
     * port: On which port should the browser connect,
     * runnerPort: on which port is the test runner operating
     * rootUrl:  and what is the URL path for the browser to use.
     */

    karma: {
        options: {
            basePath: '.', // project root relative to karma.config file, prepend to all file paths
            urlRoot: '/',    // how to get to this app from the browser

            hostname: 'localhost',

            browsers: [ 'PhantomJS'], // Chrome, ChromeCanary, Firefox, Opera, Safari, PhantomJS

            background: true,
            singleRun: false,
            autoWatch: false,

            loggers: [
                {type: 'console'}
            ],
            logLevel: 'WARN',
            colors: true,

            reporters: ['junit', 'spec' ], // 'dots','progress', 'junit', 'spec' ['list', 'tap' for mocha]
            reportSlowerThan: 500,
            captureTimeout: 5000,

            frameworks: ['mocha', 'chai', 'chai-as-promised', 'sinon-chai'], // mocha, jasmine, ng-scenario
            nestedFileMerge: true,

            // TODO: create karma-protractor plugin to make protractor library available to all e2e tests.

            plugins: [
                //'karma-jasmine',
                'karma-mocha',
                'karma-chai',
                'karma-chai-plugins',
                'karma-spec-reporter',
                'karma-junit-reporter',
                'karma-coffee-preprocessor',
                'karma-html2js-preprocessor',
                'karma-coverage',
                'karma-requirejs',
                'karma-chrome-launcher',
                'karma-firefox-launcher',
                'karma-safari-launcher',
                'karma-phantomjs-launcher'
            ],
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
                type: 'html',
                dir: '<%folders.build%>/coverage/'
            },
            files: '<%= tests.common.files %>'
        },

        debug_unit: {
            background: false,
            browsers: ['Chrome'],
            files: '<%= tests.unit.files %>',
            port: '<%= tests.unit.port %>'// server listening on port
        },

        unit: {
            files: '<%= tests.unit.files %>',
            port: '<%= tests.unit.port %>',// server listening on port
            junitReporter: '<%= tests.unit.junitReporter %>'
        },

        ci_unit: {
            files: '<%= tests.unit.files %>',
            port: '<%= tests.unit.port %>',// server listening on port
            junitReporter: '<%= tests.unit.junitReporter %>',
            singleRun: true,
            background: false
        },

        debug_midway: {
            background: false,
            browsers: ['Chrome'],
            port: '<%= tests.midway.port %>',// server listening on port
            files: '<%= tests.midway.files %>'
        },

        midway: {
            port: '<%= tests.midway.port %>',// server listening on port
            files: '<%= tests.midway.files %>',
            junitReporter: '<%= tests.midway.junitReporter %>'
        },

        ci_midway: {
            port: '<%= tests.midway.port %>',// server listening on port
            files: '<%= tests.midway.files %>',
            junitReporter: '<%= tests.midway.junitReporter %>',
            singleRun: true,
            background: false
        }

    }
}