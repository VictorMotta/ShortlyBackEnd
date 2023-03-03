import { getBodyByIdRepository } from '../repositories/user.repository.js';

export const getUserShortens = async (req, res) => {
  const tokenInfo = res.locals.tokenInfo;

  try {
    const body = await getBodyByIdRepository(tokenInfo.id);

    if (body.rows[0].json_build_object.visitCount === null) {
      body.rows[0].json_build_object.visitCount = '0';
    }

    if (body.rows[0].json_build_object.shortenedUrls[0].id === null) {
      body.rows[0].json_build_object.shortenedUrls = [];
    }

    console.log(body.rows[0].json_build_object);

    return res.send(body.rows[0].json_build_object);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
