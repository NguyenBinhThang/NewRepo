const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseDelete = require('mongoose-delete');

const Customer = new Schema({
    name: {type: String},
    email: {type: String},
    phone: {type: String},
    address: {type: String},
    createAt: {type: Date, default: Date.now},
    updateAt: {type: Date, default: Date.now}
});

Customer.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all'
});

module.exports = mongoose.model('Customer', Customer);