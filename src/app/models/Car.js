const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseDelete = require('mongoose-delete');

const Car = new Schema({
    name: {type: String},
    image: {type: String},
    manufacture: {type: String},
    engine: {type: String},
    power: {type: Number},
    price: {type: Number},
    topSpeed: {type: Number},
    createAt: {type: Date, default: Date.now},
    updateAt: {type: Date, default: Date.now}
});

Car.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all'
});

module.exports = mongoose.model('Car', Car);