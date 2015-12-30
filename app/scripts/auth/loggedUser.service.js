(function () {
	'use strict';

	angular
		.module('kanbanBoardApp')
		.factory('LoggedUser', LoggedUser);

	LoggedUser.$inject = ['$q', 'Account'];

	function LoggedUser($q, Account) {
		var loggedUser = {
			isAuthenticated: isAuthenticated,
			logout: logout
		};
		var authenticated = false;

		Object.defineProperty(loggedUser, '$promise', {
			enumerable: false,
			writable: true
		});
		Object.defineProperty(loggedUser, '$reload', {
			value: loadUserData,
			enumerable: false
		});

		loadUserData();

		return loggedUser;


		function isAuthenticated() {
			return authenticated;
		}

		function logout() {
			for (var key in loggedUser) {
				if (!angular.isFunction(loggedUser[key])) {
					delete loggedUser[key];
				}
			}

			authenticated = false;
		}

		function loadUserData() {
			var deferred = $q.defer();
			loggedUser.$promise = deferred.promise;

			Account.get().$promise.then(function (identity) {
				angular.extend(loggedUser, identity.data);
				authenticated = true;
				deferred.resolve(identity.data);
			}, function () {
				authenticated = false;
				deferred.resolve(null);
			});
		}
	}
})();
