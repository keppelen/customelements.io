'use strict';

/**
 * @ngdoc function
 * @name customelementsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the customelementsApp
 */
angular.module('customelementsApp')
  .controller('MainCtrl', function ($scope, client, esFactory, $http) {

    // Search
    $scope.search = function() {
      if ( $scope.q.length >= 3 ) {
        $scope.getElements( $scope.q, 1 );
      }
      else if ( $scope.q === '' ) {
        $scope.getElements( null, 1 );
      }
    };

    /* Search in ES
    'term' string para busca,
    'totalSize' por default o ES retorna 100 resultados, passamos uma quantidade caso precise, garantindo todos os dados
    */
    $scope.getElements = function( param, page ) {

      $scope.element = [];
      $scope.totalElements = 0;
      $scope.pageNum = 1;
      $scope.perPage = 25;

      if ( page ) {
        $scope.pageNum = page;
      }

      $scope.param = {
        index: 'elements',
        type: 'element',
        sort: 'stars:desc',
        size: $scope.perPage,
        from: ($scope.pageNum - 1) * $scope.perPage,
      };

      if ( param ) {
        $scope.param.q = param;
      }

      client.search($scope.param, function (error, response) {
        if (error) {
          return;
        }

        $scope.totalElements = response.hits.total;

        angular.forEach(response.hits.hits, function(val){
          val._source.id = val._id;
          $scope.element.push( val._source );
        });

        $scope.page = $scope.pageNum;
        $scope.pages = Math.ceil(response.hits.total / $scope.perPage);

      });
    };

    $scope.pageNext = function() {
      $scope.page = $scope.page + 1;
      $scope.getElements( $scope.q, $scope.page);
    };

    $scope.pagePrev = function() {
      $scope.page = $scope.page - 1;
      $scope.getElements(  $scope.q, $scope.page);
    };


    /* Popular Elastics search, depois tem que passar essa lógica para o serviço
        que gerar o JSON, customElementsService no Github
    */
    $scope.insert = function() {
      /* Aqui tem que iniciar com 1, colquei 4, pois no meu ES já havia 3 registros
          antes de fazer a população.
      */
      var count = 4;

      $http({
        method: 'GET',
        url: 'http://localhost:3333/elements.json'
      })
      .success(function( data ){
        console.log( data );

        angular.forEach(data, function(val) {
          client.create({
            index: 'elements',
            type: 'element',
            id: count,
            body: {
              name: val.name,
              owner: val.owner,
              url: val.url,
              owner_url: val.owner_url,
              description: val.description,
              forks: val.forks,
              stars: val.stars,
              created: val.created,
            }
          }, function (error, response) {
            console.log( error, response );
          });
          count++;
        });

      });
    };

    // Init Search
    $scope.getElements( null, 1 );


  });
