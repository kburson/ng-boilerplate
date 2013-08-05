"use strict"

expect = chai.expect
should = chai.should()
assert = chai.assert

###
Tests sit right alongside the file they are testing, which is more intuitive
and portable than separating `src` and `test` directories. Additionally, the
build process will exclude all `.spec.js` files from the build
automatically.
###
describe "ngBoilerplate.home", ->
    HomeCtrl = undefined
    scope = undefined
    beforeEach module("ngBoilerplate.home")
    beforeEach inject(($rootScope, $controller) ->
        scope = $rootScope.$new()
        HomeCtrl = $controller("HomeCtrl",
            $scope: scope
        )
    )
    it "should have a HomeCtrl", ->
        expect(HomeCtrl).is.defined

    it "should be true", ->
        true.should.be.ok