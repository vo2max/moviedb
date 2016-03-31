'use strict';

/**
 * @ngdoc overview
 * @name moviedbApp
 * @description
 * # moviedbApp
 *
 * Main module of the application.
 */

 angular.module('moviedbApp', [
		'ngAnimate',
		'ngCookies',
		'ngResource',
		'ngRoute',
		'ngSanitize',
		'ngTouch',
		'LocalStorageModule'
	])

	.config(['localStorageServiceProvider', function(localStorageServiceProvider) {
		localStorageServiceProvider.setPrefix('ls');
	}])
	
	.config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {
			$routeProvider
				.when('/', {
					templateUrl: 'app/search/search.html',
					controller: 'SearchCtrl',
					controllerAs: 'search'
				})
				.when('/contact', {
					templateUrl: 'app/contact/contact.html',
					controller: 'ContactCtrl',
					controllerAs: 'contact'
				})
				.otherwise({
					redirectTo: '/'
			});
			$httpProvider.interceptors.push('httpInterceptor'); // insert our credentials
	}])

	// configure our movie service
	.config(['movieServiceProvider', function (movieServiceProvider) {
		movieServiceProvider.config({
			svcUrl: 'http://api.themoviedb.org/3/',
			apiKey: '42b3e60b6636f50062f6d3579100d83f',
			callBack: 'JSON_CALLBACK'
		});
	}]);
