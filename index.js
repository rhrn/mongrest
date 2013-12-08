var ObjectID = require('mongodb').ObjectID;

function Rest(collection, options) {

  this.collection = collection;

};

Rest.prototype.get = function(callback) {

  this.collection.find().toArray(function(err, docs) {

    callback(err, docs);

  });

};

Rest.prototype.getOne = function(id, callback) {

  if (typeof id !== 'object') {
    id = new ObjectID(id);
  }

  this.collection.findOne({_id: id}, function(err, doc) {

    callback(err, doc);

  });

};

Rest.prototype.post = function(doc, callback) {

  this.collection.insert(doc, {safe: true}, function(err, inserted) {

    callback(err, inserted);

  });

};

Rest.prototype.put = function(id, doc, callback) {

  if (typeof id !== 'object') {
    id = new ObjectID(id);
  }

  this.collection.findAndModify({_id: id}, [], doc, {'new':true}, function(err, updated) {

    callback(err, updated);

  });

};

Rest.prototype.delete = function(id, callback) {

  if (typeof id !== 'object') {
    id = new ObjectID(id);
  }

  this.collection.findAndRemove({_id: id}, [], function(err, doc) {

    callback(err, doc);

  });

};

module.exports = function(collection) {

  return new Rest(collection);

};
