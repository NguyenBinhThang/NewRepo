const Car = require('../models/Car');
const { multipleMongooseToObject, mongooseToObject } = require('../../uti/mongoose');
const { multipleConvertDate, convertDate } = require('../../uti/convertDate');

class carController {
    // [GET] /cars/show
    showAllCar(req, res, next) {
        Car.find({})
            .then(cars => {
                res.render('cars/show', {
                    cars: multipleConvertDate(multipleMongooseToObject(cars))
                });
            })
            .catch(err => next(err));
    }

    // [GET] /cars/trash
    showTrashCar(req, res, next) {
        Car.findDeleted({})
            .then(cars => {
                res.render('cars/trash', {
                    cars: multipleConvertDate(multipleMongooseToObject(cars))
                });
            })
            .catch(err => next(err));
    }

    // [GET] /cars/info/:id
    infoCar(req, res, next) {
        Car.findById(req.params.id)
            .then(car => {
                res.render('cars/info', {
                    car: convertDate(mongooseToObject(car))
                });
            })
            .catch(err => next(err));
    }

    // [GET] /cars/create
    createCar(req, res, next) {
        res.render('cars/create');
    }

    // [GET] /cars/edit/:id
    editCar(req, res, next) {
        Car.findById(req.params.id)
            .then(car => res.render('cars/edit',  {
                    car: convertDate(mongooseToObject(car))
            }))
            .catch(next)
    }

    // [PUT] /cars/update/:id
    updateCar(req, res, next) {
        const updateCar = {
            name : req.body.carName,
            image : req.body.carImage,
            manufacture : req.body.carManufacture,
            engine : req.body.carEngine,
            power : req.body.carPower,
            price : req.body.carPrice,
            topSpeed : req.body.carTopSpeed
        };
        Car.updateOne({ _id: req.params.id }, updateCar)
            .then(() => res.redirect(`../info/${req.params.id}`))
            .catch(next);
    }

    // [POST] /cars/store
    storeCar(req, res, next) {
        const newCar = new Car({
            name : req.body.carName,
            image : req.body.carImage,
            manufacture : req.body.carManufacture,
            engine : req.body.carEngine,
            power : req.body.carPower,
            price : req.body.carPrice,
            topSpeed : req.body.carTopSpeed
        });
        newCar.save()
            .then(() => res.redirect('show'))   
            .catch((error) => res.send(error));
    }


    // [DELETE] /cars/:id
    deleteCar(req, res, next) {
        Car.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [DELETE] /cars/force/:id
    forceCar(req, res, next) {
        Car.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [PATCH] /courses/restore/:id
    restoreCar(req, res, next) {
        Car.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }
}

module.exports = new carController();