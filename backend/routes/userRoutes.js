const express = require("express");
const { register, login, toggleActive } = require("../controllers/userController");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/toggle-active", toggleActive);

module.exports = router;
