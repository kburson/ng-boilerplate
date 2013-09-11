/**
 * `coffeelint` does the same as `jshint`, but for CoffeeScript.
 */
module.exports = { //coffeelint
    options: {
        configFile: '<%= folders.config %>/coffeelint.json'
    },
    src: {
        nonull: true,
            expand: true,
            files: [
            {src: [ '<%= files.main %>', '<%= files.app %>']}
        ]
    },
    test: {
        nonull: true,
            expand: true,
            files: [
            {src: ['<%= files.test.unit %>']},
            {src: ['<%= files.test.e2e %>']}
        ]
    }
};

