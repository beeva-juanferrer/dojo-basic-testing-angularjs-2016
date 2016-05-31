'use strict';

describe('userForm directive', function () {
    var scope, compiledElement, element, compileDirective, Users, User;

    beforeEach(function () {
        module('users', function ($provide, $compileProvider) {
            $provide.value('User', jasmine.createSpy().and.returnValue(jasmine.createSpyObj('User', ['getName', 'setName'])));

            $compileProvider.directive('genericForm', function () {
                return {
                    priority: 100,
                    terminal: true,
                    restrict: 'EA',
                    template: '<div class="generic-form-fake"></div>'
                };
            });
        });

        inject(function ($compile, $rootScope, _Users_, _User_) {
            scope = $rootScope.$new();
            Users = _Users_;
            User = _User_;

            compileDirective = function () {
                element = angular.element('<user-form></user-form>');
                compiledElement = $compile(element)(scope);
                scope.$digest();
            };
        });

    });

    describe('link', function () {
        describe('scope', function () {

            beforeEach(inject(function () {
                spyOn(Users, 'getList').and.returnValue([]);

                compileDirective();
            }));

            it('should initialize scope', function () {
                var elementScope = element.scope();

                expect(elementScope.CREATE).toBe('create');
                expect(elementScope.UPDATE).toBe('update');
                expect(elementScope.SHOW).toBe('show');
                expect(elementScope.users).toEqual([]);
                expect(elementScope.userFields).toEqual([
                    {
                        id: 'name',
                        name: 'userName',
                        label: 'Name',
                        model: '',
                        required: true
                    },
                    {
                        id: 'surname',
                        name: 'userSurname',
                        label: 'Surname',
                        model: '',
                        required: true
                    },
                    {
                        id: 'birthday',
                        name: 'userBirthday',
                        label: 'Birthday',
                        model: ''
                    },
                    {
                        id: 'email',
                        name: 'userEmail',
                        label: 'Email',
                        model: ''
                    }
                ]);
                expect(elementScope.currentMode).toBeUndefined();
            });
        });

        describe('scope.showForm', function () {
            var elementScope, mode, user, userName = 'name';

            beforeEach(inject(function () {
                user = new User();
                user.getName.and.returnValue(userName);
            }));

            it('should show form for create mode', function () {
                mode = 'create';

                spyOn(Users, 'getList').and.returnValue([]);

                compileDirective();

                elementScope = element.scope();

                spyOn(elementScope, 'initialize');

                elementScope.userFields = [{
                    id: 'name',
                    name: 'userName',
                    label: 'Name',
                    model: ''
                }];

                elementScope.showForm(mode);

                expect(elementScope.userFields[0].model).toBe('');
                expect(elementScope.initialize).toHaveBeenCalled();
                expect(user.getName).not.toHaveBeenCalled();
            });

            it('should show form for update mode', function () {
                mode = 'update';

                spyOn(Users, 'getList').and.returnValue([user]);

                compileDirective();

                elementScope = element.scope();

                spyOn(elementScope, 'initialize');

                elementScope.userFields = [{
                    id: 'name',
                    name: 'userName',
                    label: 'Name',
                    model: ''
                }];

                elementScope.showForm(mode, 0);

                expect(elementScope.userFields[0].model).toBe(userName);
                expect(elementScope.initialize).not.toHaveBeenCalled();
                expect(elementScope.currentMode).toBe(mode);
                expect(user.getName.calls.count()).toBe(3);
            });
        });

        describe('scope.actionUser', function () {
            var elementScope, user, userName = 'name';

            beforeEach(inject(function () {
                user = new User();
                spyOn(Users, 'getList').and.returnValue([]);
                spyOn(Users, 'add');
                spyOn(console, 'log');
                spyOn(console, 'error');

                compileDirective();

                elementScope = element.scope();

                spyOn(elementScope, 'initialize');

                elementScope.userFields = [{
                    id: 'name',
                    name: 'userName',
                    label: 'Name',
                    model: userName
                }];
            }));

            it('should create a user', function () {
                elementScope = element.scope();
                elementScope.currentMode = 'create';

                elementScope.actionUser();

                expect(user.setName).toHaveBeenCalledWith(elementScope.userFields[0].model);
                expect(Users.add).toHaveBeenCalledWith(user);
                expect(elementScope.initialize).toHaveBeenCalled();
                expect(console.log).toHaveBeenCalledWith('user created!');
            });

            it('should update a user', function () {
                elementScope = element.scope();
                elementScope.currentMode = 'update';
                elementScope.currentUser = user;

                elementScope.actionUser();

                expect(user.setName).toHaveBeenCalledWith(elementScope.userFields[0].model);
                expect(Users.add).not.toHaveBeenCalled();
                expect(elementScope.initialize).toHaveBeenCalled();
                expect(console.log).toHaveBeenCalledWith('user update!');
            });

            it('should not update a user', function () {
                elementScope = element.scope();
                elementScope.currentMode = 'update';
                elementScope.currentUser = undefined;

                elementScope.actionUser();

                expect(user.setName).not.toHaveBeenCalled();
                expect(elementScope.initialize).not.toHaveBeenCalled();
                expect(console.error).toHaveBeenCalledWith('cannot update the user because is missing');
            });

            it('should do nothing', function () {
                elementScope = element.scope();
                elementScope.currentMode = '';

                elementScope.actionUser();

                expect(user.setName).not.toHaveBeenCalled();
                expect(Users.add).not.toHaveBeenCalled();
                expect(elementScope.initialize).not.toHaveBeenCalled();
                expect(console.log).toHaveBeenCalledWith('nothing to do');
            });

        });

        describe('scope.deleteUser', function () {

            it('should delete a user', function () {
                var elementScope, index = 0;

                spyOn(Users, 'remove');
                spyOn(console, 'log');

                compileDirective();

                elementScope = element.scope();

                spyOn(elementScope, 'initialize');

                elementScope.deleteUser(index);

                expect(Users.remove).toHaveBeenCalledWith(index);
                expect(elementScope.initialize).toHaveBeenCalled();
                expect(console.log).toHaveBeenCalledWith('user delete!');
            });
        });
    });
});