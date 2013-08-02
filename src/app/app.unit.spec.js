//'use strict';

expect = chai.expect;

describe('ngBoilerplate', function () {

    var AppCtrl, scope, location, controller;

    beforeEach(module('ngBoilerplate'));

    beforeEach(inject(function ($rootScope, $controller, $location) {
        scope = $rootScope.$new();
        location = $location;
        controller = $controller;
    }));


    describe('AppCtrl', function () {

        beforeEach(inject(function ($rootScope, $location) {
            scope = $rootScope.$new();
            location = $location;
            AppCtrl = controller('AppCtrl', {
                $scope: scope,
                $location: location
            });
        }));

        it('should have an AppCtrl', function () {
            expect(AppCtrl).toBeDefined();
        });

        it('should attach a list of features to scope', function () {
            expect(scope.features.length).toEqual(5);
        });

    });
});
