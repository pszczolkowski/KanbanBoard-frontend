(function () {
	'use strict';

	angular
		.module('kanbanBoardApp', [
			'angular-loading-bar',
			'as.sortable',
			'LocalStorageModule',
			'ncy-angular-breadcrumb',
			'ngAnimate',
			'ngCookies',
			'ngResource',
			'ui.materialize',
			'ui.router',
			'toaster'
		]);
})();