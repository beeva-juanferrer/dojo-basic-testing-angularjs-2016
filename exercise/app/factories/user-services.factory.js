(function () {
  'use strict';

  /**
   * @ngdoc service
   * @name kstAgave.factory:UserServices
   *
   * @description
   *
   */
  angular
    .module('myApp')
    .factory('UserServices', UserServices);

  UserServices.$inject = ['$http', '$q'];
  function UserServices($http, $q) {
    var vm = this;

    // Variables
    var url = API.genesisUrl;
    vm.user = undefined;

    // Methods
    vm.getUser = getUser;

    // Functions ------
    function getUser() {
      var deferred = $q.defer();
      var user;
      var lUrl = url + '/user';
      var config = {};

      user = $cookies.getObject(COOKIE_NAME);
      if (user && user.token) {
        config.headers = {
          authorization: user.token,
          'Content-Type': 'application/json'
        };

        $http.get(lUrl, config).then(function (response) {
          vm.user = response.data.data;
          vm.user = fixPictureURL(vm.user);
          deferred.resolve(vm.user);
        }, function () {
          deferred.reject();
        });
      } else {
        deferred.reject();
      }

      return deferred.promise;
    }

    return vm;
  }
}());
