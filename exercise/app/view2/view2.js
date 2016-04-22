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
    vm.state = undefined;
    vm.promise1 = undefined;
	vm.promise2 = undefined;
	vm.promise3 = undefined;
	vm.promise4 = undefined;
	vm.promise5 = undefined;

    // functions
    vm.loop = loop;

    function loop() {
    	if (i == 1) {
	    	vm.state = "Executing...";
		    vm.promise1 = "Waiting for promise result";
			vm.promise2 = "Waiting for promise result";
			vm.promise3 = "Waiting for promise result";
			vm.promise4 = "Waiting for promise result";
			vm.promise5 = "Waiting for promise result";
		}
    	var aux = 'promise' + i;
    	vm[aux] = 'Waiting';
		if (i > 5) {
			vm.state = 'Done!';
			i = 1;
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