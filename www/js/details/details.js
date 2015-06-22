angular.module('app.details', [])

  .controller('DetailsController', function($scope, LocationService, RestBusService) {
    LocationService.getCurrentLocation(function(currentLocation) {
      $scope.loc = currentLocation;

      RestBusService.getStops($scope.loc)
      .then(function(data) {
        $scope.routeDetails = data.data[0];
      });
    });
  });
