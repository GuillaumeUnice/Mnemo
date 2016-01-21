app.factory('Youtube', function($http, $q) {
    var factory = {

        getSearchVideos : function(query){
            var deferred = $q.defer();

            var loadAPI = new Promise(function(resolve,reject){
                gapi.client.setApiKey('AIzaSyAJocfBaEV7ykLKJclh3ZNlLLbo2sGRquU');
                gapi.client.load('youtube', 'v3', resolve);
            });

            loadAPI.then(function() {
                var request = gapi.client.youtube.search.list({
                    part : "snippet",
                    type : "video",
                    q : query,
                    maxResults : 20,
                    order : "viewCount"
                });

                request.execute(function(response){
                    deferred.resolve(response.result.items);
                });
            });

            return deferred.promise;
        }

    };

    return factory;

})
