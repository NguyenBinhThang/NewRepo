const express = require('express');
const router = express.Router();

const billController = require('../app/controllers/billController');
const { authenticate } = require("../middlewares/authentication");

router.get('/create', authenticate, billController.createBill);
router.get('/show', authenticate, billController.showAllBill);
router.post('/store', billController.storeBill);
router.get('/edit/:id', authenticate, billController.editBill);
router.put('/update/:id', billController.updateBill);
router.get('/info/:id', authenticate, billController.infoBill);
router.get('/trash', authenticate, billController.showTrashBill);
router.patch('/restore/:id', billController.restoreBill);
router.delete('/force/:id', billController.forceBill);
router.delete('/:id', billController.deleteBill);
router.get('/issue', authenticate,billController.issueBill);

module.exports = router;