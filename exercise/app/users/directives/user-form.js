'use strict';

angular
    .module('users')
    .directive('userForm', [
        'Users', 'User',
        function (Users, User) {
            return {
                restrict: 'EA',
                templateUrl: 'users/directives/user-form.html',
                link: function (scope) {
                    scope.CREATE = 'create';
                    scope.UPDATE = 'update';
                    scope.SHOW = 'show';

                    scope.users = Users.getList();

                    scope.initialize = function () {
                        scope.userFields = [
                            {
                                id: 'name',
                                name: 'userName',
                                label: 'Name',
                                model: ''
                            },
                            {
                                id: 'surname',
                                name: 'userSurname',
                                label: 'Surname',
                                model: ''
                            }
                        ];
                        scope.currentMode = undefined;
                    };

                    scope.showForm = function (mode, index) {
                        if (index !== undefined) {
                            scope.currentUser = scope.users[index];
                            scope.userFields[0].model = scope.users[index].getName();
                            scope.userFields[1].model = scope.users[index].getSurname();
                        } else {
                            scope.initialize();
                        }
                        scope.currentMode = mode;
                    };

                    scope.actionUser = function () {
                        if (scope.currentMode === scope.CREATE) {
                            var user = new User();
                            for (var index = 0; index < scope.userFields.length; index ++) {
                                user['set' + scope.userFields[index].id.charAt(0).toUpperCase() + scope.userFields[index].id.slice(1)](scope.userFields[index].model);
                            }
                            Users.add(user);
                            scope.initialize();
                            console.log('user created!');
                        } else if (scope.currentMode === scope.UPDATE) {
                            for (var index = 0; index < scope.userFields.length; index ++) {
                                scope.currentUser['set' + scope.userFields[index].id.charAt(0).toUpperCase() + scope.userFields[index].id.slice(1)](scope.userFields[index].model);
                            }
                            scope.initialize();
                            console.log('user update!');
                        } else {
                            console.log('showing user');
                        }
                    };

                    scope.deleteUser = function (index) {
                        Users.remove(index);
                        scope.initialize();
                        console.log('user delete!');
                    };
                }
            };
        }
    ]);
