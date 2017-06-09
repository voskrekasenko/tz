
(function(){
	"use strict"

	angular
		.module('app')
		.controller('loginCtrl', loginCtrl);

loginCtrl.$inject = ['$http', '$scope', 'authToken', '$stateParams', '$state'];
		function loginCtrl($http, $scope, authToken, $stateParams, $state){
			var vm = this;
			vm.isAuthenticated = authToken.isAuthenticated();
			vm.getToken = authToken.getToken;
			vm.getToken();
			vm.formSubmit = function() {
		      if(authToken.login(vm.username, vm.password)) {
		      	$http.get('js/token.json').then(function success(res){
					localStorage.setItem('token', res.data.token);
				}, function error(err) {
					console.log('error ', err);
				});
		        vm.username = '';
		        vm.password = '';
		        vm.getToken();
		        $state.transitionTo('dashboard');
		      } else {
		        alert("Incorrect username/password !");
		      }
			};
			vm.logout = function(){
				localStorage.removeItem('token');
				$state.transitionTo('login');
			}
		}
}());