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
		$scope.revokeAdministratorRole = revokeAdministratorRole;
		$scope.grantAdministratorRole = grantAdministratorRole;


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

		function handleError() {
			toaster.pop('error', 'Some error occurred');
		}

		function removeMember(user) {
			Board.removeMember({
				boardId: $scope.board.id,
				userId: user.userId
			}).$promise.then(function () {
					toaster.pop('success', 'Member has been removed');
					reloadBoard();
				}, handleError);
		}

		function revokeAdministratorRole(member) {
			Board.setPermissions({
				memberId: member.id,
				boardId: $scope.board.id,
				permissions: 'NORMAL'
			}).$promise.then(function () {
					toaster.pop('success', 'Administrator role revoked');
					reloadBoard();
				}, handleError);
		}

		function grantAdministratorRole(member) {
			Board.setPermissions({
				memberId: member.id,
				boardId: $scope.board.id,
				permissions: 'ADMIN'
			}).$promise.then(function () {
					toaster.pop('success', 'Administrator role granted');
					reloadBoard();
				}, handleError);
		}
	}
})();
