(function () {
	'use strict';

	angular
		.module('kanbanBoardApp')
		.controller('UserInvitingModalController', UserInvitingModalController);

	UserInvitingModalController.$inject = [
		'$scope',
		'$uibModalInstance',
		'Board',
		'board',
		'toaster'];

	function UserInvitingModalController($scope, $uibModalInstance, Board, board, toaster) {
		$scope.user = {
			login: ''
		};
		$scope.invite = invite;


		function invite() {
			Board.inviteUser({
				boardId: board.id,
				login: $scope.user.login
			}).$promise.then(function () {
				$uibModalInstance.close();
			}, function () {
				toaster.pop('error', 'User with given login does not exist');
			});
		}
	}
})();
