const ixcService = require("../serveces/ixcService");
const { verifyToken } = require("../middlewares/authMiddleware");

class AuthController {
  async authenticateUser(req, res) {
    const { hotsite_email, senha } = req.body;

    if (!hotsite_email || !senha) {
      return res.status(400).json({
        success: false,
        error: "E-mail e senha são obrigatórios",
      });
    }

    try {
      const result = await ixcService.authenticateUser(hotsite_email, senha);

      if (!result.success) {
        return res.status(401).json(result);
      }

      return res.status(200).json({
        success: true,
        user: result.user,
        // Removido a geração de token para o usuário
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: "Erro durante a autenticação",
        details: error.message,
      });
    }
  }
}

module.exports = new AuthController();
