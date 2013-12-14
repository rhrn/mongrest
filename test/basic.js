var ID, DOC;
var Rest = require('../');
var expect = require('chai').expect;
var extend = require('util')._extend;

module.exports = function(db) {

  var collection = db.collection('mongrest.basic');
  var model      = new Rest(collection);

  describe('basic live circle', function() {

    before(function(done) {
      collection.remove(done);
    });

    var checkEmptyDocs = function(done) {
      model.get(function(err, docs) {
        expect(err).to.be.null;
        expect(docs).to.be.empty;
        expect(docs).to.be.instanceof(Array);
        done();
      });
    }; 

    it('get() empty docs', checkEmptyDocs);

    it('post() new object', function(done) {
      var object = {
        a: "a"
      };
      model.post(object, function(err, doc) {
        expect(err).to.be.null;
        expect(doc).to.be.object;
        expect(doc).to.have.property('_id');
        DOC = doc;
        ID = doc['_id'];
        done();
      });
    });

    it('get() one object', function(done) {
      model.get(ID, function(err, doc) {
        expect(err).to.be.null;
        expect(doc).to.deep.equal(DOC);
        done();
      });
    });

    it('get() one object with string id', function(done) {
      model.get(ID.toString(), function(err, doc) {
        expect(err).to.be.null;
        expect(doc).to.deep.equal(DOC);
        done();
      });
    });

    it('put() object', function(done) {
      var put = extend({}, DOC);
      put.updated = new Date();
      expect(put).not.to.deep.equal(DOC);
      model.put(ID, put, function(err, doc) {
        expect(err).to.be.null;
        expect(doc).to.deep.equal(put);
        DOC = doc;
        done();
      });
    });

    it('put() object with string id', function(done) {
      var put = extend({}, DOC);
      put.updated = new Date();
      expect(put).not.to.deep.equal(DOC);
      model.put(ID.toString(), put, function(err, doc) {
        expect(err).to.be.null;
        expect(doc).to.deep.equal(put);
        DOC = doc;
        done();
      });
    });

    it('delete() object', function(done) {
      model.delete(ID, function(err, doc) {
        expect(doc).to.deep.equal(DOC);
        done();
      });
    });

    it('get() one empty object', function(done) {
      model.get(ID, function(err, doc) {
        expect(err).to.be.null;
        expect(doc).to.be.null;
        done();
      });
    });

    after(checkEmptyDocs);

  });

};
