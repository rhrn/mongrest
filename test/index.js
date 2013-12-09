var mongo = require('./mongo');

it('Start with db', function(done) {

  mongo.db.then(function(db) {

    require('./basic')(db);

    done();

  });

});
