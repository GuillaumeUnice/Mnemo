app.controller('playlistController', function($scope, $rootScope, $ionicModal, Youtube, $timeout, $location, localStorageService) {

  function saveStorage() {
    localStorageService.set("currentPlaylist", $rootScope.currentPlaylist);
    localStorageService.set("playlists", $rootScope.playlists);
  }

  function loadStorage() {
    if(localStorageService.isSupported) {
      var test = localStorageService.get("currentPlaylist");
      $rootScope.currentPlaylist = test;
      test = localStorageService.get("playlists");
      $rootScope.playlists = test;
    }
  }

  //initialize
  $scope.nameList = "";

  $rootScope.playlists = [];
  $rootScope.currentPlaylist = [];

  $scope.videos = [];
  /*
  Youtube.getSearchVideos("Edith Piaf").then(function(data){
      $scope.videos = data;
      //console.log(data);
    }, function(msg){
      console.log('erreur promesses : ' + msg);
    });
*/
  $scope.selectVideo = function(video) {
    if(video.selected !== undefined) {
      video.selected = !video.selected;
    } else {
      video.selected = true; 
    }
    //console.log(video);
  };

  $scope.sendSearch = function(query) {
    Youtube.getSearchVideos(query).then(function(data){
      $scope.videos = data;
      //console.log(data);
    }, function(msg){
      console.log('erreur promesses : ' + msg);
    });
  };

  $scope.addVideos = function() {
    //var resultsVideos = [];
    loadStorage();
    angular.forEach($scope.videos, function(value, key) {
      if($scope.videos[key].selected) {
        //resultsVideos.push($scope.videos[key]);
        $rootScope.currentPlaylist.content.push($scope.videos[key]);
      }
    });
    
$rootScope.playlists[$rootScope.currentPlaylist.playlistsRang].content = $rootScope.currentPlaylist.content;

    //console.log($rootScope.playlists);
    //$rootScope.playlists[$rootScope.currentPlaylist.playlistsRang].content.push(resultsVideos);
    //$rootScope.currentPlaylist.content.push(resultsVideos);
    saveStorage();
    //$timeout(function() {
       $location.path("/playlist");
    //}, 3000);


  };

  $scope.deleteVideo = function(video) {

    loadStorage();

    //delete list
    $rootScope.currentPlaylist.content.splice($rootScope.currentPlaylist.content.indexOf(video), 1);

    $rootScope.playlists[$rootScope.currentPlaylist.playlistsRang].content.splice($rootScope.playlists[$rootScope.currentPlaylist.playlistsRang].content.indexOf(video), 1);    
    saveStorage();
    
  };

  $scope.changeList = function(list) {

    var rang = $rootScope.playlists.indexOf(list);

    $rootScope.currentPlaylist = $rootScope.playlists[rang];
  };









  $ionicModal.fromTemplateUrl('templates/deleteList.html', function($ionicModal) {
      $scope.deleteListModal = $ionicModal;
  }, {
      // Use our scope for the scope of the modal to keep it simple
      scope: $scope,
      // The animation we want to use for the modal entrance
      animation: 'slide-in-up'
  }); 

  $ionicModal.fromTemplateUrl('templates/createList.html', function($ionicModal) {
      $scope.createListModal = $ionicModal;
  }, {
      scope: $scope,
      animation: 'slide-in-up'
  });

  $ionicModal.fromTemplateUrl('templates/renameList.html', function($ionicModal) {
      $scope.renameListModal = $ionicModal;
  }, {
      scope: $scope,
      animation: 'slide-in-up'
  }); 

  $scope.createList = function(listName) {
    //alert("createList");
    $scope.createListModal.nameList = "";
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
  
        $rootScope.currentPlaylist.time.inputEpochTime = val;      
        $rootScope.playlists[$rootScope.currentPlaylist.playlistsRang].time.inputEpochTime = val;
        saveStorage();
        //this.inputEpochTime = val;
      }
    };

    angular.forEach($rootScope.playlists, function(value, key) {
        $rootScope.playlists[key].selected = false;
    });
    var length = $rootScope.playlists.length;
    $rootScope.playlists.push({name : listName, content : [], time : timePicker, playlistsRang : length, selected : true});  
    $rootScope.currentPlaylist = $rootScope.playlists[length];

    saveStorage();
    $scope.createListModal.hide();
  };

  $scope.deleteList = function() {
    loadStorage();
    //delete list
    $rootScope.playlists.splice($rootScope.playlists.indexOf($rootScope.currentPlaylist), 1);
    
    if($rootScope.playlists.length !== 0){
      $rootScope.playlists[0].selected = true;
      $rootScope.currentPlaylist = $rootScope.playlists[0];
    } else {
      $rootScope.currentPlaylist = {};
    }

    $scope.deleteListModal.hide();
    saveStorage();
  };

  $scope.renameList = function(newName) {
    loadStorage();
    $scope.renameListModal.newNameList = "";

    $rootScope.currentPlaylist.name = newName;
    $rootScope.playlists[$rootScope.currentPlaylist.playlistsRang].name = newName;

    $scope.renameListModal.hide();
    saveStorage();
  };

})

