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
        $scope.stops = {};
        for (var i = 0; i < data.data.length; i++) {
          var routeName = data.data[i].route.title;
          if (!$scope.stops[routeName]) {
            $scope.stops[routeName] = data.data[i];
          } else {
            $scope.stops[routeName].values = $scope.stops[routeName].values.concat(data.data[i].values);
          }
        }
        console.log($scope.stops);
        console.log(data.data);
      });
    })

    RestBusService.getRoute(function(data){

    })


  });
