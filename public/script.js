// Create the module and name it devGuideApp
var wbotApp = angular.module('waterBot',[ 'ngRoute', 'ngMaterial',
												'ngMessages','ng-mfb',
												'material.svgAssetsCache']);

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
   // Right navigation menu, main navbar.
	$scope.navIconStyle =
	[
		{"margin-bottom" : "0px", 'background-color': '#E40A5D'},
		{"margin-bottom" : "5px", 'background-color': '#E40A5D'}
	] 

	$scope.pageButtons = 
	[
		{  path: "blog", icon:  "ion-calendar", label: "News" },
		{  path: "schedule", icon:  "ion-clock", label: "Schedule"},
	]

	//
	// email structure validation 
	//
	function validateEmail(email) {
		var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
	}

	// Email user access to UI page
	$scope.emailEntrance = function(user){
		//$scope.userInput = $scope.user
		var userInput = $scope.user;
		
		// Controller page(phase 1)

		// Email (phase 2)
		http.post('/email', $scope.userInput)
			.success(function(data) {
				console.log('success');
				console.log(data);	
       	})
			.failure(function(data) {
				console.log('failed');
       	});
		
//		if(validateEmail(user.email))
//		{
//			$scope.userInput = $scope.user
//			$http.post('/email', $scope.userInput)
//			.success(function(data) {
//				console.log('success');
//				console.log(data);	
//       	})
//			.failure(function(data) {
//				console.log('failed');
//       	});
//		}
//		else
//		{
//			console.log('bad info');
//		}
//
//	}
	}
}])			

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
 });


