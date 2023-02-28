import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import AuthRouter from "./routes/authRouter.js";
dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(cors());

app.use([AuthRouter]);

app.listen(PORT, console.log(`Servidor iniciado com sucesso! Na porta: ${PORT}`));
