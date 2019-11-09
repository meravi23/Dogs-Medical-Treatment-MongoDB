const express = require('express');
const bodyParser = require('body-parser');
// const mongojs = require('mongojs');
const mongodb = require('mongodb');
// const db = mongojs('doglist', ['dogs']); //doglist = db, dogs = collection
const app = express();
// const PORT = 27017;

let initialDogs = [{
        "name": "מלישקה",
        "num": "2889",
        "status": "באומנה",
        "gender": "נקבה",
        "breed": "מעורב",
        "size": "גדול",
        "birthday": "06/07/19",
        "distemper1": "06/09/19",
        "distemper2": "03/10/19",
        "foster": "טניה",
        "descrip": "צבע שחור/לבן",
        "comments": "31/8/19 טפילים פרונטליין\n30/8/19 תילוע\nלתאם משושה שלישי",
        "age": null,
        "chip": null,
        "distemper3": null,
        "loc": null,
        "neuter": null,
        "rabbies": null
    },
    {
        "name": "",
        "num": "2892",
        "gender": "נקבה",
        "status": "באומנה",
        "breed": "מעורב",
        "descrip": "צבע לבן-קרם, לבנה עם נקודות קרם",
        "birthday": "06/07/19",
        "size": "גדול",
        "distemper1": "06/09/19",
        "distemper2": "03/10/19",
        "comments": "31/08/19 טפילים אמפולה\n30/08/19 תילוע\nלתאם משושה שלישי",
        "age": null,
        "chip": null,
        "distemper3": "02/11/19",
        "loc": null,
        "neuter": null,
        "rabbies": null,
        "adopter": null,
        "foster": null
    },

    {
        "name": "ראמבו",
        "num": "2891",
        "status": "באומנה",
        "gender": "זכר",
        "breed": "מעורב",
        "size": "גדול",
        "birthday": "06/07/19",
        "distemper1": "06/09/2019",
        "distemper2": "03/10/19",
        "comments": "31/08/19 טפילים אמפולה פרונטליין\n30/08/19 תילוע\nלתאם משושה שלישי 30/10/19",
        "foster": "אנדריי וטניה - שלומי",
        "age": null,
        "chip": null,
        "descrip": null,
        "distemper3": "02/11/19",
        "loc": null,
        "neuter": null,
        "rabbies": null,
        "adopter": null
    }
];
let collection = null;


(async () => {
    try {
        const URL = 'mongodb://localhost:27017';
        const connection = await mongodb.connect(URL, {useUnifiedTopology: true});
        const db = connection.db('meddogs');
        collection = db.collection('doggies');
    } catch (e) {
        console.log('faced error', e);
    }
})();

// await collection.insertMany(initialDogs);

app.use(express.static(__dirname + '/'));
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());

// app.listen(PORT, () => {
//     console.log(`Dog Medical Treatment App is running on port: ${PORT}`);
// })

app.get('/dogs', function (req, res) {
    console.log("GET request received");

    db.dogs.find(function (err, docs) { // dogs = collection
        //console.log(docs);
        res.json(docs);
    });
});


app.post('/dogs', function (req, res) {
    //console.log(req.body);
    db.dogs.insert(req.body, function (err, doc) {
        res.json(doc);
    });
});

app.get('/dogs/:id', function (req, res) {
    let id = req.params.id;
    console.log(id);
    db.dogs.findOne({
        _id: mongojs.ObjectId(id)
    }, function (err, doc) {
        res.json(doc);
    });
});

app.put('/dogs/:id', function (req, res) {
    let id = req.params.id;
    console.log(req.body.name);
    console.log("mongo id: " + mongojs.ObjectId(id));
    db.dogs.findAndModify({
        query: {
            _id: mongojs.ObjectId(id)
        },
        update: {
            $set: {
                adopter: req.body.adopter,
                age: req.body.age,
                birthday: req.body.birthday,
                breed: req.body.breed,
                chip: req.body.chip,
                comments: req.body.comments,
                descrip: req.body.descrip,
                distemper1: req.body.distemper1,
                distemper2: req.body.distemper2,
                distemper3: req.body.distemper3,
                foster: req.body.foster,
                gender: req.body.gender,
                loc: req.body.loc,
                name: req.body.name,
                neuter: req.body.neuter,
                num: req.body.num,
                rabbies: req.body.rabbies,
                size: req.body.size,
                status: req.body.status
            }
        },
        new: true
    }, function (err, doc) {
        res.json(doc);
    });
});

app.delete('/dogs/:id', function (req, res) {
    let id = req.params.id;
    console.log(id);
    db.dogs.remove({
        _id: mongojs.ObjectId(id)
    }, function (err, doc) {
        res.json(doc); // sending back to the controller the deleted object
    })
});