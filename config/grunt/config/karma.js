/**
 * The Karma options.
 *
 * The list of browsers to launch to test on.
 * This includes only "Firefox" by default, but other browser names include:
 * Chrome, ChromeCanary, Firefox, Opera, Safari, PhantomJS
 *
 * basePath From where to look for files, starting with the location of karma config file.
 *
 * port: On which port should the browser connect,
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
        preprocessors: {'src/**/*.coffee': ['coffee'] },
        coffeePreprocessor: {
            options: {
                sourceMap: true,
                bare: true
            }
        },
        coverageReporter: {
            type: 'text' // default to console
            //type: 'html',
            //dir: '<%folders.coverage%>',
            //file: 'coverage.html'
        }
        //,files: '<%= tests.common.files %>'
    },

    coverage: {
        preprocessors: {
            '<%= folders.coverage%>/src/**/*.js': ['coverage']
        },
        reporters: ['junit', 'spec', 'coverage' ], // 'dots','progress', 'junit', 'spec' ['list', 'tap' for mocha]
        singleRun: true,
        background: false,
        files: [
            {
                src: ['<%= folders.coverage%>/src/**/*.js', '<%= tests.unit.files %>'],
                //dest: '<%= folders.build %>/assets/',
                //cwd: '<%= folders.assets %>',
                expand: true
            }
        ],
        port: '<%= tests.unit.port %>'// server listening on port
    },

    debug: {
        background: false,
        browsers: ['Chrome'],
        files: [{ src: ['<%= tests.common.files %>','<%= tests.unit.files %>'],expand: true}],
        port: '<%= tests.unit.port %>'// server listening on port
    },

    unit: {
        files: [{ src: ['<%= tests.common.files %>','<%= tests.unit.files %>'],expand: true}],
        port: '<%= tests.unit.port %>',// server listening on port
        junitReporter: '<%= tests.unit.junitReporter %>'
    },

    ci: {
        files: [
            {
                src: ['<%= tests.common.files %>','<%= tests.unit.files %>'],
                expand: true
            }
        ],
        port: '<%= tests.unit.port %>',// server listening on port
        junitReporter: '<%= tests.unit.junitReporter %>',
        singleRun: true,
        background: false
    }
}