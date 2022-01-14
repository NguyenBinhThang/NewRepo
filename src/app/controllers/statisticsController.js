const Bill = require('../models/Bill');
const Repair = require('../models/Repair');
const { multipleMongooseToObject, mongooseToObject } = require('../../uti/mongoose');
const { hashPassword } = require("../../uti/handlePassword");
const { multipleConvertDate, convertDate } = require('../../uti/convertDate');

class statisticsController {
    // [GET] /statistics/bill
    showStatisticsBill(req, res, next) {
        res.render('statistics/bill');
    }
    
    // [POST] /statistics/billPost/:gte/:lt
    specialStatisticsBill(req, res, next) {
        Bill.find({ createAt: {
            $gte: new Date(req.params.gte),
            $lt: new Date(req.params.lt)
        }})
            .then(bill => {
                var billsList = multipleConvertDate(multipleMongooseToObject(bill));
                var cash = billsList.reduce((acc, bill) => acc + bill.price, 0);
                res.render('statistics/bill', {
                    bills: billsList,
                    cash: cash
                });
            })
            .catch(err => next(err));
    }

    // [GET] /statistics/showStatisticsRepair
    showStatisticsRepair(req, res, next) {
        res.render('statistics/repair');
    }

    specialStatisticsRepair(req, res, next) {
        Repair.find({ createAt: {
            $gte: new Date(req.params.gte),
            $lt: new Date(req.params.lt)
        }})
            .then(repair => {
                var repairsList = multipleConvertDate(multipleMongooseToObject(repair));
                var cash = repairsList.reduce((acc, repair) => acc + repair.price, 0);
                res.render('statistics/repair', {
                    repairs: repairsList,
                    cash: cash
                });
            })
            .catch(err => next(err));
    }
}

module.exports = new statisticsController();