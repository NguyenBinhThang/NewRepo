const Customer = require('../models/Customer');
const User = require("../models/User");
const { multipleMongooseToObject, mongooseToObject } = require('../../uti/mongoose');
const { hashPassword } = require("../../uti/handlePassword");
const { multipleConvertDate, convertDate } = require('../../uti/convertDate');

class customerController {
    // [GET] /customers/show
    showAllCustomer(req, res, next) {
        Customer.find({})
            .then(customers => {
                res.render('customers/show', {
                    customers: multipleConvertDate(multipleMongooseToObject(customers)) 
                });
            })
            .catch(err => next(err));
    }

    // [GET] /customers/trash
    showTrashCustomer(req, res, next) {
        Customer.findDeleted({})
            .then(customers => {
                res.render('customers/trash', {
                    customers: multipleConvertDate(multipleMongooseToObject(customers))
                });
            })
            .catch(err => next(err));
    }

    // [GET] /customers/info/:id
    infoCustomer(req, res, next) {
        Customer.findById(req.params.id)
            .then(customer => {
                res.render('customers/info', {
                    customer: convertDate(mongooseToObject(customer))
                });
            })
            .catch(err => next(err));
    }

    // [GET] /customers/create
    createCustomer(req, res, next) {
        const message = req.flash("message");
        res.render('customers/create', { message: message[0] });
    }

    // [GET] /customers/edit/:id
    editCustomer(req, res, next) {
        Customer.findById(req.params.id)
            .then(customer => res.render('customers/edit',  {
                    customer: convertDate(mongooseToObject(customer))
            }))
            .catch(next)
    }

    // [PUT] /customers/update/:id
    updateCustomer(req, res, next) {
        const updateCustomer = {
            name : req.body.customerName,
            address : req.body.customerAddress,
            email : req.body.customerEmail,
            phone : req.body.customerPhone
        };
        Customer.updateOne({ _id: req.params.id }, updateCustomer)
            .then(() => res.redirect(`../info/${req.params.id}`))
            .catch(next);
    }

    // [POST] /customers/store
    async storeCustomer(req, res, next) {
        let hashedPassword = await hashPassword(req.body.customerPhone + '123');
        await new User({
            username: req.body.customerEmail,
            password: hashedPassword,
            name: req.body.customerName,
            role: 6
        }).save();

        const newCustomer = new Customer({
            name : req.body.customerName,
            address : req.body.customerAddress,
            email : req.body.customerEmail,
            phone : req.body.customerPhone
        });
        newCustomer.save()
            .then(() => {
                req.flash("message", "Customer created successfully");
                res.redirect('create');
            })   
            .catch((error) => res.send(error));
    }


    // [DELETE] /customers/:id
    deleteCustomer(req, res, next) {
        Customer.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [DELETE] /customers/force/:id
    forceCustomer(req, res, next) {
        Customer.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [PATCH] /customers/restore/:id
    restoreCustomer(req, res, next) {
        Customer.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }
}

module.exports = new customerController();