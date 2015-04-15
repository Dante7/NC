"use strict"; 

var CatControllers = angular.module('CatControllers', []);

function ProdCtrl($scope, $http, $filter, $localStorage){
	$http.get('http://api.ecommerce.next-cloud.mx/v1.0/demo.next-cloud.mx/products').success(function (data) {
		$scope.items = data;
		$scope.prods = [];
		$scope.counter = 0;
		$scope.filtro = 'price';
		$scope.reverse = true;
		$scope.total = 0;
		var orderBy = $filter('orderBy');

		$scope.save = function(sku, desc, price, img) {
			var producto = {};
			var pay = 0;
			pay = $scope.total + price;
			$scope.total = pay;
			producto = {'sku':sku,'desc':desc, 'price':price, 'img':img};
			$scope.compra = $localStorage.$default({array:[]});
			$scope.compra.array.push(producto);
			//console.log($scope.compra);
			for (var i = $scope.compra.array.length - 1; i >= 0; i--) {
				console.log($scope.compra.array[i]);
			};
			//console.log($scope.total);
			//$localStorage.$reset()
		}

		$scope.loadMore = function () {
			for (var i = 0; i < 15; i++) {
				++$scope.counter
				$scope.prods.push($scope.items[$scope.counter]);
			};
		}

		$scope.order = function() {
			$scope.filtro = ($scope.filtro).substring(0,($scope.filtro).indexOf('-'));
			$scope.reverse = ($scope.filtro).substring(($scope.filtro).indexOf('-')+1);
			$scope.prods = orderBy($scope.prods, $scope.filtro, $scope.reverse);
		};
		$scope.loadMore();
	});	
}

CatControllers.controller("CatCtrl", ['$scope','$http', 
	function ($scope, $http) {
		$http.get('http://api.ecommerce.next-cloud.mx/v1.0/demo.next-cloud.mx/menu').success(function (data) {
			$scope.catalog = data;
		})
}]);

CatControllers.controller("ProdCtrl", ProdCtrl);

CatControllers.controller("DetailCtrl", ['$scope', '$http', '$routeParams','$sce', 
	function ($scope, $http, $routeParams, $sce) {
		var sku = $routeParams.sku;
		$http.get('http://api.ecommerce.next-cloud.mx/v1.0/demo.next-cloud.mx/products/' + sku).success(function (data) {
			$scope.detail = data;
			//$scope.review = $sce.trustAsHtml($scope.detail.review);
			//console.log($scope.detail.review);
			//console.log($scope.detail);
		});
}]);
