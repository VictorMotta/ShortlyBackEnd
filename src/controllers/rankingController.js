import db from "../config/db.js";

export const getRanking = async (req, res) => {
  try {
    const ranking = await db.query(
      `SELECT users.id, users.name, COUNT(shorten.*) AS "linksCount" ,SUM(shorten.qty_visitors) AS "visitCount" FROM users
    JOIN shorten 
    ON users.id = shorten.user_id
    GROUP BY users.id
    ORDER BY "visitCount" DESC
    LIMIT 10;`
    );

    return res.send(ranking.rows);
  } catch (error) {
    return res.sendStatus(error.message);
  }
};
