import db from "../config/db.js";

export const signInRepository = async (name, email, password) => {
  return await db.query(`INSERT INTO users (name, email, password) VALUES ($1, $2, $3);`, [
    name,
    email,
    password,
  ]);
};
