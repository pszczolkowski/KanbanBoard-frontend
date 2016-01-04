(function () {
	'use strict';

	angular
		.module('kanbanBoardApp')
		.config(BoardStatisticsRouteProvider);

	BoardStatisticsRouteProvider.$inject = ['$stateProvider'];

	function BoardStatisticsRouteProvider($stateProvider) {
		$stateProvider.state('board.statistics-distribution', {
			url: '/statistics/distribution',
			views: {
				'@root': {
					templateUrl: 'views/boardStatistics/distribution.html',
					controller: 'BoardStatisticsDistributionController'
				},
				'navbar-fragment@root': {
					templateUrl: 'views/boardStatistics/navbarFragment.html'
				}
			},
			navbar: {
				name: 'Board statistics',
				return: 'board'
			}
		}).state('board.statistics-cumulativeFlow', {
			url: '/statistics/cumulativeFlow',
			views: {
				'@root': {
					templateUrl: 'views/boardStatistics/cumulativeFlow.html',
					controller: 'BoardStatisticsCumulativeFlowController'
				},
				'navbar-fragment@root': {
					templateUrl: 'views/boardStatistics/navbarFragment.html'
				}
			},
			navbar: {
				name: 'Board statistics',
				return: 'board'
			}
		});
	}
})();
