const express = require('express');
const router = express.Router();

const repairController = require('../app/controllers/repairController');
const { authenticate } = require("../middlewares/authentication");

router.get('/create', authenticate, repairController.createRepair);
router.get('/show', authenticate, repairController.showAllRepair);
router.post('/store', repairController.storeRepair);
router.get('/edit/:id', authenticate, repairController.editRepair);
router.put('/update/:id', repairController.updateRepair);
router.get('/info/:id', authenticate, repairController.infoRepair);
router.get('/trash', authenticate, repairController.showTrashRepair);
router.patch('/restore/:id', repairController.restoreRepair);
router.delete('/force/:id', repairController.forceRepair);
router.delete('/:id', repairController.deleteRepair);
router.get('/issue', authenticate,repairController.issueRepair);

module.exports = router;