// Create the module and name it devGuideApp
var wbotApp = angular.module('waterBot',[ 'ngRoute', 'ngMaterial',
												'ngMessages','ng-mfb',
												'material.svgAssetsCache']);

// configure our routes
wbotApp.config(function($routeProvider, $locationProvider ){

	$routeProvider
	// route for the home page
	.when('/', {
			templateUrl : 'pages/login.html',
			controller  : 'loginCtrl',
			resolve:
			{
			}
	})
	// route for the login page
	.when('/main', {
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
	
   $scope.user = $rootScope.user;
	if($scope.lightstate == lightStats[0])
	{
		//turnLightsOff;
		$scope.lightstate = lightStats[1];
		$scope.user.lightstateBool = 0;
	}
	else
	{
		//turnLightsOn;
		$scope.lightstate = lightStats[0];
		$scope.user.lightstateBool= 1;
	}
	
	console.log($scope.user);

		$http.post("/rtiuvnxjued/act/", $scope.user)
		.success(function(data, status)
		{
			console.log("submitted")
		}).error(function(data, status) {
        		console.log('Data posted failed: ');
      });

	
}

	$scope.waterPlant = function()
	{
		$http.post("/ejtlqwjmv/act/", $rootScope.user)
		.success(function(data, status)
		{
			console.log("submitted")
		}).error(function(data, status) {
        		console.log('Data posted failed: ');
      });
	}


}]);
wbotApp.controller('profileCtrl',[ '$scope', '$rootScope', '$http', '$window', function($scope, $rootScope, $http, $window){



}]);


wbotApp.controller('loginCtrl',[ '$scope', '$rootScope', '$http', '$window', '$location',
	function($scope, $rootScope, $http, $window, loggedService, $location){
	
	$rootScope.user = {
		name:'',
		passw: '',
		lightstateBool: 0
	};

	$scope.login = function($location)
	{
		console.log("User - " + $rootScope.user.name);
		console.log("Pw - " + $rootScope.passw);

		$http.post("/wqdjo123ji/user/", $rootScope.user)
		.success(function(data, status ) {
        		console.log('Data posted successfully: ' + data.counter + ' ' + data.status);
				if(data.status)
				{	
					$window.location.assign('#/main');
				}
				else if(data.counter > 3)
				{
					$window.location.href = "https://waterbot.herokuapp.com/";
				}
		}).error(function(data, status) {
        		console.log('Data posted failed: ');
      });
		
	};



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


