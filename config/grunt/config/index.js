/**
 * The `index` task compiles the `index.html` file as a Grunt template. CSS
 * and JS files co-exist here but they get split apart later.
 * With this method you specify your application sources in the build.config.js file.
 * These identified (minimatch/glob) source files are inserted into script tags in
 * the index.html file.  The css files are inserted into style tags in the index.html.
 *
 * Another option is to use the usemin task.  With usemin you identify specific resources
 * manually in the index.html, but you can wrap specific groups of scripts and css files
 * in html comment directives to identify which groups to concatenate for the final product.
 * When compile the distribution source these groups are compressed into single files and the
 * script tags are replaced with references to the single files.
 *
 * You will still need to identify the folders and source patterns in the build.config.js
 * for the rest of the build system to manage.  grunt-usemin provides more flexability
 * in how you package your sources, but you are required to maange the individual script/css
 * tag inclusions in the main app index.html files.
 */
module.exports = { // index

    /**
     * During development, we don't want to have wait for compilation,
     * concatenation, minification, etc. So to avoid these steps, we simply
     * add all script files directly to the `<head>` of `index.html`. The
     * `src` property contains the list of included files.
     */
    build: {
        dest: '<%= folders.build %>',
        src: [
            '<%= files.vendor.js %>',
            '<%= folders.build %>/src/app/app.js',
            '<%= folders.build %>/src/app/*/**/*.js',
            '<%= folders.build %>/src/common/**/*.js',
            '<%= html2js.common.dest %>', // not needed, already included with build/src/**/*.js
            '<%= html2js.app.dest %>',    // ditto
            '<%= files.vendor.css %>',      // any included library js files
            '<%= recess.build.dest %>'      // compiled/concatenated app css files
        ]
    },

    /**
     * When it is time to have a completely compiled application, we can
     * alter the above to include only a single JavaScript and a single CSS
     * file. Now we're back!
     */
    dist: {
        dest: '<%= folders.distribution %>',
        src: [
            '<%= concat.vendor_js.dest %>',
            '<%= concat.compiled_app_js.dest %>',
            '<%= recess.dist.dest %>'
        ]
    }
};

