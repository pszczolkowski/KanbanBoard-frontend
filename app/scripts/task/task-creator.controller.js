(function () {
	'use strict';

	angular
		.module('kanbanBoardApp')
		.controller('TaskCreatorController', TaskCreatorController);

	TaskCreatorController.$inject = [
		'$scope',
		'$uibModalInstance',
		'board',
		'columns',
		'labels',
		'Task',
		'taskPriority',
		'toaster'];

	function TaskCreatorController($scope, $uibModalInstance, board, columns, labels, Task, taskPriority, toaster) {
		$scope.task = {
			title: '',
			description: '',
			columnId: columns[0].id,
			labelId: null,
			assigneeId: null,
			priority: 'LOW'
		};
		$scope.board = board;
		$scope.columns = columns;
		$scope.labels = labels;
		$scope.taskPriorities = taskPriority;
		$scope.create = create;


		function create() {
			var task = new Task();
			task.title = $scope.task.title;
			task.description = $scope.task.description || null;
			task.columnId = $scope.task.columnId;
			task.labelId = $scope.task.labelId;
			task.assigneeId = $scope.task.assigneeId;
			task.priority = $scope.task.priority.toUpperCase();

			task.$save().then(function (createdTask) {
				$uibModalInstance.close(createdTask);
			}, function () {
				toaster.pop('error', 'Some error occurred');
			});
		}
	}
})();
