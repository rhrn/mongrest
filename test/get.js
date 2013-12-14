var Rest = require('../');
var expect = require('chai').expect;
var data = require('./data');

module.exports = function(db) {

  var collection = db.collection('mongrest.get');
  var model      = new Rest(collection);

  describe('get test', function() {

    before(function(done) {
      collection.remove(function() {
        model.post(data.multiDocs, function(err, docs) {
          expect(err).to.be.null;
          expect(docs).to.be.array;
          expect(docs).to.have.length(data.multiDocs.length);
        });
        done();
      });
    });

    it('get id one as object', function(done) {
      model.get(data.oneDoc['_id'], function(err, doc) {
        expect(err).to.be.null;
        expect(doc).to.have.property('_id');
        expect(doc).to.have.property('name')
          .and.equal(data.oneDocClone.name);
        done();
      });
    });

    it('get id one as string', function(done) {
      model.get(data.oneDoc['_id'].toString(), function(err, doc) {
        expect(err).to.be.null;
        expect(doc).to.have.property('_id');
        expect(doc).to.have.property('name')
          .and.equal(data.oneDocClone.name);
        done();
      });
    });

    it('get id two as object', function(done) {
      model.get(data.twoDoc['_id'], function(err, doc) {
        expect(err).to.be.null;
        expect(doc).to.have.property('_id');
        expect(doc).to.have.property('name')
          .and.equal(data.twoDocClone.name);
        done();
      });
    });

    it('get id custom', function(done) {
      model.get(data.customDoc['_id'], function(err, doc) {
        expect(err).to.be.null;
        expect(doc).to.have.property('_id')
          .and.equal(data.customDocClone['_id']);
        expect(doc).to.have.property('name')
          .and.equal(data.customDocClone.name);
        done();
      });
    });

    it('get all', function(done) {
      model.get(function(err, docs) {
        expect(err).to.be.null;
        expect(docs).to.be.array;
        expect(docs).to.have.length(data.multiDocs.length);
        done();
      });
    });

    it('get all with empty options', function(done) {
      model.get({}, {}, function(err, docs) {
        expect(err).to.be.null;
        expect(docs).to.be.array;
        expect(docs).to.have.length(data.multiDocs.length);
        done();
      });
    });

    it('get all with sort options', function(done) {
      model.get({}, {sort:[['order', 1]]}, function(err, docs) {
        expect(err).to.be.null;
        expect(docs).to.be.array;
        expect(docs).to.have.length(data.multiDocs.length);
        expect(docs[0]).to.deep.equal(data.customDoc);
        expect(docs[1]).to.deep.equal(data.twoDoc);
        expect(docs[2]).to.deep.equal(data.oneDoc);
        done();
      });
    });

    it('get all with skip and limit options', function(done) {
      model.get({}, {skip: 1, limit: 1}, function(err, docs) {
        expect(err).to.be.null;
        expect(docs).to.be.array;
        expect(docs).to.have.length(1);
        expect(docs[0]).to.deep.equal(data.twoDoc);
        done();
      });
    });

  });

};
