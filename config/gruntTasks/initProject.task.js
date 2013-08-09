
module.exports = function (grunt) {

    grunt.registerTask('init', 'install bower components if not already installed', function () {
        if (!grunt.file.isDir(grunt.config('folders.vendor'))) {
            grunt.task.run('bower');
        }
        if (!grunt.file.isDir('./selenium')) {
            grunt.task.run('shell:install_selenium');
        }
        //grunt.task.run('karmaconfig');
    });
    grunt.verbose.writeln('\x1b[33m============= \x1b[36mLoaded custom grunt task \x1b[0m[\x1b[32;1minit\x1b[0m]');
}