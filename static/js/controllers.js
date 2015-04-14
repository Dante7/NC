"use strict"; 

var CatControllers = angular.module('CatControllers', []);

function ProdCtrl($scope, $http, $filter){
	$http.get('http://api.ecommerce.next-cloud.mx/v1.0/demo.next-cloud.mx/products').success(function (data) {
		$scope.items = data;
		$scope.prods = [];
		$scope.counter = 0;
		$scope.filtro = 'price';
		$scope.reverse = true;
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

CatControllers.controller("ProdCtrl", ['$scope', '$http','$filter', ProdCtrl]);

CatControllers.controller("CatCtrl", ['$scope','$http', 
	function ($scope, $http) {
		$http.get('http://api.ecommerce.next-cloud.mx/v1.0/demo.next-cloud.mx/menu').success(function (data) {
			$scope.catalog = data;
		})
}]);


CatControllers.controller("DetailCtrl", ['$scope', '$http', '$routeParams', 
	function ($scope, $http, $routeParams) {
		var sku = $routeParams.sku;
		$http.get('http://api.ecommerce.next-cloud.mx/v1.0/demo.next-cloud.mx/products/' + sku).success(function (data) {
			$scope.detail = data;
			//console.log($scope.detail);
		});
}]);