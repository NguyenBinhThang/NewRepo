const express = require('express');
const router = express.Router();

const staffController = require('../app/controllers/staffController');
const { authenticate } = require("../middlewares/authentication");

router.get('/show', authenticate, staffController.showAllStaff);
router.get('/reserve', authenticate, staffController.showTrashStaff);
router.get('/create', authenticate, staffController.createStaff);
router.post('/list', staffController.listStaff);
router.get('/edit/:id', authenticate, staffController.editStaff);
router.get('/info/:id', authenticate, staffController.infoStaff);
router.put('/update/:id', staffController.updateStaff);
router.patch('/callback/:id', staffController.callbackStaff);
router.delete('/force/:id', staffController.forceStaff);
router.delete('/:id', staffController.deleteStaff);


module.exports = router;