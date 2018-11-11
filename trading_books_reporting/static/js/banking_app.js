var app = angular.module('bankingApp', []);
app.controller('Books', ['$scope', '$http', '$window', function($scope, $http, $window) {
     $http.get('/books')
         .success(function(data, status, headers, config) {
            $scope.books = data;
            $scope.currentBook = data[0];
             //$window.alert($scope.currentBook.Name)
          })
          .error(function(data, status, headers, config) {
            $scope.books = [];
          });

    $scope.changeBook = function(){
      $scope.currentBook = this.book;
      //$window.alert($scope.currentBook.id)
      $scope.$broadcast('BookChanged', this.book.id);
    };

}]),

app.controller('Customers', ['$scope', '$http', '$window', function($scope, $http, $window) {
    $http.get('/customers/0')
         .success(function(data, status, headers, config) {
            $scope.customers = data;
            //$scope.currentBook = data[0].Name;
             //$window.alert($scope.currentBook)
          })
          .error(function(data, status, headers, config) {
            $scope.customers = [];
          });
    $scope.$on('BookChanged', function(event, newBookId){
         $http.get('/customers/'+ newBookId)
                  .success(function(data, status, headers, config) {
                     $scope.customers = data;
                     //$scope.currentBook = data[0].Name;
                      //$window.alert($scope.currentBook)
                   })
                   .error(function(data, status, headers, config) {
                     $scope.customers = [];
                   });
    });


                              }]),
app.controller('ctrlRead', ['$scope', '$http', '$filter', '$window', function($scope, $http, $filter, $window) {

    // init
    $http.get('/values/0')
         .success(function(data, status, headers, config) {
            pagingLogic($scope, data, $filter, $window)

          })
          .error(function(data, status, headers, config) {
            $scope.customers = [];
          });
    $scope.$on('BookChanged', function(event, newBookId){
         $http.get('/values/'+ newBookId)
                  .success(function(data, status, headers, config) {
                     pagingLogic($scope, data, $filter, $window)
                   })
                   .error(function(data, status, headers, config) {
                     $scope.customers = [];
                   });
    });


    //$scope.items = values;
    //$scope.items = [{"book":8,"date":1538957953415,"value":310},{"book":8,"date":1538957953416,"value":6290},{"book":8,"date":1538957953416,"value":55},{"book":8,"date":1538957953417,"value":1374},{"book":8,"date":1538957953417,"value":9848},{"book":8,"date":1538957953417,"value":836},{"book":8,"date":1538957953418,"value":2599},{"book":8,"date":1538957953418,"value":628},{"book":8,"date":1538957953420,"value":4513},{"book":8,"date":1538957953420,"value":625},{"book":8,"date":1538957953421,"value":1204},{"book":8,"date":1538957953421,"value":3728},{"book":8,"date":1538957953424,"value":1054},{"book":8,"date":1538957953424,"value":4431},{"book":8,"date":1538957953425,"value":5317},{"book":8,"date":1538957953426,"value":3305},{"book":8,"date":1538957953426,"value":2241},{"book":8,"date":1538957953427,"value":2794},{"book":8,"date":1538957953429,"value":6641},{"book":8,"date":1538957953429,"value":4649},{"book":8,"date":1538957953434,"value":9082},{"book":8,"date":1538957953434,"value":1315},{"book":8,"date":1538957953436,"value":6895},{"book":8,"date":1538957953437,"value":9900},{"book":8,"date":1538957953437,"value":4887},{"book":8,"date":1538957953439,"value":2474},{"book":8,"date":1538957953440,"value":7664},{"book":8,"date":1538957953444,"value":3226},{"book":8,"date":1538957953445,"value":6530},{"book":8,"date":1538957953445,"value":1305},{"book":8,"date":1538957953446,"value":6765},{"book":8,"date":1538957953446,"value":6610},{"book":8,"date":1538957953447,"value":5694},{"book":8,"date":1538957953447,"value":3685},{"book":8,"date":1538957953447,"value":4276},{"book":8,"date":1538957953448,"value":8909},{"book":8,"date":1538957953448,"value":1100},{"book":8,"date":1538957953449,"value":4920},{"book":8,"date":1538957953450,"value":1292},{"book":8,"date":1538957953451,"value":3322},{"book":8,"date":1538957953451,"value":3397},{"book":8,"date":1538957953456,"value":5833},{"book":8,"date":1538957953459,"value":3021},{"book":8,"date":1538957953459,"value":3502},{"book":8,"date":1538957953460,"value":513}];
    //$window.alert($scope.items[0]);

}]);

