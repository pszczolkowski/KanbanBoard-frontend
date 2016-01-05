(function () {
	'use strict';

	angular
		.module('kanbanBoardApp')
		.controller('LabelDetailsController', LabelDetailsController);

	LabelDetailsController.$inject = [
		'$scope',
		'$uibModalInstance',
		'Label',
		'label',
		'labels',
		'labelColors',
		'toaster'];

	function LabelDetailsController($scope, $uibModalInstance, Label, label, labels, labelColors, toaster) {
		$scope.label = angular.copy(label);
		$scope.colors = getColorsThatAreNotUsed();
		$scope.errors = {
			duplicatedName: false
		};
		$scope.save = save;


		function getColorsThatAreNotUsed() {
			var resultColors = angular.copy(labelColors);

			for (var i = 0; i < labels.length; i++) {
				var index = resultColors.indexOf(labels[i].color);
				if (index > -1) {
					resultColors.splice(index, 1);
				}
			}

			resultColors.unshift(label.color);
			return resultColors;
		}

		function save() {
			Label.update({
				id: label.id,
				name: $scope.label.name,
				color: $scope.label.color
			}).$promise.then(function () {
					$uibModalInstance.close();
				}, function (reason) {
					if (labelWithGivenNameAlreadyExist(reason)) {
						$scope.errors.duplicatedName = true;
					} else {
						toaster.pop('error', 'Some error occurred');
					}
				});
		}

		function labelWithGivenNameAlreadyExist(reason) {
			if (reason && reason.data && reason.data.fieldErrors) {
				for (var i = 0; i < reason.data.fieldErrors.length; i++) {
					if (reason.data.fieldErrors[i].field === 'name' &&
						reason.data.fieldErrors[i].message === 'label with given name already exists in the board') {
						return true;
					}
				}
			}

			return false;
		}
	}
})();
