// Create the module and name it devGuideApp
var mokApp = angular.module('mok',[ 'ngRoute', 'ngMaterial',
												'ngMessages','ng-mfb',
												'material.svgAssetsCache']);


var studentid;

// configure our routes
mokApp.config(function($routeProvider, $locationProvider ){

	var newsletter_path, newsletter;
	
	/* Debug mode refers to relative path */
	newsletter_path = 'Newsletter.json';


	

	$routeProvider
	// route for the home page
	.when('/', {
			templateUrl : 'pages/main.html',
			controller  : 'mainController',
			resolve:
			{
				userData: function($http, $q, $window) 
				{
					
						return $http.get( "/api/1").success(function( data ) {
							//console.log(data);
							var student = data;

							return student;
						});
		 		}

			}
	})
	// route for the home page
	.when('/blog', {
			templateUrl : 'pages/blog.html',
			controller  : 'blogController',
			resolve:
			{
				lib: function($http, $q, $window) 
				{
					

				  //Read in JSON file dressed in a txt halloween costume
					return $q.all(	[newsletter_path].map(function(path){return $http.get(path); }))
					.then(function(data)
					{ 
						newsletter = data[0].data;
						//console.log($rootScope.lib77ghz);

						return newsletter;
					})
		 		}
			}
	})
	
	// route for the login page
	.when('/login', {
			templateUrl : 'pages/login.html',
			controller  : 'loginCtrl',
			resolve:
			{

			}
	})
		// route for the login page
	.when('/profile', {
			templateUrl : 'pages/profile.html',
			controller  : 'profileCtrl',
			resolve:
			{

			}
	})
	// route for newbies documents
	.when('/schedule', {
			templateUrl : 'pages/schedule.html',
			controller  : 'scheduleController',
			resolve:
			{

			}
	})
	// route for the login page
	.when('/notebook', {
			templateUrl : 'pages/notebook.html',
			controller  : 'noteCtrl',
			resolve:
			{
				notebookData: function($http, $q, $window) 
				{
					//var specialRoute = '/api/:' + studentid;
						return $http.get('/book/:notebookData').success(function( data ) {
							//console.log(data);
							var notebook = data;

							return notebook;
						});
		 		}
			}
	});

	
});



mokApp.directive( 'goClick', function ($location ) {
  return function ( scope, element, attrs ) {
    var path;


	 /* close after click  */

    attrs.$observe( 'goClick', function (val) {
		path = val;
    });

    element.bind( 'click', function () {
      scope.$apply( function () {
		if(path == 'signIn')
			scope.account();
		else if(path == 'logout')
		{
				console.log('logging out')
				.success(function(data) {
					console.log('success');
					console.log(data);	
					$rootScope.logged = false;
        		})
				.failure(function(data) {
					console.log('failed');
        	});
		}
		else
		{
			scope.closeNavs();
        	$location.path( path );
		}
      });
    });
  };
});



mokApp.controller('navController' ,[ '$scope', '$rootScope', '$window', '$mdDialog', '$location', '$http',
					function($scope, $rootScope, $window, $mdDialog, $location, $http, userData) {


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

	// Dialog Box
	
	//$scope.account = function()
	//{
	//	$mdDialog.show({
	//		clickOutsideToClose: true,
	//		scope: $scope,        // use parent scope in template
	//		preserveScope: true,  // do not forget this if use parent scope
	//		template: '<div class="dialogdemoBasicUsage" >' +
	//				  '		<md-dialog layout="column" layout-align="center center">' +
	//				  '			<h3>Log In</h3>' +
	//				  '					<a href="/auth/facebook" class="btn btn-facebook"><i class="fa fa-facebook"></i>  | Connect with Facebook</a><br>' +
	//				  '					<a href="/auth/google" class="btn btn-google"> <i class="fa fa-google"></i> | Connect with Google</a><br>' +
	//				  '	    </md-dialog>' +
	//				  '</div>',
	//		controller: function DialogController($scope, $mdDialog) {
	//			$scope.closeDialog = function() {
	//				$mdDialog.hide();
	//			}
	//		}
	//	});
	//}

//
//
//	$http.get( "/api/1").success(function( data ) {
//		
//		console.log(data);
//		$scope.student = data;
//
//		if($scope.student.name != 'undefined')
//		{
//			$scope.logged = true;
//		}
//		else
//		{
//			$scope.logged = false;
//		}
//	});
//

}]);


