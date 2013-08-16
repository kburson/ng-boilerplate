"use strict"

util = require("util")
chai = require("chai")
expect = chai.expect
webdriver = require("protractor/node_modules/selenium-webdriver")
protractor = require("protractor/lib/protractor.js")

# global element:true
describe "ngBoilerplate.home", ->

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
        ptor.get "http://localhost:9300/#/home"

    it "should should have a section element", (done) ->
        #expect(element("body").html()).toContain "section"
        ptor.findElement(protractor.By.tagName('body')).getAttribute("innerHTML").then (html) ->
            expect(html).to.contain("section");
            done()


    it "should have a welcome headline", (done) ->
        #expect(element("body").html()).toContain "h1"
        ptor.findElement(protractor.By.tagName('body')).getAttribute("innerHTML").then (html) ->
            expect(html).to.contain("h1");
            done()

    it "should have a list", (done) ->
        #expect(element("body").html()).toContain "ul"
        ptor.findElement(protractor.By.tagName('body')).getAttribute("innerHTML").then (html) ->
            expect(html).to.contain("ul");
            done()
