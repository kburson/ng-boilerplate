"use strict"
describe "titleService", ->
    module = undefined
    deps = undefined
    tester = undefined
    beforeEach ->
        tester = new ngMidwayTester()
        tester.register "titleService"
        module = angular.module("titleService")
        deps = module.value("titleService").requires

    it "should be registered", ->
        expect(module).not.toEqual null

