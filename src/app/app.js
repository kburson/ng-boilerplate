'use strict';

angular.module('AngularCafe', [
        'templates-app',
        'templates-common',
        'AngularCafe.home',
        'AngularCafe.about',
        'ui.state',
        'ui.route'
    ])

    .config(function myAppConfig($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/home');
    })

    .run(function run(titleService) {
        titleService.setSuffix(' | AngularCafe');
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

