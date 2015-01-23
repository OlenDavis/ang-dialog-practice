angular.module("myApp", [])
.controller("MyController", ["$scope", function($scope){
	// 1. all of these should have been attached to this rather than $scope so you can put this controller onto the page with ng-controller="MyController as MyController" and access them from things like {{ MyController.dialogContexts[ 0 ].title }}, which is more clear and even less prototypal-confusion-error-prone than attaching them all just to the $scope
	$scope.dialogContexts = [{
		title: 'A Dialog',
		field: 'something'
	}, {
		title: 'Another Dialog',
		field: 'something else'
	}, {
		title: 'And Another Dialog',
		field: 'with this'
	}, {
		title: 'Dialog Here',
		field: 'stuff here'
	}, {
		title: 'Again Dialog',
		field: 'more text'
	}, {
		title: 'Last Dialog',
		field: 'last text'
	}];
	$scope.modalShown = false;
	$scope.toggleModal = function(selection) {
		$scope.selected = selection;
		$scope.modalShown = !$scope.modalShown;
	};
	$scope.clickDialog = function(selection){
		$scope.selected = selection;
	};
	// It's fine to handle logic here like this, but it's also necessary to use logic like this to hide the things you can't do such as the next/previous buttons (rather than simply not doing them when you click on them).
	// To that end, you might have implemented a method like this.canMoveRight = function( index ) { return index < this.dialogContexts.length - 1; } and then reused that in both a this.moveLeft( index ) { if ( this.canMoveLeft() ) ... } and in the template in an ng-if.
	// All that said, this functionality (i.e. moving left and right and knowing which $index is the one that should be front and center) is the functionality the dialog-shelf directive was meant to encapsulate and make reusable all over; with this controller, you'd have to literally implement all that HTML and instantiate this controller with ng-controller each time you wanted a shelf/carousel of dialogs.
	$scope.moveRight = function(selection){
		if (selection > $scope.dialogContexts.length-2){
			return;
		}
		else {
			$scope.selected = selection+1;
		}
	};
	$scope.moveLeft = function(selection){
		if (selection <1){
			return;
		}
		else{
			$scope.selected = selection-1;
		}
	};

}])
.directive("dialog", function(){
	return {
		restrict: 'E',
		//will use show variable to determine if showing modal or not
		scope: {
			shown: '='
		},
		replace: true,
		transclude: true, //custom content for directive, will be used to indicate where content goes
		link: function(scope, element, attrs) {
			scope.hideModal = function(){
				scope.shown = false;
			};
		},
		template:
		// ng-show is functional, but less performant, because if you had a lot of these, they'd all be fully rendered and sitting on the page (with all their $watch's being evaluated every digest loop), even when this ng-show evaluates to falsey. To do this performantly, you would need to use ng-if; but, if you use ng-if you wouldn't be able to use ng-transclude to transclude the dialog's contents because it would bind the transcluded contents to the dialog's isolate scope rather than the scope of wherever the dialog is used. And that's one of the two things that together make this particular programming challenge truly challenging. (The other of the two things that make this a true challenge is how do you make this directive such that it can be used anywhere inside an element with overflow: hidden, and not have that element crop the dialog and its backdrop.)
		"<div class='ng-modal' ng-show='shown'>" +
		//overlay will add a dim effect behind the modal
			"<div class='ng-modal-overlay' ng-click='hideModal()'></div>" +
			"<div class='ng-modal-dialog' ng-style='dialogStyle'>" +
				"<div class='ng-modal-close' ng-click='hideModal()'>" +
				"<div class='forward-slash'></div>" +
				"<div class='backward-slash'></div>" +
				"</div>" +
				"<div class='ng-modal-dialog-content' ng-transclude></div>" +
			"</div>" +
		"</div>"
	};
})
.directive("dialogShelf", function(){
	return {
		restrict: 'E',
		scope: {
			shown: '='
		},
		transclude: true,
		template:
		"<div ng-show='shown' ng-transclude>" +
		"</div>"
	};
});
