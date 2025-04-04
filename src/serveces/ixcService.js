require("dotenv").config();
const axios = require("axios");

class IXCService {
  constructor() {
    this.baseURL = process.env.IXC_BASE_URL;
    this.token = process.env.IXC_API_TOKEN;
    this.selfSigned = process.env.IXC_SELF_SIGNED === "true";
  }

  async authenticateUser(hotsite_email, senha) {
    try {
      const params = {
        qtype: "cliente.hotsite_email",
        query: hotsite_email,
        oper: "=",
        page: "1",
        rp: "1",
      };

      const response = await axios.get(`${this.baseURL}/cliente`, {
        params,
        headers: {
          Authorization: `Bearer ${this.token}`,
          "Content-Type": "application/json",
        },
        httpsAgent: this.selfSigned
          ? new (require("https").Agent)({ rejectUnauthorized: false })
          : undefined,
      });

      const users = response.data.registros || [];

      if (users.length === 0) {
        return { success: false, error: "Usuário não encontrado" };
      }

      const user = users[0];

      // Aqui você deve implementar a verificação da senha
      // Como o IXC não retorna a senha, você precisaria de outra abordagem
      // Uma opção é usar o endpoint de login do hotsite do IXC

      return {
        success: true,
        user: {
          id: user.id,
          nome: user.fantasia || user.razao,
          email: user.email,
          hotsite_email: user.hotsite_email,
        },
      };
    } catch (error) {
      console.error(
        "Erro ao autenticar usuário no IXC:",
        error.response?.data || error.message
      );
      return {
        success: false,
        error: "Erro ao comunicar com o IXC",
        details: error.response?.data || error.message,
      };
    }
  }
}

module.exports = new IXCService();
