const Bill = require('../models/Bill');
const { multipleMongooseToObject, mongooseToObject } = require('../../uti/mongoose');
const { multipleConvertDate, convertDate } = require('../../uti/convertDate');

class billController {

    // [GET] /bill/create
    createBill(req, res, next) {
        res.render('bill/create');
    }

    // [GET] /bill/show
    showAllBill(req, res, next) {
        Bill.find({})
            .then(bill => {
                res.render('bill/show', {
                    bill: multipleConvertDate(multipleMongooseToObject(bill)) 
                });
            })
            .catch(err => next(err));
    }
    // [POST] /bill/store
    storeBill(req, res, next) {
        const newBill = new Bill({
            namePur : req.body.namePur,
            address : req.body.address,
            phone : req.body.phone,
            nameSeller : req.body.nameSeller,
            nameCar : req.body.nameCar, 
            price : req.body.price,
            carManufacturer : req.body.carManufacturer
        });
        newBill.save()
            .then(() => res.redirect('show'))   
            .catch((error) => res.send(error));
    }
    // [GET] /bill/edit/:id
    editBill(req, res, next) {
        Bill.findById(req.params.id)
            .then(bill => res.render('bill/edit',  {
                bill: convertDate(mongooseToObject(bill))
            }))
            .catch(next)
    }

    // [PUT] /bill/update/:id
    updateBill(req, res, next) {
        const updateBill = {
            namePur : req.body.namePur,
            address : req.body.address,
            phone : req.body.phone,
            nameSeller : req.body.nameSeller,
            nameCar : req.body.nameCar, 
            price : req.body.price,
            carManufacturer : req.body.carManufacturer
        };
        Bill.updateOne({ _id: req.params.id }, updateBill)
            .then(() => res.redirect(`../info/${req.params.id}`))
            .catch(next);
    }
    
    // [GET] /bill/info/:id
    infoBill(req, res, next) {
        Bill.findById(req.params.id)
            .then(bill => {
                res.render('bill/info', {
                    bill: convertDate(mongooseToObject(bill))
                });
            })
            .catch(err => next(err));
    }

    // [GET] /bill/trash
    showTrashBill(req, res, next) {
        Bill.findDeleted({})
            .then(bill => {
                res.render('bill/trash', {
                    bill: multipleConvertDate(multipleMongooseToObject(bill))
                });
            })
            .catch(err => next(err));
    }

    // [DELETE] /cars/:id
    deleteBill(req, res, next) {
        Bill.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [DELETE] /bill/force/:id
    forceBill(req, res, next) {
        Bill.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [PATCH] /courses/restore/:id
    restoreBill(req, res, next) {
        Bill.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [GET] /bill/issue
    issueBill(req, res, next) {
        Bill.find({})
            .then(bill => {
                res.render('bill/issue', {
                    bill: multipleConvertDate(multipleMongooseToObject(bill)) 
                });
            })
            .catch(err => next(err));
    }
}

module.exports = new billController();