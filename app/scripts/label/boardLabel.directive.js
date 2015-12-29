(function () {
	'use strict';

	angular
		.module('kanbanBoardApp')
		.directive('boardLabel', boardLabel);


	function boardLabel() {
		return {
			restrict: 'A',
			link: function (scope, element, attributes) {
				var color = attributes.boardLabel || '#ffffff';

				element.css('backgroundColor', color);
				element.css('color', textColorBasedOnBackground(color));
			}
		};


		function textColorBasedOnBackground(bgColor) {
			var rgb = hex2rgb(bgColor);

			var brightness = Math.sqrt(rgb[0] * rgb[0] * 0.241 + rgb[1] * rgb[1] * 0.691 + rgb[2] * rgb[2] * 0.068);
			return brightness < 150 ? '#ffffff' : '#000000';
		}

		function hex2rgb(hexStr){
			var hex = parseInt(hexStr.substring(1), 16);
			var r = (hex & 0xff0000) >> 16;
			var g = (hex & 0x00ff00) >> 8;
			var b = hex & 0x0000ff;
			return [r, g, b];
		}
	}
})();
