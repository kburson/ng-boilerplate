/**
 * `jshint` defines the rules of our linter as well as which files we
 * should check. This file, all javascript sources, and all our tests
 * are linted based on the policies listed in `options`. But we can also
 * specify exclusionary patterns by prefixing them with an exclamation
 * point (!); this is useful when code comes from a third party but is
 * nonetheless inside `src/`.
 */
module.exports = { // jshint

    options: {
        jshintrc: '<%= folders.config %>/jshint.json'
    },

    gruntfile: {
        files: {
            src: ['Gruntfile.js']
        }
    },

    buildconf: {
        files: {
            src: ['<%= folders.config %>/build.config.js']
        }
    }
};
