'use strict';

/**
 * @ngdoc function
 * @name moviedbApp.directive:
 * @description
 * # Directives to be used by all modules (as needed)
 */

angular.module('moviedbApp')
  
  // this fixes an angular/bootstrap navbar issue consisting of 
  //   the 'active' class not being dynamic 
  .directive('bsActiveLink', ['$location', function ($location) {
    
    return {
      restrict: 'A', // use as attribute 
      replace: false,
      link: function (scope, elem) {
        // after the route has changed
        scope.$on('$routeChangeSuccess', function () {
          var hrefs = ['/#' + $location.path(),
            '#' + $location.path(), //html5: false
            $location.path()]; //html5: true
          angular.forEach(elem.find('a'), function (a) {
            a = angular.element(a);
            if (-1 !== hrefs.indexOf(a.attr('href'))) {
              a.parent().addClass('active');
            } else {
              a.parent().removeClass('active');   
            }
          });     
        });
      }
    };
  }])

  // implements boostrap's popovers
  .directive('bsPop', function () {

    return {
      restrict: 'A',
      link: function (scope, elem, attrs) {
        elem.popover({
          trigger: 'hover',
          html: true,
          content: attrs.popHtml,
          placement: attrs.popPlace
        });
      }
    };
  });