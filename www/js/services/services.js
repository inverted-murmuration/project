angular.module('app.services', [
  'ngCordova'
  ])

  .service('LocationService', function($cordovaGeolocation, $ionicPlatform) {
    // takes a callback whose first argument contains current location
    this.getCurrentLocation = function(callback) {
      var options = {
        timeout: 10000,
        enableHighAccuracy: false
      };
      // Note: cordova plugins must be wrapped in document.ready or $ionicPlatforml.ready
      $ionicPlatform.ready(function(){
        $cordovaGeolocation.getCurrentPosition(options)
          .then(function (position) {
            callback({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            });
          }, function(err) {
            //handle error
            console.log(err);
          });
      });
    };
  })

  .service('RestBusService', function($http) {
    this.getRoute = function() {
      return $http({
        url: 'http://mybus-api.herokuapp.com/agencies/sf-muni/routes',
        // url: 'http://localhost:3000/agencies/sf-muni/routes',
        method: 'GET'
      });
    };

    this.getStops = function(latlon) {
      return $http({
        url: 'http://mybus-api.herokuapp.com/locations/' + latlon.latitude + ',' + latlon.longitude + '/predictions',
        // url: 'http://localhost:3000/locations/' + latlon.latitude + ',' + latlon.longitude + '/predictions',
        method: 'GET'
      });
    };
  });
