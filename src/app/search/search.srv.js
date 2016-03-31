'use strict';

/**
 * @ngdoc function
 * @name moviedbApp.service:
 * @description
 * # Services specifically used by 'SearchCtrl' 
 */

angular.module('moviedbApp')

	.factory('queryFactory', [
	  '$q',
	  'httpAuth',
	  'movieService',
	    
	  function($q, httpAuth, movieService) {

	  	return {

	  		// TMDb service call
	  		searchMovies : function (query) {
	  			if (!query) {
	  				return $q.reject(query); // would otherwise return undefined
	  			}					
	  			return httpAuth.jsonp(movieService.opts.svcUrl + 'search/movie?query='+query);
				}		

			};
		}]);