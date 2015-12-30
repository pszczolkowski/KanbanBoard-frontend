(function () {
	'use strict';

	angular
		.module('kanbanBoardApp')
		.factory('Auth', Auth);

	Auth.$inject = ['$rootScope', '$q', '$state', 'AuthServerProvider', 'Account', 'LoggedUser'];

	function Auth($rootScope, $q, $state, AuthServerProvider, Account, LoggedUser) {
		return {
			login: login,
			logout: logout,
			authorize: authorize,
			createAccount: createAccount,
			updateAccount: updateAccount
		};


		function login(credentials) {
			var promise = AuthServerProvider.login(credentials);
			promise.then(function (data) {
					LoggedUser.$reload();
				}, logout);

			return promise;
		}

		function logout() {
			AuthServerProvider.logout();
			LoggedUser.logout();
			// Reset state memory
			$rootScope.previousStateName = undefined;
			$rootScope.previousStateNameParams = undefined;
		}

		function authorize(force) {
			var promise = LoggedUser.$promise;

			promise.then(function() {
				var isAuthenticated = LoggedUser.isAuthenticated();

				if ($rootScope.toState.name === 'login' || $rootScope.toState.name === 'register') {
					if (isAuthenticated) {
						$state.go('dashboard');
					}
				} else if (!isAuthenticated) {
					$state.go('login');
				}
			});

			return promise;
		}

		function createAccount(account, callback) {
			var cb = callback || angular.noop;

			return Account.register(account,
				function () {
					return cb(account);
				},
				function (err) {
					this.logout();
					return cb(err);
				}.bind(this)).$promise;
		}

		function updateAccount(account, callback) {
			var cb = callback || angular.noop;

			return Account.save(account,
				function () {
					return cb(account);
				},
				function (err) {
					return cb(err);
				}.bind(this)).$promise;
		}

	}

})();
