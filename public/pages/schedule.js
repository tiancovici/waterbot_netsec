// Create the main controller and inject Angular's $Scope
mokApp.controller('scheduleController',[ '$scope', '$rootScope', '$window', function($scope, $rootScope, $window){




/* Westford Classes */
	$scope.w_mClasses = 
	[
		{
			time:'6:00-6:55',
			group: 'White-Blue',
			desc: ''
		},
		{
			time:'7:00-8:00',
			group: 'Green & Above',
			desc: ''
		}
	]
	$scope.w_tuClasses = 
	[
		{
			time:'3:45-4:30',
			group: 'Tiny Tigers',
			desc: ''
		},
		{
			time:'4:30-5:25',
			group: 'Advanced Kids',
			desc: ''
		},
		{
			time:'5:30-6:30',
			group: 'Beginner Kids',
			desc: ''
		}
	]
	$scope.w_wClasses  = $scope.w_mClasses ;

	$scope.w_thClasses = 
	[
		{
			time:'3:45-4:30',
			group: 'Tiny Tigers',
			desc: ''
		},
		{
			time:'4:30-5:25',
			group: 'Advanced Kids',
			desc: ''
		},
		{
			time:'5:30-6:30',
			group: 'Beginner Kids',
			desc: ''
		},
		{
			time:'6:30-7:30',
			group: 'Advanced & Black Belt Adults',
			desc: ''
		}
	]
	
	$scope.w_fClasses	 = 
	[
		{
			time:'',
			group: 'Private Lessons by Appointment',
			desc: ''
		}
	]

	$scope.w_sClasses =
	[
		{
			time:'8:00-8:55',
			group: 'Pre Black Belt Class',
			desc: ''
		},
		{
			time:'9:00-10:00',
			group: 'Aduly & Advanced Kids',
			desc: ''
		},
		{
			time:'10:05-11:05',
			group: 'Beginner Kids',
			desc: ''
		},
		{
			time:'',
			group: 'Private Lessons/Birthday Party by Appt',
			desc: ''
		},
	]

	$scope.w_suClasses =
	[
		{
			time:'No Classes',
			group: '',
			desc: ''
		}
	]

	/* Newton Classes */ 
	$scope.n_sClasses =
	[
		{
			time:'No Classes',
			group: '',
			desc: ''
		}
	]
	$scope.n_mClasses = $scope.n_sClasses;
	$scope.n_thClasses = $scope.n_sClasses;
	
	$scope.n_tuClasses = 
	[
		{
			time: '',
			groupe: '',
			desc: 'Coach Jeanie'
		},
		{
			time:'4:00-5:00',
			group: 'Beginner Kids',
			desc: ''
		},
		{
			time:'5:00-6:00',
			group: 'Advanced Kids',
			desc: ''
		},
		{
			time:'6:00-7:00',
			group: 'Adults',
			desc: ''
		}
	]

	$scope.n_wClasses = angular.copy($scope.n_tuClasses);
	$scope.n_wClasses[0].desc = 'Shihan Matt';
	
	$scope.n_fClasses = 
	[
		{
			time: '',
			groupe: '',
			desc: 'Shihan Matt'
		},
		{
			time:'4:00-5:00',
			group: 'Beginner & Adv. Kids',
			desc: ''
		},
		{
			time:'5:00-6:00',
			group: 'Private Lessons',
			desc: ''
		},
	]

	$scope.n_suClasses = 
	[
		{
			time: '',
			groupe: '',
			desc: 'Sensei Hannah / Elliot'
		},
		{
			time:'10:00-11:00',
			group: 'Advance',
			desc: ''
		},
		{
			time:'5:00-6:00',
			group: 'Beginner/Intermediate',
			desc: ''
		},
		{
			time:'',
			group: 'Private Lessons/ Birthday Parties',
			desc: ''
		},
	]


	$scope.L_mClasses= 
	[
		{
			time:'4:00-6:00pm',
			group: 'Kids',
			desc: ''
		},
		{
			time:'6:00pm',
			group: 'Adults',
			desc: ''
		}
	]

	$scope.L_sClasses= 
	[
		{
			time:'8:00am',
			group: 'Adults',
			desc: ''
		},
		{
			time:'9:15am',
			group: 'Kids',
			desc: ''
		}
	]



	/* Get day, and default to current day or monday */
	var day = new Date().getDay();
	console.log(day);
	$scope.selectedIndex = day;


	switch (day) {
		case 1:
			$scope.L_selectedIndex = 0;
			break;
		case 6:
			$scope.L_selectedIndex = 1;
			break;
		default:
			$scope.L_selectedIndex = 0;
			break;
	}

	//$scope.selectedIndex = 2;
	//switch (day) {
	//	case 1:	/* Case Monday, select first tab */
	//		$scope.selectedIndex = 0;
	//		break;
	//	case 2:	/* Case Tuesday, select second tab */
	//		$scope.selectedIndex = 1;
	//		break;
	//	case 3:	/* Case Wedensday, select third tab */
	//		$scope.selectedIndex = 2;
	//		break;
	//	case 4:	/* Case Thursday, select fourth tab */
	//		$scope.selectedIndex = 3;
	//		break;
	//	case 5:	/* Case Friday, select fifth tab */
	//		$scope.selectedIndex = 4;
	//		break;
	//	case 6:	/* Case Saturday, select second tab */
	//		$scope.selectedIndex = 5;
	//		break;
	//	case 0:
	//	default:/* Case Tuesday, select second tab */
	//		$scope.selectedIndex = 0;
	//		break;
	//}


	/* Events*/ 
	$scope.events = 
	[
		{
			time: 'October 22nd 2016',
			group: 'Cevizzis Martial Arts Academy',
			desc: 'Peabody'
		},
		{
			time: 'April 2017',
			group: 'CMAA at DoubleTree Hilton',
			desc: 'Boston'
		},
	]
}]);