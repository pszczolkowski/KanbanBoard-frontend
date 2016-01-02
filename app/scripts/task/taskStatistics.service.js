(function () {
	'use strict';

	angular
		.module('kanbanBoardApp')
		.factory('TaskStatistics', TaskStatistics);

	TaskStatistics.$inject = ['$resource', 'config'];

	function TaskStatistics($resource, config) {
		return $resource(config.apiUrl + '/task/statistics', {}, {
			getDistribution: {
				url: config.apiUrl + '/task/statistics/distribution',
				method: 'GET'
			}
		});
	}
})();
