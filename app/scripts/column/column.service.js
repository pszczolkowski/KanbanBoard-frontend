(function () {
	'use strict';

	angular
		.module('kanbanBoardApp')
		.factory('Column', Column);

	Column.$inject = ['$resource', 'config'];

	function Column($resource, config) {
		return $resource(config.apiUrl + '/column/:columnId', {}, {
			update: {
				url: config.apiUrl + '/column',
				method: 'PUT'
			},
			move: {
				url: config.apiUrl + '/column/move',
				method: 'POST'
			},
			delete: {
				url: config.apiUrl + '/column/delete',
				method: 'POST'
			}
		});
	}
})();
