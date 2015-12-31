(function () {
	'use strict';

	angular
		.module('kanbanBoardApp')
		.config(LoginRouteProvider);

	LoginRouteProvider.$inject = ['$stateProvider'];

	function LoginRouteProvider($stateProvider) {
		$stateProvider.state('login', {
			parent: 'root',
			url: '/login',
			views: {
				'': {
					templateUrl: 'views/login/login.html',
					controller: 'LoginController',
				},
				'navbar-fragment@root': {
					templateUrl: 'views/login/navbarFragment.html'
				}
			},
			navbar: {
				menu: false
			}
		});
	}
})();
