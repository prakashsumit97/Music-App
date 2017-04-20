angular.module('AddMusicCtrl', []).controller('AddMusicController', function ($scope, Music, $state, genreList, Genre, $timeout) {
    $scope.genreList = angular.copy(genreList.results);
    $scope.genreArray = [];


    $scope.addGenre = function (genreData) {
        $scope.genreArray.push(genreData);
        var index = $scope.genreList.indexOf(genreData);
        $scope.genreList.splice(index, 1);
    }


    $scope.removeGenre = function (genre) {
        var index = $scope.genreArray.indexOf(genre);
        $scope.genreArray.splice(index, 1);
        $scope.genreList.push(genre);

    }

    $scope.saveRecord = function (record, valid) {
        var idArray = [];
        for (var i = 0; i < $scope.genreArray.length; i++) {
            idArray.push($scope.genreArray[i].id)
        }
        if (idArray.length > 0) {
            record.genres = idArray;
        }
        if (valid) {
            Music.save(record).$promise.then(function (data) {
                $scope.successMsg = 'Data Successfully Saved'
                $timeout(function () {
                    $scope.successMsg = ''
                }, 3000);
                $state.go('allMusicRecords');
            }, function (error) {
                $scope.errorMsg = error.data;
            });
        }

    }

});
