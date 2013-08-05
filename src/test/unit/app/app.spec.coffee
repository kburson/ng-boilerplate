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
