(function () {
	'use strict';

	angular
		.module('kanbanBoardApp')
		.factory('TaskDetails', TaskDetails);

	TaskDetails.$inject = ['$uibModal'];

	function TaskDetails($uibModal) {
		return {
			open: open
		};


		function open(params) {
			return $uibModal.open({
				templateUrl: 'views/task/details.html',
				controller: 'TaskDetailsController',
				size: 'lg',
				resolve: {
					task: function () {
						return params.task;
					},
					columns: function () {
						return params.columns;
					},
					labels: function () {
						return params.labels;
					}
				}
			}).result;
		}
	}
})();
