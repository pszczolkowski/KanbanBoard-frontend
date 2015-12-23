(function () {
	'use strict';

	angular
		.module('kanbanBoardApp')
		.controller('TaskDetailsController', TaskDetailsController);

	TaskDetailsController.$inject = [
		'$scope',
		'$uibModalInstance',
		'columns',
		'Task',
		'task',
		'toaster'];

	function TaskDetailsController($scope, $uibModalInstance, columns, Task, task, toaster) {
		$scope.task = angular.copy(task);
		$scope.columns = columns;
		$scope.save = save;


		function save() {
			Task.update({
				id: $scope.task.id,
				title: $scope.task.title,
				description: $scope.task.description
			}).$promise
				.then(function () {
					$uibModalInstance.close();
				}, function () {
					toaster.pop('error', 'Some error occurred');
				});
		}
	}
})();
