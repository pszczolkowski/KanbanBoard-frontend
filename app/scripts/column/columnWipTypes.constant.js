(function () {
	'use strict';

	angular
		.module('kanbanBoardApp')
		.constant('columnWipTypes', [{
			name: 'Task quantity',
			value: 'QUANTITY'
		},{
			name: 'Task size',
			value: 'SIZE'
		}]);
})();
