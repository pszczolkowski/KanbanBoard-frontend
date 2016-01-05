(function () {
	'use strict';

	angular
		.module('kanbanBoardApp')
		.controller('ColumnDetailsController', ColumnDetailsController);

	ColumnDetailsController.$inject = [
		'$scope',
		'$confirm',
		'$uibModalInstance',
		'Column',
		'column',
		'columnWipTypes',
		'toaster'];

	function ColumnDetailsController($scope, $confirm, $uibModalInstance, Column, column, columnWipTypes, toaster) {
		$scope.column = angular.copy(column);
		$scope.column.workInProgressLimit = $scope.column.workInProgressLimit || 0;
		$scope.errors = {
			duplicatedName: false
		};
		$scope.wipTypes = columnWipTypes;
		$scope.save = save;


		function save() {
			if (workInProgressLimitWillBeExceeded()) {
				$confirm('Chosen configuration will result in exceeding work in progress limit for column. Are you sure?')
					.then(sendUpdateRequest);
			} else {
				sendUpdateRequest();
			}
		}

		function workInProgressLimitWillBeExceeded() {
			if ($scope.column.workInProgressLimit && !column.workInProgressLimitExceeded) {
				if ($scope.column.workInProgressLimitType === 'QUANTITY') {
					return column.tasks.length > $scope.column.workInProgressLimit;
				} else if ($scope.column.workInProgressLimitType === 'SIZE') {
					return column.tasksSizeSum > $scope.column.workInProgressLimit;
				}
			}

			return false;
		}

		function sendUpdateRequest() {
			Column.update({
				id: column.id,
				name: $scope.column.name,
				workInProgressLimit: $scope.column.workInProgressLimit === 0 ? null : $scope.column.workInProgressLimit,
				workInProgressLimitType: $scope.column.workInProgressLimitType
			}).$promise.then(function () {
				$uibModalInstance.close();
			}, function (reason) {
				if (columnWithGivenNameAlreadyExist(reason)) {
					$scope.errors.duplicatedName = true;
				} else {
					toaster.pop('error', 'Some error occurred');
				}
			});
		}

		function columnWithGivenNameAlreadyExist(reason) {
			if (reason && reason.data && reason.data.fieldErrors) {
				for (var i = 0; i < reason.data.fieldErrors.length; i++) {
					if (reason.data.fieldErrors[i].field === 'name' &&
						reason.data.fieldErrors[i].message === 'column with given name already exists in the board') {
						return true;
					}
				}
			}

			return false;
		}
	}
})();
