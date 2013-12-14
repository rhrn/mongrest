var Rest = require('../');
var expect = require('chai').expect;
var data = require('./data');

module.exports = function(db) {

  var collection = db.collection('mongrest.delete');
  var model      = new Rest(collection);

  describe('delete test', function() {

    beforeEach(function(done) {
      collection.remove(function(){
        model.post(data.multiDocs, function(err, docs) {
          expect(err).to.be.null;
          expect(docs).to.be.array;
          expect(docs).to.have.length(data.multiDocs.length);
          done();
        });
      });
    });

    it('delete one object', function(done) {
      model.delete(function(err, doc) {
        expect(doc).to.have.property('_id');
        expect(doc).to.have.property('name')
          .and.equal(data.oneDocClone.name);
        done();
      });
    });

    it('delete one with id', function(done) {
      model.delete(data.oneDoc['_id'], function(err, doc) {
        expect(doc).to.have.property('_id');
        expect(doc).to.have.property('name')
          .and.equal(data.oneDocClone.name);
        done();
      });
    });

    it('delete one with string id', function(done) {
      model.delete(data.customDoc['_id'], function(err, doc) {
        expect(doc).to.have.property('_id');
        expect(doc).to.have.property('name')
          .and.equal(data.customDocClone.name);
        done();
      });
    });

    it('delete first with sort', function(done) {
      var options = {
        sort: [['order', 1]]
      };
      model.delete({}, options, function(err, doc) {
        expect(doc).to.have.property('_id');
        expect(doc).to.have.property('name')
          .and.equal(data.customDocClone.name);
        done();
      });
    });

  });

};
