(function(){
	"use strict"

	angular
		.module('app')
		.service('authToken', authToken);

authToken.$inject = ['$http', '$location', '$q'];
		function authToken($http, $location, $q){
			var admin = 'admin';
			var pass = 'pass';
			var isAuthenticated = false;
			var getToken = false;

			return {
				login : function(username, password) {
					isAuthenticated = username === admin && password === pass;
					return isAuthenticated;
				},
				isAuthenticated : function() {
					return isAuthenticated;
				},
				getToken : function() {
					getToken = localStorage.getItem('token') != undefined && localStorage.getItem('token') != '' && localStorage.getItem('token') != null;
					return getToken;
				}
			};
		}
}());