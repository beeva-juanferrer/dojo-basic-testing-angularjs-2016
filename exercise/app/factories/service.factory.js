(function () {
  'use strict';

  /**
   * @ngdoc service
   * @name myApp.factory:Service
   *
   * @description
   *
   */
  angular
    .module('myApp')
    .factory('Service', Service);

  Service.$inject = ['$q', '$timeout'];
  function Service($q, $timeout) {
    var vm = this;

    vm.createPromise = createPromise;

    function createPromise(willSucceed) {
      var deferred = $q.defer();
      if (willSucceed) {
        deferred.resolve('Completed');
      } else {
        deferred.reject('Failed');
      }
      return deferred.promise;
    }

    return vm;
  }
}());
