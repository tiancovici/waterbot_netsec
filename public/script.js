// Create the module and name it devGuideApp
var wbotApp = angular.module('waterBot',[ 'ngRoute', 'ngMaterial',
												'ngMessages','ng-mfb',
												'material.svgAssetsCache']);

// configure our routes
wbotApp.config(function($routeProvider, $locationProvider ){

	$routeProvider
	// route for the home page
	.when('/main', {
			templateUrl : 'pages/login.html',
			controller  : 'loginCtrl',
			resolve:
			{
			}
	})
	// route for the login page
	.when('/', {
			templateUrl : 'pages/main.html',
			controller  : 'mainController',
			resolve:
			{

			}
	});

//	$locationProvider.html5Mode({
//  enabled: true,
//  requireBase: false
//	});
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
		

	}
}])			

wbotApp.controller('mainController',[ '$scope', '$rootScope', '$http', '$window', function($scope, $rootScope, $http, $window){

var lightStats = ["Light On", "Light Off"]

$scope.lightstate = lightStats[0];

$scope.turnLight = function(){
	if($scope.lightstate == lightStats[0])
	{
		//turnLightsOff();
		$scope.lightstate = lightStats[1];
	}
	else
	{
		//turnLightsOn();
		$scope.lightstate = lightStats[0];
	}
}


}]);
wbotApp.controller('profileCtrl',[ '$scope', '$rootScope', '$http', '$window', function($scope, $rootScope, $http, $window){



}]);


wbotApp.controller('loginCtrl',[ '$scope', '$rootScope', '$http', '$window', '$location',
	function($scope, $rootScope, $http, $window, loggedService, $location){




	function goTo(path)
	{
		$location.path(path);
	}
	
}]).config(function($mdThemingProvider) {
    // Configure a dark theme with primary foreground yellow
    $mdThemingProvider.theme('docs-dark', 'default')
      .primaryPalette('yellow')
      .dark();
 });


