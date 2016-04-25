'use strict';

describe('Controller: View1Ctrl', function () {

	var $httpBackend, $q, $scope, View1Ctrl, deferred;

	beforeEach(function () {
		module('view1');

		inject(function ($controller, _$rootScope_,	_$httpBackend_, _$q_) {
            $scope = _$rootScope_.$new();
			$q = _$q_;
			$httpBackend = _$httpBackend_;

			View1Ctrl = $controller('View1Ctrl', {
				$scope: $scope,
				$httpBackend: $httpBackend,
				$q: $q
			});
		});

	});

	describe('log', function () {
		it('should call console.log()', function () {
			var message = '';
			spyOn(console, 'log');

			View1Ctrl.log(message);

			expect(console.log).toHaveBeenCalledWith(message);
		});
	});

	describe('random integer', function () {
		it('should return an Int between two values', function () {
			var min = 1, max = 5;
			var result = View1Ctrl.randomIntegerBetween(min, max);

			expect(result >= min).toBeTruthy();
			// expect(result).toBeGreaterThan(min);
			expect(result <= max).toBeTruthy();
			// expect(result).toBeLessThan(max);
		});
	});

	describe('make URL', function () {
		it('should generate a URL using the function parameter', function () {
			var result = View1Ctrl.makeURL('foo');
			expect(result).toEqual('http://31147849.ngrok.io/api/v1/file/foo');
		});
	});

	describe('initImageWithRandomURL', function () {
		it('should initialize vm.randomImage with a random image from the list', function () {
			spyOn(View1Ctrl, 'randomIntegerBetween');
			spyOn(View1Ctrl, 'makeURL');

			View1Ctrl.initImageWithRandomURL();
			
			expect(View1Ctrl.randomIntegerBetween).toHaveBeenCalledWith(0,3);
			expect(View1Ctrl.makeURL).toHaveBeenCalled();
		});

		it('should initialize vm.randomImage with file3.png', function () {
			spyOn(View1Ctrl, 'randomIntegerBetween').and.returnValue(2);
			spyOn(View1Ctrl, 'makeURL');

			View1Ctrl.initImageWithRandomURL();
			
			expect(View1Ctrl.randomIntegerBetween).toHaveBeenCalledWith(0,3);
			expect(View1Ctrl.makeURL).toHaveBeenCalledWith('file3.png');
		});
	});

	describe('get image from server', function () {

		afterEach(function() {
			$httpBackend.verifyNoOutstandingExpectation();
			$httpBackend.verifyNoOutstandingRequest();
		});
		
		it('should get image from url', inject(function () {
			var response = 'OK', name = 'file1.png';
			
			spyOn(View1Ctrl, 'log');
			expect(View1Ctrl.imageFromServer).not.toBeDefined();
			
			$httpBackend.expectGET('http://31147849.ngrok.io/api/v1/file/file1.png').respond(200, response);

			View1Ctrl.getImageFromServer(name);

			$httpBackend.flush();

			expect(View1Ctrl.log).toHaveBeenCalled();
			expect(View1Ctrl.imageFromServer).toBeDefined();
			expect(View1Ctrl.imageFromServer).toEqual('http://31147849.ngrok.io/api/v1/file/file1.png');
		}));

		it('should fail to get image from url', inject(function () {
			var response = 'KO', name = 'file1.png';
			
			spyOn(View1Ctrl, 'log');
			expect(View1Ctrl.imageFromServer).not.toBeDefined();
			
			$httpBackend.expectGET('http://31147849.ngrok.io/api/v1/file/file1.png').respond(404, response);

			View1Ctrl.getImageFromServer(name);

			$httpBackend.flush();

			expect(View1Ctrl.log).toHaveBeenCalled();
			expect(View1Ctrl.imageFromServer).not.toBeDefined();
		}));
	});

	describe('call promise', function () {

		beforeEach(function() {
			deferred = $q.defer();
			spyOn(View1Ctrl, 'log');
		});
		
		it('should resolve promise', inject(function () {
			var result = {
				statusCode: 200,
				message: 'Promise resolved'
			};
			
			View1Ctrl.callJSONPromise(true);

			$scope.$digest();

			expect(View1Ctrl.log).toHaveBeenCalledWith(result);
		}));

		it('should reject promise', inject(function () {
			var error = {
				statusCode: 500,
				message: 'Promise rejected'
			};

			View1Ctrl.callJSONPromise(false);

			$scope.$digest();

			expect(View1Ctrl.log).toHaveBeenCalledWith(error);
		}));
	});

});