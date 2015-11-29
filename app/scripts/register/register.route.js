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
			templateUrl: 'views/register/register.html',
			controller: 'RegisterController',
			ncyBreadcrumb: {
				hide: true
			}
		});
	}
})();
