(function () {
	'use strict';

	angular
		.module('kanbanBoardApp')
		.factory('$alert', Alert);

	Alert.$inject = ['$uibModal'];


	function Alert($uibModal) {
		return function (text) {
			return $uibModal.open({
				templateUrl: '../../views/fragments/alert.html',
				controller: ['$scope', function ($scope) {
					$scope.text = text;
				}]
			}).result;
		};
	}
})();
