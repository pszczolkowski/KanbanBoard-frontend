(function () {
	'use strict';

	angular
		.module('kanbanBoardApp')
		.controller('LoginController', LoginController);

	LoginController.$inject = ['$scope', '$rootScope', '$state', 'Auth'];

	function LoginController($scope, $rootScope, $state, Auth) {
		$scope.credentials = {
			login: '',
			password: ''
		};
		$scope.signin = signin;

		function signin(event) {
			event.preventDefault();

			Auth.login({
				login: $scope.credentials.login,
				password: $scope.credentials.password
			}).then(function () {
				$scope.authenticationError = false;
				if ($rootScope.previousStateName === 'register') {
					$state.go('dashboard');
				} else {
					$rootScope.back();
				}
			}).catch(function () {
				$scope.authenticationError = true;
			});
		}
	}
})();
