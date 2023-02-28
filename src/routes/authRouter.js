import { Router } from "express";
import validateSchema from "../middlewares/validateSchemas.js";
import { signInSchema, signUpSchema } from "../schemas/authSchemas.js";
import { signIn, signUp } from "../controllers/authController.js";
import { userExist, validateUser } from "../middlewares/authMiddlewares.js";

const AuthRouter = Router();

AuthRouter.post("/signup", validateSchema(signUpSchema), userExist, signUp);
AuthRouter.post("/signin", validateSchema(signInSchema), validateUser, signIn);

export default AuthRouter;
