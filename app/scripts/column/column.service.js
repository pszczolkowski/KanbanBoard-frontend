(function () {
	'use strict';

	angular
		.module('kanbanBoardApp')
		.factory('Column', Column);

	Column.$inject = ['$resource', 'config'];

	function Column($resource, config) {
		return $resource(config.apiUrl + '/column/:columnId', {}, {
			move: {
				url: config.apiUrl + '/column/move',
				method: 'POST'
			}
		});
	}
})();
