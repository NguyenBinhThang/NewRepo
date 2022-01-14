const express = require("express");
const router = express.Router();

const userController = require("../app/controllers/userController");
const { authenticate, authenticated } = require("../middlewares/authentication");

router.get("/register", userController.getRegister);
router.post("/register", userController.createUser);

router.get("/login", authenticated, userController.getLogin);
router.get("/show", authenticate, userController.showAllUser);
router.post("/login", userController.loginUser);
router.get("/logout", userController.logoutUser);
router.get('/trash', authenticate, userController.showTrashUser);
router.get('/edit/:id', authenticate, userController.editUser);
router.put('/update/:id', userController.updateUser);
router.get('/info/:id', authenticate, userController.infoUser);
router.get('/changePassword/:id', authenticate, userController.changePassUser);
router.post('/change/:id', userController.changePasswordUser);
router.patch('/restore/:id', userController.restoreUser);
router.delete('/force/:id', userController.forceUser);
router.delete('/:id', userController.deleteUser);
module.exports = router;