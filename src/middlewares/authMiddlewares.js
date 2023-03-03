import db from "../config/db.js";
import bcrypt from "bcrypt";

export const userExist = async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await db.query(`SELECT * FROM users WHERE email=$1`, [email]);

    if (user.rowCount > 0) {
      return res.status(409).send("Usuário já existe!");
    }

    next();
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

export const validateUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await db.query(`SELECT * FROM users WHERE email=$1`, [email]);

    if (user.rowCount == 0) {
      return res.status(401).send("Email ou Senha incorreta!");
    }

    if (!bcrypt.compareSync(password, user.rows[0].password)) {
      return res.status(401).send("Email ou Senha incorreta!");
    }

    res.locals.user = user;
    next();
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
