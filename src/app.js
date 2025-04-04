require("dotenv").config();
const express = require("express");
const authRoutes = require("./routers/authRoutes");
const { errorHandler } = require("./madllewares/autMadlleware");

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRoutes);

// Error handling
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log("Ambiente:", process.env.NODE_ENV || "development");
});
