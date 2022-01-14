const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseDelete = require('mongoose-delete');

const Repair = new Schema({
    customer: {type: String},
    address: {type: String},
    phone: {type: String},
    appointment_date: {type: Date},
    sale_date: {type: Date},
    maintenance: {type: String},
    price: {type: Number},
    method: {type: String},
    note: {type: String},
    createAt: {type: Date, default: Date.now},
    updateAt: {type: Date, default: Date.now}
});

Repair.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all'
});

module.exports = mongoose.model('Repair', Repair);