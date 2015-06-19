angular.module('app.home', [])

  .controller('HomeController', function($scope, LocationService) {

    //on load get the user's current location
    LocationService.getCurrentLocation(function(currentLocation) {
      $scope.loc = currentLocation;
    });

    $scope.routes = [
      {
        name: "J"
      },
      {
        name: "38"
      },
      {
        name: "N"
      }
    ]

  })
  .controller('RestBusController', function($scope, LocationService, RestBusService) {
    LocationService.getCurrentLocation(function(currentLocation) {
      $scope.loc = currentLocation;
      console.log($scope.loc);

      RestBusService.getStops($scope.loc)
      .then(function(data) {
        $scope.stops = data;
        console.log(data);
      });
    })

    RestBusService.getRoute(function(data){

      console.log(data.data);
    })


  });
