'use strict';

/**
 * @ngdoc function
 * @name moviedbApp.controller:SearchCtrl
 * @description
 * # SearchCtrl
 * Controller of the 'Search' page (and 'Home')
 */

 angular.module('moviedbApp')
 	
 	.controller('SearchCtrl', [
 		'$scope', 
 		'localStorageService', 
 		'queryFactory', 
 		'movieService',

 		function ($scope, localStorageService, queryFactory, movieService) {

	 		// retrieve our store (handle page refresh, etc)
	 		var moviesStore = localStorageService.get('movies');
	 		var imgPathStore = localStorageService.get('imgPath');

	 		movieService.loadData(); // @TODO: we can cache this for future use (ie, expire after 24 hours)

		 	$scope.query = '';
		 	$scope.status = '';
		 	$scope.movies = moviesStore || [];
		 	$scope.imgPath = imgPathStore || '';

		 	// set our store, as needed
		 	$scope.$watch('movies', function () {
		 		localStorageService.set('movies', $scope.movies);
		 	}, true);

		 	$scope.$watch('imgPath', function () {
		 		localStorageService.set('imgPath', $scope.imgPath);
		 	}, true);

		 	// process our query
		 	$scope.resultsQuery = function() {
				var promise = queryFactory.searchMovies($scope.query);
		  	promise
			  	.then(function(response) {
						$scope.imgPath = movieService.baseUrl + movieService.posterSize;
					  $scope.movies = response.data.results;
					  if (!$scope.movies.length) {
							$scope.status = 'No matching records found.'; // no results returned
					  }
					})
					.catch(
			  		function(e) {
							if (e.statusText) {
								// @TODO: proper error handling 
								return;		
							}
		      });	
		  };	

			// reset our 'search'
			$scope.clear = function() {
				$scope.query = '';
				$scope.status = '';
				$scope.movies = [];
			};
		}]);
