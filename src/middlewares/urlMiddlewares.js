import db from "../config/db.js";

export const verifyIdExist = (req, res, next) => {
  const { id } = req.params;

  if (!id) return res.status(404);

  next();
};

export const verifyShortUrlExist = async (req, res, next) => {
  const { shortUrl } = req.params;

  if (!shortUrl) return res.status(404);

  try {
    const verifyExist = await db.query(`SELECT * FROM shorten WHERE short_url=$1`, [shortUrl]);

    if (verifyExist.rowCount == 0) return res.sendStatus(404);

    res.locals.shortUrlExist = verifyExist;

    next();
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

export const verifyShortUrl = async (req, res, next) => {
  const tokenInfo = res.locals.tokenInfo;
  const { id } = req.params;

  try {
    const urlShorten = await db.query("SELECT * FROM shorten WHERE id=$1", [id]);

    if (urlShorten.rowCount == 0) return res.sendStatus(404);

    if (tokenInfo.id != urlShorten.rows[0].user_id) return res.sendStatus(401);

    next();
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
