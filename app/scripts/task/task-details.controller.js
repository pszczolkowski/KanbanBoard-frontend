(function () {
	'use strict';

	angular
		.module('kanbanBoardApp')
		.controller('TaskDetailsController', TaskDetailsController);

	TaskDetailsController.$inject = [
		'$scope',
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

	function TaskDetailsController($scope, $q, $uibModalInstance, board, columns, labels, Task, task, taskPriority,
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
