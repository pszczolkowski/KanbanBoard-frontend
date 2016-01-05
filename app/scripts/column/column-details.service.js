(function () {
	'use strict';

	angular
		.module('kanbanBoardApp')
		.factory('ColumnDetails', ColumnDetails);

	ColumnDetails.$inject = ['$uibModal'];

	function ColumnDetails($uibModal) {
		return {
			open: open
		};


		function open(params) {
			return $uibModal.open({
				templateUrl: 'views/column/details.html',
				controller: 'ColumnDetailsController',
				size: 'lg',
				resolve: {
					column: function () {
						return params.column;
					}
				}
			}).result;
		}
	}
})();
