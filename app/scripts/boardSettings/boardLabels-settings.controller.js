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
		'LabelDetails',
		'labels',
		'toaster'];

	function BoardLabelsSettingsController($scope, board, Label, LabelCreator, LabelDetails, labels, toaster) {
		$scope.labels = labels;
		$scope.openLabelCreator = openLabelCreator;
		$scope.openLabelDetails = openLabelDetails;
		$scope.deleteLabel = deleteLabel;


		function openLabelCreator() {
			LabelCreator.open({
				board: board,
				labels: $scope.labels
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

		function openLabelDetails(label) {
			LabelDetails.open({
				label: label,
				labels: $scope.labels
			}).then(function () {
				toaster.pop('success', 'Label saved');
				reloadLabels();
			});
		}

		function deleteLabel(label) {
			label.$delete().then(function () {
				toaster.pop('success', 'Label has been deleted');
				reloadLabels()
			}, function () {
				toaster.pop('error', 'Some error occurred');
			});
		}
	}
})();
