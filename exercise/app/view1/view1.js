'use strict';

angular.module('view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl',
    controllerAs: 'vm'
  });
}])

.controller('View1Ctrl', ['$http', '$q', function($http, $q) {
	// variable declaration
	var vm = this;
	var BASE_URL = 'http://31147849.ngrok.io'; // TODO: volver a generar el día del curso
	vm.imageNames = [
		'file1.png',
		'file2.png',
		'file3.png',
		'file4.png'
	];
	vm.image = undefined;
	vm.imageFromServer = undefined;
	vm.randomImage = undefined;
	vm.fileName = "";

	// public functions
	vm.randomIntegerBetween = randomIntegerBetween;
	vm.initImageWithRandomURL = initImageWithRandomURL;
	vm.getImageFromServer = getImageFromServer;
	vm.callJSONPromise = callJSONPromise;
	vm.log = log;

	// vm.getImageFromServer('file1.png');

	function randomIntegerBetween(min, max) {
		return Math.floor(Math.random() * (max - min)) + min;
	}

	function initImageWithRandomURL() {
		var index = vm.randomIntegerBetween(0, vm.imageNames.length - 1);
		vm.randomImage = makeURL(vm.imageNames[index])
	}

	function getImageFromServer(fileName) {
		var URL = makeURL(fileName);
	    $http.get(URL)
		.then(function(response) {
			vm.log(response); // binary output
	        vm.imageFromServer = URL;
		})
		.catch(function(response) {
		  vm.log('Error: ', response.status, response.data);
		})
		.finally(function() {
		  vm.log("Finished");
		});
	}

	function callJSONPromise(passFailBoolean) {
		var deferred = $q.defer();
		var result = {
			statusCode: 200,
			message: 'Promise resolved'
		};
		var error = {
			statusCode: 500,
			message: 'Promise rejected'
		};
		if (passFailBoolean) {
			deferred.resolve(result);
		} else {
			deferred.reject(error);
		}
		return deferred.promise;
	}

	function makeURL(fileName) {
		var result = BASE_URL + '/api/v1/file/' + fileName;
		return result;
	}

	function log(message) {
		console.log(message);
	}

}]);