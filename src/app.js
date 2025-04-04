require("dotenv").config();
const express = require("express");
const { verifyUser } = require("./serveces/apiServices");
const verifyToken = require("./madllewares/autMadlleware");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post("/auth-token", verifyToken, async (req, res) => {
  const { hotsite_email, senha } = req.user;

  console.log(`Verificando usuário: ${hotsite_email}`);

  try {
    const resultado = await verifyUser(hotsite_email, senha);

    if (resultado) {
      return res.status(200).json({ success: true, data: resultado });
    } else {
      return res
        .status(404)
        .json({ error: "Usuário não encontrado ou erro na requisição." });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Erro interno ao verificar usuário." });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log("TOKEN CARREGADO:", process.env.API_SECRET_TOKEN);
});
