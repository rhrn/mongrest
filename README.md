##mongrest

###MongoDB collection REST wrapper

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
```

#### API

```
/**
 * create new doc or docs
 *
 * doc (object) | docs (array)
 * callback function(err, doc || docs)
 */
post(doc|docs, callback)
```

```
/**
 * find doc or docs by id or query
 * 
 * id (string) | ObjectID | query{}
 * options object { sort (array), limit (int), skip (int) }
 * callback function(err, doc || docs)
 */
get(query[, options], callback)
```

```
/**
 * update doc by id or query
 *
 * id (string) | ObjectID | query{}
 * doc (object)
 * options object { sort (array) }
 * callback function(err, doc)
 */
put(query, doc[, options], callback)
```

```
/**
 * delete doc by id or query
 *
 * id (string) | ObjectID | query{}
 * options object { sort (array) }
 * callback function(err, doc)
 */
delete(query[, options], callback)
```
