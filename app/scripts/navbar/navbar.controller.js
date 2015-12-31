(function () {
	'use strict';

	angular
		.module('kanbanBoardApp')
		.controller('NavbarController', NavbarController);

	NavbarController.$inject = [
		'$scope',
		'$state',
		'Auth',
		'LoggedUser',
		'toaster'];

	function NavbarController($scope, $state, Auth, LoggedUser, toaster) {
		$scope.state = $state;
		$scope.identity = LoggedUser;
		$scope.logout = logout;

		$scope.state = $state.current.navbar;
		$scope.$on('$stateChangeSuccess', function () {
			$scope.state = $state.current.navbar;
		});

		function logout() {
			Auth.logout();

			toaster.pop('success', 'Logged out');
			$state.go('login');
		}
	}
})();
