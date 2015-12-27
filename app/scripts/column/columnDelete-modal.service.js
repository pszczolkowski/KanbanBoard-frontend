(function () {
	'use strict';

	angular
		.module('kanbanBoardApp')
		.factory('ColumnDeleteModal', ColumnDeleteModal);

	ColumnDeleteModal.$inject = ['$uibModal'];

	function ColumnDeleteModal($uibModal) {
		return {
			open: open
		};


		function open(params) {
			return $uibModal.open({
				templateUrl: 'views/column/deleteModal.html',
				controller: 'ColumnDeleteModalController',
				size: 'lg',
				resolve: {
					column: function () {
						return params.column;
					},
					columns: function () {
						return params.columns;
					}
				}
			}).result;
		}
	}
})();
