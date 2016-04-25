'use strict';

describe('Controller: View2Ctrl', function () {

	var $timeout, $q, $scope, View2Ctrl, deferred;
	var ServiceOne;

	beforeEach(function () {
		module('myApp', function ($provide) {
			$provide.value('ServiceOne', jasmine.createSpyObj('ServiceOne', ['createPromise', 'setVariable', 'getVariable']));
		});

		module('view2');

// 		module(function ($provide) {
// 			$provide.value('ServiceOne', jasmine.createSpyObj('ServiceOne', ['createPromise', 'setVariable', 'getVariable']));
// 		});

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

	describe('auto loop', function () {
		beforeEach(function () {
			deferred = $q.defer();
			ServiceOne.createPromise.and.returnValue(deferred.promise);
		});

		it('should traverse loop and resolve all promises', function () {
			
			expect(View2Ctrl.state).not.toBeDefined();
			expect(View2Ctrl.i).toEqual(1);

			deferred.resolve('Completed');
			View2Ctrl.loop();

			expect(View2Ctrl.state).toEqual('Executing...');

			$timeout.flush();
			
			expect(View2Ctrl.i).toEqual(2);
			expect(View2Ctrl.state).toEqual('Executing...');
			expect(View2Ctrl.promise1).toEqual('Completed');

			$timeout.flush();

			expect(View2Ctrl.i).toEqual(3);
			expect(View2Ctrl.state).toEqual('Executing...');
			expect(View2Ctrl.promise1).toEqual('Completed');
			expect(View2Ctrl.promise2).toEqual('Completed');

			$timeout.flush();

			expect(View2Ctrl.i).toEqual(4);
			expect(View2Ctrl.state).toEqual('Executing...');
			expect(View2Ctrl.promise1).toEqual('Completed');
			expect(View2Ctrl.promise2).toEqual('Completed');
			expect(View2Ctrl.promise3).toEqual('Completed');

			$timeout.flush();

			expect(View2Ctrl.i).toEqual(5);
			expect(View2Ctrl.state).toEqual('Executing...');
			expect(View2Ctrl.promise1).toEqual('Completed');
			expect(View2Ctrl.promise2).toEqual('Completed');
			expect(View2Ctrl.promise3).toEqual('Completed');
			expect(View2Ctrl.promise4).toEqual('Completed');
		});

		it('should traverse loop and reject all promises', function () {
			
			expect(View2Ctrl.state).not.toBeDefined();
			expect(View2Ctrl.i).toEqual(1);

			deferred.reject('Failed');
			View2Ctrl.loop();

			expect(View2Ctrl.state).toEqual('Executing...');

			$timeout.flush();
			
			expect(View2Ctrl.i).toEqual(2);
			expect(View2Ctrl.state).toEqual('Executing...');
			expect(View2Ctrl.promise1).toEqual('Failed');

			$timeout.flush();

			expect(View2Ctrl.i).toEqual(3);
			expect(View2Ctrl.state).toEqual('Executing...');
			expect(View2Ctrl.promise1).toEqual('Failed');
			expect(View2Ctrl.promise2).toEqual('Failed');

			$timeout.flush();

			expect(View2Ctrl.i).toEqual(4);
			expect(View2Ctrl.state).toEqual('Executing...');
			expect(View2Ctrl.promise1).toEqual('Failed');
			expect(View2Ctrl.promise2).toEqual('Failed');
			expect(View2Ctrl.promise3).toEqual('Failed');

			$timeout.flush();

			expect(View2Ctrl.i).toEqual(5);
			expect(View2Ctrl.state).toEqual('Executing...');
			expect(View2Ctrl.promise1).toEqual('Failed');
			expect(View2Ctrl.promise2).toEqual('Failed');
			expect(View2Ctrl.promise3).toEqual('Failed');
			expect(View2Ctrl.promise4).toEqual('Failed');
		});
	});

	describe('handling service variable', function (){
		var VALUE = 'abc';
		beforeEach(function () {
			ServiceOne.getVariable.and.returnValue(VALUE);
			spyOn(console, 'log');
		});

		it('should set the variable and print it', function () {
			View2Ctrl.setServiceVariableAndPrintIt(VALUE);

			expect(ServiceOne.setVariable).toHaveBeenCalledWith(VALUE);
			expect(ServiceOne.getVariable).toHaveBeenCalled();
			expect(console.log).toHaveBeenCalledWith(VALUE);
		});
	});

});