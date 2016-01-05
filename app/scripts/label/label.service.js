(function () {
	'use strict';

	angular
		.module('kanbanBoardApp')
		.factory('Label', Label);

	Label.$inject = ['$resource', 'config'];

	function Label($resource, config) {
		return $resource(config.apiUrl + '/label/:labelId', {
			labelId: '@id'
		}, {
			update: {
				url: config.apiUrl + '/label',
				method: 'PUT'
			}
		});
	}
})();
