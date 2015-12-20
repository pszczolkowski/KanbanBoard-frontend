(function () {
	'use strict';

	angular
		.module('kanbanBoardApp')
		.controller('BoardCreatorController', BoardCreatorController);

	BoardCreatorController.$inject = [
		'$scope',
		'Board',
		'$uibModalInstance',
		'toaster'];

	function BoardCreatorController($scope, Board, $uibModalInstance, toaster) {
		$scope.board = {
			name: ''
		};
		$scope.create = create;


		function create() {
			var board = new Board();
			board.name = $scope.board.name;

			board.$save().then(function (createdBoard) {
				$uibModalInstance.close(createdBoard);
			}, function () {
				toaster.pop('error', 'Some error occured');
			});
		}
	}
})();
