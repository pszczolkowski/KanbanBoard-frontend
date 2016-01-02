(function () {
	'use strict';

	angular
		.module('kanbanBoardApp')
		.controller('BoardStatisticsController', BoardStatisticsController);

	BoardStatisticsController.$inject = [
		'$scope',
		'board',
		'TaskStatistics'];

	function BoardStatisticsController($scope, board, TaskStatistics) {
		$scope.chart = {
			type: 'COLUMN_TYPE'
		};
		$scope.chartTypes = [
			{name: 'column', value: 'COLUMN_TYPE'},
			{name: 'label', value: 'LABEL'},
			{name: 'priority', value: 'PRIORITY'},
			{name: 'assignee', value: 'ASSIGNING'}
		];
		$scope.loadStatistics = loadStatistics;

		loadStatistics();


		function loadStatistics() {
			TaskStatistics.getDistribution({
				boardId: board.id,
				type: $scope.chart.type
			}).$promise.then(function (statistics) {
					$scope.labels = statistics.labels;
					$scope.values = statistics.values;
				});
		}
	}
})();
