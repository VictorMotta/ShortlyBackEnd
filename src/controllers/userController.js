import {
  getShortenedUrlsRepository,
  getUserByIdRepository,
  visitCountRepository,
} from '../repositories/user.repository.js';

export const getUserShortens = async (req, res) => {
  const tokenInfo = res.locals.tokenInfo;

  try {
    const user = await getUserByIdRepository(tokenInfo.id);
    let visitCountTotal = await visitCountRepository(tokenInfo.id);
    const shortenedUrls = await getShortenedUrlsRepository(tokenInfo.id);

    if (user.rowCount <= 0 || visitCountTotal.rowCount <= 0) return res.sendStatus(404);

    if (visitCountTotal.rows[0].sum === null) {
      visitCountTotal.rows[0].sum = '0';
    }

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

    console.log(shortenedUrls.rows);
    console.log(body);

    return res.send(body);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
