'use strict';

describe('Controller: View1Ctrl', function () {

	var $http, $q, $scope, View1Ctrl;

	beforeEach(function () {
		module('view1');

		inject(function ($controller, _$rootScope_,	_$http_, _$q_) {
			$scope = _$rootScope_.$new();
			$q = _$q_;
			$http = _$http_;

			View1Ctrl = $controller('View1Ctrl', {
				$scope: $scope,
				$http: $http,
				$q: $q
			});
		});

	});

	describe('initImageWithRandomURL', function() {
		it('should initialize vm.randomImage with a random image from the list', function () {
			spyOn(View1Ctrl, 'randomIntegerBetween');
			spyOn(View1Ctrl, 'initImageWithRandomURL');

			View1Ctrl.initImageWithRandomURL();
			
			expect(View1Ctrl.initImageWithRandomURL).toHaveBeenCalled();
			expect(View1Ctrl.randomIntegerBetween).toHaveBeenCalled();
		});
	});
});