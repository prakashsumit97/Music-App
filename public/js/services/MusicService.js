angular.module('MusicService', []).factory('Music', ['$http', '$q', '$resource', function ($http, $q, $resource) {


    return $resource(' http://104.197.128.152:8000/v1/tracks/:id', {
        title: '@title'
    });
}]);
