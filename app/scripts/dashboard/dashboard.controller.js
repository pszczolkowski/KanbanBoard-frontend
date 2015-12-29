(function () {
	'use strict';

	angular
		.module('kanbanBoardApp')
		.controller('DashboardController', DashboardController);

	DashboardController.$inject = [
		'$scope',
		'$state',
		'Board',
		'BoardCreator',
		'boards',
		'toaster'];

	function DashboardController($scope, $state, Board, BoardCreator, boards, toaster) {
		$scope.boards = boards;
		$scope.openBoardCreator = openBoardCreator;
		$scope.openBoard = openBoard;


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

		function openBoard(board) {
			$state.go('board', {boardId: board.id});
		}
	}
})();
