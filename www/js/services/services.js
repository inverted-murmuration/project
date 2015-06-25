/**
 * Module that contains all the services
 * @module
 */

angular.module('app.services', [
  'ngCordova'
])

.service('LocationService', function($cordovaGeolocation, $ionicPlatform, $ionicPopup) {
  /** 
   * Takes a callback whose first argument contains current location. Displays an error to the user if location cannot be found.
   * @param {func} callback - The function that recieves the lat and long
   */
  this.getCurrentLocation = function(callback) {
    var options = {
      timeout: 10000,
      enableHighAccuracy: false
    };
    // Note: cordova plugins must be wrapped in document.ready or $ionicPlatforml.ready
    $ionicPlatform.ready(function() {
      $cordovaGeolocation.getCurrentPosition(options)
        .then(function(position) {
          callback({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        }, function(err) {
          var alertPopup = $ionicPopup.alert({
            title: 'Cannot find your location',
            template: 'Could not get the current position. Either GPS signals are weak or GPS has been switched off'
          });
          alertPopup.then(function(res) {
            //handle error
            console.log(err);
          });

        });
    });
  };
})

.service('RestBusService', function($http, $q, LocationService) {
  /** 
   * Gets the stations that are closest in proximity to the user 
   * @param {object} latlon - Object with a latitude and longitude
   */
  return {
    routes: [],
    getRoutes: function() {
      var dfd = $q.defer();
      LocationService.getCurrentLocation(function(latlon){
        $http({
          url: 'http://mybus-api.herokuapp.com/locations/' + latlon.latitude + ',' + latlon.longitude + '/predictions',
          method: 'GET'
        }).success(function(data) {
          this.routes = data;
          dfd.resolve(data);
        })
      });
      return dfd.promise;
    },
    getRoute: function(routeId) {
      var dfd  = $q.defer();
      this.routes.forEach(function(route) {
        if (route.route.id === routeId) {
          dfd.resolve(routes);
        }
      });
      return dfd.promise;
    }
  }
})

.service('ReadFileService', function($http) {

  /**
  * read a specific file
  * @param {string} loc - location of file
  */
  this.readFile = function(loc) {
    return $http({
      url: loc,
      method: 'GET'
    });
  };
  
});


