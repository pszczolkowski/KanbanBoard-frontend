(function () {
	'use strict';

	angular
		.module('kanbanBoardApp')
		.controller('TaskDetailsController', TaskDetailsController);

	TaskDetailsController.$inject = [
		'$scope',
		'$confirm',
		'$q',
		'$uibModalInstance',
		'board',
		'columns',
		'labels',
		'Task',
		'task',
		'taskPriority',
		'taskSizes',
		'toaster'];

	function TaskDetailsController($scope, $confirm, $q, $uibModalInstance, board, columns, labels, Task, task, taskPriority,
								   taskSizes, toaster) {
		$scope.task = angular.copy(task);
		$scope.board = board;
		$scope.columns = columns;
		$scope.labels = labels;
		$scope.taskPriorities = taskPriority;
		$scope.taskSizes = taskSizes;
		$scope.save = save;


		function handleError() {
			toaster.pop('error', 'Some error occurred');
		}

		function save() {
			if (workInProgressLimitWillBeExceeded()) {
				$confirm('Updating this task size will exceed column\'s work in progress limit. Are you sure?')
					.then(saveTask);
			} else {
				saveTask();
			}
		}

		function workInProgressLimitWillBeExceeded() {
			var column = getColumnById($scope.task.columnId);

			return column.workInProgressLimit &&
				!column.workInProgressLimitExceeded &&
				column.workInProgressLimitType === 'SIZE' &&
				column.tasksSizeSum + - task.size + $scope.task.size > column.workInProgressLimit;
		}

		function getColumnById(id) {
			for (var i = 0; i < columns.length; i++) {
				if (columns[i].id === id) {
					return columns[i];
				}
			}

			return null;
		}

		function saveTask() {
			updateTask()
				.then(setLabel, handleError)
				.then(assignUser, handleError)
				.then(function () {
					$uibModalInstance.close();
				}, handleError);
		}

		function updateTask() {
			if ($scope.task.title !== task.title ||
				$scope.task.description !== task.description ||
				$scope.task.priority !== task.priority ||
				$scope.task.size !== task.size) {
				return Task.update({
					id: $scope.task.id,
					title: $scope.task.title,
					description: !$scope.task.description ? null : $scope.task.description,
					priority: $scope.task.priority,
					size: parseFloat($scope.task.size)
				}).$promise;
			} else {
				return $q.when(true);
			}
		}

		function setLabel() {
			if ($scope.task.labelId !== task.labelId) {
				return Task.setLabel({
					taskId: $scope.task.id,
					labelId: $scope.task.labelId
				}).$promise;
			} else {
				return $q.when(true);
			}
		}

		function assignUser() {
			if ($scope.task.assigneeId !== task.assigneeId) {
				return Task.assignUser({
					taskId: $scope.task.id,
					assigneeId: $scope.task.assigneeId
				}).$promise;
			} else {
				return $q.when(true);
			}
		}
	}
})();
