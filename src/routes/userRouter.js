import { Router } from "express";
import { getUserShortens } from "../controllers/userController.js";
import authValidation from "../middlewares/authValidation.js";

const UserRouter = Router();

UserRouter.get("/users/me", authValidation, getUserShortens);

export default UserRouter;
