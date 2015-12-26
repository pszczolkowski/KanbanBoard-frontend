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
		'identity',
		'toaster',
		'UserInvitingModal'];

	function BoardSettingsController($scope, Board, board, Column, columns, identity, toaster, UserInvitingModal) {
		$scope.board = board;
		$scope.columns = columns;
		$scope.identity = identity;
		$scope.addColumn = addColumn;
		$scope.openUserInvitingModal = openUserInvitingModal;
		$scope.removeMember = removeMember;


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

		function removeMember(user) {
			Board.removeMember({
				boardId: $scope.board.id,
				userId: user.userId
			}).$promise.then(function () {
					toaster.pop('success', 'Member has been removed');
					reloadBoard();
				}, function () {
					toaster.pop('error', 'Some error occurred');
				});
		}
	}
})();
