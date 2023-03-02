import db from "../config/db.js";

export const getUserByIdRepository = async (id) => {
  return await db.query(`SELECT * FROM users WHERE id=$1`, [id]);
};

export const visitCountRepository = async (id) => {
  return await db.query(`SELECT SUM(qty_visitors) FROM shorten WHERE user_id=$1;`, [id]);
};

export const getShortenedUrlsRepository = async (id) => {
  return await db.query(`SELECT * FROM shorten WHERE user_id=$1;`, [id]);
};
