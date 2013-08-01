"use strict"
describe "ngBoilerplate.home", ->
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
        expect(module).not.toEqual null

    it "should have templates-app dependency", ->
        expect(hasModule("templates-app")).toBe true

    it "should have templates-common dependency", ->
        expect(hasModule("templates-common")).toBe true

    it "should have ui.state dependency", ->
        expect(hasModule("ui.state")).toBe true

    it "should have titleService dependency", ->
        expect(hasModule("titleService")).toBe true

