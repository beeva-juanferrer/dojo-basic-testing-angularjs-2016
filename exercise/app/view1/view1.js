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
	var BASE_URL = 'http://c08080de.ngrok.io'; // TODO: volver a generar el día del curso
	var imageURLs = [
		'http://blog.mwaysolutions.com/wp-content/uploads/2015/04/anghgjhgular-js1212.png',
		'https://angular.io/resources/images/logos/angular2/shield-with-beta.png',
		'http://static1.squarespace.com/static/513914cde4b0f86e34bbb954/513e41b5e4b03d54a0792254/549b12dfe4b0f04436697032/1423595449235/?format=1000w',
		'https://pbs.twimg.com/profile_images/452052193198104577/cARTCYW__400x400.png',
		'http://orthocoders.com/images/bdd_cycle.jpg'
	];
	vm.image;
	vm.imageFromServer;

	// public functions
	vm.randomIntegerBetween = randomIntegerBetween;
	vm.initImageWithRandomURL = initImageWithRandomURL;
	vm.getImageFromServer = getImageFromServer;
	vm.callJSONPromise = callJSONPromise;

	// vm.getImageFromServer('file1.png');

	function randomIntegerBetween(min, max) {
		return Math.floor(Math.random() * (max - min)) + min;
	}

	function initImageWithRandomURL() {
		console.log('entro');
		var index = randomIntegerBetween(0, imageURLs.length - 1);
		console.log(index);
		vm.image = imageURLs[index];
	}

	function getImageFromServer(fileName) {
		var URL = BASE_URL + '/api/v1/file/' + fileName;
		$http({
	        method: 'GET',
	        url: URL
	     }).success(function(data){
	        console.log(data); // binary output
	        vm.imageFromServer = URL;
	    }).error(function(){
	        console.log("error");
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

}]);