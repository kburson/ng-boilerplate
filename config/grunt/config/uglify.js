/**
 * Minify the concatenated sources!
 */
module.exports =  { //uglify
    options: {
        banner: '<%= meta.banner %>'
        //,sourceMap: '<%= folders.distribution %>',
    },
    debug: {
        options: {
            mangle: false
        },
        files: {
            '<%= concat.compiled_app_js.dest %>': ['<%= concat.compiled_app_js.dest %>']
        }
    },
    dist: {
        files: {
            //'<%= concat.vendor_js.dest %>': ['<%= concat.vendor_js.dest %>'],
            '<%= concat.compiled_app_js.dest %>': ['<%= concat.compiled_app_js.dest %>']
        }
    }
};