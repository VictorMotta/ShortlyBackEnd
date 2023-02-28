import { Router } from "express";
import validateSchema from "../middlewares/validateSchemas.js";
import { signUpSchema } from "../schemas/authSchemas.js";
import { signUp } from "../controllers/authController.js";
import { userExist } from "../middlewares/authMiddlewares.js";

const AuthRouter = Router();

AuthRouter.post("/signup", validateSchema(signUpSchema), userExist, signUp);

export default AuthRouter;
