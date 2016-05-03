'use strict';

angular
    .module('users')
    .service('User', [
        /* istanbul ignore next */
        function () {
            return function (userName, userSurname, userBirthday, userEmail) {
                var name = userName;
                var surname = userSurname;
                var birthday = userBirthday;
                var email = userEmail;

                /* istanbul ignore next */
                this.getName = function () {
                    return name;
                };

                /* istanbul ignore next */
                this.setName = function (userName) {
                    name = userName;
                };

                /* istanbul ignore next */
                this.getSurname = function () {
                    return surname;
                };

                /* istanbul ignore next */
                this.setSurname = function (userSurname) {
                    surname = userSurname;
                };

                /* istanbul ignore next */
                this.getBirthday = function () {
                    return birthday;
                };

                /* istanbul ignore next */
                this.setBirthday = function (userBirthday) {
                    birthday = userBirthday;
                };

                /* istanbul ignore next */
                this.getEmail = function () {
                    return email;
                };

                /* istanbul ignore next */
                this.setEmail = function (userEmail) {
                    email = userEmail;
                };
            };
        }]
    );