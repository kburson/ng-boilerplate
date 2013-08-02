
should = chai.should()
expect = chai.expect
assert = chai.assert

describe "ngBoilerplate", ->
    deps = undefined
    hasModule = undefined
    module = undefined
    tester = undefined
    module = undefined
    deps = undefined
    tester = undefined

    hasModule = (m) ->
        deps.indexOf(m) >= 0

    beforeEach ->
        tester = new ngMidwayTester()
        tester.register "ngBoilerplate"
        module = angular.module("ngBoilerplate")
        deps = module.value("ngBoilerplate").requires

    it "should be registered", ->
        expect(module).is.not.null

    it "should have templates-app dependency", ->
        expect(hasModule("templates-app")).is.true

    it "should have templates-common dependency", ->
        expect(hasModule("templates-common")).is.true

    it "should have ngBoilerplate.home dependency", ->
        expect(hasModule("ngBoilerplate.home")).is.true

    it "should have ui.state dependency", ->
        expect(hasModule("ui.state")).is.true

