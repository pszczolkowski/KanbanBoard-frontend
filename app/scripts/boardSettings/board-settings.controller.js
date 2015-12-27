(function () {
	'use strict';

	angular
		.module('kanbanBoardApp')
		.controller('BoardSettingsController', BoardSettingsController);

	BoardSettingsController.$inject = [
		'$scope',
		'board',
		'Column',
		'ColumnCreator',
		'columns',
		'toaster'];

	function BoardSettingsController($scope, board, Column, ColumnCreator, columns, toaster) {
		$scope.columns = columns;
		$scope.expandedColumn = {
			index: null
		};
		$scope.expandColumn = expandColumn;
		$scope.moveColumnUp = moveColumnUp;
		$scope.moveColumnDown = moveColumnDown;
		$scope.openColumnCreator = openColumnCreator;


		function handleError() {
			toaster.pop('error', 'Some error occurred');
		}

		function moveColumnUp(index) {
			Column.move({
				columnId: $scope.columns[index].id,
				position: index - 1
			}).$promise.then(function () {
					toaster.pop('success', 'Column moved');
					reloadColumns().then(function () {
						$scope.expandedColumn.index -= 1;
					});
				}, handleError);
		}

		function moveColumnDown(index) {
			Column.move({
				columnId: $scope.columns[index].id,
				position: index + 1
			}).$promise.then(function () {
					toaster.pop('success', 'Column moved');
					reloadColumns().then(function () {
						$scope.expandedColumn.index += 1;
					});
				}, handleError);
		}

		function reloadColumns() {
			var promise = Column.query({
				boardId: board.id
			}).$promise;

			promise.then(function (columns) {
					$scope.columns = columns;
				});

			return promise;
		}

		function expandColumn(index) {
			if ($scope.expandedColumn.index === index) {
				$scope.expandedColumn.index = null;
			} else {
				$scope.expandedColumn.index = index;
			}
		}

		function openColumnCreator() {
			ColumnCreator.open({
				board: board
			}).then(function () {
				toaster.pop('success', 'Column has been added');
				reloadColumns();
			});
		}
	}
})();
