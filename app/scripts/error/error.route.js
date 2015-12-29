(function () {
	'use strict';

	angular
		.module('kanbanBoardApp')
		.config(ErrorRouteProvider);

	ErrorRouteProvider.$inject = ['$stateProvider'];

	function ErrorRouteProvider($stateProvider) {
		$stateProvider.state('error-403', {
			parent: 'root',
			templateUrl: 'views/error/403.html',
			ncyBreadcrumb: {
				skip: true
			}
		});
	}
})();
