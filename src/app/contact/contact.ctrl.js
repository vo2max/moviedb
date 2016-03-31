'use strict';

/**
 * @ngdoc function
 * @name moviedbApp.controller:ContactCtrl
 * @description
 * # ContactCtrl
 * Controller of the 'Contact' page
 */

angular.module('moviedbApp')
  
  .controller('ContactCtrl', function () {
  	
  	// who we are
  	this.person = {
      name: 'Colin MacDiarmid',
      email: 'colin@macdiarmid.us'
    };
  });
