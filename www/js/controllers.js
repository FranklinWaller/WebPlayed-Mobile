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

    $scope.register = function(){
        window.open(base_url + 'register', '_system');
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

appControllers.controller('DashCtrl', function($scope, $state, $ionicHistory, User) {
    var apps = localStorage.getItem('apps');
    var user = JSON.parse(localStorage.getItem('user'));

    $scope.doRefresh = function(){
        User.getInstalledApps(function(apps){
            $scope.apps = apps;
            $scope.$broadcast('scroll.refreshComplete');
        });
    };

    $scope.openApp = function(namespace){
        //$ionicHistory.clearHistory();
        //$ionicHistory.clearCache();
        var appUrl = base_url + 'app/' + namespace + '?wbp_refresh_hash=' + user.authData.hash;
        window.open(appUrl, '_blank', config.windowSettings);
        /*$state.go('app',{
            namespace: namespace
        });*/
    };

    if(apps == null) {
        User.getInstalledApps(function(apps){
            $scope.apps = apps;
        });
    } else {
        $scope.apps = JSON.parse(apps);
    }

});

appControllers.controller('ChatsCtrl', function($scope, $state, User) {
    var user = JSON.parse(localStorage.getItem('user'));

    User.getNotifications(function(notifications){
        if(notifications.counter == 0){
            $scope.noItems = true;
        }

        $scope.notifications = notifications.notifications;
    });

    $scope.doRefresh = function(){
        User.getNotifications(function(notifications){
            if(notifications.counter == 0){
                $scope.noItems = true;
            }

            console.log(notifications);

            $scope.notifications = notifications.notifications;
            $scope.$broadcast('scroll.refreshComplete');
        });
    };

    $scope.openApp = function(namespace, action){
        var appUrl = base_url + 'app/' + namespace + action + '&wbp_refresh_hash=' + user.authData.hash;;
        window.open(appUrl, '_blank', config.windowSettings);
        /*$state.go('app', {
            namespace:namespace
        });*/
    };
});

appControllers.controller('ChatDetailCtrl', function($scope, $stateParams, User) {

});

appControllers.controller('AppCtrl', function($scope, $state, $stateParams, $ionicPlatform, $ionicHistory, User) {



    /*var user = JSON.parse(localStorage.getItem('user'));
    var app = User.getInstalledApp($stateParams.namespace);
    var iCanvas = $("#icanvas");
    var iCanvasDOM = document.getElementById('icanvas');

    //App should not be scrollable
    if(app.scrollable == '1'){
        iCanvas.attr('scrolling', 'no');
    } else {
        console.log('Scrolling is a thing');
        iCanvas.attr('scrolling', 'yes');
    }

    $scope.app = {
        url: base_url + 'app/' + $stateParams.namespace + '?wbp_refresh_hash=' + user.authData.hash,
        title: app.title
    };

    $scope.goBack = function(){
        window.history.back();
    };

    $scope.goForward = function(){
        window.history.forward();
    }

    $scope.return = function(){
        //Close the app or otherwise we will get memory problems.
        $scope.app.url = 'about:blank';
        $state.go('tab.dash');
    };*/
});

appControllers.controller('WidgetsCtrl', function($scope, $state, User) {

});

appControllers.controller('AccountCtrl', function($scope, $state, User) {
  $scope.settings = {
    enableFriends: true
  };

    $scope.logout = function(){
        User.logout();

        localStorage.clear();
        $state.go('showcase');
    }
});