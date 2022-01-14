const express = require('express');
const router = express.Router();

const carController = require('../app/controllers/carController');
const { authenticate } = require("../middlewares/authentication");

router.get('/show', authenticate, carController.showAllCar);
router.get('/trash', authenticate, carController.showTrashCar);
router.get('/create', authenticate, carController.createCar);
router.post('/store', authenticate, carController.storeCar);
router.get('/edit/:id', authenticate, carController.editCar);
router.get('/info/:id', authenticate, carController.infoCar);
router.put('/update/:id', authenticate, carController.updateCar);
router.patch('/restore/:id', authenticate, carController.restoreCar);
router.delete('/force/:id', authenticate, carController.forceCar);
router.delete('/:id', authenticate, carController.deleteCar);


module.exports = router;