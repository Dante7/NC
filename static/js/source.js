var app = angular.module('NC', []);

app.controller("CatCtrl", function($scope, $http) {
	$http.get('http://api.ecommerce.next-cloud.mx/v1.0/demo.next-cloud.mx/products').success(function(data) {
		$scope.prods = data;
	});
});

