/**
 * express-server instance, by default listening to port 9000
 */
module.exports =  { // express
    /**
     * express server instance for unit tests.
     */
    test: {
        options: {
            port: 9200,
                hostname: 'localhost',
                bases: ['<%= folders.build %>']
        }
    },

    /**
     * express server instance for unit tests.
     */
    e2e: {
        options: {
            port: 9300,
                hostname: 'localhost',
                bases: ['<%= folders.build %>']
        }
    },

    livereload: {
        options: {
            livereload: true,
                port: 9400,
                hostname: 'localhost', // '*',  change this to '0.0.0.0' to access the server from outside
                bases: [ '<%= folders.build %>', '.' ]
        }
    },

    dist: {
        options: {
            livereload: false,
                port: 9500,
                hostname: 'localhost', // '*',  change this to '0.0.0.0' to access the server from outside
                bases: [ '<%= folders.distribution %>', '.' ]
        }
    }
};

