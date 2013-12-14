var Rest = require('../');
var expect = require('chai').expect;
var data = require('./data');

module.exports = function(db) {

  var collection = db.collection('mongrest.post');
  var model      = new Rest(collection);

  describe('post test', function() {

    beforeEach(function(done) {
      collection.remove(done);
    });

    it('post single object', function(done) {
      model.post(data.oneDoc, function(err, doc) {
        expect(err).to.be.null;
        expect(doc).to.have.property('_id');
        expect(doc).to.have.property('name')
          .and.equal(data.oneDocClone.name);
        done();
      });
    });

    it('post single object with custom id', function(done) {
      model.post(data.customDoc, function(err, doc) {
        expect(err).to.be.null;
        expect(doc).to.have.property('_id')
          .and.equal(data.customDocClone['_id']);
        expect(doc).to.have.property('name')
          .and.equal(data.customDocClone.name);
        done();
      });
    });

    it('post multi objects', function(done) {
      model.post(data.multiDocs, function(err, docs) {
        expect(err).to.be.null;
        expect(docs).to.be.array;
        expect(docs).to.have.length(data.multiDocs.length);
        done();
      });
    });

  });

};
