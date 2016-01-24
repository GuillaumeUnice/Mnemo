/**
 * Created by user on 24/01/2016.
 */
app.controller('introController', function($scope, $rootScope) {
  var ourson = function(){
    var audio = new Audio('chansons/ourson.mp3');
    audio.play();
  }
  ourson();
})

