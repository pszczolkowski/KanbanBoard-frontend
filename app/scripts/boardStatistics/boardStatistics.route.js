(function () {
	'use strict';

	angular
		.module('kanbanBoardApp')
		.config(BoardStatisticsRouteProvider);

	BoardStatisticsRouteProvider.$inject = ['$stateProvider'];

	function BoardStatisticsRouteProvider($stateProvider) {
		$stateProvider.state('board.statistics', {
			url: '/statistics',
			views: {
				'@root': {
					templateUrl: 'views/boardStatistics/statistics.html',
					controller: 'BoardStatisticsController'
				},
				'navbar-fragment@root': {}
			},
			navbar: {
				name: 'Board statistics',
				return: 'board'
			}
		});
	}
})();
