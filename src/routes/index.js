const carsRouter = require('./cars');
const usersRouter = require('./users');
const homeRouter = require('./home');
const billRouter = require('./bill');
const staffsRouter = require('./staffs');
const repairRouter = require('./repair');
const customersRouter = require('./customers');
const statisticsRouter = require('./statistics');

function route(app) {
    app.use('/statistics', statisticsRouter);
    app.use('/bill',billRouter);
    app.use('/staffs', staffsRouter);
    app.use('/repair', repairRouter);
    app.use('/cars', carsRouter);
    app.use('/users', usersRouter);
    app.use('/customers', customersRouter);
    app.use('/', homeRouter);
}

module.exports = route;