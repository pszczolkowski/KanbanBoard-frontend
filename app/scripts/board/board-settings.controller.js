(function () {
	'use strict';

	angular
		.module('kanbanBoardApp')
		.controller('BoardSettingsController', BoardSettingsController);

	BoardSettingsController.$inject = [
		'$scope',
		'board',
		'Column',
		'columns'];

	function BoardSettingsController($scope, board, Column, columns) {
		$scope.board = board;
		$scope.columns = columns;
		$scope.addColumn = addColumn;


		function addColumn() {
			var column = new Column();
			column.name = $scope.columnName;
			column.boardId = $scope.board.id;

			column.$save();
		}
	}
})();
