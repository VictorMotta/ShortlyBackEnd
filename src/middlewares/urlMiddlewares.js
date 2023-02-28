import db from "../config/db.js";

export const verifyIdExist = (req, res, next) => {
  const { id } = req.params;

  if (!id) return res.status(404);

  next();
};
