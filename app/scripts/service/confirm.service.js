(function () {
	'use strict';

	angular
		.module('kanbanBoardApp')
		.factory('$confirm', Confirm);

	Confirm.$inject = ['$uibModal'];


	function Confirm($uibModal) {
		return function (text) {
			return $uibModal.open({
				templateUrl: '../../views/fragments/confirm.html',
				controller: ['$scope', function ($scope) {
					$scope.text = text;
				}]
			}).result;
		};
	}
})();
