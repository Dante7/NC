"use strict"; 

var app = angular.module('NC', ['infinite-scroll','ngRoute']);

app.config(function ($locationProvider, $routeProvider) {
  $routeProvider
    .when('/:sku',
    {
      templateUrl: "detail.html",
      controller: "DetailCtrl"
    });
});

var ProdCtrl = function($scope, $http, $filter){
	$http.get('http://api.ecommerce.next-cloud.mx/v1.0/demo.next-cloud.mx/products').success(function (data) {
		$scope.items = data;
		$scope.prods = [];
		$scope.counter = 0;
		$scope.filtro = 'price';
		$scope.reverse = false;
		var orderBy = $filter('orderBy');

		$scope.loadMore = function () {
			for (var i = 0; i < 15; i++) {
				++$scope.counter
				$scope.prods.push($scope.items[$scope.counter]);
				$scope.order();
			};
		}

		$scope.order = function() {
			//console.log($scope.filtro);
			//console.log(($scope.filtro).indexOf('-'));
			$scope.filtro = ($scope.filtro).substring(0,($scope.filtro).indexOf('-'));
			$scope.reverse = ($scope.filtro).substring(($scope.filtro).indexOf('-')+1);
			$scope.prods = orderBy($scope.items, $scope.filtro, $scope.reverse);
		};

		$scope.order();
		$scope.loadMore();
	});
}

app.controller("ProdCtrl", ProdCtrl);

app.controller("CatCtrl", function ($scope, $http) {
	$http.get('http://api.ecommerce.next-cloud.mx/v1.0/demo.next-cloud.mx/menu').success(function (data) {
		$scope.catalog = data;
	})
});


app.controller("DetailCtrl", function ($scope, $http, $routeParams) {
	var sku = $routeParams.sku;
	console.log(sku);
	$http.get('http://api.ecommerce.next-cloud.mx/v1.0/demo.next-cloud.mx/menu').success(function (data) {
		$scope.catalog = data;
	})
});
