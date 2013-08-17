'use strict';

angular.module('AngularCafe', [
        'templates-app',
        'templates-common',
        'AngularCafe.home',
        'AngularCafe.about',
        'ngRoute', // ngMidwayTester requires $routeProvider // $route + $routeProvider are deprecated. Angular is moving towards angular-ui-router
        'ui.state',
        'ui.route'
    ])

    .config(function myAppConfig($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/home');
    })

    .run(function run(titleService) {
        titleService.setSuffix(' | AngularCafe Project Template');
    })

    .controller('AppCtrl', function ($scope) {
        $scope.features = [
            'Angular',
            'Grunt',
            'SASS',
            'TDD, because it is the only way.',
            'Full Bower Integration'
        ];
    });

