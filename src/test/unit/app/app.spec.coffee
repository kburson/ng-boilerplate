'use strict'

should = chai.should()
expect = chai.expect
assert = chai.assert

once = (fn) ->
    returnValue = undefined
    called = false
    ->
        unless called
            called = true
            returnValue = fn.apply(this, arguments)
        returnValue

describe 'ngBoilerplate', ->


    AppCtrl = undefined
    scope = undefined
    location = undefined
    controller = undefined
    beforeEach module("ngBoilerplate")
    beforeEach inject(($rootScope, $controller, $location) ->
        scope = $rootScope.$new()
        location = $location
        controller = $controller
    )
    describe "AppCtrl", ->
        beforeEach inject(($rootScope, $location) ->
            scope = $rootScope.$new()
            location = $location
            AppCtrl = controller("AppCtrl",
                $scope: scope
                $location: location
            )
        )
        it "should have an AppCtrl", ->
            expect(AppCtrl).to.not.be.undefined

        it "should attach a list of features to scope", ->
            expect(scope.features.length).to.equal 5

    describe "sinon", ->
        it "should stub function", ->
            callback = sinon.stub().returns(42)
            proxy = once(callback)
            expect(proxy()).to.equal 42

        it "spies on things, like, the NSA", ->
            callback = sinon.spy()
            proxy = once(callback)
            proxy()
            expect(callback.called).is.true

