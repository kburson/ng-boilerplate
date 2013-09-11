module.exports = { // selenium
    options: {
        before: function () {
            console.log(' ---------- Start Selenium Server ---------- ');
            grunt.task.run('shell:start_selenium');
        },
        delay: 10000,
        after: function () {
            console.log(' ---------- Selenium Server Started ---------- ');
        }
    }
};