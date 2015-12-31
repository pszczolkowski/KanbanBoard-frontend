(function () {
	'use strict';

	angular
		.module('kanbanBoardApp')
		.directive('sidenavHide', sidenavHide);


	function sidenavHide() {
		return {
			restrict: 'A',
			link: function (scope, element, attributes) {
				element.click(function () {
					element.sideNav('hide');
				});
			}
		};
	}
})();
