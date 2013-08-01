"use strict"
describe "ngBoilerplate", ->
    beforeEach ->
        browser().navigateTo "/"

    it "should navigate to /home when / is accessed", ->
        browser().navigateTo "#/"
        expect(browser().location().path()).toEqual "/home"

