(function () {
	'use strict';

	angular
		.module('kanbanBoardApp')
		.controller('TaskDetailsController', TaskDetailsController);

	TaskDetailsController.$inject = [
		'$scope',
		'$q',
		'$uibModalInstance',
		'columns',
		'labels',
		'Task',
		'task',
		'toaster'];

	function TaskDetailsController($scope, $q, $uibModalInstance, columns, labels, Task, task, toaster) {
		$scope.task = angular.copy(task);
		$scope.columns = columns;
		$scope.labels = labels;
		$scope.save = save;


		function handleError() {
			toaster.pop('error', 'Some error occurred');
		}

		function save() {
			Task.setLabel({
				taskId: $scope.task.id,
				labelId: $scope.task.labelId
			}).$promise.then(function () {
					Task.update({
						id: $scope.task.id,
						title: $scope.task.title,
						description: $scope.task.description
					}).$promise.then(function () {
							$uibModalInstance.close();
						}, handleError);
				}, handleError);
		}
	}
})();
