"use strict"

util = require("util")
chai = require("chai")
expect = chai.expect
webdriver = require("protractor/node_modules/selenium-webdriver")
protractor = require("protractor/lib/protractor.js")

describe "AngularCafe", ->
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

    beforeEach ->
        ptor.get "http://localhost:9300/"


    it "should navigate to /home when / is accessed", (done) ->
        features = ptor.findElement(protractor.By.repeater('feature in features').row(1))
        features.getText().then (text) ->
            expect(text).to.eql("Angular")
            done()

