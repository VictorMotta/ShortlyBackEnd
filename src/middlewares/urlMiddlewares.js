import db from "../config/db.js";

export const verifyIdExist = (req, res, next) => {
  const { id } = req.params;

  if (!id) return res.status(404);

  next();
};

export const verifyShortUrlExist = (req, res, next) => {
  const { shortUrl } = req.params;

  if (!shortUrl) return res.status(404);

  next();
};
