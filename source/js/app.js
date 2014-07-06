var lodash = angular.module('lodash', []);
lodash.factory('_', function() {
	return window._; // assumes lodash has already been loaded on the page
});

var myApp = angular.module('myApp',['ngAnimate', 'lodash', 'ui.bootstrap']);
myApp.controller('logIn', function($scope, $window, _, $modal) {
	$scope.signup = function() {
		console.log("click");
		$modal.open({
			templateUrl: 'myModalContent',
			controller: "ModalInstanceCtrl",
			// backdrop: false,
			windowClass: 'aaaaa',
			scope: $scope
		});
	}
});

myApp.controller('globalNavi', function($scope, $window, _) {
	$scope.isSticky = false;
	$scope.isOpenSubRanking = false;
	$scope.isOpenSubTags = false;

	$scope.accordionSubMenu = function(type) {
		if(type === "ranking")
		{
			$scope.isOpenSubRanking = !$scope.isOpenSubRanking;
			$scope.isOpenSubTags = false;
		}
		else
		{
			$scope.isOpenSubTags = !$scope.isOpenSubTags;
			$scope.isOpenSubRanking = false;
		}
	};

	angular.element($window).on("scroll", _.throttle(function() {
		if (this.pageYOffset >= 100)
		{
			$scope.isSticky = true;
		}
		else
		{
			$scope.isSticky = false;
		}
		$scope.$apply();
	}, 100));
});

myApp.controller('ModalInstanceCtrl', function($scope, $window, _) {
	console.log($scope);
});

myApp.directive('a', function() {
	return {
		restrict: 'E',
		link: function(scope, elem, attrs) {
			if(attrs.ngClick || attrs.href === '' || attrs.href === '#')
			{
				elem.on('click', function(e){
					e.preventDefault();
				});
			}
		}
	};
});