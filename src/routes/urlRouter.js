import { Router } from "express";
import validateSchema from "../middlewares/validateSchemas.js";
import { postShortenSchema } from "../schemas/urlSchemas.js";
import { getUrlPerId, postShorten } from "../controllers/urlController.js";
import authValidation from "../middlewares/authValidation.js";
import { verifyIdExist } from "../middlewares/urlMiddlewares.js";

const UrlRouter = Router();

UrlRouter.get("/urls/:id", verifyIdExist, getUrlPerId);
UrlRouter.post("/urls/shorten", validateSchema(postShortenSchema), authValidation, postShorten);

export default UrlRouter;
