'use strict';
/* jslint camelcase: false */

module.exports = function (grunt) {

    /******************************************************************************
     * Load required Grunt tasks. These are installed based on the versions listed
     * in `package.json` when you do `npm install --save-dev` in this directory.
     ******************************************************************************/
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    var _ = grunt.util._;

    var appConfig = {
        // We read in our `package.json` file so we can access the package name and version.
        pkg: grunt.file.readJSON('package.json'),
        bowerrc: grunt.file.readJSON('.bowerrc')
    };
    var userConfig = require('./config/grunt/build.config.js');
    var taskConfig = require('grunt-configure')('./config/grunt/config/**/*.js');

    grunt.initConfig(_.merge(appConfig,userConfig,taskConfig));

    //Load user custom grunt task definitions
    grunt.loadTasks('./config/grunt/tasks');


    /******************************************************************************
     *
     * DEFINE TASK ALIASES (groups of tasks run together under an alias target)
     *
     ******************************************************************************/

    grunt.registerTask('default', ['init', 'build', 'karma:ci_unit', 'package']);

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
     * The `package` task gets your app ready for deployment by concatenating and
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
