const express = require("express");
const router = express.Router();
const authenticate = require("../middlewares/authenticate");
const authController = require("../controllers/auth.controller");
router.post("/login", authController.login);
router.get("/dashboard", authenticate, authController.dashboard);
module.exports = router;
