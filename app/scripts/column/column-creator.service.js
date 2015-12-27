(function () {
	'use strict';

	angular
		.module('kanbanBoardApp')
		.factory('ColumnCreator', ColumnCreator);

	ColumnCreator.$inject = ['$uibModal'];

	function ColumnCreator($uibModal) {
		return {
			open: open
		};


		function open(params) {
			return $uibModal.open({
				templateUrl: '../../views/column/creator.html',
				controller: 'ColumnCreatorController',
				size: 'lg',
				resolve: {
					board: function () {
						return params.board;
					}
				}
			}).result;
		}
	}
})();
