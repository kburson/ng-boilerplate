angular.module("AngularCafe.about", [
        "ui.state",
        "placeholders",
        "ui.bootstrap",
        "titleService"
    ]
)
.config(config = ($stateProvider) ->
    $stateProvider.state "about",
        url: "/about"
        views:
            main:
                controller: "AboutCtrl"
                templateUrl: "about/about.tpl.html"

)
.controller "AboutCtrl", AboutCtrl = ($scope, titleService) ->
    titleService.setTitle "What is It?"

# This is simple a demo for UI Boostrap.
$scope.dropdownDemoItems = [
    "The first choice!",
    "And another choice for you.",
    "but wait! A third!"
]
