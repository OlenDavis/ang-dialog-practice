angular.module("myApp", [])
.controller("myController", function($scope){
	console.log('set up');
})
.directive("dialog", function(){
	return {
		restrict: 'E',
		scope = {
			show: '='
		},
		replace: true,
		transclude: true, //custom content for directive
		link: function(scope, element, attrs) {

		}
	};
});