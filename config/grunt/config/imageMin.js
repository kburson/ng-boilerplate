module.exports = { // imageMin
    release: {
        files: [
            {
                expand: true,
                cwd: '<%= folders.app %>/images',
                src: '{,**/}*.{png,jpg,jpeg}',
                dest: '<%= folders.distribution %>/images'
            }
        ]
    }
};
