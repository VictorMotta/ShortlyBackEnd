import db from "../config/db.js";

export const userExist = async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await db.query(`SELECT * FROM users WHERE email=$1`, [email]);

    if (user.rowCount > 0) {
      return res.sendStatus(409);
    }

    next();
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
