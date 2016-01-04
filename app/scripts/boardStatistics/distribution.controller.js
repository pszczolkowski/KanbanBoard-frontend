(function () {
	'use strict';

	angular
		.module('kanbanBoardApp')
		.controller('BoardStatisticsDistributionController', BoardStatisticsDistributionController);

	BoardStatisticsDistributionController.$inject = [
		'$scope',
		'board',
		'columns',
		'labels',
		'taskFilterFilter',
		'taskPriority'];

	function BoardStatisticsDistributionController($scope, board, columns, labels, taskFilter, taskPriority) {
		$scope.chart = {
			type: 'COLUMN'
		};
		$scope.chartTypes = [
			{name: 'column', value: 'COLUMN'},
			{name: 'label', value: 'LABEL'},
			{name: 'priority', value: 'PRIORITY'},
			{name: 'assignee', value: 'ASSIGNEE'}
		];
		$scope.filters = {
			columnId: null,
			labelId: null,
			priority: null,
			assigneeId: null
		};
		$scope.board = board;
		$scope.boardLabels = labels;
		$scope.columns = columns;
		$scope.taskPriorities = taskPriority;
		$scope.loadStatistics = loadStatistics;

		loadStatistics();


		function loadStatistics() {
			switch ($scope.chart.type) {
				case 'COLUMN':
					prepareStatisticsDistributedBy('columnId', groupColumnsById());
					break;
				case 'LABEL':
					prepareStatisticsDistributedBy('labelId', groupLabelsById());
					break;
				case 'ASSIGNEE':
					prepareStatisticsDistributedBy('assigneeId', groupMembersById());
					break;
				case 'PRIORITY':
					prepareStatisticsDistributedBy('priority', groupPriorities());
					break;
			}
		}

		function fetchAllTasks() {
			var allTasks = [];
			angular.forEach(columns, function (column) {
				allTasks = allTasks.concat(column.tasks);
			});

			return allTasks;
		}

		function groupTasksBy(tasks, field) {
			var groupedTasks = {};

			angular.forEach(tasks, function (task) {
				if (!groupedTasks.hasOwnProperty(task[field])) {
					groupedTasks[task[field]] = [];
				}

				groupedTasks[task[field]].push(task);
			});

			return groupedTasks;
		}

		function prepareChartDataFrom(tasks) {
			$scope.labels = [];
			$scope.values = [];

			angular.forEach(tasks, function (tasks, label) {
				$scope.labels.push(label);
				$scope.values.push(tasks.length);
			});
		}

		function prepareStatisticsDistributedBy(field, labelsGroupedByField) {
			var tasks = fetchAllTasks();
			tasks = taskFilter(tasks, $scope.filters);
			var groupedTasks = groupTasksBy(tasks, field);

			var tasksGroupedByLabels = {};
			angular.forEach(groupedTasks, function (tasks, field) {
				tasksGroupedByLabels[labelsGroupedByField[field]] = tasks;
			});

			prepareChartDataFrom(tasksGroupedByLabels);
		}

		function groupColumnsById() {
			var columnsGroupedById = {};
			angular.forEach(columns, function (column) {
				columnsGroupedById[column.id] = column.name;
			});

			return columnsGroupedById;
		}

		function groupLabelsById() {
			var labelsGroupedById = {
				'null': 'Without label'
			};
			angular.forEach(labels, function (label) {
				labelsGroupedById[label.id] = label.name;
			});

			return labelsGroupedById;
		}

		function groupMembersById() {
			var membersGroupedById = {
				'null': 'Not assigned'
			};
			angular.forEach(board.members, function (member) {
				membersGroupedById[member.userId] = member.username;
			});

			return membersGroupedById;
		}

		function groupPriorities() {
			var groupedPriorities = {};
			angular.forEach(taskPriority, function (priority) {
				groupedPriorities[priority.value] = priority.name;
			});

			return groupedPriorities;
		}

	}
})();
