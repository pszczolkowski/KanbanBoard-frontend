(function () {
	'use strict';

	angular
		.module('kanbanBoardApp')
		.factory('UserInvitingModal', UserInvitingModal);

	UserInvitingModal.$inject = ['$uibModal'];

	function UserInvitingModal($uibModal) {
		return {
			open: open
		};


		function open(params) {
			return $uibModal.open({
				templateUrl: 'views/board/userInvitingModal.html',
				controller: 'UserInvitingModalController',
				size: 'lg',
				resolve: {
					board: function () {
						return params.board;
					}
				}
			}).result;
		}
	}
})();
