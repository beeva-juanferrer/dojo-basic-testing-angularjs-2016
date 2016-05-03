'use strict';

angular
    .module('users', ['ngRoute'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/users', {
            templateUrl: 'users/users.html'
        });
    }]);