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
                        ];
                        scope.currentMode = undefined;
                    };

                    scope.showForm = function (mode, index) {
                        if (index !== undefined) {
                            scope.currentUser = scope.users[index];
                            for (var field = 0; field < scope.userFields.length; field++) {
                                scope.userFields[field].model = scope.currentUser['get' + scope.userFields[field].id.charAt(0).toUpperCase() + scope.userFields[field].id.slice(1)]();
                            }
                        } else {
                            scope.initialize();
                        }
                        scope.currentMode = mode;
                    };

                    scope.actionUser = function () {
                        var index;
                        if (scope.currentMode === scope.CREATE) {
                            var user = new User();
                            for (index = 0; index < scope.userFields.length; index++) {
                                user['set' + scope.userFields[index].id.charAt(0).toUpperCase() + scope.userFields[index].id.slice(1)](scope.userFields[index].model);
                            }
                            Users.add(user);
                            scope.initialize();
                            console.log('user created!');
                        } else if (scope.currentMode === scope.UPDATE) {
                            for (index = 0; index < scope.userFields.length; index++) {
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

                    scope.initialize();
                }
            };
        }
    ]);
