var Rest = require('../');
var expect = require('chai').expect;
var data = require('./data');

module.exports = function(db) {

  var collection = db.collection('mongrest.put');
  var model      = new Rest(collection);

  describe('put test', function() {

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

    it('put one object with set', function(done) {
      var date = new Date();
      var name = 'new name';
      var newOne = {
        $set: {
          'date': date,
          'name': name
        }
      };
      model.put(data.oneDocClone['_id'], newOne, function(err, doc) {
        expect(err).to.be.null;
        expect(doc).to.have.property('_id');
        expect(doc).to.have.property('name')
          .and.equal(name);
        expect(doc).to.have.property('date')
          .and.deep.equal(date);
        done();
      });
    });

    it('put one object with set and string id', function(done) {
      var date = new Date();
      var name = 'new name';
      var newOne = {
        $set: {
          'date': date,
          'name': name
        }
      };
      model.put(data.oneDocClone['_id'].toString(), newOne, function(err, doc) {
        expect(err).to.be.null;
        expect(doc).to.have.property('_id');
        expect(doc).to.have.property('name')
          .and.equal(name);
        expect(doc).to.have.property('date')
          .and.deep.equal(date);
        done();
      });
    });

    it('put one whole object', function(done) {
      var date = new Date();
      var newOne = {
        'newDate': date
      };
      model.put(data.oneDocClone['_id'], newOne,  function(err, doc) {
        expect(err).to.be.null;
        expect(doc).to.have.property('_id');
        expect(doc).not.to.have.property('name');
        expect(doc).to.have.property('newDate')
          .and.deep.equal(date);
        done();
      });
    });

    it('put first object with sort', function(done) {
      var date = new Date();
      var set = {
        $set: {
          'newDate': date
        }
      };
      var options = {
        sort: [['order', 1]]
      };
      model.put({}, set, options, function(err, doc) {
        expect(err).to.be.null;
        expect(doc).to.have.property('_id');
        expect(doc).to.have.property('name')
          .and.equal(data.customDocClone.name);
        expect(doc).to.have.property('newDate')
          .and.deep.equal(date);
        done();
      });
    });

    it('put don\'t exists id', function(done) {
      model.put('dont exists id', {date: new Date()}, function(err, doc) {
        expect(err).to.be.null;
        expect(doc).to.be.null;
        done();
      });
    });

  });

};
