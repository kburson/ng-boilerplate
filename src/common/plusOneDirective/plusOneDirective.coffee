"use strict"
angular.module("plusOne", []).directive "plusOne", ->
    link: (scope, element, attrs) ->

        #gapi.plusone.render
        console.log attrs
        element.render element[0],
            size: "medium"
            href: "http://bit.ly/ngBoilerplate"

