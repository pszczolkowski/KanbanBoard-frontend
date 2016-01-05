(function () {
	'use strict';

	angular
		.module('kanbanBoardApp')
		.factory('LabelDetails', LabelDetails);

	LabelDetails.$inject = ['$uibModal'];

	function LabelDetails($uibModal) {
		return {
			open: open
		};


		function open(params) {
			return $uibModal.open({
				templateUrl: 'views/label/details.html',
				controller: 'LabelDetailsController',
				size: 'lg',
				resolve: {
					label: function () {
						return params.label;
					},
					labels: function (){
						return params.labels;
					}
				}
			}).result;
		}
	}
})();
