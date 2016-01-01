(function () {
	'use strict';

	angular
		.module('kanbanBoardApp')
		.config(RegisterRouteProvider);

	RegisterRouteProvider.$inject = ['$stateProvider'];

	function RegisterRouteProvider($stateProvider) {
		$stateProvider.state('register', {
			parent: 'root',
			url: '/register',
			views: {
				'': {
					templateUrl: 'views/register/register.html',
					controller: 'RegisterController'
				},
				'navbar-fragment@root': {
					templateUrl: 'views/register/navbarFragment.html'
				}
			},
			navbar: {
				menu: false
			}
		});
	}
})();
