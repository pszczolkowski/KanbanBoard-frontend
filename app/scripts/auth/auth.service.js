(function () {
	'use strict';

	angular
		.module('kanbanBoardApp')
		.factory('Auth', Auth);

	Auth.$inject = ['$rootScope', '$q', '$state', 'AuthServerProvider', 'Principal', 'Account'];

	function Auth($rootScope, $q, $state, AuthServerProvider, Principal, Account, Activate) {
		return {
			login: login,
			logout: logout,
			authorize: authorize,
			createAccount: createAccount,
			updateAccount: updateAccount
		};


		function login(credentials, callback) {
			callback = callback || angular.noop;
			var deferred = $q.defer();

			AuthServerProvider.login(credentials).then(function (data) {
				// retrieve the logged account information
				Principal.identity(true).then(function(identity) {
					$rootScope.$broadcast('loginSuccess', identity);
					deferred.resolve(data);
				});
				return callback();
			}).catch(function (err) {
				this.logout();
				deferred.reject(err);
				return callback(err);
			}.bind(this));

			return deferred.promise;
		}

		function logout() {
			AuthServerProvider.logout();
			Principal.authenticate(null);
			// Reset state memory
			$rootScope.previousStateName = undefined;
			$rootScope.previousStateNameParams = undefined;
		}

		function authorize(force) {
			var promise = Principal.identity(force);

			promise.then(function() {
				var isAuthenticated = Principal.isAuthenticated();

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
