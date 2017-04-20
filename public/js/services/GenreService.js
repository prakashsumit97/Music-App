angular.module('GenreService', []).factory('Genre', ['$http', '$q', '$resource', function ($http, $q, $resource) {
    return $resource('http://104.197.128.152:8000/v1/genres/:id', {
        user: '@user'
    });
}]);
