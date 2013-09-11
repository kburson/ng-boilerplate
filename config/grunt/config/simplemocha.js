/*
 this.grep(options.grep);
 this.suite = new exports.Suite('', new exports.Context);
 this.ui(options.ui);
 this.bail(options.bail);
 this.reporter(options.reporter);
 if (options.timeout) this.timeout(options.timeout);
 if (options.slow) this.slow(options.slow);
 */
module.exports = { // simplemocha
    options: {
        //grep: '*-test',   // string or regexp to filter tests with
        ui: 'bdd',  // name "bdd", "tdd", "exports" etc
            //bail: true, // bail on the first test failure, default = true
            reporter: 'spec',//'tap',  // reporter instance, defaults to `mocha.reporters.Dot`
            timeout: 3000,   // timeout in milliseconds
            slow: 30000, // milliseconds to wait before considering a test slow

            // invert: true,
            ignoreLeaks: false,  // ignore global leaks
            //growl: false,
            globals: ['should', 'expect', 'assert'],
            //asyncOnly: true

            compiler: 'coffee-script'
    },

    e2e: {
        src: ['src/test/e2e/**/*.mocha.coffee']
    }
};