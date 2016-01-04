(function () {
	'use strict';

	angular
		.module('kanbanBoardApp')
		.controller('BoardStatisticsCumulativeFlowController', BoardStatisticsCumulativeFlowController);

	BoardStatisticsCumulativeFlowController.$inject = [
		'$scope', '$stateParams', 'Board'];

	function BoardStatisticsCumulativeFlowController($scope, $stateParams, Board) {
		$scope.load = loadHistory;

		loadHistory();

		function loadHistory() {
			$scope.loading = true;
			$scope.error = false;

			Board.history({boardId: $stateParams.boardId}).$promise
				.then(prepareCumulativeFlowChart, handleError)
				.finally(function () {
					$scope.loading = false;
				});
		}

		function prepareCumulativeFlowChart(history) {
			if (history.data.length === 0 || history.data[0].length <= 3) {
				$scope.tooLittleData = true;
				return;
			}

			for (var i = 0; i < history.data[0].length; i++) {
				for (var j = history.series.length - 2; j >=0 ; j--) {
					history.data[j][i] += history.data[j + 1][i];
				}
			}

			var step = Math.floor(history.labels.length / 5);
			for (var i = 0; i < history.labels.length; i++) {
				if (i % step === 0) {
					history.labels[i] = history.labels[i].slice(0, 11);
				} else {
					history.labels[i] = '';
				}
			}

			$scope.labels = history.labels;
			$scope.data = history.data;
			$scope.series = history.series;
		}

		function handleError() {
			$scope.error = true;
		}
	}
})();
