import db from '../config/db.js';

export const getUrlPerIdRepository = async (id) => {
  return await db.query(`SELECT id,short_url AS "shortUrl", url FROM shorten WHERE id=$1`, [id]);
};

export const getShortUrlOpenRepository = async (qtyVisitorsUpdated, shortUrl) => {
  return await db.query(`UPDATE shorten SET qty_visitors=$1 WHERE short_url=$2`, [
    qtyVisitorsUpdated,
    shortUrl,
  ]);
};

export const getUserByIdRepository = async (idUser) => {
  return await db.query('SELECT * FROM users WHERE email=$1', [idUser]);
};

export const postShortenRepository = async (url, shortUrl, getUser) => {
  return await db.query(
    'INSERT INTO shorten (url, short_url,user_id) VALUES ($1,$2,$3) RETURNING id, short_url AS "shortUrl", url, qty_visitors AS "visitCount"',
    [url, shortUrl, getUser]
  );
};

export const deleteShortenRepository = async (id) => {
  return await db.query(`DELETE FROM shorten WHERE id=$1`, [id]);
};
