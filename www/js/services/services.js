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
            console.log(err)
          });
      });
    }
  });
