const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { verifyToken } = require("../madllewares/autMadlleware");

// Autenticação
router.post("/api/login", verifyToken, authController.authenticateUser);

// Token
router.get("/validate-token", verifyToken, (req, res) => {
  res.json({ valid: true });
});

// Saúde do Serviço
router.get("/api/status", (req, res) => {
  res.json({
    status: "online",
    ixc_connected: true, // Adicione lógica para verificar conexão com IXC
    timestamp: new Date().toISOString(),
  });
});

module.exports = router;
