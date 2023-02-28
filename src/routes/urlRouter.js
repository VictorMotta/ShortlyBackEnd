import { Router } from "express";
import validateSchema from "../middlewares/validateSchemas.js";
import { postShortenSchema } from "../schemas/urlSchemas.js";
import { postShorten } from "../controllers/urlController.js";
import authValidation from "../middlewares/authValidation.js";

const UrlRouter = Router();

UrlRouter.post("/urls/shorten", validateSchema(postShortenSchema), authValidation, postShorten);

export default UrlRouter;
