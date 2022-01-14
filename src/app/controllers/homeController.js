const Car = require('../models/Car');
const { multipleMongooseToObject } = require('../../uti/mongoose');
const { multipleConvertDate, convertDate } = require('../../uti/convertDate');

class homeController {

    // [GET] /
    home(req, res, next) {
        Car.find({})
            .then(cars => {
                res.render('home', {
                   cars: multipleConvertDate(multipleMongooseToObject(cars))
                });
            })
            .catch(err => next(err));
    }
}

module.exports = new homeController();