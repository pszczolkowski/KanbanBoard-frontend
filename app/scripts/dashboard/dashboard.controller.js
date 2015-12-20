(function () {
	'use strict';

	angular
		.module('kanbanBoardApp')
		.controller('DashboardController', DashboardController);

	DashboardController.$inject = [
		'$scope',
		'Board',
		'BoardCreator',
		'boards',
		'toaster'];

	function DashboardController($scope, Board, BoardCreator, boards, toaster) {
		$scope.boards = boards;
		$scope.openBoardCreator = openBoardCreator;


		function openBoardCreator() {
			BoardCreator.open().then(handleBoardCreation);
		}

		function handleBoardCreation() {
			toaster.pop('success', 'Board created');
			reloadBoards();
		}

		function reloadBoards() {
			Board.query().$promise.then(function (boards) {
				$scope.boards = boards;
			});
		}
	}
})();
