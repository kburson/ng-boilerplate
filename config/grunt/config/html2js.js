/**
 * HTML2JS is a Grunt plugin that takes all of your template files and
 * places them into JavaScript files as strings that are added to
 * AngularJS's template cache. This means that the templates too become
 * part of the initial payload as one JavaScript file. Neat!
 */
module.exports = { //html2js
    /**
     * These are the templates from `src/app`.
     */
    app: {
        options: {
            base: 'src/app'
        },
        src: [ '<%= files.templates.app %>' ],
        dest: '<%= folders.build %>/templates-app.js'
    },

    /**
     * These are the templates from `src/common`.
     */
    common: {
        options: {
            base: 'src/common'
        },
        src: ['<%= files.templates.common %>'],
        dest: '<%= folders.build %>/templates-common.js'
    }
};
