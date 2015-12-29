(function () {
	'use strict';

	angular
		.module('kanbanBoardApp')
		.factory('Board', Board);

	Board.$inject = ['$resource', 'config', 'Principal'];

	function Board($resource, config, Principal) {
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
			board.isLoggedUserBoardAdmin = checkIfLoggedUserIsBoardAdmin(board);

			return board;
		}

		function checkIfLoggedUserIsBoardAdmin(board) {
			var identity = Principal.getIdentity();

			for (var i = 0; i < board.members.length; i++) {
				if (board.members[i].userId === identity.id && board.members[i].permissions === 'ADMIN') {
					return true;
				}
			}

			return false;
		}
	}
})();
