"use strict"; 

var app = angular.module('NC', ['infinite-scroll']);

var ProdCtrl = function($scope, $http){
	$http.get('http://api.ecommerce.next-cloud.mx/v1.0/demo.next-cloud.mx/products').success(function (data) {
		$scope.items = data;
		$scope.prods = [];
		$scope.counter = 0;

		$scope.loadMore = function () {
			for (var i = 0; i < 15; i++) {
				++$scope.counter
				$scope.prods.push($scope.items[$scope.counter]);
			};
		}
		$scope.loadMore();
	});
}

app.controller("ProdCtrl", ProdCtrl);

app.controller("CatCtrl", function ($scope, $http) {
	$http.get('http://api.ecommerce.next-cloud.mx/v1.0/demo.next-cloud.mx/menu').success(function (data) {
		$scope.catalog = data;
	})
});


