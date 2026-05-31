import express from "express";
import { registerUser, loginUser, getProfile, protect } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get(
  "/profile",
  protect,
  getProfile
);

export default router;