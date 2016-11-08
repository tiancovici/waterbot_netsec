// Create the main controller and inject Angular's $Scope
mokApp.controller('blogController',[ '$scope', '$rootScope', '$window', function($scope, $rootScope, $window){

	$scope.blog =
	{
		background: '#6BB9F0'
	};
	
   $scope.sept2016 =
	{
		header: 'Newsletter - September 2016',
		color: 'white', //'#4ECDC4',	
		news: 
		[
			{
				title: 'Welcome Back!',
				desc:  `Welcome back, we hope you enjoyed some R&R with friends and fmaily.
                        Why not continue sharing time with them by inviting them for a free
                        week of trial classes. If your guest enrolls, you will receive your
                        choice of new sparring gear or jujitsu unifrom`,			
			},
			{
				title: 'Begin Your Olympic Dreams!',
				desc:  `The next Summer Olympics, appropriately held in Tokyo, will include the karate for the 
                        first time! Now is the time to begin training! I strongly recommend starting small by 
                        competing in some of the smaller, local tournaments and building confidence and gaining 
                        experience. With consistent effort and disciplined training, you may be on your way to making history!`
			},
			{
				title: 'New Training = New Gear',
				desc:  `With a focus on sparring and grappling, we offer a full set of sparring gear for $110
						(regularly $135) and jujitsu ghi for $40 (usually $60). Sparring gear is required for all students
						purple belt or higher. A jujitsu ghi is recommended to avoid tearing the karate ghi - which will happen.
						You may also choose to purchase a rash guard shirt instead - basically a tight fitting long sleeve dry fitting
						(Under Armour like) shirt`
			},
			{
				title: 'Don\'t miss out',
				desc:  `We have added classes to the westford schedule. Sensei David teaches classes on Monday evenings for both 
						Advanced and Beginners students. Take advantage of this opportunity to get in some extra practice.`
			},
			{
				title: 'Save The Dates!',
				desc:  `Two great tournaments are coming our way this year. Both hosted by our great friends at
                        Cevizzis Martial Arts Academy, the first one is on October 22nd, in Peabody. All students are
                        expected to compete at least once per year, and this tournament is very accessible to the 
                        first timer, while being a good challenge for those who have more experience. Then in April, 
                        CMAA will host a larger tournament at The Doubletree Hilton, home of CoCo Key Water park. 
                        Discounted water park ticket available for participants!`
			},
			{
				title: 'Hopefully we won’t need it, but… ',
				desc:  `Our snow cancellation policy is to reflect the recommendations of the Newton , Westford or
                        Leominster Public Schools. If they close, we close. If afternoon programs cancel, we 
                        cancel. While it is not a perfect system, it does answer most questions. When in doubt,
                        email shihanmatt@gmail.com or call 617-831-4464.`
			}
		],
	}


	$scope.january2016 =
	{
		header: 'Newsletter - January 2016',
		color: '#6BB9F0',	
		news: 
		[
			{
				title: 'Happy New Year',
				desc:  `Welcome back, we hope you enjoyed some R&R with friends and family. 
						Why not continue sharing time with them for a free week of trial classes. 
						If your guest enrolls, you will receive your choice of new sparring gear or jujitsu uniform.`,			
			},
			{
				title: 'Fight The Winter Blues',
				desc:  `January 4th begins our new focus on sparring and grappling skills. 
				 		we will interval train with heavy bags, focus matts, strength training, and striking drills.
						we will also reintroduce our grappling/jujitsu program to enhance general self defense skills.
						Both practices will prepare students for the March Madness Tournament on March 19th in Westford.\r
						Details to come...`
			},
			{
				title: 'New Training = New Gear',
				desc:  `With a focus on sparring and grappling, we offer a full set of sparring gear for $110
						(regularly $135) and jujitsu ghi for $40 (usually $60). Sparring gear is required for all students
						purple belt or higher. A jujitsu ghi is recommneded to avoid tearing the karate ghi - which will happen.
						You may also choose to purchase a rash guard shirt instead - basically a tight fitting long sleeve dry fitting
						(Under Armour like) shirt`
			},
			{
				title: 'Don\'t miss out',
				desc:  `We have added classes to the westford schedule. Sensei Davidteaches classes on Monday evenings for both 
						Advanced and Beginners students. Take advantage of this opportunity to get in some extra practice.`
			},
			{
				title: 'Madness is Coming',
				desc:  `We will hold our annual sparring (and hopefully) grappling tournament in Westford on March 19th.
						All students are strongly encouraged to compete. Competitors will be grouped by rank and age. This
						fun, friendly event with award presentation and a pizza party.`
			},
			{
				title: '"RED" ALERT ',
				desc:  `If you are current a Red Belt, 2016 should be your uear to earn your Black Belt! You must attend 2 classes per week,
						minimum, coupled with your own home practice (Forms everyday!) and consistent physical exercise. 
						This will give youthe best chance to prepare for the June exam.`
			}
		],
	}
	
}]);


