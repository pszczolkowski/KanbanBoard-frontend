(function () {
	'use strict';

	angular
		.module('kanbanBoardApp')
		.factory('Task', Task);

	Task.$inject = ['$resource', 'config'];

	function Task($resource, config) {
		return $resource(config.apiUrl + '/task/:taskId', {}, {
			move: {
				url: config.apiUrl + '/task/move',
				method: 'POST'
			}
		});
	}
})();
