
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
}