import {IRewardHistory, RewardHistory} from "../models/reward.model";
import { CustomError } from '../utils/appError';
import { HttpStatusCode } from '../utils/httpStatusCode';

class RewardService {
  
  public async saveRewardHistory(body:IRewardHistory ): Promise<IRewardHistory> {
    try {
      const rewardHistory = new RewardHistory(body);
      return await rewardHistory.save();
    } catch (error: any) {
      throw new CustomError(HttpStatusCode.INTERNAL_SERVER, error.message);
    }
  }

  public async getAllRewards(id:string): Promise<IRewardHistory[]> {
    try {
      return await RewardHistory.find({givenTo:id});
    } catch (error: any) {
      throw new CustomError(HttpStatusCode.INTERNAL_SERVER, error.message);
    }
  }


  public async getAllpoints(id:string): Promise<IRewardHistory[]> {
    try {
      return await RewardHistory.find({givenBy:id});
    } catch (error: any) {
      throw new CustomError(HttpStatusCode.NOT_FOUND, error.message);
    }
  }

  public async deletePointById(id: string): Promise<IRewardHistory | null> {
    try {
      return await RewardHistory.findOneAndRemove({_id:id});
    } catch (error: any) {
      throw new CustomError(HttpStatusCode.NOT_FOUND, error.message);
    }
  }

}

export default new RewardService();
