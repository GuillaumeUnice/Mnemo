/**
 * Created by user on 24/01/2016.
 */
app.controller('introController', function($scope, $rootScope) {
  var audio = new Audio('chansons/ourson.mp3');
  var ourson = function(){
    audio.play();
  }
  ourson();
})

