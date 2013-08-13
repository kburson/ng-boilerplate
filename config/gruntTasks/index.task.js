
module.exports = function (grunt) {

    /**
     * A utility function to get all app JavaScript sources.
     */
    function filterForJS(srcFiles) {
        return srcFiles.filter(function (file) {
            return file.match(/\.js$/);
        });
    }

    /**
     * A utility function to get all app JavaScript sources.
     */
    function filterForCoffee(srcFiles) {
        return srcFiles.filter(function (file) {
            return file.match(/\.coffee$/);
        });
    }

    /**
     * A utility function to get all app CSS sources.
     */
    function filterForCSS(srcFiles) {
        return srcFiles.filter(function (file) {
            return file.match(/\.css$/);
        });
    }

    /**
     * The index.html template includes the stylesheet and javascript sources
     * based on dynamic names calculated in this Gruntfile. This task assembles
     * the list into variables for the template to use and then runs the
     * compilation.
     */
    grunt.registerMultiTask('index', 'Process index.html template', function () {

        var dirRegEx = new RegExp('^(' + grunt.config('folders.build') + '|' + grunt.config('folders.compile') + ')\/', 'g');

        var jsFiles = filterForJS(this.filesSrc).map(function (file) {
            return file.replace(dirRegEx, '');
        });

        var cssFiles = filterForCSS(this.filesSrc).map(function (file) {
            return file.replace(dirRegEx, '');
        });

        var coffeeFiles = filterForCoffee(this.filesSrc).map(function (file) {
            return file.replace(dirRegEx, '');
        });
        console.log('coffee files for index?: \n', coffeeFiles);

        grunt.file.copy(grunt.config('folders.src') + '/index.html', this.data.dest + '/index.html', {
            process: function (contents) {
                return grunt.template.process(contents, {
                    data: {
                        scripts: jsFiles,
                        styles: cssFiles,
                        version: grunt.config('pkg.version')
                    }
                });
            }
        });
    });
}