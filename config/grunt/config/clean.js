/**
 * The directories to delete when `grunt clean` is executed.
 */
module.exports = { // clean
    options: { force: true },
    build: ['<%= folders.build %>'],
    dist: ['<%= folders.distribution %>'],
    reports: ['./*-test-results.xml']
};