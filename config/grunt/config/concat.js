/**
 * `grunt concat` concatenates multiple source files into a single file.
 */
module.exports = { // concat
    /**
     * The `compiled_app_js` target is the concatenation of our application source code
     * into a single file. All files matching what's in the `src`
     * configuration property above will be included in the final build.
     *
     * In addition, the source is surrounded in the blocks specified in the
     * `module.prefix` and `module.suffix` files, which are just run blocks
     * to ensure nothing pollutes the global namespace.
     *
     * The `options` array allows us to specify some customization for this
     * operation. In this case, we are adding a banner to the top of the file,
     * based on the above definition of `meta.banner`. This is simply a
     * comment with copyright information.
     */
    compiled_app_js: {
        options: {
            banner: '<%= meta.banner %>'
        },
        src: [
            '<%= folders.config %>/module.prefix',
            '<%= folders.build %>/src/app/app.js',
            '<%= folders.build %>/src/*/**/*.js',
            '<%= html2js.app.dest %>',
            '<%= html2js.common.dest %>',
            '<%= folders.config %>/module.suffix'
        ],
        dest: '<%= folders.distribution %>/assets/<%= pkg.name %>.min.js'
    },

    vendor_min_js: {
        src: [ '<%= files.vendor.min_js %>'],
        dest: '<%= folders.distribution %>/assets/vendors.min.js'
    },

    vendor_js: {
        src: [ '<%= files.vendor.js %>'],
        dest: '<%= folders.distribution %>/assets/vendors.min.js'
    },
    vendor_css: {
        src: [ '<%= files.vendor.css %>'],
        dest: ['<%= folders.build %>/assets/vendor.css']
    }
};