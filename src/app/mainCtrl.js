
(function(){
	"use strict"

	angular
		.module('app')
		.controller('mainCtrl', mainCtrl);

mainCtrl.$inject = ['authToken', '$state'];
		function mainCtrl(authToken, $state){
			var vm = this;
			vm.getToken = authToken.getToken();
			console.log('main - ', vm.getToken);
			vm.logout = function(){
				localStorage.removeItem('token');
				$state.transitionTo('login');
			}

		}
}());