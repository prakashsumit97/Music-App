angular.module('GenreCtrl', []).controller('GenreController', function ($scope, Music, $state, $scope, allGenre, Genre) {
    $scope.goToAddPage = function () {
        $state.go('AddGenre');
    }


    $scope.totalPageCount = allGenre.count;
    $scope.itemsPerPage = 20;
    $scope.pagedItems = [];
    $scope.currentPage = 0;
    $scope.startPage = 0;
    $scope.pageLimit = 4;
    $scope.allPages = Math.ceil($scope.totalPageCount / $scope.itemsPerPage);
    $scope.range = function (start, end) {
        var ret = [];

        if (!end) {
            end = start;
            start = 0;
        }
        for (var i = start; i < end; i++) {
            ret.push(i);
        }
        return ret;
    };

    $scope.prevPage = function () {
        if ($scope.startPage === $scope.currentPage) {
            if ($scope.startPage != 0) {
                $scope.pageLimit = $scope.currentPage;
                $scope.startPage = $scope.currentPage - 4;
            }
        }

        if ($scope.currentPage > 0) {
            $scope.currentPage--;
        }
    };


    $scope.nextPage = function () {

        if ($scope.currentPage < $scope.allPages - 1) {
            if ($scope.pageLimit === $scope.currentPage + 1) {
                $scope.pageLimit = $scope.currentPage + 5;
                $scope.startPage = $scope.currentPage + 1;
            }
            if ($scope.pageLimit > $scope.allPages) {
                $scope.pageLimit = $scope.allPages;
            }
            $scope.currentPage++;
        }
    };

    $scope.$watch('currentPage', function () {
        $scope.refreshData();
    })

    $scope.setPage = function () {
        $scope.currentPage = this.n;
    };

    $scope.refreshData = function () {
        Genre.get({
            page: $scope.currentPage + 1
        }).$promise.then(function (data) {
            $scope.allGenre = data.results;

        });
    }

});
