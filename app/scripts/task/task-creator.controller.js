(function () {
	'use strict';

	angular
		.module('kanbanBoardApp')
		.controller('TaskCreatorController', TaskCreatorController);

	TaskCreatorController.$inject = [
		'$scope',
		'$confirm',
		'$uibModalInstance',
		'board',
		'columns',
		'labels',
		'Task',
		'taskPriority',
		'taskSizes',
		'toaster'];

	function TaskCreatorController($scope, $confirm, $uibModalInstance, board, columns, labels, Task, taskPriority, taskSizes,
								   toaster) {
		$scope.task = {
			title: '',
			description: '',
			columnId: columns[0].id,
			labelId: null,
			assigneeId: null,
			priority: 'LOW',
			size: 1
		};
		$scope.board = board;
		$scope.columns = columns;
		$scope.labels = labels;
		$scope.taskPriorities = taskPriority;
		$scope.taskSizes = taskSizes;
		$scope.create = create;


		function create() {
			if (workInProgressLimitWillBeExceeded()) {
				$confirm('Creating this task in selected column will exceed column\'s work in progress limit. ' +
					'Are you sure?')
					.then(sendCreateRequest);
			} else {
				sendCreateRequest();
			}
		}

		function workInProgressLimitWillBeExceeded() {
			var column = getColumnById($scope.task.columnId);

			if (column.workInProgressLimit) {
				if (column.workInProgressLimitType === 'QUANTITY') {
					return column.tasks.length >= column.workInProgressLimit;
				} else if (column.workInProgressLimitType === 'SIZE') {
					return column.tasksSizeSum + $scope.task.size > column.workInProgressLimit;
				}
			}

			return false;
		}

		function getColumnById(id) {
			for (var i =0; i < columns.length; i++) {
				if (columns[i].id === id) {
					return columns[i];
				}
			}

			return null;
		}

		function sendCreateRequest() {
			var task = new Task();
			task.title = $scope.task.title;
			task.description = $scope.task.description || null;
			task.columnId = $scope.task.columnId;
			task.labelId = $scope.task.labelId;
			task.assigneeId = $scope.task.assigneeId;
			task.priority = $scope.task.priority.toUpperCase();
			task.size = $scope.task.size;

			task.$save().then(function (createdTask) {
				$uibModalInstance.close(createdTask);
			}, function () {
				toaster.pop('error', 'Some error occurred');
			});
		}
	}
})();
