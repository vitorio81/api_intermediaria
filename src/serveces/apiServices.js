require("dotenv").config();
const axios = require("axios");

const api = axios.create({
  baseURL: process.env.API_USERS_URL,
  headers: {
    Authorization: `Bearer ${process.env.API_TOKEN}`,
    "Content-Type": "application/json",
  },
});

async function verifyUser(hotsite_email, password) {
  try {
    const response = await api.post("/auth-user", {
      hotsite_email,
      senha,
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
