'use strict';

angular
    .module('users')
    .factory('Users', [
        'User',
        function (User) {
            var Users = function () {
                var list = [];

                /* istanbul ignore next */
                this.getList = function () {
                    return list;
                };

                /* istanbul ignore next */
                this.setList = function (usersList) {
                    list = usersList;
                };
            };

            var users = new Users();

            return {
                _users: users,
                getList: users.getList,
                add: function (user) {
                    if (user instanceof User) {
                        users.getList().push(user);
                    } else {
                        console.error(new TypeError('object must be instance of User class'));
                    }
                },
                remove: function (index) {
                    if (users.getList()[index]) {
                        users.getList().splice(index, 1);
                    } else {
                        console.error('user does not exist');
                    }
                },
                find: function (user) {
                    return _.find(users.getList(), user);
                }
            }
        }]
    );