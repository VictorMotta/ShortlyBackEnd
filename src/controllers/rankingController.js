import { getRankingRepository } from "../repositories/ranking.repository.js";

export const getRanking = async (req, res) => {
  try {
    const ranking = await getRankingRepository();

    return res.send(ranking.rows);
  } catch (error) {
    return res.sendStatus(error.message);
  }
};
