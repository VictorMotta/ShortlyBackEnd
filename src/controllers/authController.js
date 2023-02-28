import db from "../config/db.js";
import bcrypt from "bcrypt";

export const signUp = async (req, res) => {
  const { name, email, password } = req.body;

  const passwordEncrypt = await bcrypt.hashSync(password, 10);

  try {
    await db.query(`INSERT INTO users (name, email, password) VALUES ($1, $2, $3);`, [
      name,
      email,
      passwordEncrypt,
    ]);

    return res.sendStatus(201);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
