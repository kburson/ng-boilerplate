"use strict"
describe "ngBoilerplate", ->
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
        expect(module).not.toEqual null

    it "should have templates-app dependency", ->
        expect(hasModule("templates-app")).toBe true

    it "should have templates-common dependency", ->
        expect(hasModule("templates-common")).toBe true

    it "should have ngBoilerplate.home dependency", ->
        expect(hasModule("ngBoilerplate.home")).toBe true

    it "should have ui.state dependency", ->
        expect(hasModule("ui.state")).toBe true

