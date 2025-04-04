const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { verifyToken } = require("../madllewares/autMadlleware");

// Rota protegida para login de usuário
router.post("/login", verifyToken, authController.authenticateUser);

module.exports = router;
