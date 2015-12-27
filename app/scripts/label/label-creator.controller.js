(function () {
	'use strict';

	angular
		.module('kanbanBoardApp')
		.controller('LabelCreatorController', LabelCreatorController);

	LabelCreatorController.$inject = [
		'$scope',
		'$uibModalInstance',
		'board',
		'Label',
		'toaster'];

	function LabelCreatorController($scope, $uibModalInstance, board, Label, toaster) {
		$scope.label = {
			name: '',
			color: '#000000'
		};
		$scope.errors = {
			duplicatedName: false
		};
		$scope.add = add;


		function add() {
			var label = new Label();
			label.name = $scope.label.name;
			label.color = $scope.label.color;
			label.boardId = board.id;

			label.$save().then(function (createdLabel) {
				$uibModalInstance.close(createdLabel);
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
