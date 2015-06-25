angular.module('app.home', [])

.controller('HomeController', function($scope, routes) {
    $scope.routes = routes;
  });