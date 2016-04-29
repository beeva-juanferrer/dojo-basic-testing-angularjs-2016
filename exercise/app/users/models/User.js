'use strict';

angular
    .module('users')
    .service('User', [
        function () {
            return function (userName, userSurname, userBirthday, userAddress) {
                var name = userName;
                var surname = userSurname;
                var birthday = userBirthday;
                var address = userAddress;

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
                this.getAddress = function () {
                    return address;
                };

                /* istanbul ignore next */
                this.setAddress = function (userAddress) {
                    address = userAddress;
                };
            };
        }]
    );