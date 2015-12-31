(function () {
	'use strict';

	var config = {
		apiUrl: 'http://localhost:8080/kanbanboard/api'
	};

	angular
		.module('kanbanBoardApp')
		.constant('config', config)
		.run(authenticationConfig)
		.run(xeditableConfig)
		.config(routing)
		.config(interceptors)
		.config(externalModules);


	authenticationConfig.$inject = ['$rootScope', '$state', 'Auth'];
	xeditableConfig.$inject = ['editableOptions', 'editableThemes'];
	routing.$inject = ['$urlRouterProvider', '$stateProvider'];
	interceptors.$inject = ['$httpProvider'];
	externalModules.$inject = ['cfpLoadingBarProvider'];

	function authenticationConfig($rootScope, $state, Auth) {
		$rootScope.$on('$stateChangeStart', function (event, toState, toStateParams) {
			$rootScope.toState = toState;
			$rootScope.toStateParams = toStateParams;

			Auth.authorize();
		});

		$rootScope.back = function() {
			if ($state.get($rootScope.previousStateName) === null) {
				$state.go('dashboard');
			} else {
				$state.go($rootScope.previousStateName, $rootScope.previousStateParams);
			}
		};
	}

	function xeditableConfig(editableOptions, editableThemes) {
		// set `default` theme
		editableOptions.theme = 'default';

		// overwrite submit button template
		editableThemes['default'].submitTpl = '<button class="btn-flat" type="submit"><i class="fa fa-check green-text"></i></button>';
		editableThemes['default'].cancelTpl = '<button class="btn-flat" ng-click="$form.$cancel()"><i class="fa fa-times red-text text-lighten-2"></i></button>';
	}

	function routing($urlRouterProvider, $stateProvider) {
		$urlRouterProvider.otherwise('/');

		$stateProvider.state('root', {
			abstract: true,
			views: {
				'content@': {
					template: '<div ui-view></div>'
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
	}

	function interceptors($httpProvider) {
		$httpProvider.interceptors.push('authInterceptor');
	}

	function externalModules(cfpLoadingBarProvider) {
		// Angular loading bar
		cfpLoadingBarProvider.includeSpinner = false;
	}

})();

