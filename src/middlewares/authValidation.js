import jwt from "jsonwebtoken";
import { SECRET } from "../constants/constats.js";

const authValidation = async (req, res, next) => {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  if (!token) return res.sendStatus(401);

  try {
    const tokenVerify = await jwt.verify(token, SECRET);

    res.locals.tokenInfo = tokenVerify;
    next();
  } catch (error) {
    return res.status(401).send("Token Inválido!");
  }
};

export default authValidation;
