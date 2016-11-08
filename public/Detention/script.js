// script.js

// create the module and name it scotchApp
var mokApp = angular.module('mokApp', 
                            ['ngRoute', 'ngMaterial', 'ui.bootstrap']);



// configure our routes
mokApp.config(function($mdThemingProvider, $routeProvider, $locationProvider) {
  
    $mdThemingProvider
      .theme('default')
      .primaryPalette('indigo')
      .accentPalette('blue')
      .warnPalette('red')
      .backgroundPalette('blue-grey')
  
    $routeProvider
        // route for the home page
        .when('/', {
            templateUrl : 'pages/home.html',
            controller  : 'mainCtrl'
        })
        // route for the calendar page
        .when('/calendar', {
            templateUrl : 'pages/calendar.html',
            controller  : 'calendarCtrl'
        })
        // route for the info page
        .when('/info', {
            templateUrl : 'pages/info.html',
            controller  : 'infoCtrl'
        });

    }
);

mokApp.controller('mainCtrl', function($scope, $location) {


});



  });
 mokApp.controller('calendarCtrl', function($scope) {

});

mokApp.controller('infoCtrl', function($scope) {

});

