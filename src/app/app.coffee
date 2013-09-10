# ngMidwayTester requires $routeProvider // $route + $routeProvider are deprecated. Angular is moving towards angular-ui-router
angular.module("AngularCafe",["ngRoute", "ui.router", "templates-app", "templates-common", "AngularCafe.home", "AngularCafe.about", "titleService", "plusOne"])
.config(($stateProvider, $urlRouterProvider) ->
    $urlRouterProvider.otherwise "/home"
)
.run((titleService) ->
    titleService.setSuffix " | AngularCafe Project Template"
)
.controller "AppCtrl", ($scope) ->
    $scope.features = ["Angular", "Grunt", "LESS", "TDD, because it is the only way.", "Full Bower Integration"]
