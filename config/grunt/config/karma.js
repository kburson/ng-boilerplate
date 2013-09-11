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

module.exports = { // karma

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
            '**/*.coffee': 'coffee'//,
            //'<%=folders.build%>/src/**/*.js': ['coverage'],
            //'<%=folders.build%>/*.js': ['coverage']
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
    }
}