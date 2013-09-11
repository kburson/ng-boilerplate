/**
 * `recess` handles our LESS compilation and uglification automatically.
 * Only our `main.less` file is included in compilation; all other files
 * must be imported from this file.
 * Default configuration values;
 * compile: false              // Compiles CSS or LESS. Fixes white space and sort order.
 * compress: false             // Compress your compiled code
 * noIDs: true                 // Doesn't complain about using IDs in your stylesheets
 * noJSPrefix: true            // Doesn't complain about styling .js- prefixed classnames
 * noOverqualifying: true      // Doesn't complain about overqualified selectors (ie: div#foo.bar)
 * noUnderscores: true         // Doesn't complain about using underscores in your class names
 * noUniversalSelectors: true  // Doesn't complain about using the universal * selector
 * prefixWhitespace: true      // Adds whitespace prefix to line up vender prefixed properties
 * strictPropertyOrder: true   // Complains if not strict property order
 * zeroUnits: true             // Doesn't complain if you add units to values of 0
 */

module.exports = { // recess
    build: {
        src: [ '<%= folders.styles %>/main.less', '<%= files.vendor.css %>'],
        dest: '<%= folders.build %>/assets/css/<%= pkg.name %>.css',
        options: {
            compile: true,
            compress: false,
            noUnderscores: false,
            noIDs: false,
            zeroUnits: false
        }
    },
    dist: {
        src: ['<%= recess.build.dest %>' ],
        dest: '<%= recess.build.dest %>',
        options: {
            compress: true
        }
    }
};

