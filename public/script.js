// Create the module and name it devGuideApp
var wbotApp = angular.module('waterBot',[ 'ngRoute', 'ngMaterial',
												'ngMessages','ng-mfb',
												'material.svgAssetsCache']);


var studentid;

// configure our routes
wbotApp.config(function($routeProvider, $locationProvider ){

	$routeProvider
	// route for the home page
	.when('/', {
			templateUrl : 'pages/main.html',
			controller  : 'mainController',
			resolve:
			{
			}
	})
	// route for the login page
	.when('/login', {
			templateUrl : 'pages/login.html',
			controller  : 'loginCtrl',
			resolve:
			{

			}
	});

	
});



wbotApp.controller('navController' ,[ '$scope', '$rootScope', '$window', '$mdDialog', '$location', '$http',
					function($scope, $rootScope, $window, $mdDialog, $location, $http) {


   // Navigate function 
	$scope.goTo = function(path) {
		$scope.pageButtonsState = 'closed';
		$scope.userButtonsState = 'closed';

		if(path == "logout")
		{
			$http.post('/logout');
			$rootScope.logged = false;
			
			$location.path('/');
		}
		else
		{
			$location.path( path );
		}
	 };


   // Right navigation menu, main navbar.
	$scope.navIconStyle =
	[
		{
         "margin-bottom" : "0px",
         'background-color': '#E40A5D'
      },
		{
         "margin-bottom" : "5px",
         'background-color': '#E40A5D'
      }
	] 

	$scope.pageButtons = 
	[
		/* Disable sign in 
		{
			path: "signIn",
			icon: "ion-person",
			label: "Account"
		}, */
		{
			path: "blog",
			icon:  "ion-calendar", //"img/icons/news.svg", //
			label: "News"
		},
		{
			path: "schedule",
			icon:  "ion-clock", //"img/icons/schedule.svg", // 
			label: "Schedule"
		},
		{
			path: "",
			icon: "ion-information", // "img/icons/information.svg", //
			label: "Home"
		}
	]

      // Left navigation menu, user navbar.
   $scope.userNavIconStyle =
	[
		{
         "margin-bottom" : "0px",
         'background-color': 'rgb(255,87,34)'
      },
		{
         "margin-bottom" : "5px",
         'background-color': 'rgb(255,87,34)',
			'aria-hidden' : 'false'
      }
	] 
	this.userNavOpen = false;
   $scope.userButtons = 
	[
		{
			path: "login",
			icon:  "ion-edit",//"img/icons/signin.svg",
			label: "Log In"
		},
   ]

	$scope.userLoggedButtons = 
	[
		{
			path: 'notebook',
			icon: 'ion-ios-book',
			label: 'Notebook'
		},
		{
			path: "profile",
			icon: "ion-person",
			label:"Profile"
		},
		{
			path: "logout",
			icon: "ion-arrow-right-c",
			label:"Log Out"
		},
   ]

}]);


wbotApp.controller('loginCtrl',[ '$scope', '$rootScope', '$http', '$window', function($scope, $rootScope, $http, $window){


}]);
wbotApp.controller('profileCtrl',[ '$scope', '$rootScope', '$http', '$window', function($scope, $rootScope, $http, $window){



}]);


wbotApp.controller('mainController',[ '$scope', '$rootScope', '$http', '$window', 
	function($scope, $rootScope, $http, $window, loggedService){

	
}]).config(function($mdThemingProvider) {
    // Configure a dark theme with primary foreground yellow
    $mdThemingProvider.theme('docs-dark', 'default')
      .primaryPalette('yellow')
      .dark();
 });;


