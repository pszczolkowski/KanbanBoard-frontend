(function () {
	'use strict';

	angular
		.module('kanbanBoardApp')
		.factory('Board', Board);

	Board.$inject = ['$resource', 'config', 'LoggedUser'];

	function Board($resource, config, LoggedUser) {
		return $resource(config.apiUrl + '/board/:boardId', {}, {
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
	}
})();
