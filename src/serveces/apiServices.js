require("dotenv").config();
const axios = require("axios");

async function verifyUser(hotsite_email, senha) {
  try {
    const response = await axios.get(`${process.env.API_USERS_URL}/cliente`, {
      headers: {
        "IXCSoft-Hotsite-Email": hotsite_email,
        "IXCSoft-Hotsite-Senha": senha,
        "Content-Type": "application/json"
      }
    });

    return response.data;
  } catch (error) {
    console.error(
      "Erro ao verificar usuário:",
      error.response?.data || error.message
    );
    return null;
  }
}

module.exports = { verifyUser };