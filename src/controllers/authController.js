const ixcService = require("../serveces/ixcService");

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
        return res.status(404).json({
        success: false,
        error: "Credenciais inválidas",
        ixc_response: null,
        request_id: generateRequestId() 
      })
      }

      res.json({
        success: true,
        data: {
          user_id: user.id,
          email: user.hotsite_email,
          name: user.nome || user.razao_social,
        },
        metadata: {
          timestamp: new Date().toISOString(),
          ixc_status: "authenticated",
        },
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
