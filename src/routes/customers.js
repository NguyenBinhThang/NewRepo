const express = require('express');
const router = express.Router();

const customerController = require('../app/controllers/customerController');
const { authenticate } = require("../middlewares/authentication");

router.get('/show', authenticate, customerController.showAllCustomer);
router.get('/trash', authenticate, customerController.showTrashCustomer);
router.get('/create', authenticate, customerController.createCustomer);
router.post('/store', customerController.storeCustomer);
router.get('/edit/:id', authenticate, customerController.editCustomer);
router.get('/info/:id', authenticate, customerController.infoCustomer);
router.put('/update/:id', customerController.updateCustomer);
router.patch('/restore/:id', customerController.restoreCustomer);
router.delete('/force/:id', customerController.forceCustomer);
router.delete('/:id', customerController.deleteCustomer);


module.exports = router;