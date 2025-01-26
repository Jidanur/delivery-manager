import { Router } from "express";
import { createUser, getUserInfo } from "../controller/userCRUD";
import { protect } from "../middleware/authMiddleware";

const router = Router();

router.post("/create", createUser);
router.get("/getUserInfo", protect, getUserInfo);

export default router;
