import db from '../config/db.js';

export const getBodyByIdRepository = async (id) => {
  return await db.query(
    `SELECT json_build_object(
    'id', users.id,
    'name', users.name,
    'visitCount', sum(shorten.qty_visitors),
    'shortenedUrls', array_agg(json_build_object(
        'id', shorten.id,
        'shortUrl', shorten.short_url,
        'url', shorten.url,
        'visitCount', shorten.qty_visitors
        ))
    ) FROM users LEFT JOIN shorten ON users.id = shorten.user_id WHERE users.id=$1 group by users.id;`,
    [id]
  );
};
