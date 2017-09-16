app.controller("booksCtrl", function($scope,$http, $window, $location) {

	$scope.updateList = function() {
      $http.get("bCategoriesJson").then(function(response) {
      	$scope.bCategories = response.data;
      });
    };


      $scope.states = {};
    $scope.states.activeItem = 'tanah';

    $scope.categoryChosen = function(category) {
    	$http.get("booksJson").then(function(response) {
      	$scope.books = response.data;
      	$scope.mycategory = category.address;
        $scope.states.activeItem=category.name;
      });
	};

});

