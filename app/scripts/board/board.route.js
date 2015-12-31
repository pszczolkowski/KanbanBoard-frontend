(function () {
	'use strict';

	angular
		.module('kanbanBoardApp')
		.config(BoardRouteProvider);

	BoardRouteProvider.$inject = ['$stateProvider'];

	function BoardRouteProvider($stateProvider) {
		var resolveBoard = ['$stateParams', 'Board', loadBoard];
		var resolveColumns = ['$stateParams', 'Column', loadColumns];
		var resolveLabels = ['$stateParams', 'Label', loadLabels];

		$stateProvider.state('board', {
			parent: 'root',
			url: '/board/{boardId:int}',
			templateUrl: 'views/board/board.html',
			controller: 'BoardController',
			},
			resolve: {
				board: resolveBoard,
				columns: resolveColumns,
				labels: resolveLabels
			}
		});


		function loadBoard($stateParams, Board) {
			return Board.get({
				boardId: $stateParams.boardId
			}).$promise;
		}

		function loadColumns($stateParams, Column) {
			return Column.query({
				boardId: $stateParams.boardId
			}).$promise;
		}

		function loadLabels($stateParams, Label) {
			return Label.query({
				boardId: $stateParams.boardId
			}).$promise;
		}
	}
})();
