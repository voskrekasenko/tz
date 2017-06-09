(function(){
	"use strict"

	angular
		.module('app')
		.controller('dashboardCtrl', dashboardCtrl);

dashboardCtrl.$inject = ['$http', '$scope', 'authToken', '$stateParams', '$state'];
		function dashboardCtrl($http, $scope, authToken, $stateParams, $state){
			var vm = this;
			vm.limitUsers = 10;
			vm.isAuthenticated = authToken.isAuthenticated();
			vm.getToken = authToken.getToken;
			vm.getToken();
			vm.getUsers = function(){
				vm.getToken();
				if(vm.getToken){
					$http.get('js/users.json').then(function success(res){
						vm.users = res.data.user;
						console.log('get ', vm.users);
					}, function error(err) {
						console.log('error ', err);
					})
				}
			}
			vm.getRoles = function(){
				vm.getToken();
				if(vm.getToken){
					$http.get('js/roles.json').then(function success(res){
						vm.roles = res.data.roles;
						console.log('get ', vm.roles);
					}, function error(err) {
						console.log('error ', err);
					})
				}
			}
			vm.logout = function(){
				localStorage.removeItem('token');
				$state.transitionTo('login');
			}
		}
}());