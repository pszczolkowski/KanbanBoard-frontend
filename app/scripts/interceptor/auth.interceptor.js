(function () {
	'use strict';

	angular
		.module('kanbanBoardApp')
		.factory('authInterceptor', authInterceptor)
		.factory('authExpiredInterceptor', authExpiredInterceptor);


	authInterceptor.$inject = ['localStorageService'];
	authExpiredInterceptor.$inject = ['$q', '$injector', 'localStorageService'];

	function authInterceptor(localStorageService) {
		return {
			request: function (config) {
				config.headers = config.headers || {};
				var token = localStorageService.get('token');

				if (token && token.expires_at && token.expires_at > new Date().getTime()) {
					config.headers.Authorization = 'Bearer ' + token.access_token;
				}

				return config;
			}
		};
	}

	function authExpiredInterceptor($rootScope, $q, $injector, localStorageService) {
		return {
			responseError: function (response) {
				if (tokenHasExpired(response)) {
					localStorageService.remove('token');
					var LoggedUser = $injector.get('LoggedUser');
					if (LoggedUser.isAuthenticated()) {
						var Auth = $injector.get('Auth');
						Auth.authorize(true);
					}
				}
				return $q.reject(response);
			}
		};
	}

	function tokenHasExpired(response) {
		return response.status === 401 && (response.data.error == 'invalid_token' || response.data.error == 'Unauthorized');
	}

})();
