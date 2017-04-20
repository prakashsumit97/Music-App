angular.module('HomeCtrl', []).controller('HomeController', function ($scope, Music, $state) {

    $scope.goToAllMusicRecords = function () {
        $state.go('allMusicRecords');
    }
    $scope.goToAllGenre = function () {
        $state.go('allGenres');
    }

});
