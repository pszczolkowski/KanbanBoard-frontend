(function () {
	'use strict';

	angular
		.module('kanbanBoardApp')
		.controller('DashboardController', DashboardController);

	DashboardController.$inject = [
		'$scope',
		'$confirm',
		'$state',
		'Board',
		'BoardCreator',
		'boards',
		'LoggedUser',
		'toaster'];

	function DashboardController($scope, $confirm, $state, Board, BoardCreator, boards, LoggedUser, toaster) {
		$scope.boards = prepareBoards(boards);
		$scope.openBoardCreator = openBoardCreator;
		$scope.openBoard = openBoard;
		$scope.deleteBoard = deleteBoard;


		function prepareBoards(boards) {
			angular.forEach(boards, function (board) {
				board.loggedUserIsAdmin = chechIfLoggedUserIsAdminOf(board);
			});

			return boards;
		}

		function chechIfLoggedUserIsAdminOf(board) {
			for (var i = 0; i < board.members.length; i++) {
				if (board.members[i].userId === LoggedUser.id && board.members[i].permissions === 'ADMIN') {
					return true;
				}
			}

			return false;
		}

		function openBoardCreator() {
			BoardCreator.open().then(handleBoardCreation);
		}

		function handleBoardCreation() {
			toaster.pop('success', 'Board created');
			reloadBoards();
		}

		function reloadBoards() {
			Board.query().$promise.then(function (boards) {
				$scope.boards = prepareBoards(boards);
			});
		}

		function openBoard(board) {
			$state.go('board', {boardId: board.id});
		}

		function deleteBoard(board) {
			$confirm('Are you sure you want to delete the board ' + board.name + '?')
				.then(function () {
					Board.delete({
						boardId: board.id
					}).$promise.then(function () {
							toaster.pop('success', 'Board has been deleted');
							reloadBoards();
						}, function () {
							toaster.pop('error', 'Some error occurred');
						});
				});
		}
	}
})();
