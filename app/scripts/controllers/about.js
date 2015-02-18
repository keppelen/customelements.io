'use strict';

/**
 * @ngdoc function
 * @name customelementsApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the customelementsApp
 */
angular.module('customelementsApp')
  .controller('AboutCtrl', function ($scope, $routeParams, client, esFactory, $http) {
    $scope.id = $routeParams.id;
    $scope.element = [];
    $scope.user = [];

    client.get({
      index: 'elements',
      type: 'element',
      id: $scope.id
    }, function (error, response) {

      if ( response.found ) {
        $scope.element = response._source;

        $http({
          method: 'GET',
          url: 'https://api.github.com/users/' + $scope.element.owner
        })
        .success(function( data ){
          $scope.user = data;
        });
      }
      else {
        console.log( 'Elemento não encontrado' );
      }

    });
  });
