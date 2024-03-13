import { Router } from "express";
import { userController } from "../controllers/user.controller";
const router: Router = Router();
router.post('/register', userController.registerUser);
router.post('/login',userController.login)
router.put('/updateUserById',userController.updateUserById)


export default router;