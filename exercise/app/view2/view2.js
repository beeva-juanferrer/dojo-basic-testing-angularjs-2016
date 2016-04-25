'use strict';

angular.module('view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl',
    controllerAs: 'vm'
  });
}])

.controller('View2Ctrl', ['ServiceOne', '$q', '$timeout', function(ServiceOne, $q, $timeout) {
	var vm = this;
	// Variables
	vm.i = 1;
    vm.state = undefined;
    vm.promise1 = undefined;
	vm.promise2 = undefined;
	vm.promise3 = undefined;
	vm.promise4 = undefined;
	vm.promise5 = undefined;

    // functions
    vm.loop = loop;
    vm.setServiceVariableAndPrintIt = setServiceVariableAndPrintIt;

    function loop() {
    	if (vm.i == 1) {
	    	vm.state = "Executing...";
		    vm.promise1 = "Waiting for promise result";
			vm.promise2 = "Waiting for promise result";
			vm.promise3 = "Waiting for promise result";
			vm.promise4 = "Waiting for promise result";
			vm.promise5 = "Waiting for promise result";
		}
    	var aux = 'promise' + vm.i;
    	vm[aux] = 'Waiting';
		if (vm.i > 5) {
			vm.state = 'Done!';
			vm.i = 1;
			return;
		} else {
			var willSucceed = true;
	    	if (vm.i == 3) willSucceed = false;
	    	ServiceOne.createPromise(willSucceed)
	      		.then(function (result) {
	      			vm[aux] = result;
	      			vm.i++;
	      			$timeout(loop, 1000);
	      		}, function (error) {
	      			vm[aux] = error;
	      			vm.i++;
	      			$timeout(loop, 1000);
	      		});
		}
	}

	function setServiceVariableAndPrintIt(val) {
		ServiceOne.setVariable(val);
		var result = ServiceOne.getVariable();
		console.log(result);
	}
}]);