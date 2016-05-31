'use strict';

describe('genericForm directive', function () {
    var scope, compiledElement, element, compileDirective;

    beforeEach(function () {
        module('components');

        inject(function ($compile, $rootScope) {
            var parentScope = $rootScope.$new();
            parentScope.initialize = jasmine.createSpy();
            var parentParentScope = parentScope.$new();
            scope = parentParentScope.$new();

            compileDirective = function () {
                element = angular.element('<generic-form fields="userFields" action="actionUser()" mode="currentMode"></generic-form>');
                compiledElement = $compile(element)(scope);
                scope.$digest();
            };
        });

    });

    describe('link', function () {
        describe('scope', function () {

            beforeEach(function () {
                scope.userFields = {};
                scope.actionUser = function () {
                };
            });

            it('should initialize scope, create mode', function () {
                scope.currentMode = 'create';

                compileDirective();

                var elementScope = compiledElement.isolateScope();

                expect(elementScope.formName).toBe('Create form');
                expect(elementScope.disabled).toBe(false);
                expect(elementScope.actionLabel).toBe('Create');
            });

            it('should initialize scope, update mode', function () {
                scope.currentMode = 'update';

                compileDirective();

                var elementScope = compiledElement.isolateScope();

                expect(elementScope.formName).toBe('Update form');
                expect(elementScope.disabled).toBe(false);
                expect(elementScope.actionLabel).toBe('Update');
            });

            it('should initialize scope, show mode', function () {
                scope.currentMode = 'show';

                compileDirective();

                var elementScope = compiledElement.isolateScope();

                expect(elementScope.formName).toBe('Show');
                expect(elementScope.disabled).toBe(true);
                expect(elementScope.actionLabel).toBeUndefined();
            });
        });

        describe('scope.doAction', function () {
            var form, elementScope;

            beforeEach(function () {
                scope.userFields = [{
                    name: 'userName'
                }];
                scope.actionUser = function () {
                };
                form = {
                    userName: {
                        $dirty: false
                    }
                };

                compileDirective();

                elementScope = compiledElement.isolateScope();
            });

            it('should do action', function () {
                form.$valid = true;

                spyOn(elementScope, 'action');

                elementScope.doAction(form);

                expect(form.userName.$dirty).toBe(true);
                expect(elementScope.action).toHaveBeenCalled();
            });

            it('should render form errors, ', function () {
                form.$valid = false;

                spyOn(elementScope, 'action');

                elementScope.doAction(form);

                expect(form.userName.$dirty).toBe(true);
                expect(elementScope.action).not.toHaveBeenCalled();
            });
        });

        describe('scope.doAction', function () {
            var elementScope;

            it('should do action', function () {
                compileDirective();

                elementScope = compiledElement.isolateScope();

                spyOn(elementScope, 'action');

                elementScope.close();

                expect(elementScope.$parent.$parent.initialize).toHaveBeenCalled();
            });

        });
    });
});