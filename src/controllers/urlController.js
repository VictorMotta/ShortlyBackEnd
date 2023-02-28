import db from "../config/db.js";
import { nanoid } from "nanoid";

export const getUrlPerId = async (req, res) => {
  const { id } = req.params;

  try {
    const shortenExist = await db.query(
      `SELECT id,short_url AS "shortUrl", url FROM shorten WHERE short_url=$1`,
      [id]
    );

    if (shortenExist.rowCount == 0) return res.sendStatus(404);

    return res.send(shortenExist.rows[0]);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

export const postShorten = async (req, res) => {
  const { url } = req.body;
  const tokenInfo = res.locals.tokenInfo;

  try {
    const getUser = await db.query("SELECT * FROM users WHERE email=$1", [tokenInfo.email]);
    if (getUser.rowCount == 0) return res.sendStatus(401);
    const shortUrl = await nanoid();

    await db.query("INSERT INTO shorten (url, short_url,user_id) VALUES ($1,$2,$3)", [
      url,
      shortUrl,
      getUser.rows[0].id,
    ]);

    const insertedNow = await db.query("SELECT * FROM shorten WHERE short_url=$1", [shortUrl]);

    console.log(insertedNow.rows[0]);
    return res.status(201).json({ id: insertedNow.rows[0].id, shortUrl });
  } catch (error) {
    return res.status(501).send(error.message);
  }
};
