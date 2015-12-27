(function () {
	'use strict';

	angular
		.module('kanbanBoardApp')
		.controller('ColumnCreatorController', ColumnCreatorController);

	ColumnCreatorController.$inject = [
		'$scope',
		'$uibModalInstance',
		'board',
		'Column',
		'toaster'];

	function ColumnCreatorController($scope, $uibModalInstance, board, Column, toaster) {
		$scope.column = {
			name: '',
			wip: 0
		};
		$scope.errors = {
			duplicatedName: false
		};
		$scope.add = add;


		function add() {
			var column = new Column();
			column.name = $scope.column.name;
			column.workInProgressLimit = $scope.column.wip === 0 ? null : $scope.column.wip;
			column.boardId = board.id;

			column.$save().then(function (createdColumn) {
				$uibModalInstance.close(createdColumn);
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
