(function () {
	'use strict';

	angular
		.module('kanbanBoardApp')
		.directive('boardLabel', boardLabel);


	function boardLabel() {
		return {
			restrict: 'A',
			link: function (scope, element, attributes) {
				element.css('backgroundColor', attributes.boardLabel);
			}
		};
	}
})();
