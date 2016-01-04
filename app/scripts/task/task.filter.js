(function () {
	'use strict';

	angular
		.module('kanbanBoardApp')
		.filter('taskFilter', taskFilter);

	function taskFilter() {

		return function (tasks, filters) {
			var result = [];
			var title = filters.title && filters.title.toUpperCase();

			for (var i = 0; i < tasks.length; i++) {
				if (titleContains(tasks[i], title) && priorityMatches(tasks[i], filters.priority) &&
					labelMatches(tasks[i], filters.labelId) && assigneeMatches(tasks[i], filters.assigneeId) &&
					columnMatches(tasks[i], filters.columnId)) {
					result.push(tasks[i]);
				}
			}

			return result;
		};


		function titleContains(task, title) {
			return !title || task.title.toUpperCase().indexOf(title) > -1;
		}

		function priorityMatches(task, priority) {
			return !priority || task.priority === priority;
		}

		function labelMatches(task, labelId) {
			return !labelId || task.labelId === labelId;
		}

		function assigneeMatches(task, assigneeId) {
			return !assigneeId || task.assigneeId === assigneeId;
		}

		function columnMatches(task, columnId) {
			return !columnId || task.columnId === columnId;
		}
	}
})();
