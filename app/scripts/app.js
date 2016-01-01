(function () {
	'use strict';

	angular
		.module('kanbanBoardApp', [
			'angular-loading-bar',
			'as.sortable',
			'LocalStorageModule',
			'ngAnimate',
			'ngCookies',
			'ngResource',
			'toaster',
			'truncate',
			'ui.materialize',
			'ui.router',
			'xeditable'
		]);
})();
