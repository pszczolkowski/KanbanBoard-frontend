(function () {
	'use strict';

	angular
		.module('kanbanBoardApp')
		.controller('BoardSettingsController', BoardSettingsController);

	BoardSettingsController.$inject = [
		'$scope',
		'Board',
		'board',
		'Column',
		'columns',
		'toaster',
		'UserInvitingModal'];

	function BoardSettingsController($scope, Board, board, Column, columns, toaster, UserInvitingModal) {
		$scope.board = board;
		$scope.columns = columns;
		$scope.addColumn = addColumn;
		$scope.openUserInvitingModal = openUserInvitingModal;


		function addColumn() {
			var column = new Column();
			column.name = $scope.columnName;
			column.boardId = $scope.board.id;

			column.$save();
		}

		function openUserInvitingModal() {
			UserInvitingModal.open({
				board: $scope.board
			}).then(function () {
				toaster.pop('success', 'User invited');
				reloadBoard();
			});
		}

		function reloadBoard() {
			Board.get({
				boardId: $scope.board.id
			}).$promise.then(function (board) {
					$scope.board = board;
				});
		}
	}
})();
