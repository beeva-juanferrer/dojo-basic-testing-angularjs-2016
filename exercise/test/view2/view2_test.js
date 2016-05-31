'use strict';

describe('Controller: View2Ctrl', function () {

	var $timeout, $q, $scope, View2Ctrl, deferred;
	var ServiceOne;

	beforeEach(function () {
		module('myApp', function ($provide) {
			$provide.value('ServiceOne', jasmine.createSpyObj('ServiceOne', ['createPromise', 'setVariable', 'getVariable']));
		});

		module('view2');

		inject(function ($controller, _$rootScope_,	_$timeout_, _$q_, _ServiceOne_) {
            $scope = _$rootScope_.$new();
			$q = _$q_;
			$timeout = _$timeout_;
			ServiceOne = _ServiceOne_;

			View2Ctrl = $controller('View2Ctrl', {
				$scope: $scope,
				$timeout: $timeout,
				$q: $q,
				ServiceOne: ServiceOne
			});
		});

	});

	describe('#loop', function () {
		beforeEach(function () {
			deferred = $q.defer();
			ServiceOne.createPromise.and.returnValue(deferred.promise);
		});

		it('should change vm.state and vm.promise[i] messages when vm.i is equal to 1', function () {
			View2Ctrl.i = 1;
			
			View2Ctrl.loop();
			
			expect(View2Ctrl.state).toEqual('Executing...');
			expect(View2Ctrl.promise1).toEqual('Waiting');
			expect(View2Ctrl.promise2).toEqual('Waiting for promise result');
			expect(View2Ctrl.promise3).toEqual('Waiting for promise result');
			expect(View2Ctrl.promise4).toEqual('Waiting for promise result');
			expect(View2Ctrl.promise5).toEqual('Waiting for promise result');
		});

		it('should call ServiceOne.createPromise with "true" and resolve the promise when vm.i is equal to 1', function () {
			View2Ctrl.i = 1;

			deferred.resolve('Completed');

			View2Ctrl.loop();

			$scope.$digest();

			expect(ServiceOne.createPromise).toHaveBeenCalledWith(true);
			expect(View2Ctrl.promise1).toEqual('Completed');
		});

		it('should call ServiceOne.createPromise with "false" and resolve the promise when vm.i is equal to 3', function () {
			View2Ctrl.i = 3;
			
			deferred.reject('Failed');

			View2Ctrl.loop();

			$scope.$digest();

			expect(ServiceOne.createPromise).toHaveBeenCalledWith(false);
			expect(View2Ctrl.promise3).toEqual('Failed');
		});

		it('should call ServiceOne.createPromise with "true", resolve the promise and print that the index is odd when vm.i is equal to 1', function () {
			spyOn(console, 'log');
			View2Ctrl.i = 1;
			
			deferred.resolve('Completed');

			View2Ctrl.loop();

			$scope.$digest();
			

			expect(ServiceOne.createPromise).toHaveBeenCalledWith(true);

			$timeout.flush(100);

			expect(console.log).toHaveBeenCalledWith('index is odd: ', 1);
			expect(View2Ctrl.i).toEqual(2);
		});

		it('should call ServiceOne.createPromise with "true", resolve the promise and print that the index is even when vm.i is equal to 4', function () {
			spyOn(console, 'log');
			View2Ctrl.i = 4;
			
			deferred.resolve('Completed');

			View2Ctrl.loop();

			$scope.$digest();
			

			expect(ServiceOne.createPromise).toHaveBeenCalledWith(true);

			$timeout.flush(100);

			expect(console.log).toHaveBeenCalledWith('index is even: ', 4);
			expect(View2Ctrl.i).toEqual(5);
		});
	});

	describe('handling service variable: setServiceVariableAndPrintIt', function (){
		var VALUE = 'abc';
		beforeEach(function () {
			ServiceOne.getVariable.and.returnValue(VALUE);
			spyOn(console, 'log');
		});

		it('should set the variable and print it', function () {
			View2Ctrl.setServiceVariableAndPrintIt(VALUE);

			expect(ServiceOne.setVariable).toHaveBeenCalledWith(VALUE); // getter & setter do not need to be tested, they are trivial cases
			expect(ServiceOne.getVariable).toHaveBeenCalled();
			expect(console.log).toHaveBeenCalledWith(VALUE);
		});
	});

});