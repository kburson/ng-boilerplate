
/**
 * `grunt coffee` compiles the CoffeeScript sources. To work well with the
 * rest of the build, we have a separate compilation task for sources and
 * specs so they can go to different places. For example, we need the
 * sources to live with the rest of the copied JavaScript so we can include
 * it in the final build, but we don't want to include our specs there.
 */
module.exports =  { // coffee
    app: {
        options: {
            bare: true,
                sourceMap: true
        },
        expand: true,
            cwd: '.',
            src: [ '<%= files.app %>', '<%= files.main %>'],
            dest: '<%= folders.build %>',
            ext: '.js'
    }
};