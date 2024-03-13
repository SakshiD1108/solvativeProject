import {Application} from 'express'
import userRoute from "../routes/user.route";
import rewardHistory from "./reward.route";


export const mountRoutes =(app:Application)=>{
app.use("/User",userRoute)
app.use("/rewardHistory", rewardHistory)

}