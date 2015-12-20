(function () {
	'use strict';

	angular
		.module('kanbanBoardApp')
		.factory('BoardCreator', BoardCreator);

	BoardCreator.$inject = ['$uibModal'];

	function BoardCreator($uibModal) {
		return {
			open: open
		};


		function open() {
			return $uibModal.open({
				templateUrl: 'views/board/creator.html',
				controller: 'BoardCreatorController',
				size: 'lg'
			}).result;
		}
	}
})();
