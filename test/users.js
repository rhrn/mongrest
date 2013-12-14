var ObjectID = require('mongodb').ObjectID;
var mongo = require('./mongo.js');
var Rest = require('../');

mongo.db.then(function(db) {

  var Users = Rest(db.collection('mongrest.users'));

  // create user
  var newUser = {
    email: 'email@example.com',
    password: 'password'
  };

  Users.post(newUser, function(err, user) {
    if (err) throw err;
    console.log ('new user', user);
  });

  // find all
  Users.get(function(err, users) {
    if (err) throw err;
    console.log ('all users', users);
  });

  // find with options
  var options = {
    sort: [['email', -1]],
    limit: 1,
    skip: 1
  };
  Users.get({}, options, function(err, users) {
    if (err) throw err;
    console.log ('find users with options', users);
  });

  // find one
  Users.get(newUser['_id'], function(err, user) {
    if (err) throw err;
    console.log ('finded user', user);
  });

  // partial update user
  var update = {$set: {updated: new Date()}};
  Users.put(newUser["_id"], update, function(err, updatedUser) {
    if (err) throw err;
    console.log ('partial updated user', updatedUser);
  });

  // full update user
  var update = {
    email: 'new.email@example.com',
    password: 'new password'
  };
  Users.put(newUser["_id"], update, function(err, updatedUser) {
    if (err) throw err;
    console.log ('full updated user', updatedUser);
  });

  // delete user
  Users.delete(newUser['_id'], function(err, deletedUser) {
    if (err) throw err;
    console.log ('deleted user', deletedUser);
  });

  //db.close();
  //process.exit();
});
