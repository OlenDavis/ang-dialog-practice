angular.module("myApp", [])
.controller("MyController", ["$scope", function($scope){
	console.log('set up angular');
	$scope.array = ["1", "2", "3"];
	$scope.modalShown = false;
	$scope.toggleModal = function() {
		$scope.modalShown = !$scope.modalShown;
	};
}])
.directive("dialog", function(){
	return {
		restrict: 'E',
		//will use show variable to determine if showing modal or not
		scope: {
			show: '='
		},
		replace: true,
		transclude: true, //custom content for directive, will be used to indicate where content goes
		link: function(scope, element, attrs) {
			scope.dialogStyle = {};
			if (attrs.width){
				scope.dialogStyle.width = attrs.width;
			}
			if (attrs.height){
				scope.dialogStyle.height = attrs.height;
			}
			scope.hideModal = function(){
				scope.show = false;
			};
		},
		template:
		"<div class='ng-modal' ng-show='show'>" +
		//overlay will add a dim effect behind the modal
			"<div class='ng-modal-overlay' ng-click='hideModal()'></div>" +
			"<div class='ng-modal-dialog' ng-style='dialogStyle'>" +
				"<div class='ng-modal-close' ng-click='hideModal()'></div>" +
				"<div class='ng-modal-dialog-content' ng-transclude>" +
			"</div>" +
		"</div>"
	};
});