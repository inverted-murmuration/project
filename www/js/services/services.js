/**
 * Module that contains all the services
 * @module
 */

angular.module('app.services', [
  'ngCordova'
])

.service('LocationService', function($cordovaGeolocation, $ionicPlatform, $ionicPopup, MapService) {
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
          console.log(err);
          /* TODO Handle GPS off error
          var alertPopup = $ionicPopup.alert({
            title: 'Cannot find your location',
            template: 'Could not get the current position. Either GPS signals are weak or GPS has been switched off'
          });
          alertPopup.then(function(res) {
            //handle error
          });
          */

        });
    });
  };

  // display user on map
  this.displayUser = function(map, loc, image, interval) {
    var userMarker = MapService.createMarker(map, loc, image);
  };

})

.service('RestBusService', function($http, $q, $ionicLoading, LocationService, ReadFileService, MapService) {
  /** 
   * Gets the stations that are closest in proximity to the user 
   * @param {object} latlon - Object with a latitude and longitude
   */
  var routes = [];
  this.getRoutes = function() {
    var dfd = $q.defer();
    LocationService.getCurrentLocation(function(latlon) {
      $http({
        url: 'http://mybus-api.herokuapp.com/locations/' + latlon.latitude + ',' + latlon.longitude + '/predictions',
        method: 'GET'
      }).success(function(data) {
        routes = data;
        dfd.resolve(data);
      });
    });
    return dfd.promise;
  };

  this.getRoute = function(routeId) {
    var dfd = $q.defer();
    routes.forEach(function(route) {
      if (route.route.id === routeId) {
        dfd.resolve(route);
      }
    });
    return dfd.promise;
  };

  this.getStationLocation = function(map, route) {

    ReadFileService.readFile('../stops.json')
      .then(function(data) {
        var station = data.data[route.stop.id];
        var loc = {
          latitude: station.lat,
          longitude: station.lon
        };
        MapService.createMarker(map, loc);
      });

  };

})

.service('VehiclesService', function($http) {

  // get list of vehicles with api
  this.getVehicles = function() {
    return $http({
      url: 'http://mybus-api.herokuapp.com/agencies/sf-muni/vehicles',
      method: 'GET'
    });
  };

  // put vehicle on map
  this.displayVehicle = function(map, loc, image) {
    return new google.maps.Marker({
      position: new google.maps.LatLng(loc.latitude, loc.longitude),
      map: map,
      icon: image
    });
  };

  // create vehicles and display them on map
  this.displayVehicles = function(map, route, image, interval) {
    var displayVehicle = this.displayVehicle;
    var vehicleMarkers = {};

    //put vehicles on map
    this.getVehicles()
      .then(function(data) {
        var vehicles = data.data;
        var routeId = route.route.id;

        for (var i = 0, len = vehicles.length; i < len; i++) {
          if (vehicles[i].routeId === routeId) {
            var loc = {
              latitude: vehicles[i].lat,
              longitude: vehicles[i].lon
            };
            vehicleMarkers[vehicles[i].id] = displayVehicle(map, loc, image);
          }
        }

      });
  };

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

})

.service('MapService', function() {

  // create a map
  this.createMap = function(loc) {
    // var sanFran = {lat: 37.78, lng: -122.416}
    var mapOptions = {
      center: {
        lat: loc.latitude,
        lng: loc.longitude
      },
      zoom: 17
    };
    return new google.maps.Map(document.getElementById('mapContainer'), mapOptions);
  };

  // create a map marker
  this.createMarker = function(map, loc, image) {
    return new google.maps.Marker({
      position: new google.maps.LatLng(loc.latitude, loc.longitude),
      map: map,
      icon: image
    });
  };

});