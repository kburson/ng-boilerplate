
module.exports = function (grunt) {

    grunt.registerTask('init', 'install bower components if not already installed', function () {

        var taskList = [];

        if (!grunt.file.isDir(grunt.config('folders.vendor'))) {
            taskList.push('bower:install');
        }

        if (!grunt.file.isDir('./selenium')) {
            taskList.push('shell:install_selenium');
        }

        grunt.task.run(taskList);

    });
}