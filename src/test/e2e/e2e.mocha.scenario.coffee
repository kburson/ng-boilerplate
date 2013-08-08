###
This example shows how to use the protractor library in a Mocha test.
It assumes that a selenium server is running at localhost:4444.
Run this test with:
mocha onMocha.js
###
#util = require("util")
#chai = require("chai")
#should = chai.should()
#expect = chai.expect
#assert = chai.assert
#webdriver = require("../../../node_modules/protractor/node_modules/selenium-webdriver")
#protractor = require("../../../node_modules/protractor/lib/protractor.js")

base = require('../functionalTestBase.coffee')


describe "angularjs.org homepage", ->
    base.util._extend(@, base)

    @timeout 80000
    driver = undefined
    ptor = undefined

    before ( () =>
        @setup()
        #TODO this just overwrites the reference... we still need a _.extend or similar...
        driver = @driver
        ptor = @ptor
    )

    after( @cleanup(driver) )

    it "should greet using binding", (done) ->
        ptor.get "http://www.angularjs.org"
        ptor.findElement(protractor.By.input("yourName")).sendKeys "Rally"

        ptor.findElement(protractor.By.binding("{{yourName}}")).getText().then (text) ->

            text.should.be.a 'string'
            text.should.have.length 12
            text.should.equal "Hello Rally!"
            text.should.eql "Hello Rally!"

            expect(text).to.be.a 'string'
            expect(text).to.have.length 12
            expect(text).to.equal "Hello Rally!"
            expect(text).to.eql "Hello Rally!"

            assert.typeOf(text, 'string', 'not a string')
            assert.lengthOf(text, 12, "wrong length")
            assert.equal(text, "Hello Rally!", "error message")
            assert.strictEqual(text, "Hello Rally!", "error message")

            done()


    it "should list todos", (done) ->
        ptor.get "http://www.angularjs.org"
        todo = ptor.findElement(protractor.By.repeater("todo in todos").row(2))

        todo.getText().then (text) ->
            expect(text).to.eql "build an angular app"
            done()

    # Uncomment to see a failure
    it "should greet using binding - this one fails", (done) ->
        ptor.get "http://www.angularjs.org"
        ptor.findElement(protractor.By.input("yourName")).sendKeys "Julie"
        ptor.findElement(protractor.By.binding("Hello {{yourName}}!")).getText().then (text) ->
            expect(text).to.eql "Hello Jack"
            done()

