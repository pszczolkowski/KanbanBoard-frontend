(function () {
	'use strict';

	angular
		.module('kanbanBoardApp')
		.controller('BoardSettingsController', BoardSettingsController);

	BoardSettingsController.$inject = [
		'$scope',
		'$alert',
		'board',
		'Column',
		'ColumnCreator',
		'ColumnDeleteModal',
		'columns',
		'toaster'];

	function BoardSettingsController($scope, $alert, board, Column, ColumnCreator, ColumnDeleteModal, columns, toaster) {
		$scope.columns = columns;
		$scope.expandedColumn = {
			index: null
		};
		$scope.expandColumn = expandColumn;
		$scope.moveColumnUp = moveColumnUp;
		$scope.moveColumnDown = moveColumnDown;
		$scope.openColumnCreator = openColumnCreator;
		$scope.deleteColumn = deleteColumn;


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

		function deleteColumn(column) {
			if (column.tasks.length > 0) {
				if ($scope.columns.length === 1) {
					$alert('Column cannot be deleted because it contains some tasks');
				} else {
					ColumnDeleteModal.open({
						column: column,
						columns: $scope.columns
					}).then(function (columnId) {
						sendDeleteRequest(column, columnId);
					});
				}
			} else {
				sendDeleteRequest(column);
			}
		}

		function sendDeleteRequest(column, columnId) {
			Column.delete({
				columnId: column.id,
				columnToMove: columnId
			}).$promise.then(function () {
					toaster.pop('success', 'Column has been deleted');
					reloadColumns().then(function () {
						$scope.expandedColumn.index = null;
					});
				}, handleError);
		}
	}
})();
