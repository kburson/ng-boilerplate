module.exports = { // useMin
    html: ['<%= folders.distribution %>/{,**/}*.html'],
    css: ['<%= folders.distribution %>/styles/{,**/}*.css'],
    options: {
        dirs: ['<%= folders.distribution %>']
    }
};