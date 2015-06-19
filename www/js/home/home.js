angular.module('app.home', [])

  .controller('HomeController', function($scope, LocationService) {

    //on load get the user's current location
    LocationService.getCurrentLocation(function(currentLocation) {
      $scope.loc = currentLocation;
    });

  })
