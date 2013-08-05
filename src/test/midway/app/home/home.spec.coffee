
should = chai.should()
expect = chai.expect
assert = chai.assert

describe "ngBoilerplate.home (midway)", ->

    module = undefined
    deps = undefined
    tester = undefined
    hasModule = (m) ->
        deps.indexOf(m) >= 0

    beforeEach ->
        tester = new ngMidwayTester()
        tester.register "ngBoilerplate.home"
        module = angular.module("ngBoilerplate.home")
        deps = module.value("ngBoilerplate.home").requires

    it "should be registered", ->
        expect(module).is.not.null

    it "should have templates-app dependency", ->
        expect(hasModule("templates-app")).is.true

    it "should have templates-common dependency", ->
        expect(hasModule("templates-common")).is.true

    it "should have ui.state dependency", ->
        expect(hasModule("ui.state")).is.true

    it "should have titleService dependency", ->
        expect(hasModule("titleService")).is.true

    it "should be true", ->
        true.should.be.ok
