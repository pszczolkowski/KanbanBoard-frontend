(function () {
	'use strict';

	angular
		.module('kanbanBoardApp')
		.config(BoardSettingsRouteProvider);

	BoardSettingsRouteProvider.$inject = ['$stateProvider'];

	function BoardSettingsRouteProvider($stateProvider) {
		var resolveBoard = ['$stateParams', 'Board', loadBoard];
		var resolveColumns = ['$stateParams', 'Column', loadColumns];
		var resolveLabels = ['$stateParams', 'Label', loadLabels];

		$stateProvider.state('boardSettings', {
			parent: 'root',
			url: '/board/{boardId:int}/settings',
			views: {
				'': {
					templateUrl: 'views/boardSettings/settings.html'
				},
				'board-settings-board@boardSettings': {
					controller: 'BoardSettingsController',
					templateUrl: 'views/boardSettings/board.html'
				},
				'board-settings-members@boardSettings': {
					controller: 'BoardMembersSettingsController',
					templateUrl: 'views/boardSettings/members.html'
				},
				'board-settings-labels@boardSettings': {
					controller: 'BoardLabelsSettingsController',
					templateUrl: 'views/boardSettings/labels.html'
				}
			},
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
