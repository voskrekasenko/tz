(function(){
	"use strict"

	angular
		.module('app', ['ui.router'])
		.run(run)
		.config(config)


		config.$inject = ['$locationProvider', '$stateProvider', '$urlRouterProvider'];
		run.$inject = ['$rootScope', '$location', '$state', 'authToken'];

		function config ($locationProvider, $stateProvider, $urlRouterProvider) {
			$locationProvider.html5Mode(true).hashPrefix('!')

			$urlRouterProvider.otherwise('/');

			$stateProvider
				.state('login', {
					url : '/login',
					templateUrl : 'templates/login.html',
					controller: 'loginCtrl as vm'
				})

				.state('dashboard', {
					url : '/dashboard',
					templateUrl : 'templates/dashboard.html',
					controller: 'dashboardCtrl as vm'
				})
				.state('dashboard.users', {
			        url: '/users',
			        templateUrl: 'templates/partials/users.html'
				})
				.state('dashboard.roles', {
			        url: '/roles',
			        templateUrl: 'templates/partials/roles.html'
				});
		};
		function run($rootScope, $location, $state, authToken) {
			localStorage.clear();
		    $rootScope.$on('$stateChangeStart',
		    function(event, toState, toParams, fromState, fromParams){
		       console.log('Changed state to: ' + toState);
		    });
		    if(!authToken.isAuthenticated()) {
				$state.transitionTo('login');
		    }
		};
}());