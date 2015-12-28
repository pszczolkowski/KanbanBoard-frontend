(function () {
	'use strict';

	angular
		.module('kanbanBoardApp')
		.factory('TaskCreator', TaskCreator);

	TaskCreator.$inject = ['$uibModal'];

	function TaskCreator($uibModal) {
		return {
			open: open
		};


		function open(params) {
			return $uibModal.open({
				templateUrl: 'views/task/creator.html',
				controller: 'TaskCreatorController',
				size: 'lg',
				resolve: {
					board: function () {
						return params.board;
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
