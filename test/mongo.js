var mongodb = require('mongodb');
var promise = require('node-promise');
var defer = promise.defer();

MongoClient = mongodb.MongoClient;
MongoClient.connect('mongodb://localhost:27017/test', function(err, db) {
  if (err) {
    defer.reject(err);
  } else {
    defer.resolve(db);
  }
});

module.exports.db = defer.promise;
