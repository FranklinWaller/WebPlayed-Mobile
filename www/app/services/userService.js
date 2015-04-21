/**
 * Created by franklinwaller on 18/04/15.
 */


app.factory('User', ['$http', function ($http, localStorageService) {
    var service = {
        login: function(email, password, callback){

            /**
             * You may be wondering why i'm using JQuery's ajax function instead of $http
             * $http sends a OPTIONS request to the server to see if access-alow-origin is set
             * Sadly OAuth2 blocks the OPTIONS request so the access-alow-origin is not allowed
             * Then $http fully fails to do the POST request (Which has the access-alow-origin)
             *
             * JQuery's ajax doesn't do this and thus will be used for the authentication call.
             */
            $.ajax({
                url: base_url + "oauth2/token",
                type: 'POST',
                dataType: 'json',
                data: {
                    grant_type: "password",
                    client_id: config.clientId,
                    client_secret: config.clientSecret,
                    email: email,
                    password: password
                },
                success: function(data) {
                    var iframe = $('<iframe></iframe>');

                    iframe.attr('src', base_url + 'login?server_token=' + data.access_token);
                    iframe.load(function(e){
                        $.ajax({
                            url: base_url + 'login?server_token=' + data.access_token,
                            type: 'GET',
                            success: function(hash){
                                var now = new Date();
                                now.setSeconds(now.getSeconds() + data.expires_in);

                                var user = {
                                    userInfo: {},
                                    authData: {
                                        expiresIn: data.expires_in,
                                        expiresDate: now,
                                        accessToken: data.access_token,
                                        hash: hash
                                    }
                                };

                                localStorage.setItem('user', JSON.stringify(user));
                                callback(true);
                            }
                        });
                    });

                    $('body').append(iframe);
                },
                error: function(data) {
                    callback(false);
                }
            });
        },

        logout: function(){
            var iframe = $('<iframe></iframe>');
            iframe.attr('src', base_url + 'logout');

            iframe.load(function(e){

            });

            $('body').append(iframe);
        },

        getInstalledApps: function(callback){
            httpHelper.api('Me/Installed', 'GET', {
                begin: 0,
                end: 50
            }, function(result){
                sessionStorage.setItem('apps', JSON.stringify(result.response));
                callback(result.response);
            });
        },

        getInstalledApp: function(namespace){
            var apps = JSON.parse(sessionStorage.getItem('apps'));
            for (var i = 0; i < apps.length; i++){
                if(apps[i].namespace == namespace) {
                    return apps[i];
                }
            }
        },

        getNotifications: function(callback){
            httpHelper.api('Notification/All', 'GET', {}, function(result){
                callback(result.response);
            });
        }
    };

    return service;
}]);