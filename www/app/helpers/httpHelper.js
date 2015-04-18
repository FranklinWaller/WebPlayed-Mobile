var httpHelper = (function(){

    var api = function(url, type, data, callback) {
        var user = localStorage.getItem('user');

        if(user == null) {
            callback({
                loggedIn: false,
                response: {},
                success: false,
                expiredToken: false
            });
            return;
        }

        user = JSON.parse(user);

        var expiresDate = new Date(user.authData.expiresDate);
        var now = new Date();

        if(expiresDate.getTime() < now.getTime()) {
            callback({
                loggedIn: false,
                response: {},
                success: false,
                expiredToken: true
            });

            return;
        }

        data.access_token = user.authData.accessToken;

        $.ajax({
            url: config.api + url,
            type: type,
            data: data,
            beforeSend: function(xhr){
                xhr.setRequestHeader('Cookie', 'hash=' + user.authData.hash);
            },
            success: function(res) {
                callback({
                    loggedIn: true,
                    response: res,
                    success: true,
                    expiredToken: false
                })
            },
            error: function(res) {
                callback({
                    loggedIn: true,
                    response: res,
                    success: false,
                    expiredToken: false
                });
            }
        });
    };

    return {
        api: api
    };

})();