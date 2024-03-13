import { Router } from "express";
import { rewardController } from "../controllers/reward.controller";

const router: Router = Router();
router.post("/addPoints", rewardController.givePoints);
router.get("/getAllPoints/:id", rewardController.getAllPoints);
router.get("/getAllReward/:id", rewardController.getAllRewards);
router.delete("/:id", rewardController.deletePoints);

export default router;
