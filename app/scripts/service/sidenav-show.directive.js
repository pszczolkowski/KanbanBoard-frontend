(function () {
	'use strict';

	angular
		.module('kanbanBoardApp')
		.directive('sidenavShow', sidenavShow);


	sidenavShow.$inject = ['$timeout'];

	function sidenavShow($timeout) {
		return {
			scope: {
				closeonclick: "@",
				onClose: '&'
			},
			link: function (scope, element, attrs) {
				function onBackgroundClick() {
					scope.onClose();
					$(this).unbind('click', onBackgroundClick);
				}

				element.click(function () {
					$timeout(function () {
						angular.element('#sidenav-overlay, .drag-target').click(onBackgroundClick);
					});
				});

				$timeout(function () {
					element.sideNav({
						menuWidth: (angular.isDefined(attrs.menuwidth)) ? parseInt(attrs.menuwidth) : undefined,
						edge: attrs.sidenavShow ? attrs.sidenavShow : "left",
						closeOnClick: (angular.isDefined(scope.closeonclick)) ? scope.closeonclick == "true" : undefined
					});
				});
			}
		};
	}
})();
