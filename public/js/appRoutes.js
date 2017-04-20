angular.module('appRoutes', ['ui.router', 'ui.bootstrap']).config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider, $rootScope) {

    $urlRouterProvider.when('/', '/home').otherwise('/')

    $stateProvider.state('home', {
            url: '/home',
            controller: 'HomeController',
            templateUrl: 'views/home.html'
        }).state('allMusicRecords', {
            url: '/allMusicRecords',
            controller: 'MusicRecordsController',
            templateUrl: 'views/musicRecords.html',
            resolve: {
                allRecords: ['Music', function (Music) {
                    return Music.get({}).$promise.then(function (data) {
                        return data;
                    });

            }]

            }
        })
        .state('add-music', {
            url: '/add-music',
            controller: 'AddMusicController',
            templateUrl: 'views/addMusicRecords.html',
            resolve: {
                genreList: ['Genre', function (Genre) {
                    return Genre.get({}).$promise.then(function (data) {
                        return data;
                    });
            }]

            }
        }).state('edit-music', {
            url: '/edit-music/:id',
            controller: 'EditMusicController',
            templateUrl: 'views/editMusicRecords.html',
            resolve: {
                trackDetails: ['Music', '$stateParams', function (Music, $stateParams) {
                    return Music.get({
                        id: $stateParams.id
                    }).$promise.then(function (data) {
                        return data;
                    });
            }],
                genreList: ['Genre', function (Genre) {
                    return Genre.get({}).$promise.then(function (data) {
                        return data;
                    });
            }]

            }
        }).state('allGenres', {
            url: '/allGenres',
            controller: 'GenreController',
            templateUrl: 'views/genre.html',
            resolve: {
                allGenre: ['Genre', function (Genre) {
                    return Genre.get({}).$promise.then(function (data) {
                        return data;
                    });

            }]

            }
        }).state('editGenre', {
            url: '/editGenre/:id',
            controller: 'EditAddGenreController',
            templateUrl: 'views/editAddGenre.html'
        }).state('AddGenre', {
            url: '/addGenre',
            controller: 'EditAddGenreController',
            templateUrl: 'views/editAddGenre.html'
        });

}]);
