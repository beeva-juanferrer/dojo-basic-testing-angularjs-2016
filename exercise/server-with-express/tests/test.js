var assert = require('assert');
var express = require('express');
var status = require('http-status');
var superagent = require('superagent');
var wagner = require('wagner-core');

var URL_ROOT = 'http://localhost:3000';

describe('Customer Manager API', function() {
  var server;
  var User;

  before(function() {
    var app = express();

    // Bootstrap server
    require('../models/models')(wagner);

    // Make models available in tests
    var deps = wagner.invoke(function(User) {
      return {
        User: User
      };
    });

    User = deps.User;

    app.use(function(req, res, next) {
      User.findOne({}, function(error, user) {
        assert.ifError(error);
        req.user = user;
        next();
      });
    });

    app.use(require('../api')(wagner));

    server = app.listen(3000);
  });

  after(function() {
    // Shut the server down when we're done
    server.close();
  });

  beforeEach(function(done) {
    // Make sure users are empty before each test
    User.remove({}, function(error) {
      assert.ifError(error);
      done();
    });
  });

  beforeEach(function(done) {
    var users = [
      {
        application: "hermes",
        firstName: "firstUser",
        lastName: "lastName",
        email: "email1",
        phone: "123456789",
        birthDate: "09/01/1988"
      },
      {
        application: "hermes",
        firstName: "secondUser",
        lastName: "lastName",
        email: "email2",
        phone: "123456789",
        birthDate: "09/01/1988"
      },
      {
        application: "otherApp",
        firstName: "thirdUser",
        lastName: "lastName",
        email: "email3",
        phone: "123456789",
        birthDate: "09/01/1988"
      }
    ];

    User.create(users, function(error) {
      assert.ifError(error);
      done();
    });
  });

  it('can create a new user', function(done) {
    var payload = {
      data: {
        application: "hermes",
        firstName: "firstUser",
        lastName: "lastName",
        email: "email123",
        phone: "123456789",
        birthDate: "09/01/1988"
      }
    };
    var url = URL_ROOT + '/user/data';
    superagent.post(url)
      .send(payload)
      .end(function(error, res) {
        assert.ifError(error);
        assert.equal(res.status, status.OK);

        var result;
        assert.doesNotThrow(function() {
          result = JSON.parse(res.text);
        });

        assert.equal(result.application, "hermes");
        assert.equal(result.firstName, "firstUser");
        done();
      });
  });

  it('fails to create a new user if one parameter is missing', function(done) {
    var payload = {
      data: {
        application: "hermes",
        firstName: "firstUser",
        lastName: "lastName",
        email: "aaa",
        // phone: "123456789",
        birthDate: "09/01/1988"
      }
    };
    var url = URL_ROOT + '/user/data';
    superagent.post(url)
      .send(payload)
      .end(function(error, res) {
        assert.equal(res.status, status.BAD_REQUEST);
        done();
      });
  });

  it('fails to create a new user if email is present in DB', function(done) {
    var payload = {
      data: {
        application: "hermes",
        firstName: "firstUser",
        lastName: "lastName",
        email: "email1",
        phone: "123456789",
        birthDate: "09/01/1988"
      }
    };
    var url = URL_ROOT + '/user/data';
    superagent.post(url)
      .send(payload)
      .end(function(error, res) {
        assert.equal(res.status, status.FORBIDDEN);
        done();
      });
  });

  it('can get all users', function(done) {
    var url = URL_ROOT + '/users';
    superagent.get(url, function(error, res) {
      assert.ifError(error);
      assert.equal(res.status, status.OK);

      var results;
      assert.doesNotThrow(function() {
        results = JSON.parse(res.text).users;
      });

      assert.equal(results.length, 3);
      assert.equal(results[0].application, "hermes");
      assert.equal(results[2].application, "otherapp");
      assert.equal(results[0].firstName, "firstUser");
      done();
    });
  });

  it('can get all users from a specific application name', function(done) {
    var url = URL_ROOT + '/users/app/hermes';
    // Get products whose name contains 'asus'
    superagent.get(url, function(error, res) {
      assert.ifError(error);
      assert.equal(res.status, status.OK);

      var results;
      assert.doesNotThrow(function() {
        results = JSON.parse(res.text).users;
      });

      assert.equal(results.length, 2);
      assert.equal(results[0].firstName, "firstUser");
      assert.equal(results[1].firstName, "secondUser");
      done();
    });
  });

  it('can get a user by email address', function(done) {
    var url = URL_ROOT + '/user/email/email2';
    // Get products whose name contains 'asus'
    superagent.get(url, function(error, res) {
      assert.ifError(error);
      assert.equal(res.status, status.OK);

      var result;
      assert.doesNotThrow(function() {
        result = JSON.parse(res.text).user;
      });

      assert.equal(result.application, "hermes");
      assert.equal(result.firstName, "secondUser");
      done();
    });
  });

  it('can update netVerify result for user', function(done) {
    var payload = {
      data: {
        user: "email1",
        netVerify: {
          output: {
            result1: "OK",
            result2: "OK",
          }
        }
      }
    };
    var url = URL_ROOT + '/user/netVerify';
    superagent.post(url)
      .send(payload)
      .end(function(error, res) {
        assert.ifError(error);
        assert.equal(res.status, status.OK);

        var result;
        assert.doesNotThrow(function() {
          result = JSON.parse(res.text).user;
        });
        assert.equal(result.kyc.netVerify.output.result1, "OK");
        done();
      });
  });

  it('fails to update netVerify result for user: bad request', function(done) {
    var payload = {
      data: {
        user: "email1",
        netVerify: {
          output: "some string"
        }
      }
    };
    var url = URL_ROOT + '/user/netVerify';
    superagent.post(url)
      .send(payload)
      .end(function(error, res) {
        assert.equal(res.status, status.BAD_REQUEST);
        done();
      });
  });

  it('can update idOlogy result for user', function(done) {
    var payload = {
      data: {
        user: "email1",
        idOlogy: {
          output: {
            result1: "OK",
            result2: "OK",
          }
        }
      }
    };
    var url = URL_ROOT + '/user/idOlogy';
    superagent.post(url)
      .send(payload)
      .end(function(error, res) {
        assert.ifError(error);
        assert.equal(res.status, status.OK);

        var result;
        assert.doesNotThrow(function() {
          result = JSON.parse(res.text).user;
        });
        assert.equal(result.kyc.idOlogy.output.result1, "OK");
        done();
      });
  });

  it('fails to update idOlogy result for user: bad request', function(done) {
    var payload = {
      data: {
        user: "email1",
        idOlogy: {
          output: "some string"
        }
      }
    };
    var url = URL_ROOT + '/user/idOlogy';
    superagent.post(url)
      .send(payload)
      .end(function(error, res) {
        assert.equal(res.status, status.BAD_REQUEST);
        done();
      });
  });

  it('can update blockNotary result for user', function(done) {
    var payload = {
      data: {
        user: "email1",
        blockNotary: {
          output: {
            result1: "OK",
            result2: "OK",
          }
        }
      }
    };
    var url = URL_ROOT + '/user/blockNotary';
    superagent.post(url)
      .send(payload)
      .end(function(error, res) {
        assert.ifError(error);
        assert.equal(res.status, status.OK);

        var result;
        assert.doesNotThrow(function() {
          result = JSON.parse(res.text).user;
        });
        assert.equal(result.kyc.blockNotary.output.result1, "OK");
        done();
      });
  });

  it('fails to update blockNotary result for user: bad request', function(done) {
    var payload = {
      data: {
        user: "email1",
        blockNotary: {
          output: "some string"
        }
      }
    };
    var url = URL_ROOT + '/user/blockNotary';
    superagent.post(url)
      .send(payload)
      .end(function(error, res) {
        assert.equal(res.status, status.BAD_REQUEST);
        done();
      });
  });
});
