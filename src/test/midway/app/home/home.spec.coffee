
should = chai.should()
expect = chai.expect
assert = chai.assert

describe "AngularCafe.home (midway)", ->

    moduleName = "AngularCafe.home"

    module = undefined
    tester = undefined

    before ->
        console.log("\nExecuting Test: home.spec.coffee")

    beforeEach ->
        tester = ngMidwayTester(moduleName)
        tester.attach

        module = angular.module(moduleName)

    afterEach ->
        tester.destroy()
        tester = null


    it "should be registered", ->
        expect(module).is.not.null

