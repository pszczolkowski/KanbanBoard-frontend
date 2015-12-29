(function () {
	'use strict';

	angular
		.module('kanbanBoardApp')
		.factory('taskPriority', taskPriority);

	function taskPriority() {
		return [
			{
				name: 'Low',
				value: 'LOW'
			}, {
				name: 'Medium',
				value: 'MEDIUM'
			}, {
				name: 'High',
				value: 'HIGH'
			},
		];
	}
})();
