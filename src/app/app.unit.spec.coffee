should = chai.should()
expect = chai.expect
assert = chai.assert

describe "ngBoilerplate", ->
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
            expect(AppCtrl).to.be.defined
            AppCtrl.should.be.defined
            assert.isDefined(AppCtrl,"fail message")

        it "should attach a list of features to scope", ->
            expect(scope.features.length).to.equal 5
            scope.features.length.should.equal 5
            assert.equal(scope.features.length,5,"fail message")


