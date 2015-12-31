(function () {
	'use strict';

	angular
		.module('kanbanBoardApp')
		.factory('Board', Board);

	Board.$inject = ['$resource', 'config', 'LoggedUser'];

	function Board($resource, config, LoggedUser) {
		return $resource(config.apiUrl + '/board/:boardId', {}, {
			get: {
				transformResponse: transformBoard
			},
			inviteUser: {
				url: config.apiUrl + '/board/inviteUser',
				method: 'POST'
			},
			removeMember: {
				url: config.apiUrl + '/board/:boardId/member/:userId',
				method: 'DELETE'
			},
			setPermissions: {
				url: config.apiUrl + '/board/member/permissions',
				method: 'POST'
			}
		});


		function transformBoard(data) {
			var board = angular.fromJson(data);
			determineLoggedUserRoleOn(board);

			return board;
		}

		function determineLoggedUserRoleOn(board) {
			LoggedUser.$promise.then(function () {
				board.isLoggedUserBoardAdmin = checkIfLoggedUserIsBoardAdmin(board);
			});
		}

		function checkIfLoggedUserIsBoardAdmin(board) {
			for (var i = 0; i < board.members.length; i++) {
				if (board.members[i].userId === LoggedUser.id && board.members[i].permissions === 'ADMIN') {
					return true;
				}
			}

			return false;
		}
	}
})();
