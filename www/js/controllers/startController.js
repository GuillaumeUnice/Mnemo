app.controller('startController', function($scope, $rootScope, $cordovaGeolocation, $ionicPlatform, $cordovaLocalNotification) {

	$scope.displayOverlay = true;
	$scope.startSession = function() {
		console.log("start");
	};
})

