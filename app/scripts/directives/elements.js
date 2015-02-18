'use strict';

/**
 * @ngdoc directive
 * @name customelementsioApp.directive:elements
 * @description
 * # elements
 */
angular.module('customelementsApp')
  .directive('elements', function () {
    return {
      restrict: 'E',
      transclude: true,
      templateUrl: 'views/templates/listOfElements.html'
    };
  });
