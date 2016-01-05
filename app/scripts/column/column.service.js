(function () {
	'use strict';

	angular
		.module('kanbanBoardApp')
		.factory('Column', Column);

	Column.$inject = ['$resource', 'config'];

	function Column($resource, config) {
		return $resource(config.apiUrl + '/column/:columnId', {}, {
			query: {
				transformResponse: transformColumns,
				isArray: true
			},
			get: {
				transformResponse: transformSingleColumn
			},
			update: {
				url: config.apiUrl + '/column',
				method: 'PUT'
			},
			move: {
				url: config.apiUrl + '/column/move',
				method: 'POST'
			},
			delete: {
				url: config.apiUrl + '/column/delete',
				method: 'POST'
			}
		});


		function transformColumns(data) {
			var columns = angular.fromJson(data);
			for (var i = 0; i < columns.length; i++) {
				prepareColumn(columns[i]);
			}

			return columns;
		}

		function transformSingleColumn(data) {
			var column = angular.fromJson(data);
			prepareColumn(column);

			return column;
		}

		function prepareColumn(column) {
			column.tasksSizeSum = sumTaskSizes(column.tasks);

			column.workInProgressLimitExceeded = false;
			if (column.workInProgressLimit) {
				if (column.workInProgressLimitType === 'QUANTITY' && column.tasks.length > column.workInProgressLimit) {
					column.workInProgressLimitExceeded = true;
				} else if (column.workInProgressLimitType === 'SIZE' && column.tasksSizeSum > column.workInProgressLimit) {
					column.workInProgressLimitExceeded = true;
				}
			}
		}

		function sumTaskSizes(tasks) {
			var sum = 0;
			angular.forEach(tasks, function (task) {
				sum += task.size;
			});

			return sum;
		}
	}
})();
