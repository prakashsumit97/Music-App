angular.module('EditMusicCtrl', []).controller('EditMusicController', function ($scope, Music, $state, Genre, $timeout, trackDetails, genreList) {
    $scope.genreList = angular.copy(genreList.results);
    $scope.record = angular.copy(trackDetails);
    $scope.record.rating = parseInt(trackDetails.rating);
    $scope.ratingArr = [];
    $scope.genreArray = [];
    if (trackDetails.genres) {
        $scope.genreArray = angular.copy(trackDetails.genres);
        for (var i = 0; i < $scope.genreArray.length; i++) {
            var index = $scope.genreList.indexOf($scope.genreArray[i]);
            $scope.genreList.splice(index, 1);
        }
    }

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

    for (var i = 0; i < 10; i++) {
        $scope.ratingArr.push(i);
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
            Music.save({
                    id: record.id
                },
                record).$promise.then(function (data) {
                $scope.successMsg = 'Track Updated Successfully'
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
