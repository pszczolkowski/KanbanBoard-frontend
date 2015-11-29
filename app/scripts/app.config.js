(function () {
	'use strict';

	var config = {
		apiUrl: 'http://localhost:8080/kanbanboard/api'
	};

	angular
		.module('kanbanBoardApp')
		.constant('config', config)
		.run(authenticationConfig)
		.config(routing)
		.config(interceptors)
		.config(externalModules);


	authenticationConfig.$inject = ['$rootScope', '$state', 'Principal', 'Auth'];
	routing.$inject = ['$urlRouterProvider', '$stateProvider', '$breadcrumbProvider'];
	interceptors.$inject = ['$httpProvider'];
	externalModules.$inject = ['cfpLoadingBarProvider'];

	function authenticationConfig($rootScope, $state, Principal, Auth) {
		$rootScope.$on('$stateChangeStart', function (event, toState, toStateParams) {
			$rootScope.toState = toState;
			$rootScope.toStateParams = toStateParams;

			if (Principal.isIdentityResolved()) {
				Auth.authorize();
			}

		});

		$rootScope.back = function() {
			if ($state.get($rootScope.previousStateName) === null) {
				$state.go('dashboard');
			} else {
				$state.go($rootScope.previousStateName, $rootScope.previousStateParams);
			}
		};
	}

	function routing($urlRouterProvider, $stateProvider, $breadcrumbProvider) {
		$urlRouterProvider.otherwise('/');

		$stateProvider.state('root', {
			abstract: true,
			views: {
				'content@': {
					template: '<ui-view />'
				},
				'navbar@': {
					templateUrl: 'views/navbar/navbar.html',
					controller: 'NavbarController'
				}
			},
			resolve: {
				identity: ['Auth', function (Auth) {
					return Auth.authorize();
				}]
			}
		});

		$breadcrumbProvider.setOptions({
			templateUrl: 'views/breadcrumb/breadcrumb.html'
		});
	}

	function interceptors($httpProvider) {
		$httpProvider.interceptors.push('authInterceptor');
	}

	function externalModules(cfpLoadingBarProvider) {
		// Angular loading bar
		cfpLoadingBarProvider.includeSpinner = false;
	}

})();

