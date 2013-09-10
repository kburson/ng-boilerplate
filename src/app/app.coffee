# ngMidwayTester requires $routeProvider // $route + $routeProvider are deprecated. Angular is moving towards angular-ui-router
angular.module("AngularCafe",
    [
        "templates-app",
        "templates-common",
        "AngularCafe.home",
        "AngularCafe.about",
        "ngRoute",
        "ui.state",
        "ui.route"
    ]
)
.config(($stateProvider, $urlRouterProvider) ->
    $urlRouterProvider.otherwise "/home"
)
.run(run = (titleService) ->
    titleService.setSuffix " | AngularCafe Project Template"
)
.controller "AppCtrl", ($scope) ->
    $scope.features = ["Angular", "Grunt", "LESS", "TDD, because it is the only way.", "Full Bower Integration"]
