var extend = require('util')._extend;
var ObjectID = require('mongodb').ObjectID;

var oneDoc = {
  '_id': new ObjectID(),
  name: 'oneDoc',
  order: 3
};

var twoDoc = {
  '_id': new ObjectID(),
  name: 'twoDoc',
  order: 2
};

var customDoc = {
  '_id': 'Hello, World!',
  name: 'customDoc',
  order: 1
};

var multiDocs = [oneDoc, twoDoc, customDoc];

var oneDocClone    = extend({}, oneDoc);
var twoDocClone    = extend({}, twoDoc);
var customDocClone = extend({}, customDoc);

module.exports = {
  oneDoc: oneDoc,
  twoDoc: twoDoc,
  customDoc: customDoc,
  multiDocs: multiDocs,
  oneDocClone: oneDocClone,
  twoDocClone: twoDocClone,
  customDocClone: customDocClone
};
