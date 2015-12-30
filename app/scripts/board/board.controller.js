(function () {
	'use strict';

	angular
		.module('kanbanBoardApp')
		.controller('BoardController', BoardController);

	BoardController.$inject = [
		'$scope',
		'$confirm',
		'board',
		'Column',
		'columns',
		'labels',
		'Task',
		'TaskCreator',
		'TaskDetails',
		'toaster'];

	function BoardController($scope, $confirm, board, Column, columns, labels, Task, TaskCreator, TaskDetails, toaster) {
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
		$scope.deleteTask = deleteTask;
		$scope.moveTaskLeft = moveTaskLeft;
		$scope.moveTaskRight = moveTaskRight;


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

		function deleteTask(task) {
			$confirm('Are you sure you want to delete this task?')
				.then(function () {
					Task.delete({taskId: task.id}).$promise.then(function () {
						toaster.pop('success', 'Task deleted');
						reloadColumn(task.columnId);
					}, function() {
						toaster.pop('error', 'Some error occurred');
					});
				});
		}

		function moveTaskLeft(task) {
			var columnToMove = null;

			for (var i = 0; i < $scope.columns.length; i++) {
				if ($scope.columns[i].id === task.columnId) {
					columnToMove = $scope.columns[i - 1];
				}
			}

			Task.move({
				taskId: task.id,
				columnId: columnToMove.id,
				position: columnToMove.tasks.length
			}).$promise.finally(function () {
					reloadColumn(task.columnId);
					reloadColumn(columnToMove.id);
				});
		}

		function moveTaskRight(task) {
			var columnToMove = null;

			for (var i = 0; i < $scope.columns.length; i++) {
				if ($scope.columns[i].id === task.columnId) {
					columnToMove = $scope.columns[i + 1];
				}
			}

			Task.move({
				taskId: task.id,
				columnId: columnToMove.id,
				position: columnToMove.tasks.length
			}).$promise.finally(function () {
					reloadColumn(task.columnId);
					reloadColumn(columnToMove.id);
				});
		}
	}
})();
