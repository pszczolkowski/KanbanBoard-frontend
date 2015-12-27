(function () {
	'use strict';

	angular
		.module('kanbanBoardApp')
		.factory('LabelCreator', LabelCreator);

	LabelCreator.$inject = ['$uibModal'];

	function LabelCreator($uibModal) {
		return {
			open: open
		};


		function open(params) {
			return $uibModal.open({
				templateUrl: 'views/label/creator.html',
				controller: 'LabelCreatorController',
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
