import Joi from "joi";
import { CustomError } from "../utils/appError";
import { HttpStatusCode } from "../utils/httpStatusCode";
import { ValidationError } from "joi";

export const payloadChecker = async (
  schema: Joi.ObjectSchema,
  payload: any
): Promise<string[]> => {
  if (!schema.validateAsync) {
    throw new CustomError(
      HttpStatusCode.NOT_FOUND,
      'validateAsync method not found'
    );
  }

  try {
    await schema.validateAsync(payload);
    return []; 
  } catch (error) {
    if (error instanceof ValidationError) {
      const errorMessages = error.details.map((detail) => detail.message);
      return errorMessages; 
    } else {
      throw error as CustomError;
    }
  }
};
