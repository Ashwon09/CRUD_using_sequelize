import { Router } from "express";
const router = Router();
import {
  loginController,
  registerController,
  refreshTokenController,
  readOneUserController,
  updateUserController,
} from "../Controllers/User_Controller";
import { verifyRefreshToken } from "../Middlewares/Authentication";

router.post("/register", registerController);
router.post("/login", loginController);
router.post("/verifyRefreshToken", verifyRefreshToken, refreshTokenController);
router.get("/readoneuser/:user_id", readOneUserController);
router.patch("/updateuser", updateUserController);

export default router;
