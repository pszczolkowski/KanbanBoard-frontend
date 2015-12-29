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
		'Task',
		'TaskCreator',
		'TaskDetails',
		'toaster'];

	function BoardController($scope, board, Column, columns, labels, Task, TaskCreator, TaskDetails, toaster) {
		$scope.board = board;
		$scope.columns = columns;
		$scope.labels = prepareLabelsFrom(labels);
		$scope.members = prepareMembersFrom(board);
		$scope.dragListeners = {
			itemMoved: onTaskMove,
			orderChanged: onTaskMove
		};
		$scope.openTaskCreator = openTaskCreator;
		$scope.openTaskDetails = openTaskDetails;


		function prepareLabelsFrom(labels) {
			var result = [];
			for (var i = 0; i < labels.length; i++) {
				result[labels[i].id] = labels[i];
			}

			return result;
		}

		function prepareMembersFrom(board) {
			var result = [];
			for (var i = 0; i < board.members.length; i++) {
				result[board.members[i].userId] = board.members[i];
			}

			return result;
		}

		function openTaskCreator() {
			TaskCreator.open({
				board: $scope.board,
				columns: $scope.columns,
				labels: labels
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

		function onTaskMove(event) {
			var task = event.source.itemScope.modelValue;
			var column = event.dest.sortableScope.$parent.column;
			var position = event.dest.index;

			Task.move({
				taskId: task.id,
				columnId: column.id,
				position: position
			}).$promise.finally(function () {
					reloadColumn(column.id);
				});
		}

		function openTaskDetails(task) {
			TaskDetails.open({
				task: task,
				board: $scope.board,
				columns: $scope.columns,
				labels: labels
			}).then(function () {
				toaster.pop('success', 'Task saved');
				reloadColumn(task.columnId);
			});
		}
	}
})();
