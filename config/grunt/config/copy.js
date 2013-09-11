/**
 * The `copy` task just copies files from A to B. We use it here to copy
 * our project assets (images, fonts, etc.) and javascripts into
 * `folders.build`, and then to copy the assets to `folders.compile`.
 */
module.exports = { // copy

    build_assets: {
        files: [
            {
                src: ['**', '!README.md', '!favicon.ico'],
                dest: '<%= folders.build %>/assets/',
                cwd: '<%= folders.assets %>',
                expand: true
            },
            {
                src: [ 'favicon.ico' ],
                dest: '<%= folders.build %>',
                cwd: '<%= folders.assets %>',
                expand: true
            }
        ]
    },

    build_vendorjs: {
        files: [
            {
                src: [ '<%= files.vendor.js %>' ],
                dest: '<%= folders.build %>/',
                cwd: '.',
                expand: true
            }
        ]
    },

    build_vendor_assets: {
        files: [
            {
                src: ['<%= files.vendor.img %>'],
                dest: '<%= folders.build %>/assets/img/',
                cwd: '.',
                flatten: true,
                expand: true
            },
            {
                src: ['<%= files.vendor.font %>'],
                dest: '<%= folders.build %>/assets/font/',
                cwd: '.',
                flatten: true,
                expand: true
            },
            {
                src: ['<%= files.vendor.css %>'],
                dest: '<%= folders.build %>/assets/',
                cwd: '.',
                expand: true
            }
        ]
    },
    runtime_configuration: {
        files: [
            {
                src: ['runtime.json'],
                dest: '<%= folders.build %>/',
                cwd: '<%=folders.src %>',
                expand: true
            }
        ]
    },

    dist_assets: {
        files: [
            {
                src: [ '**' ],
                dest: '<%= folders.distribution %>/assets',
                cwd: '<%= folders.build %>/assets',
                expand: true
            },
            {
                src: [ 'favicon.ico' ],
                dest: '<%= folders.distribution %>',
                cwd: '<%= folders.assets %>',
                expand: true
            }
        ]
    }
};