'use strict';

/**
 * @ngdoc overview
 * @name customelementsApp
 * @description
 * # customelementsApp
 *
 * Main module of the application.
 */
angular
  .module('customelementsApp', [
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'elasticsearch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about/:id/:slug', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .service('client', function (esFactory) {
    return esFactory({
      host: 'http://localhost:9200',
      log: 'trace'
    });
  })
  .filter('orderObjectBy', function() {
    return function(items, field, reverse) {
      var filtered = [];

      angular.forEach(items, function(item) {
        filtered.push(item);
      });

      filtered.sort(function (a, b) {
        return (a[field] > b[field] ? 1 : -1);
      });

      if( reverse ) {
        filtered.reverse();
      }

      return filtered;
    };
  });
