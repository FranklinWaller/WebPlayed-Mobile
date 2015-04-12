var appControllers = angular.module('starter.controllers', []);

appControllers.controller('LoginCtrl', function($scope, $state){
  $scope.login = function(){
      $state.go('tab.dash');
  }
});

appControllers.controller('DashCtrl', function($scope) {
      if (!authenticate.isLoggedIn()) {

      }
    }
);

appControllers.controller('ChatsCtrl', function($scope, Chats) {
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
});

appControllers.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
});

appControllers.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
