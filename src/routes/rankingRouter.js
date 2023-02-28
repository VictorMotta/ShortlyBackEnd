import { Router } from "express";
import { getRanking } from "../controllers/rankingController.js";

const RankingRouter = Router();

RankingRouter.get("/ranking", getRanking);

export default RankingRouter;
