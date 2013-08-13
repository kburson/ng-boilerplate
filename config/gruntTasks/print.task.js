module.exports = function (grunt) {

    // NOTES: These are experimental only to help me learn the grunt universe
    grunt.registerTask('print', function () {
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
}
