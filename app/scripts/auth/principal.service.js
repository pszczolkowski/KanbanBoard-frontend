(function () {
	'use strict';

	angular.module('kanbanBoardApp')
		.factory('Principal', Principal);


	Principal.$inject = ['$q', 'Account'];

	function Principal($q, Account) {
			var _identity,
				_authenticated = false;

			return {
				isIdentityResolved: function () {
					return angular.isDefined(_identity);
				},
				isAuthenticated: function () {
					return _authenticated;
				},
				authenticate: function (identity) {
					_identity = identity;
					_authenticated = identity !== null;
				},
				getIdentity: function() {
					return _identity || this.identity();
				},
				identity: function (force) {
					var deferred = $q.defer();

					if (force === true) {
						_identity = undefined;
					}

					// check and see if we have retrieved the identity data from the server.
					// if we have, reuse it by immediately resolving
					if (angular.isDefined(_identity)) {
						deferred.resolve(_identity);

						return deferred.promise;
					}

					// retrieve the identity data from the server, update the identity object, and then resolve.
					Account.get().$promise
						.then(function (account) {
							_identity = account.data;
							_authenticated = true;
							deferred.resolve(_identity);
						})
						.catch(function() {
							_identity = null;
							_authenticated = false;
							deferred.resolve(_identity);
						});
					return deferred.promise;
				}
			};
		}
})();
