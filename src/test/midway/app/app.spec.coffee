
should = chai.should()
expect = chai.expect
assert = chai.assert

describe "AngularCafe", ->
    deps = undefined
    hasModule = undefined
    module = undefined
    tester = undefined
    module = undefined
    deps = undefined
    tester = undefined

    hasModule = (m) ->
        deps.indexOf(m) >= 0

    before ->
        console.log("\nExecuting Test: app.spec.coffee");

    before ->
        tester = new ngMidwayTester()
        tester.register "AngularCafe"

        module = angular.module("AngularCafe")
        deps = module.value("AngularCafe").requires
        console.log("\nTest data loaded:", deps);

    it "should be registered", ->
        expect(module).is.not.null

    it "should have templates-app dependency", ->
        expect(hasModule("templates-app")).is.true

    it "should have templates-common dependency", ->
        expect(hasModule("templates-common")).is.true

    it "should have AngularCafe.home dependency", ->
        expect(hasModule("AngularCafe.home")).is.true

    it "should have ui.state dependency", ->
        expect(hasModule("ui.state")).is.true

