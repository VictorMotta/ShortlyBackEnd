import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { SECRET } from "../constants/constats.js";
import { signInRepository } from "../repositories/auth.repository.js";

export const signUp = async (req, res) => {
  const { name, email, password } = req.body;

  const passwordEncrypt = await bcrypt.hashSync(password, 10);

  try {
    await signInRepository(name, email, passwordEncrypt);

    return res.sendStatus(201);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

export const signIn = async (req, res) => {
  const user = res.locals.user;
  delete user.rows[0].password;
  delete user.rows[0].created_at;
  delete user.rows[0].updated_at;

  try {
    const token = await jwt.sign(
      {
        id: user.rows[0].id,
        email: user.rows[0].email,
      },
      SECRET,
      { expiresIn: "168h" }
    );

    return res.status(200).json({ ...user.rows[0], token });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
