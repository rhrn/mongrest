var mongo = require('./mongo');

it('Start with db', function(done) {

  mongo.db.then(function(db) {

    require('./post')(db);
    require('./get')(db);
    require('./put')(db);
    require('./delete')(db);
    require('./basic')(db);

    done();

  });

});
