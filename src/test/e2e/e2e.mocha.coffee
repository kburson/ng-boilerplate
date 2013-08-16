###
This example shows how to use the protractor library in a Mocha test.
It assumes that a selenium server is running at localhost:4444.
Run this test with:

   node_modules/mocha/bin/mocha --reporter spec --compilers coffee:coffee-script src/test/e2e/e2e.mocha.coffee

    or use grunt-simple-mocha

###
util = require("util")
chai = require("chai")
expect = chai.expect
webdriver = require("protractor/node_modules/selenium-webdriver")
protractor = require("protractor/lib/protractor.js")

describe "angularjs.org homepage", ->
    @timeout 80000
    driver = undefined
    ptor = undefined
    before ->
        driver = new webdriver.Builder().usingServer("http://localhost:4444/wd/hub").withCapabilities(
            browserName: "chrome"
            version: ""
            platform: "ANY"
            javascriptEnabled: true
        ).build()
        driver.manage().timeouts().setScriptTimeout 10000
        ptor = protractor.wrapDriver(driver)

    after (done) ->
        driver.quit().then ->
            done()


    it "should greet using binding", (done) ->
        ptor.get "http://www.angularjs.org"
        ptor.findElement(protractor.By.input("yourName")).sendKeys "Julie"
        ptor.findElement(protractor.By.binding("{{yourName}}")).getText().then (text) ->
            expect(text).to.eql "Hello Julie!"
            done()


    it "should list todos", (done) ->
        ptor.get "http://www.angularjs.org"
        todo = ptor.findElement(protractor.By.repeater("todo in todos").row(2))
        todo.getText().then (text) ->
            expect(text).to.eql "build an angular app"
            done()




# Uncomment to see failures.

# it('should greet using binding - this one fails', function(done) {
#   ptor.get('http://www.angularjs.org');

#   ptor.findElement(protractor.By.input("yourName")).sendKeys("Julie");

#   ptor.findElement(protractor.By.binding("Hello {{yourName}}!")).
#       getText().then(function(text) {
#         expect(text).to.eql('Hello Jack');
#         done();
#       });
# });