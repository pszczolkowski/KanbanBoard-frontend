(function () {
	'use strict';

	angular
		.module('kanbanBoardApp')
		.controller('DashboardController', DashboardController);

	DashboardController.$inject = [
		'$scope',
		'$state',
		'toaster'];

	function DashboardController($scope, $state, toaster) {
	}
})();
