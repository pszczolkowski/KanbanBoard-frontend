(function () {
	'use strict';

	angular
		.module('kanbanBoardApp')
		.controller('BoardLabelsSettingsController', BoardLabelsSettingsController);

	BoardLabelsSettingsController.$inject = [
		'$scope',
		'board',
		'Label',
		'LabelCreator',
		'labels',
		'toaster'];

	function BoardLabelsSettingsController($scope, board, Label, LabelCreator, labels, toaster) {
		$scope.labels = labels;
		$scope.openLabelCreator = openLabelCreator;


		function openLabelCreator() {
			LabelCreator.open({
				board: board
			}).then(function () {
				toaster.pop('success', 'Label has been created');
				reloadLabels();
			});
		}

		function reloadLabels() {
			Label.query({
				boardId: board.id
			}).$promise.then(function (labels) {
					$scope.labels = labels;
				});
		}
	}
})();
