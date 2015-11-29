(function () {
	'use strict';

	angular
		.module('kanbanBoardApp')
		.factory('Account', Account);

	Account.$inject = ['$resource', 'config'];

	function Account($resource, config) {
			return $resource(config.apiUrl + '/account', {}, {
				get: {
					method: 'GET',
					interceptor: {
						response: function(response) {
							// expose response
							return response;
						}
					}
				},
				register: {
					url: config.apiUrl + '/account/register',
					method: 'POST'
				}
			});
		}
})();
