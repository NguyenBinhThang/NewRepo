const express = require("express");
const router = express.Router();

const homeController = require("../app/controllers/homeController");
const { authenticate } = require("../middlewares/authentication");

router.get("/", authenticate, homeController.home);

module.exports = router;