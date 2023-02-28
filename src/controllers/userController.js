import db from "../config/db.js";

export const getUserShortens = async (req, res) => {
  const tokenInfo = res.locals.tokenInfo;

  console.log(tokenInfo.id);

  try {
    const user = await db.query(`SELECT * FROM users WHERE id=$1`, [tokenInfo.id]);
    const visitCountTotal = await db.query(
      `SELECT SUM(qty_visitors) FROM shorten WHERE user_id=$1;`,
      [tokenInfo.id]
    );

    const shortenedUrls = await db.query(`SELECT * FROM shorten WHERE user_id=$1;`, [tokenInfo.id]);

    if (user.rowCount <= 0 || visitCountTotal.rowCount <= 0 || shortenedUrls.rowCount <= 0)
      return res.sendStatus(404);

    console.log(shortenedUrls.rows);

    const body = {
      id: user.rows[0].id,
      name: user.rows[0].name,
      visitCount: visitCountTotal.rows[0].sum,
      shortenedUrls: shortenedUrls.rows.map((item) => {
        return {
          id: item.id,
          shortUrl: item.short_url,
          url: item.url,
          visitCount: item.qty_visitors,
        };
      }),
    };

    return res.send(body);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
