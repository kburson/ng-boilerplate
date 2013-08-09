
module.exports = function (grunt) {

    grunt.registerMultiTask('protractor',
        'execute functional tests using mocha with protractor library',
        function () {
            console.log('protractor coming soon');
            // start and stop web driver
            //execute
        }
    );

    grunt.verbose.writeln('\x1b[33m============= \x1b[36mLoaded custom grunt task \x1b[0m[\x1b[32;1mprotractor\x1b[0m]');
}