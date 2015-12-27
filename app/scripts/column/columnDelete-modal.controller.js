(function () {
	'use strict';

	angular
		.module('kanbanBoardApp')
		.controller('ColumnDeleteModalController', ColumnDeleteModalController);

	ColumnDeleteModalController.$inject = [
		'$scope',
		'$uibModalInstance',
		'column',
		'columns'];

	function ColumnDeleteModalController($scope, $uibModalInstance, column, columns) {
		$scope.columns = filterOutDeletingColumnFrom(columns);
		$scope.model = {
			columnId: $scope.columns[0].id
		};
		$scope.confirm = confirm;


		function filterOutDeletingColumnFrom() {
			var result = [];

			for (var i = 0; i < columns.length; i++) {
				if (columns[i].id !== column.id) {
					result.push(columns[i]);
				}
			}

			return result;
		}

		function confirm() {
			$uibModalInstance.close($scope.model.columnId);
		}
	}
})();
