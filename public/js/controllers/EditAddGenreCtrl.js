angular.module('EditAddGenreCtrl', []).controller('EditAddGenreController', function ($scope, Music, $state, $scope, Genre, $stateParams, $timeout) {

    if ($stateParams.id) {
        Genre.get({
            id: $stateParams.id
        }).$promise.then(function (data) {
            $scope.genreDetails = data;
            $scope.idExist = true;
        });
    }

    $scope.saveGenre = function (data, valid) {
        if (valid) {
            if (data.id) {
                Genre.save({
                        id: data.id
                    },
                    data).$promise.then(function (data) {
                    $scope.successMsg = 'Genre Updated Successfully'
                    $timeout(function () {
                        $scope.successMsg = ''
                    }, 3000);
                    $state.go('allGenres');
                }, function (error) {
                    $scope.errorMsg = error.data;
                });
            } else {
                Genre.save(data).$promise.then(function (data) {
                    $scope.successMsg = 'Genre Saved Successfully'
                    $timeout(function () {
                        $scope.successMsg = ''
                    }, 3000);
                    $state.go('allGenres');
                }, function (error) {
                    $scope.errorMsg = error.data;
                });
            }
        }
    }

});
