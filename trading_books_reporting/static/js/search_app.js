// Define a new module for our app
var app = angular.module("instantSearch", []);
// Create the instant search filter

app.filter('searchFor', function(){

	// All filters must return a function. The first parameter
	// is the data that is to be filtered, and the second is an
	// argument that may be passed with a colon (searchFor:searchString)
	return function(arr, searchString){
		if(!searchString){
			return arr;
		}
		var result = [];
		searchString = searchString.toLowerCase();
		// Using the forEach helper method to loop through the array
		angular.forEach(arr, function(item){
			if(item.name.toLowerCase().indexOf(searchString) !== -1){
				result.push(item);
			}
		});
		return result;
	};
});

// The controller
function InstantSearchController($scope, $http, $window){
  $http.get('/books')
       .success(function(data, status, headers, config) {
          $scope.books = data;
					$scope.currentBook = data[0];
        })
        .error(function(data, status, headers, config) {
          $scope.books = [];
        });
  /*
			url: 'http://tutorialzine.com/2013/04/services-chooser-backbone-js/',
			title: 'Your First Backbone.js App – Service Chooser',
			image: 'http://cdn.tutorialzine.com/wp-content/uploads/2013/04/service_chooser_form-100x100.jpg'
		}
	];*/
	$scope.changeBook = function(){
		$scope.currentBook = this.book;
		//$window.alert($scope.currentBook.id)
		$scope.$broadcast('BookChanged', this.book.idtradingbook);
	};
}

function PortfolioController($scope, $http, $window){
    $http.get('/portfolios/1')
         .success(function(data, status, headers, config) {
            $scope.portfolios = data;
            //$scope.currentBook = data[0].Name;
             //$window.alert($scope.currentBook)
          })
          .error(function(data, status, headers, config) {
            $scope.portfolios = [];
          });
			$scope.$on('BookChanged', function($event, newBookId){
	 	 		 $window.alert(newBookId);
	 	    	$http.get('/portfolios/'+ newBookId)
	 	              .success(function(data, status, headers, config) {
	 	                 $scope.portfolios = data;
	 	                 //$scope.currentBook = data[0].Name;
	 	                  //$window.alert($scope.currentBook)
	 	               })
	 	               .error(function(data, status, headers, config) {
	 	                 $scope.portfolios = [];
	 	               });
	 	});
}
