const assert = require('assert');
const Dog = require('../models/dog');

describe('saving records', function () {

    // create tests
    it('Saves a record to the database', function (done) {
        var dog1 = new Dog({
            name: 'Celina'
        });

        dog1.save() // asynchrous request
            .then(function () {
                assert(dog1.isNew === false); // checking if new record is new or not. 
                // if it's only saved locally and not to the db, will return true
                // if saved to the db will return false -- it's no longer new
                // so that's why we're looking to recieve 'false'
            });
        done(); // shows Mocha saving has been completed
    });

    // next test

});