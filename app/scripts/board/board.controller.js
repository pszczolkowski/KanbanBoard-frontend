(function () {
	'use strict';

	angular
		.module('kanbanBoardApp')
		.controller('BoardController', BoardController);

	BoardController.$inject = [
		'$scope',
		'board',
		'Column',
		'columns',
		'labels',
		'TaskCreator',
		'toaster'];

	function BoardController($scope, board, Column, columns, labels, TaskCreator, toaster) {
		$scope.board = board;
		$scope.columns = columns;
		$scope.labels = prepareLabelsFrom(labels);
		$scope.openTaskCreator = openTaskCreator;



		function prepareLabelsFrom(labels) {
			var result = [];
			for (var i = 0; i < labels.length; i++) {
				result[labels[i].id] = labels[i];
			}

			return result;
		}

		function openTaskCreator() {
			TaskCreator.open({
				columns: $scope.columns
			}).then(function (createdTask) {
				toaster.pop('success', 'Task created');
				reloadColumn(createdTask.columnId);
			});
		}

		function reloadColumn(columnId) {
			Column.get({
				columnId: columnId
			}).$promise.then(function (column) {
				for (var i = 0; i < $scope.columns.length; i++) {
					if ($scope.columns[i].id === columnId) {
						$scope.columns[i] = column;
					}
				}
			});
		}
	}
})();
