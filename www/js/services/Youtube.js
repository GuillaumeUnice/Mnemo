app.factory('Youtube', function($http, $q) {
    var factory = {

        getSearchVideos : function(query){
            var deferred = $q.defer();

            var loadAPI = new Promise(function(resolve,reject){
                //gapi.client.setApiKey('AIzaSyAJocfBaEV7ykLKJclh3ZNlLLbo2sGRquU');
                gapi.client.setApiKey("AIzaSyB5S_fhqr_F4ItNhlPUAQmOxiFCatvVJKo");
                gapi.client.load('youtube', 'v3', resolve);
            });

            loadAPI.then(function() {
                var request = gapi.client.youtube.search.list({
                    part : "snippet",
                    type : "video",
                    q : query,
                    maxResults : 20,
                    order : "viewCount",
                    videoDuration : "short"
                });

                request.execute(function(response){
                    //console.log(response.result.items);
                    deferred.resolve(response.result.items);
                });
            });

            return deferred.promise;
        }

    };

    return factory;

})
