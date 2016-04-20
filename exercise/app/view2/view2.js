'use strict';

angular.module('view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl',
    controllerAs: 'vm'
  });
}])

.controller('View2Ctrl', ['Service', '$q', '$timeout', function(Service, $q, $timeout) {
	var vm = this;
	// Variables
	var i = 1;
    vm.status1;
    vm.promise1;
	vm.promise2;
	vm.promise3;
	vm.promise4;
	vm.promise5;

    // functions
    vm.loop = loop;

    function loop() {
    	var aux = 'promise' + i;
    	vm[aux] = 'Waiting';
		if (i > 5) {
			vm.status1 = 'Done!';
			return;
		} else {
			var willSucceed = true;
	    	if (i == 3) willSucceed = false;
	    	Service.createPromise(willSucceed)
	      		.then(function (result) {
	      			vm[aux] = result;
	      			i++;
	      			$timeout(loop, 1000);
	      		}, function (error) {
	      			vm[aux] = error;
	      			i++;
	      			$timeout(loop, 1000);
	      		});
		}
	}
}]);