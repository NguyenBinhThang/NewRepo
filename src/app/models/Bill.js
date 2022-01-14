const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseDelete = require('mongoose-delete');

const Bill = new Schema({
    namePur: {type: String},
    address: {type: String},
    phone: {type: String},
    nameSeller: {type: String},
    nameCar: {type: String},
    price: {type: Number},
    carManufacturer: {type: String},
    createAt: {type: Date, default: Date.now},
    updateAt: {type: Date, default: Date.now}
});

Bill.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all'
});

module.exports = mongoose.model('Bill', Bill);