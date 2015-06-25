angular.module('app', [
    'ionic',
    'ui.router',
    'app.home',
    'app.details',
    'app.services',
    'angular-toArrayFilter',
    'app.auth'
  ])
  /**
   * Class that begins ionic and cordova.
   * @file
   */
  .run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  })

  .config(function($stateProvider, $urlRouterProvider) {

    // Send to home if route is not found
    $urlRouterProvider.otherwise('/routes');

    $stateProvider
      .state('app', {
        url: '',
        abstract: true,
        templateUrl: 'menu.html',
        controller: 'AppController'
      })
      .state('app.routes', {
        url: '/routes',
        views: {
          'menuContent': {
            templateUrl: 'js/busRoutes/home.html',
            controller: 'HomeController'
          }
        },
        resolve: {
          routes: function(RestBusService) {
            return RestBusService.getRoutes();
          }
        }
      })
      .state('app.details', {
        url: '/routes/:routeId',
        views: {
          'menuContent': {
            templateUrl: 'js/busRoutes/details.html',
            controller: 'DetailsController'
          }
        },
        resolve: {
          route: function($scopeParams, RestBusService) {
            return RestBusService.getRoute($stateParams.routeId).resolve('routes')
          }
        }
      })
      .state('app.login', {
        url: '/login',
        views: {
          'menuContent': {
            templateUrl: 'js/auth/login.html'
          }
        }
      })
      .state('app.signup', {
        url: '/signup',
        views: {
          'menuContent': {
            templateUrl: 'js/auth/signup.html'
          }
        }
      });
  })
  .controller('AppController', function($scope){
  })