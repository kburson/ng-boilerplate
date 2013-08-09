
module.exports = function (grunt) {
    var path = require('path');

    /**
     * In order to avoid having to specify manually the files needed for karma to run,
     * we use grunt to manage the list for us.
     * The `karma/*` files are compiled as grunt templates for use by Karma. Yay!
     */
    grunt.registerMultiTask('karmaconfig', 'Process karma config templates', function () {

        var patterns = this.data.patterns;

        var options = this.options();
        if (options !== undefined && options.patterns !== undefined) {
            patterns = options.patterns.concat(patterns);
        }

        var files = [];
        patterns.forEach(function (item) {
            if (item.pattern === undefined) {
                var patterns = grunt.file.expand(item);
                if (!grunt.util._.isArray(patterns)) {
                    patterns = [patterns];
                }
                patterns.forEach(function (it) {
                    files.push(it);
                });
            } else {

                /**
                 * @attribute: watched, @type: boolean, @default: true
                 * @description: If karma autoWatch is true all files that have set watched
                 * to true will be watched for changes.
                 **/
                var watched = item.watched === undefined ? true : item.watched;
                /**
                 * @attribute: served, @type: boolean, @default: true
                 * @description: Should the files be served by Karma's webserver?
                 */
                var served = item.served === undefined ? true : item.served;
                /**
                 * @attribute: included, @type: Boolean, @default:  true
                 * @description: Should the files be included in the browser using <script> tag?
                 * Use false if you wanna load them manually, eg. using Require.js.
                 **/
                var included = item.included === undefined ? true : item.included;

                var list = grunt.file.expand(item.pattern);
                list.forEach(function (file) {
                    var obj = {pattern: '' + file + ''};
                    if (!watched) {
                        obj.watched = false;
                    }
                    if (!served) {
                        obj.watched = false;
                    }
                    if (!included) {
                        obj.included = false;
                    }
                    files.push(obj);
                });
            }
        });
        grunt.file.copy(this.data.template, this.data.dest, {
            process: function (contents) {
                //console.log("\n-------------\ncontents:\n", contents,"\n--------------\n")
                return grunt.template.process(contents, {
                    data: {
                        patterns: files
                    }
                });
            }
        });
    });
    grunt.verbose.writeln('\x1b[33m============= \x1b[36mLoaded custom grunt task \x1b[0m[\x1b[32;1mkarmaconfig\x1b[0m]');
}
