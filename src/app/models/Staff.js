const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseDelete = require('mongoose-delete');

const Staff = new Schema({
    name: {type: String},
    image: {type: String},
    PhoneNumber: {type: Number},
    email: {type: String},
    // role 1: quản lý
    // role 2: kế toán
    // role 3: nhân viên bảo dưỡng
    // role 4: nhân viên bãi xe
    // role 5: nhân viên chăm sóc KH
    // role 6: khách hàng
    // role 7: tài khoản thường
    role: {type: Number},
    createAt: {type: Date, default: Date.now},
    updateAt: {type: Date, default: Date.now},
});

Staff.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all'
});

module.exports = mongoose.model('Staff', Staff);