mokApp.controller('loginCtrl',[ '$scope', '$rootScope', '$http', '$window', function($scope, $rootScope, $http, $window){


}]);
mokApp.controller('profileCtrl',[ '$scope', '$rootScope', '$http', '$window', function($scope, $rootScope, $http, $window){

//console.log($scope.karateUser);

$scope.rankTable =
[
    {
        belt: 'White',
        rank: '6th Rokkyu'
    },
    {
        belt: 'Yellow',
        rank: '5th Rokkyu'
    },
    {
        belt: 'Orange',
        rank: '4th Rokkyu'
    },
    {
        belt: 'Purple',
        rank: '3rd Rokkyu'
    },
    {
        belt: 'Blue',
        rank: '2nd Rokkyu'
    },
    {
        belt: 'Blue/Stripe',
        rank: '1st Rokkyu'
    },
    {
        belt: 'Green',
        rank: 'Gokyu'
    },
    {
        belt: 'Green/Stripe',
        rank: 'Yonku'
    },
    {
        belt: 'Brown 3rd',
        rank: 'Sankyu'
    },
    {
        belt: 'Brown 2nd',
        rank: 'Nikyu'
    },
    {
        belt: 'Brown 1st',
        rank: 'Ikkyu'
    },
    {
        belt: 'Black 1st',
        rank: 'Shodan'
    },
    {
        belt: 'Black 2nd',
        rank: 'Nidan'
    },
    {
        belt: 'Black 3rd',
        rank: 'Sandan'
    },
]


}]);


mokApp.controller('noteCtrl',[ '$scope', '$rootScope', '$http', '$window', 'notebookData',
	function($scope, $rootScope, $http, $window, notebookData){

$scope.notebook = 
[
    {
        belt: 'White',
        rank: '6th Rokkyu',
        combo: '6 & 7',
        forms: ''
    },
    {
        belt: 'Yellow',
        rank: '5th Rokkyu',
        combo: '3',
        forms: '1 Pinan & Eight Point'
    },
    {
        belt: 'Orange',
        rank: '4th Rokkyu',
        combo: '2 & 5',
        forms: ''
    },
    {
        belt: 'Purple',
        rank: '3rd Rokkyu',
        combo: '4 & 18',
        forms: '2 Pinan'
    },
    {
        belt: 'Blue',
        rank: '2nd Rokkyu',
        combo: '8 & 9',
        forms: '1 Kata'
    },
    {
        belt: 'Blue/Stripe',
        rank: '1st Rokkyu',
        combo: '12',
        forms: '2 Kata'
    },
    {
        belt: 'Green',
        rank: 'Gokyu',
        combo: '14, 15 & 16',
        forms: '3 Pinan, Statue of the Crane & Ten Point'
    },
    {
        belt: 'Green/Stripe',
        rank: 'Yonku',
        combo: '10, 11, 17 & 19',
        forms: '4 Pinan & 5 Pinan'
    },
    {
        belt: 'Brown 3rd',
        rank: 'Sankyu',
        combo: '1, 13 & 20',
        forms: '3 Kata, 4 Kata & Plum Tree'
    },
    {
        belt: 'Brown 2nd',
        rank: 'Nikyu',
        combo: '21 & 26',
        forms: '3 Kata, 4 Kata & Plum Tree'
    },
    {
        belt: 'Brown 1st',
        rank: 'Ikkyu',
        combo: '24',
        forms: '5 Kata & Two Man Fist Set'
    },
    {
        belt: 'Black 1st',
        rank: 'Shodan',
        combo: '22, 23 & 25',
        forms: '6 Kata & Hansuki'
    },
    {
        belt: 'Black 2nd',
        rank: 'Nidan',
        combo: '27, 28, 29 & 30',
        forms: 'Sho Tun Quak, Swift Tiger & Sun Flower'
    },
    {
        belt: 'Black 3rd',
        rank: 'Sandan',
        combo: '32 & 35',
        forms: ''
    }
]


}]);

mokApp.controller('mainController',[ '$scope', '$rootScope', '$http', '$window','userData', 
	function($scope, $rootScope, $http, $window, userData, loggedService){

	$rootScope.karateUser = userData.data;
	//studentid = $rootScope.karateUser.id;

	if($rootScope.karateUser.name)
	{
		$rootScope.logged = true;
	}
	else
	{
		$rootScope.logged = false;
	}


	$scope.blog =
	{
		background: '#4ECDC4 '
	};
	
	$scope.miniLogos =
	[
		{
			header: "Get Stronger",
			desc: "Train and improve your strength, endurance and mentality",
			imgPath: "img/flyingKickLogo.png"
		},
		{
			header: "Master Karate",
			desc: "Learn the arts of Shaolin Kempo Chi Sao Karate",
			imgPath: "img/beltLogo.png"
		}
	]


	function validateEmail(email) {
		var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
	}


	$scope.emailQuestion = function(user){
		if(validateEmail(user.email) && user.title && user.question)
		{
			$scope.userInput = $scope.user
			//console.log('good email');
			$http.post('/email', $scope.userInput)
			.success(function(data) {
				//console.log('success');
				//console.log(data);	
        	})
			.failure(function(data) {
				//console.log('failed');
        	});
		}
		else
		{
			//console.log('bad info');
		}

	}
	
}]).config(function($mdThemingProvider) {
    // Configure a dark theme with primary foreground yellow
    $mdThemingProvider.theme('docs-dark', 'default')
      .primaryPalette('yellow')
      .dark();
 });;


