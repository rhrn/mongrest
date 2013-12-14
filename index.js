var ObjectID = require('mongodb').ObjectID;

var isArray = function(o) {
  return Object.prototype.toString.call(o) === '[object Array]';
};

var isString = function(o) {
  return Object.prototype.toString.call(o) === '[object String]';
};

var isId = function(o) {
  return o instanceof ObjectID || isString(o);
};

var tryToId = function(id) {
  if (isString(id)) {
    try {
      return new ObjectID(id);
    } catch (e) {
      return {
        '_id': id
      };
    }
  }
  return id;
};

function Rest(collection, options) {

  this.collection = collection;

};

Rest.prototype.post = function(doc, callback) {

  var isDocArray = isArray(doc);

  this.collection.insert(doc, {safe: true}, function(err, inserted) {

    if (err === null && !isDocArray) {
      inserted = inserted[0];
    }

    callback(err, inserted);

  });

};

Rest.prototype.get = function(a1, a2, a3) {

  var query   = {};
  var options = {};

  switch(arguments.length) {
    case 1:
      callback = a1;
      break;
    case 2:
      query    = a1;
      callback = a2;
      break;
    case 3:
      query    = a1;
      options  = a2;
      callback = a3;
      break;
  }

  query = tryToId(query);

  this.collection.find(query, options).toArray(function(err, docs) {

    if (err === null && isId(a1)) {
      if (docs[0] === undefined) {
        docs[0] = null;
      }
      docs = docs[0];
    }

    callback(err, docs);

  });

};

Rest.prototype.put = function(a1, a2, a3, a4) {

  var query   = {};
  var sort    = [];
  var doc     = {};
  var options = {};

  switch(arguments.length) {
    case 2:
      doc      = a1;
      callback = a2;
      break;
    case 3:
      query    = a1;
      doc      = a2;
      callback = a3;
      break;
    case 4:
      query    = a1;
      doc      = a2;
      options  = a3;
      callback = a4;
      break;
  }

  query = tryToId(query);

  if (options.sort) {
    sort = options.sort;
    delete options.sort;
  }

  if (options['new'] === undefined) {
    options['new'] = true;
  }

  this.collection.findAndModify(query, sort, doc, options, function(err, updated) {

    callback(err, updated);

  });

};

Rest.prototype.delete = function(a1, a2, a3) {

  var query   = {};
  var sort    = [];
  var options = {};

  switch(arguments.length) {
    case 1:
      callback = a1;
      break;
    case 2:
      query    = a1;
      callback = a2;
      break;
    case 3:
      query    = a1;
      options  = a2;
      callback = a3;
      break;
  }

  query = tryToId(query);

  if (options.sort) {
    sort = options.sort;
    delete options.sort;
  }

  this.collection.findAndRemove(query, sort, options, function(err, doc) {

    callback(err, doc);

  });

};

module.exports = function(collection) {

  return new Rest(collection);

};
