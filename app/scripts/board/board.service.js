(function () {
	'use strict';

	angular
		.module('kanbanBoardApp')
		.factory('Board', Board);

	Board.$inject = ['$resource', 'config'];

	function Board($resource, config) {
		return $resource(config.apiUrl + '/board/:boardId', {}, {
			inviteUser: {
				url: config.apiUrl + '/board/inviteUser',
				method: 'POST'
			}
		});
	}
})();
