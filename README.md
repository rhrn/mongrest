mongrest
========

MongoDB collection REST wrapper
[![Build Status](https://travis-ci.org/rhrn/mongrest.png?branch=master)](https://travis-ci.org/rhrn/mongrest)

#### Install
```
npm install mongrest
```

#### Usage

```
var Rest = require('mongrest');
var Users = Rest(db.collection('users'));
// or
// var Users = require('mongrest')(db.collection('users'));

// create user
var newUser = {email: 'xmail@example.com', 'password': 'password'};
Users.post(newUser, function(err, user) {
  if (err) throw err;
  console.log ('new user', user);
});

// find all
Users.get(function(err, users) {
  if (err) throw err;
  console.log ('users', users);
});

// find one
Users.getOne(id, function(err, user) {
  if (err) throw err;
  console.log ('user', user);
});

// update user
var update = {$set: {updated: new Date()}};
Users.put(id, update, function(err, updatedUser) {
  if (err) throw err;
  console.log ('updated user', updatedUser);
});

// delete user
Users.delete(id, function(err, deletedUser) {
  if (err) throw err;
  console.log ('deleted userd', deletedUser);
});

```
