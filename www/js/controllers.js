var appControllers = angular.module('starter.controllers', []);

appControllers.controller('ShowcaseCtrl', function($scope, $ionicSlideBoxDelegate, $ionicPopup, $ionicModal, User, $state){

    $scope.slideHasChanged = function ($index) {
        var pagination = document.getElementsByClassName('slider-pager')[0];

        if($index > 0) {
            pagination.style.display = 'block';
        } else {
            pagination.style.display = 'none';
        }
    };

    $scope.user = {};
    $scope.user.email = '';
    $scope.user.password = '';

    $scope.login = function(){
        //$state.go('tab.dash');

        User.login($scope.user.email, $scope.user.password, function(loggedIn){
            console.log(loggedIn);

            if(loggedIn) {
                //logged in and stored in localStorage.
                $scope.modal.hide();
                $state.go('tab.dash');

            } else {
                var alertPopup = $ionicPopup.alert({
                    title: 'Not logged in',
                    template: 'E-mail and/or password is incorrect'
                });
            }
        });
    };

    $ionicModal.fromTemplateUrl('my-modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modal = modal;
    });

    $scope.openModal = function() {
        $scope.modal.show();
    };

    $scope.closeModal = function() {
        $scope.modal.hide();
    };

    $scope.moveToSlide = function(index){
        $ionicSlideBoxDelegate.slide(index);
    };
});

appControllers.controller('LoginCtrl', function($scope, $state){
  $scope.login = function(){
      $state.go('tab.dash');
  }
});

appControllers.controller('DashCtrl', function($scope, $filter) {

    httpHelper.api('Me/Installed', 'GET', {
        begin: 0,
        end: 50
    }, function(result){
        $scope.appsGrouped = $filter('groupBy')(result.response, 3);
    });
});

appControllers.controller('ChatsCtrl', function($scope, Chats) {
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
});

appControllers.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
});

appControllers.controller('AppCtrl', function($scope, $stateParams) {

});

appControllers.controller('AccountCtrl', function($scope, $state) {
  $scope.settings = {
    enableFriends: true
  };

    $scope.logout = function(){
        localStorage.clear();
        $state.go('showcase');
    }
});