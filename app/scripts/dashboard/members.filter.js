(function () {
	'use strict';

	angular
		.module('kanbanBoardApp')
		.filter('membersFilter', membersFilter);


	membersFilter.$inject = ['LoggedUser'];

	function membersFilter(LoggedUser) {
		return function (members) {
			var result = [];

			for (var i = 0; i < members.length; i++) {
				if (members[i].userId !== LoggedUser.id) {
					result.push(members[i].username);

					if (result.length >= 3) {
						break;
					}
				}
			}

			result = result.join(', ');
			if (members.length > 4) {
				result += ' and ' + (members.length - 4) + ' other';
			}

			return result;
		};
	}
})();
