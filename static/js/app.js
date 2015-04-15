"use strict"; 

/* App Module */

var app = angular.module('NC', ['infinite-scroll','ngRoute','CatControllers','ngSanitize','ngStorage']);

app.config(function ($routeProvider) {
	$routeProvider
		.when('/',
		{
			templateUrl: "catalogo.html",
			controller: "ProdCtrl"
		})
		.when('/prod/:sku',{
			templateUrl: "detail.html",
			controller: "DetailCtrl"		
		});
});