function pagingLogic($scope, data, $filter, $window){

    $scope.sortingOrder = sortingOrder;
    $scope.reverse = false;
    $scope.filteredItems = [];
    $scope.groupedItems = [];
    $scope.itemsPerPage = 20;
    $scope.pagedItems = [];
    $scope.currentPage = 0;
    $scope.items = data;
    //window.alert($scope.items);
    var searchMatch = function (haystack, needle) {
        if (!needle) {
            return true;
        }
        return haystack.toLowerCase().indexOf(needle.toLowerCase()) !== -1;
    };

    // init the filtered items
    $scope.search = function () {
        $scope.filteredItems = $filter('filter')($scope.items, function (item) {
            for(var attr in item) {
                if (searchMatch(item[attr], $scope.query))
                    return true;
            }
            return false;
        });
        // take care of the sorting order
        if ($scope.sortingOrder !== '') {
            $scope.filteredItems = $filter('orderBy')($scope.filteredItems, $scope.sortingOrder, $scope.reverse);
        }
        $scope.currentPage = 0;
        // now group by pages
        $scope.groupToPages();
    };

    // calculate page in place
    $scope.groupToPages = function () {
        $scope.pagedItems = [];

        for (var i = 0; i < $scope.filteredItems.length; i++) {
            if (i % $scope.itemsPerPage === 0) {
                $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)] = [ $scope.filteredItems[i] ];
            } else {
                $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)].push($scope.filteredItems[i]);
            }
        }
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
        if ($scope.currentPage > 0) {
            $scope.currentPage--;
        }
    };

    $scope.nextPage = function () {
        if ($scope.currentPage < $scope.pagedItems.length - 1) {
            $scope.currentPage++;
        }
    };

    $scope.setPage = function () {
        $scope.currentPage = this.n;
    };

    // functions have been describe process the data for display
    $scope.search();

    // change sorting order
    $scope.sort_by = function(newSortingOrder) {
        if ($scope.sortingOrder == newSortingOrder)
            $scope.reverse = !$scope.reverse;

        $scope.sortingOrder = newSortingOrder;

        // icon setup
        $('th i').each(function(){
            // icon reset
            $(this).removeClass().addClass('icon-sort');
        });
        if ($scope.reverse)
            $('th.'+new_sorting_order+' i').removeClass().addClass('icon-chevron-up');
        else
            $('th.'+new_sorting_order+' i').removeClass().addClass('icon-chevron-down');
    };
}

app.directive('fileModel', ['$parse', function ($parse) {
   return {
      restrict: 'A',
      link: function(scope, element, attrs) {
         var model = $parse(attrs.fileModel);
         var modelSetter = model.assign;

         element.bind('change', function(){
            scope.$apply(function(){
               modelSetter(scope, element[0].files[0]);
            });
         });
      }
   };
}]);

app.service('fileUpload', ['$http:', '$window' function ($http:, $window) {
   this.uploadFileToUrl = function(file, uploadUrl){
      var fd = new FormData();
      fd.append('file', file);

      $http:.post(uploadUrl, fd, {
         transformRequest: angular.identity,
         headers: {'Content-Type': undefined}
      })

      .success(function(){
          $window('success');
      })

      .error(function(){
      });
   }
}]);

app.controller('myCtrl', ['$scope', '$window', 'fileUpload', function($scope, $window, fileUpload){
    $window('hi');
   $scope.uploadFile = function(){
      var file = $scope.myFile;
      $window.alert('hi');
      var uploadUrl = "/fileUpload";
      fileUpload.uploadFileToUrl(file, uploadUrl);
   };
}]);




//ctrlRead.$inject = ['$scope', '$http', '$filter', '$window'];






     /*


app.controller('Values', ['$scope', '$http', '$window',
                              function($scope, $http, $window) {

    $http.get('/values/0')
             .success(function(data, status, headers, config) {

                var values = data;
                var valueArr = values.map(value => parseInt(value.value));
                $scope.totalValue = valueArr.reduce((x,y) => x+y);
                $scope.items = values;
              })
              .error(function(data, status, headers, config) {
                $scope.customers = [];
              });
        $scope.$on('BookChanged', function(event, newBookId){
             $http.get('/values/'+ newBookId)
                      .success(function(data, status, headers, config) {
                         var values = data;
                         var valueArr = values.map(value => parseInt(value.value));
                         $scope.totalValue = valueArr.reduce((x,y) => x+y);
                       })
                       .error(function(data, status, headers, config) {
                         $scope.customers = [];
                       });
        });


}]);

/*
function paging($scope, values){
    // init
    $scope.sortingOrder = sortingOrder;
    $scope.reverse = false;
    $scope.filteredItems = [];
    $scope.groupedItems = [];
    $scope.itemsPerPage = 5;
    $scope.pagedItems = [];
    $scope.currentPage = 0;
    $scope.items = values;

    // calculate page in place
    $scope.groupToPages = function () {
        $scope.pagedItems = [];

        for (var i = 0; i < $scope.filteredItems.length; i++) {
            if (i % $scope.itemsPerPage === 0) {
                $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)] = [ $scope.filteredItems[i] ];
            } else {
                $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)].push($scope.filteredItems[i]);
            }
        }
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
        if ($scope.currentPage > 0) {
            $scope.currentPage--;
        }
    };

    $scope.nextPage = function () {
        if ($scope.currentPage < $scope.pagedItems.length - 1) {
            $scope.currentPage++;
        }
    };

    $scope.setPage = function () {
        $scope.currentPage = this.n;
    };

 }



/*
angular.module('bankingApp',[]).
  controller('Characters', function($scope){
    $scope.names = ['Frodo','Aragorn','Legolas','Gimli'];
    $scope.currentName = $scope.names[0];
    $scope.changeName = function(){
      $scope.currentName = this.name;
      $scope.$broadcast('CharacterChanged', this.name);
    };
    $scope.$on('CharacterDeleted', function(event, removeName){
      var i = $scope.names.indexOf(removeName);
      $scope.names.splice(i,1);
      $scope.currentName = $scope.names[0];
      $scope.$broadcast('CharacterChanged', $scope.currentName);
    })
  }).
  controller('Character', function($scope){
    $scope.info = {'Frodo':{weapon:'Sting',race:'Hobbit'},
                   'Aragorn':{weapon:'Sword', race:'Man'},
                   'Legolas':{weapon:'Bow', race:'Elf'},
                   'Gimli':{weapon:'Axe',race:'Dwarf'}
                 };
     $scope.currentInfo = $scope.info['Frodo'];
     $scope.$on('CharacterChanged', function(event, newCharacter){
       $scope.currentInfo = $scope.info[newCharacter];
     });
     $scope.deleteChar = function(){
       delete $scope.info[$scope.currentName];
       $scope.$emit('CharacterDeleted',$scope.currentName);
     }
  })

*/
