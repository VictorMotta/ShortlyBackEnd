import joi from "joi";

export const postShortenSchema = joi.object({
  url: joi.string().uri().required(),
});
