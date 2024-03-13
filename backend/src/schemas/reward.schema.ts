import joi from "joi";

export const rewardCreateSchema = joi.object({
    timestamp: joi.date().iso().optional(),
    points: joi.number().required(),
    givenBy: joi.string().required(),
    givenTo: joi.string().required(),
  });