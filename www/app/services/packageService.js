app.factory('Package', ['$http', 'User', function ($http, User) {
	var service = {
		saveOffline: function(namespace, callback){
			var app = User.getInstalledApp(namespace);
			var fileTransfer = new FileTransfer();
			var uri = encodeURI(app.package);
			fileTransfer.download(uri, encodeURI('cdvfile://localhost/persistent/' + namespace + '.zip'), function(entry){
				service.unpackageApp(entry.toURL(), namespace, callback);
			}, function(err) {
				callback(false);
			});
		},
		
		unpackageApp: function(location, namespace, callback){
			zip.unzip(location, 'cdvfile://localhost/persistent/apps/offline/' + namespace + '/', function(result){
				if (result == -1) {
					callback(false);
					return;
				}
				
				
				
				console.log(JSON.stringify(result));
				
			}, function(event){
				callback(false);
			});
		}
		
	};
	
	return service;
}]);