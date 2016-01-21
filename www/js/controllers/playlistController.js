app.controller('playlistController', function($scope, $rootScope, $ionicModal, Youtube) {

  //initialize
  $rootScope.playlists = [];
  $rootScope.currentPlaylist = [];
  
  $scope.videos = [];
  Youtube.getSearchVideos("Edith Piaf").then(function(data){
      $scope.videos = data;
      console.log(data);
    }, function(msg){
      console.log('erreur promesses : ' + msg);
    });

  // initialize datetimePicker
  /*$scope.timePickerObject = {
    inputEpochTime: ((new Date()).getHours() * 60 * 60),  //Optional
    step: 15,  //Optional
    format: 24,  //Optional
    titleLabel: '24-hour Format',  //Optional
    setLabel: 'Set',  //Optional
    closeLabel: 'Close',  //Optional
    setButtonType: 'button-positive',  //Optional
    closeButtonType: 'button-stable',  //Optional
    callback: function (val) {    //Mandatory
      this.inputEpochTime = val;
    }
  };*/

  $scope.selectVideo = function(video) {
    if(video.selected !== undefined) {
      video.selected = !video.selected;
    } else {
      video.selected = true; 
    }
    console.log(video);
  };

  $scope.sendSearch = function(query) {
    Youtube.getSearchVideos(query).then(function(data){
      $scope.videos = data;
      console.log(data);
    }, function(msg){
      console.log('erreur promesses : ' + msg);
    });
  };














$ionicModal.fromTemplateUrl('templates/createList.html', function($ionicModal) {
        $scope.modal = $ionicModal;
    }, {
        // Use our scope for the scope of the modal to keep it simple
        scope: $scope,
        // The animation we want to use for the modal entrance
        animation: 'slide-in-up'
    }); 

  $scope.createList = function(listName) {
    var timePicker = {
      inputEpochTime: ((new Date()).getHours() * 60 * 60),  //Optional
      step: 15,  //Optional
      format: 24,  //Optional
      titleLabel: '24-hour Format',  //Optional
      setLabel: 'Set',  //Optional
      closeLabel: 'Close',  //Optional
      setButtonType: 'button-positive',  //Optional
      closeButtonType: 'button-stable',  //Optional
      callback: function (val) {    //Mandatory
        this.inputEpochTime = val;
      }
    };

    angular.forEach($rootScope.playlists, function(value, key) {
        $rootScope.playlists[key].selected = false;
    });

    $rootScope.playlists.push({name : listName, content : [], time : timePicker, selected : true});  
    $rootScope.currentPlaylist = $rootScope.playlists[$rootScope.playlists.length -1];
  };










})

