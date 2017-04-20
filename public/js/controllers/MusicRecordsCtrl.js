angular.module('MusicRecordsCtrl', ['ui.bootstrap']).directive('starRating', function () {
    return {
        restrict: 'A',
        template: '<ul class="rating">' +
            '<li ng-repeat="star in stars" ng-class="star">' + /* ng-click="toggle($index)"*/
            '\u2605' +
            '</li>' +
            '</ul>',
        scope: {
            ratingValue: '=',
            max: '=',
            onRatingSelected: '&'
        },
        link: function (scope, elem, attrs) {

            var updateStars = function () {
                scope.stars = [];
                for (var i = 0; i < scope.max; i++) {
                    scope.stars.push({
                        filled: i < scope.ratingValue
                    });
                }
            };

            scope.toggle = function (index) {
                scope.ratingValue = index + 1;
                scope.onRatingSelected({
                    rating: index + 1
                });
            };

            scope.$watch('ratingValue', function (oldVal, newVal) {
                if (newVal) {
                    updateStars();
                }
            });
        }
    }
}).controller('MusicRecordsController', function ($scope, Music, $state, allRecords, $filter) {
    $scope.allRecords = {};
    $scope.allRecords = allRecords;
    $scope.pageLimit = 4;

    $scope.goToAddPage = function () {
        $state.go('add-music');
    };

    $scope.totalPageCount = allRecords.count;
    //$scope.sortingOrder = 'sortingOrder';
    $scope.itemsPerPage = 20;
    $scope.pagedItems = [];
    $scope.currentPage = 0;
    $scope.startPage = 0;
    $scope.allPages = $scope.totalPageCount / $scope.itemsPerPage;

    var searchMatch = function (haystack, needle) {
        if (!needle) {
            return true;
        }
        return haystack.toLowerCase().indexOf(needle.toLowerCase()) !== -1;
    };

    // init the filtered items
    $scope.search = function () {
        Music.get({
            title: $scope.query
        }).$promise.then(function (data) {
            $scope.allRecords = data;
            $scope.totalPageCount = data.count;
            $scope.allPages = Math.ceil($scope.totalPageCount / $scope.itemsPerPage);
            $scope.pageLimit = $scope.allPages;
            $scope.startPage = 0;
            if ($scope.allPages > 4) {
                $scope.pageLimit = 4;
            }

        });

        $scope.currentPage = 0;
    };

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
        $scope.refreshData();
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
        if ($scope.currentPage < $scope.allPages) {
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
        $scope.refreshData();
    };

    $scope.refreshData = function () {
        Music.get({
            title: $scope.query,
            page: $scope.currentPage + 1
        }).$promise.then(function (data) {
            $scope.allRecords = data;

        });
    }

    $scope.refreshSearch = function () {
        $scope.query = '';
        $scope.startPage = 0;
        $scope.pageLimit = 4;
        $scope.refreshData();
    }


    // functions have been describe process the data for display
    $scope.search();


});
