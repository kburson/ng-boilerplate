"use strict"

# global element:true
describe "ngBoilerplate.home", ->
    beforeEach ->
        browser().navigateTo "/"

    it "should have a location path /home", ->
        browser().navigateTo "#/home"
        expect(browser().location().path()).toEqual "/home"

    it "should should have a section element", ->
        browser().navigateTo "#/home"
        expect(element("body").html()).toContain "section"

    it "should have a welcome headline", ->
        browser().navigateTo "#/home"
        expect(element("body").html()).toContain "h1"

    it "should have a list", ->
        browser().navigateTo "#/home"
        expect(element("body").html()).toContain "ul"