var authenticate = {
    isLoggedIn: function(){
        var user = localStorage.getItem('user');

        if(user != null){
            return true;
        }

        return false;
    }
};