import { nanoid } from 'nanoid';
import {
  deleteShortenRepository,
  getShortUrlOpenRepository,
  getUrlPerIdRepository,
  getUserByIdRepository,
  postShortenRepository,
} from '../repositories/url.repository.js';

export const getUrlPerId = async (req, res) => {
  const { id } = req.params;

  try {
    const shortenExist = await getUrlPerIdRepository(id);

    if (shortenExist.rowCount == 0) return res.sendStatus(404);

    return res.send(shortenExist.rows[0]);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

export const getShortUrlOpen = async (req, res) => {
  const { shortUrl } = req.params;
  const shortUrlExist = res.locals.shortUrlExist;
  try {
    const qtyVisitorsUpdated = Number(shortUrlExist.rows[0].qty_visitors) + 1;

    if (shortUrlExist.rowCount == 0) return res.sendStatus(404);

    await getShortUrlOpenRepository(qtyVisitorsUpdated, shortUrl);

    return res.redirect(shortUrlExist.rows[0].url);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

export const postShorten = async (req, res) => {
  const { url } = req.body;
  const tokenInfo = res.locals.tokenInfo;

  try {
    const getUser = await getUserByIdRepository(tokenInfo.email);
    if (getUser.rowCount == 0) return res.sendStatus(401);
    const shortUrl = await nanoid(8);

    const insertedNow = await postShortenRepository(url, shortUrl, getUser.rows[0].id);

    return res.status(201).json(insertedNow.rows[0]);
  } catch (error) {
    return res.status(501).send(error.message);
  }
};

export const deleteShorten = async (req, res) => {
  const { id } = req.params;

  try {
    await deleteShortenRepository(id);

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
