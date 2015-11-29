(function () {
	'use strict';

	angular
		.module('kanbanBoardApp')
		.config(DashboardRouteProvider);

	DashboardRouteProvider.$inject = ['$stateProvider'];

	function DashboardRouteProvider($stateProvider) {
		$stateProvider.state('dashboard', {
			parent: 'root',
			url: '/',
			templateUrl: 'views/dashboard/dashboard.html',
			controller: 'DashboardController',
			ncyBreadcrumb: {
				skip: true
			}
		});
	}
})();
