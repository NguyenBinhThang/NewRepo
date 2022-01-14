const Staff = require('../models/Staff');
const User = require("../models/User");
const { multipleMongooseToObject, mongooseToObject } = require('../../uti/mongoose');
const { hashPassword } = require("../../uti/handlePassword");
const { multipleConvertDate, convertDate } = require('../../uti/convertDate');


class staffController {
    //GET '/staffs/show'
    showAllStaff(req, res, next) {
        Staff.find({})
            .then(staffs => {
                res.render('staffs/show', {
                    staffs: multipleConvertDate(multipleMongooseToObject(staffs))
                });
            })
            .catch(err => next(err));
    }

    // [GET] /staffs/reserve
    showTrashStaff(req, res, next) {
        Staff.findDeleted({})
            .then(staffs => {
                res.render('staffs/reserve', {
                    staffs: multipleConvertDate(multipleMongooseToObject(staffs))
                });
            })
            .catch(err => next(err));
    }

    // [POST] /staffs/list
    async listStaff(req, res, next) {
        let hashedPassword = await hashPassword(req.body.PhoneNumber + '123');
        await new User({
            username: req.body.email,
            password: hashedPassword,
            name: req.body.name,
            role: req.body.role
        }).save();

        const newStaff = new Staff({
            name : req.body.name,
            image : req.body.image,
            PhoneNumber : req.body.PhoneNumber,
            email : req.body.email,
            role : req.body.role,
        });
        newStaff.save()
            .then(() => {
                req.flash("message", "Staff created successfully");
                res.redirect('create');
            })
            .catch((error) => res.send(error));
    }

    infoStaff(req, res, next) {
        res.render('staffs/info');
    }

    // [GET] /staffs/create
    createStaff(req, res, next) {
        const message = req.flash("message");
        res.render('staffs/create', { message: message[0] });
    }

    // [GET] /staffs/edit/:id
    editStaff(req, res, next) {
        Staff.findById(req.params.id)
            .then(staff => res.render('staffs/edit',  {
                    staff: convertDate(mongooseToObject(staff))
            }))
            .catch(next)
    }
    updateStaff(req, res, next) {
        const updateStaff = {
            name : req.body.staffName,
            image : req.body.staffImage,
            PhoneNumber : req.body.staffPhoneNumber,
            email : req.body.staffEmail,
            role : req.body.staffRole,
        };
        Staff.updateOne({ _id: req.params.id }, updateStaff)
            .then(() => res.redirect(`../info/${req.params.id}`))
            .catch(next);
    }

    // [PATCH] /courses/callback/:id
    callbackStaff(req, res, next) {
        Staff.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [DELETE] /staffs/:id
    deleteStaff(req, res, next) {
        Staff.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [DELETE] /staffs/force/:id
    forceStaff(req, res, next) {
        Staff.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }
}


module.exports = new staffController();