import { Router } from 'express';
import validateSchema from '../middlewares/validateSchemas.js';
import { postShortenSchema } from '../schemas/urlSchemas.js';
import {
  deleteShorten,
  getShortUrlOpen,
  getUrlPerId,
  postShorten,
} from '../controllers/urlController.js';
import authValidation from '../middlewares/authValidation.js';
import {
  verifyIdExist,
  verifyShortUrlExist,
  verifyShortUrl,
} from '../middlewares/urlMiddlewares.js';

const UrlRouter = Router();

UrlRouter.get('/urls/:id', verifyIdExist, getUrlPerId);
UrlRouter.get('/urls/open/:shortUrl', verifyShortUrlExist, getShortUrlOpen);
UrlRouter.post('/urls/shorten', validateSchema(postShortenSchema), authValidation, postShorten);
UrlRouter.delete('/urls/:id', authValidation, verifyShortUrl, deleteShorten);

export default UrlRouter;
