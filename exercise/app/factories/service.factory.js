(function () {
  'use strict';

  /**
   * @ngdoc serviceOne
   * @name myApp.factory:ServiceOne
   *
   * @description
   *
   */
  angular
    .module('myApp')
    .factory('ServiceOne', ServiceOne);

  ServiceOne.$inject = ['$q', '$timeout'];
  function ServiceOne($q, $timeout) {
    var vm = this;
    vm.auxVariable = undefined;

    vm.createPromise = createPromise;
    vm.setVariable = setVariable;
    vm.getVariable = getVariable;

    function createPromise(willSucceed) {
      var deferred = $q.defer();
      if (willSucceed) {
        deferred.resolve('Completed');
      } else {
        deferred.reject('Failed');
      }
      return deferred.promise;
    }

    function setVariable(value) {
      vm.auxVariable = value;
    }

    function getVariable() {
      return vm.auxVariable;
    }

    return vm;
  }
}());
