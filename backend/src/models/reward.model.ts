import { Schema, model } from "mongoose";

export interface IRewardHistory {
  timestamp: Date;
  points: number;
  givenBy: string; 
  givenTo: string;
}

export const schema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    auto: true
  },

  timestamp: { type: Date, default: Date.now },
  points: {type:Number },
  givenBy: { type: Schema.Types.ObjectId, ref: 'User' },
  givenTo: { type: Schema.Types.ObjectId, ref: 'User' },

  createdOn: {
    type: Date,
    default: Date.now
  },
  updatedOn: {
    type: Date,
    default: Date.now
  }
})

export const RewardHistory = model<IRewardHistory>('rewardHistory', schema);