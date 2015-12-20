(function () {
	'use strict';

	angular
		.module('kanbanBoardApp')
		.controller('TaskCreatorController', TaskCreatorController);

	TaskCreatorController.$inject = [
		'$scope',
		'$uibModalInstance',
		'columns',
		'Task',
		'toaster'];

	function TaskCreatorController($scope, $uibModalInstance, columns, Task, toaster) {
		$scope.task = {
			title: '',
			description: '',
			columnId: columns[0].id
		};
		$scope.columns = columns;
		$scope.create = create;


		function create() {
			var task = new Task();
			task.title = $scope.task.title;
			task.description = $scope.task.description || null;
			task.columnId = $scope.task.columnId;

			task.$save().then(function (createdTask) {
				$uibModalInstance.close(createdTask);
			}, function () {
				toaster.pop('error', 'Some error occurred');
			});
		}
	}
})();
