import { Request, Response } from "express";
import { HttpStatusCode } from "../utils/httpStatusCode";
import logger from "../utils/logger";
import { errorMessage } from "../utils/errorMessage";
import { payloadChecker } from "../utils/payloadChecker";
import RewardService from "../services/reward.service";
import { rewardCreateSchema } from "../schemas/reward.schema";

class RewardController {
  public async givePoints(req: Request, res: Response) {
    try {
      const errorMessages = await payloadChecker(rewardCreateSchema, req.body);

      if (errorMessages.length > 0) {
        return res.status(HttpStatusCode.BAD_REQUEST).json({
          success: false,
          message: "Validation errors: " + errorMessages.join(", "),
        });
      }
      const rewardHistory = await RewardService.saveRewardHistory(req.body);
      res.status(201).json(rewardHistory);
    } catch (error: any) {
      logger.error(error.message);
      return res.status(error.statusCode).json({
        success: false,
        message: errorMessage.internalServerError,
      });
    }
  }

  public async getAllPoints(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const allPoints = await RewardService.getAllpoints(id as string);
      if (allPoints) {
        return res.status(HttpStatusCode.OK).send({
          success: true,
          data: allPoints,
        });
      } else {
        return res.status(HttpStatusCode.OK).send({
          success: true,
          message: errorMessage.null,
        });
      }
    } catch (error: any) {
      logger.error(error.message);
      return res.status(error.statusCode).send({
        success: false,
        message: errorMessage.internalServerError,
      });
    }
  }

  public async deletePoints(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = await RewardService.deletePointById(id as string);
      if (data) {
        return res.status(HttpStatusCode.OK).send({
          success: true,
          data: "document is Deleted",
        });
      } else {
        return res.status(HttpStatusCode.OK).send({
          success: true,
          data: "document not Deleted ",
        });
      }
    } catch (error: any) {
      logger.error(error.message);
      return res.status(error.statusCode).send({
        success: false,
        message: error.internalServerError,
      });
    }
  }

  public async getAllRewards(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const getAllrewards = await RewardService.getAllRewards(id as string);
      if (getAllrewards) {
        return res.status(HttpStatusCode.OK).send({
          success: true,
          data: getAllrewards,
        });
      } else {
        return res.status(HttpStatusCode.OK).send({
          success: true,
          message: errorMessage.null,
        });
      }
    } catch (error: any) {
      logger.error(error.message);
      return res.status(error.statusCode).send({
        success: false,
        message: errorMessage.internalServerError,
      });
    }
  }
}

export const rewardController = new RewardController();
