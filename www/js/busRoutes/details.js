angular.module('app.details', [])

    //.controller('DetailsController', function($scope, $ionicHistory, $location, LocationService, RestBusService, ReadFileService, $stateParams) {
    .controller('DetailsController', function($scope, route) {
      console.log(route);
      $scope.route = route;

    //var init = function() {
    //  $scope.routeDetails = PageChangeService.currentRoute;
    //  $scope.getLocation(function(currentLocation) {
    //    $scope.loc = currentLocation;
    //    // load map
    //    // var sanFran = {lat: 37.78, lng: -122.416}
    //    $scope.mapOptions = {center: {lat: $scope.loc.latitude, lng: $scope.loc.longitude}, zoom: 17};
    //    $scope.map = new google.maps.Map(document.getElementById('mapContainer'), $scope.mapOptions);
    //
    //    $scope.getStops()
    //    .then(function() {
    //      $scope.getStopLocation()
    //      .then(function() {
    //        $scope.renderMapMarkers();
    //      });
    //    })
    //  });
    //};
    //
    //$scope.getLocation = function(callback) {
    //  LocationService.getCurrentLocation(callback);
    //};
    //
    //$scope.getStops = function() {
    //   return RestBusService.getStops($scope.loc)
    //  .then(function() {
    //    $scope.routeInfo = PageChangeService.currentRoute;
    //    $scope.stations = {};
    //  });
    //}
    //
    //$scope.getStopLocation = function() {
    //  // get list of stations
    //  return ReadFileService.readFile('../stops.json')
    //  .then(function(data) {
    //    $scope.stations = data.data;
    //  });
    //};
    //
    //$scope.renderMapMarkers = function() {
    //  // mark user location
    //  var userMarker = new google.maps.Marker({
    //    position: new google.maps.LatLng($scope.loc.latitude, $scope.loc.longitude),
    //    map: $scope.map,
    //    title: 'user',
    //    icon: './img/user.png'
    //  });
    //
    //  var currentStation = $scope.stations[$scope.routeDetails.stop.id];
    //  // mark station
    //  var stationMarker = new google.maps.Marker({
    //    position: new google.maps.LatLng(currentStation.lat, currentStation.lon),
    //    map: $scope.map,
    //    title: 'station'
    //  });
    //};
    //
    //init();

  });
