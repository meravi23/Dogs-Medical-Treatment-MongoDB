const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create Schema and Model

const DogSchema = new Schema({ // not all fields are required when creating a new Dog, each one is optional
    adopter: String,
    age: String,
    birthday: String,
    breed: String,
    chip: Number,
    comments: String,
    descrip: String,
    distemper1: String,
    distemper2: String,
    distemper3: String,
    foster: String,
    gender: String,
    loc: String,
    name: String,
    neuter: String,
    num: Number,
    rabbies: String,
    size: String,
    status: String
});

const Dog = mongoose.model('doggies', DogSchema) // 'doggies' = name of collection based on DogSchema

module.exports = Dog;