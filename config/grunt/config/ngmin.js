/**
 * `ng-min` annotates the sources before minifying.
 * That is, it allows us to code without the angular injection array syntax.
 */
module.exports =  { // ngMin
    dist: {
        files: [
            {
                src: [ 'assets/*.min.js' ],
                cwd: '<%= folders.distribution %>', // concatentated js files
                dest: '<%= folders.distribution %>',
                expand: true
            }
        ]
    }
};