require("dotenv").config();

function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json({
      success: false,
      error: "Acesso negado. Token não fornecido ou formato inválido.",
    });
  }

  const token = authHeader.split(" ")[1];
  const FIXED_API_TOKEN = process.env.FIXED_API_TOKEN; // Token fixo da API-TV

  if (token !== FIXED_API_TOKEN) {
    return res.status(401).json({
      success: false,
      error: "Token inválido.",
    });
  }

  next(); // Token válido, prossegue
}

module.exports = { verifyToken };
