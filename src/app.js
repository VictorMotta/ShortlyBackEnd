import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import AuthRouter from "./routes/authRouter.js";
import UrlRouter from "./routes/urlRouter.js";
import UserRouter from "./routes/userRouter.js";
import RankingRouter from "./routes/rankingRouter.js";
import { PORT } from "./constants/constats.js";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use([AuthRouter, UrlRouter, UserRouter, RankingRouter]);

app.listen(PORT, console.log(`Servidor iniciado com sucesso! Na porta: ${PORT}`));
