util = require('util')
assertions = require('./chai.helper.coffee')
webdriver = require('../../node_modules/protractor/node_modules/selenium-webdriver')
protractor = require('../../node_modules/protractor/lib/protractor.js')

setup = () =>
    () =>
        @driver = new webdriver.Builder().
        usingServer('http://localhost:4444/wd/hub').
        withCapabilities({
            'browserName': 'chrome',
            'version': '',
            'platform': 'ANY',
            'javascriptEnabled': true
        }).build();

        @driver.manage().timeouts().setScriptTimeout(10000);
        @ptor = protractor.wrapDriver(@driver);


cleanup = (driver) ->
    (done, driver) ->
        driver.quit().then( ->
            done()
        )

#console.log('util:', util)


# make the above settings available to test files that include this file
root = exports ? window
root.setup = setup
root.cleanup = cleanup
root.util = util
root.webdriver = webdriver
root.protractor = protractor


#console.log('cleanup:', root.cleanup)
