'use strict';

describe('Users factory', function () {
    var Users, User;

    beforeEach(function () {
        module('users');

        inject(function (_Users_, _User_) {
            Users = _Users_;
            User = _User_;
        });

        spyOn(Users._users, 'getList').and.callThrough();
    });

    describe('add', function () {

        it('should add a user', function () {
            var user = new User();

            Users._users.getList.and.returnValue([]);

            Users.add(user);

            expect(Users._users.getList).toHaveBeenCalled();
            expect(Users._users.getList().length).toBe(1);
        });

        it('should get an error', function () {
            var user = {};

            spyOn(console, 'error');

            Users.add(user);

            expect(Users._users.getList).not.toHaveBeenCalled();
            expect(console.error).toHaveBeenCalled();
        });
    });

    describe('remove', function () {

        it('should remove a user', function () {

            Users._users.getList.and.returnValue([{}, {}]);

            Users.remove(0);

            expect(Users._users.getList).toHaveBeenCalled();
            expect(Users._users.getList().length).toBe(1);
        });

        it('should get an error', function () {

            spyOn(console, 'error');
            Users._users.getList.and.returnValue([{}, {}]);

            Users.remove(3);

            expect(Users._users.getList).toHaveBeenCalled();
            expect(Users._users.getList().length).toBe(2);
            expect(console.error).toHaveBeenCalled();
        });
    });

    describe('find', function () {

        it('should find a user', function () {
            spyOn(_, 'find').and.callThrough();

            Users._users.getList.and.returnValue([{
                name: 'userOne'
            }, {
                name: 'userTwo'

            }]);

            var user = Users.find({
                name: 'userTwo'
            });

            expect(user).toEqual({
                name: 'userTwo'

            });
            expect(Users._users.getList).toHaveBeenCalled();
            expect(_.find).toHaveBeenCalledWith([{
                name: 'userOne'
            }, {
                name: 'userTwo'

            }], {
                name: 'userTwo'
            });
        });
    });
});