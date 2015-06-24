angular.module('app', [
    'ionic',
    'ui.router',
    'app.home',
    'app.details',
    'app.services',
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
    $urlRouterProvider.otherwise('/routes.index');

    $stateProvider
      .state('routes', {
        abstract: true,
        url: '/routes',
        views: {
          routes: {
            template: '<div></div>'
          }
        }
      })
      .state('routes.index', {
        url: '',
        templateUrl: 'js/home/home.html',
        controller: 'HomeController'
      })
      .state('routes.details', {
        url: '/:route',
        templateUrl: 'js/details/details.html',
        controller: 'DetailsController'
      })
      .state('login', {
        url: '/login',
        views: {
          login: {
            templateUrl: 'js/auth/login.html'
          }
        }
      })
      .state('signup', {
        url: '/signup',
        views: {
          signup: {
            templateUrl: 'js/auth/signup.html'
          }
        }
      });
  });