(function () {
	'use strict';

	angular
		.module('kanbanBoardApp')
		.factory('Task', Task);

	Task.$inject = ['$resource', 'config'];

	function Task($resource, config) {
		return $resource(config.apiUrl + '/task/:taskId', {}, {
			update: {
				url: config.apiUrl + '/task',
				method: 'PUT'
			},
			move: {
				url: config.apiUrl + '/task/move',
				method: 'POST'
			},
			setLabel: {
				url: config.apiUrl + '/task/label',
				method: 'POST'
			},
			assignUser: {
				url: config.apiUrl + '/task/assignUser',
				method: 'POST'
			}
		});
	}
})();
