const Repair = require('../models/Repair');
const { multipleMongooseToObject, mongooseToObject } = require('../../uti/mongoose');
const { multipleConvertDate, convertDate } = require('../../uti/convertDate');
const moment = require('moment');

class repairController {

    // [GET] /repair/create
    createRepair(req, res, next) {
        const message = req.flash("message");
        res.render('repair/create', { message: message[0] });
    }

    // [GET] /repair/show
    showAllRepair(req, res, next) {
        Repair.find({})
            .then(repair => {
                res.render('repair/show', {
                    repair: multipleConvertDate(multipleMongooseToObject(repair)).map(mongoose => {
                        mongoose.appointment_date = moment(mongoose.appointment_date).format('DD-MM-YYYY');
                        return mongoose;
                    })
                });
            })
            .catch(err => next(err));
    }
    // [POST] /repair/store
    storeRepair(req, res, next) {
        const newRepair = new Repair({
            customer: req.body.customer,
            address : req.body.address,
            phone : req.body.phone,
            appointment_date: req.body.appointment_date,
            sale_date: req.body.sale_date,
            maintenance: req.body.maintenance,
            price: req.body.price,
            method: req.body.method,
            note: req.body.note
        });
        newRepair.save()
            .then(() => {
                req.flash("message", "Created successfully");
                res.redirect('create');
            })   
            .catch((error) => res.send(error));
    }
    // [GET] /repair/edit/:id
    editRepair(req, res, next) {
        Repair.findById(req.params.id)
            .then(repair => res.render('repair/edit',  {
                repair: convertDate(mongooseToObject(repair))
            }))
            .catch(next)
    }

    // [PUT] /repair/update/:id
    updateRepair(req, res, next) {
        const updateRepair = {
            customer: req.body.customer,
            address : req.body.address,
            phone : req.body.phone,
            appointment_date: req.body.appointment_date,
            sale_date: req.body.sale_date,
            maintenance: req.body.maintenance,
            price: req.body.price,
            method: req.body.method,
            note: req.body.note
        };
        Repair.updateOne({ _id: req.params.id }, updateRepair)
            .then(() => res.redirect(`../info/${req.params.id}`))
            .catch(next);
    }
    
    // [GET] /repair/info/:id
    infoRepair(req, res, next) {
        Repair.findById(req.params.id)
            .then(repair => {
                res.render('repair/info', {
                    repair: convertDate(mongooseToObject(repair))
                });
            })
            .catch(err => next(err));
    }

    // [GET] /repair/trash
    showTrashRepair(req, res, next) {
        Repair.findDeleted({})
            .then(repair => {
                res.render('repair/trash', {
                    repair: multipleConvertDate(multipleMongooseToObject(repair)).map(mongoose => {
                        mongoose.appointment_date = moment(mongoose.appointment_date).format('DD-MM-YYYY');
                        return mongoose;
                    })
                });
            })
            .catch(err => next(err));
    }

    // [DELETE] /repair/:id
    deleteRepair(req, res, next) {
        Repair.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [DELETE] /repair/force/:id
    forceRepair(req, res, next) {
        Repair.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [PATCH] /repair/restore/:id
    restoreRepair(req, res, next) {
        Repair.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [GET] /repair/issue
    issueRepair(req, res, next) {
        Repair.find({})
            .then(repair => {
                res.render('repair/issue', {
                    repair: multipleConvertDate(multipleMongooseToObject(repair))
                });
            })
            .catch(err => next(err));
    }

}

module.exports = new repairController();