(function () {
	'use strict';

	angular
		.module('kanbanBoardApp')
		.config(DashboardRouteProvider);

	DashboardRouteProvider.$inject = ['$stateProvider'];

	function DashboardRouteProvider($stateProvider) {
		var resolveBoards = ['Board', loadBoards];

		$stateProvider.state('dashboard', {
			parent: 'root',
			url: '/',
			templateUrl: 'views/dashboard/dashboard.html',
			controller: 'DashboardController',
			ncyBreadcrumb: {
				skip: true
			},
			resolve: {
				boards: resolveBoards
			}
		});


		function loadBoards(Board) {
			return Board.query().$promise;
		}
	}
})();
