'use strict';

angular.module('view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl',
    controllerAs: 'vm'
  });
}])

.controller('View2Ctrl', ['Service', '$q', function(Service, $q) {
	var vm = this;
	// Variables
    vm.status1;
    vm.status2;
    vm.promise1;
	vm.promise2;
	vm.promise3;
	vm.promise4;
	vm.promise5;

    // functions
    vm.run = run;

	function run() {
      // Create 5 promises
      var promises = [];
      var names = [];
      for (var i = 1; i <= 5; i++) {
        var willSucceed = true;
        if (i == 2) willSucceed = false;
        promises.push(Service.createPromise(willSucceed));
      }
      
      // Wait for all promises    
      vm.status1 = 'Waiting';
      vm.status2 = 'Waiting';
      vm.promise1 = 'Waiting';
	  vm.promise2 = 'Waiting';
	  vm.promise3 = 'Waiting';
	  vm.promise4 = 'Waiting';
	  vm.promise5 = 'Waiting';
      $q.all(promises).then(
        function() { 
        	var aux;
        	for(var i=0; i<promises.length; i++){
        		aux = i+1;
        		console.log(promises[i].$$state.value);
        		vm['promise'+aux] = promises[i].$$state.value;
        	}
            vm.status1 = 'Done'; 
        }, 
        function() { 
        	var aux;
        	for(var i=0; i<promises.length; i++){
        		aux = i+1;
        		console.log(promises[i].$$state.value);
        		vm['promise'+aux] = promises[i].$$state.value;
        	}
            vm.status1 = 'Failed'; 
        }
      ).finally(function() {
        vm.status2 = 'Done waiting';
      });
    }
}]);