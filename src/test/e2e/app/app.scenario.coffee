"use strict"
describe "AngularCafe", ->
    beforeEach ->
        console.log("executing app.scenario.coffee")
        browser().navigateTo "/"

    it "should navigate to /home when / is accessed", ->
        browser().navigateTo "#/"
        expect(browser().location().path()).toEqual "/home"

