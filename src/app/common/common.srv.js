'use strict';

/**
 * @ngdoc function
 * @name moviedbApp.service:
 * @description
 * # Services to be used by all modules (as needed)
 */

angular.module('moviedbApp')
	
	// error handling 
  .factory('httpInterceptor', ['$q', function($q) {
	  
    return {
      responseError: function(response)	{
        // @TODO: better handling of errors
        console.error(response.statusText + '(' + response.status + ')');
        console.error(response);
        return $q.reject(response);
      }		    
    };
	}])

  // TMBd service call constructor
  .factory('httpAuth', ['$http', 'movieService', function ($http, movieService) {

    var serviceObj = {};
	  var key = '&api_key=' + movieService.opts.apiKey;
    var callBack = '&callback=' + movieService.opts.callBack;

    ['delete', 'get', 'head', 'jsonp'].forEach(function (method) {
      serviceObj[method] = function (url, config) {
        url += key + callBack;
        return $http[method](url, config);
      };
    });
    
    ['post', 'put'].forEach(function (method) {
      serviceObj[method] = function (url, data, config) {
        url += key + callBack;
        return $http[method](url, data, config);
      };
    });
    
    return serviceObj;
  }])

  // Configuration for TMBd services
  .provider('movieService', function() {
      
    var options = {
      svcUrl: null,
      apiKey: null
    };

    // accessible via the app config
    this.config = function (opt) {
      angular.extend(options, opt);
    };

    // accessible everywhere else (after we've 'set' the config)
    this.$get = ['$http', function ($http) {

      if (!options.svcUrl || !options.apiKey || !options.callBack) {
        throw new Error('Service URL, API Key and Callback must be configured.');
      }

      function loadConfig(data) {
        svc.baseUrl = data.images.base_url;
        svc.posterSize = data.images.poster_sizes[1];
      }

      var svc =  {
        baseUrl: '',
        posterSize: '',
        loadData: function () {
            // chaining not needed
            return $http.jsonp(options.svcUrl+'configuration?api_key='+options.apiKey+'&callback='+options.callBack).success(loadConfig);
        },
        opts: options // @TODO: don't return our configuration options
      };

      return svc;
    }];
   
  });