import { Router } from "express";
import { createUser, deleteUser, getAllUsers, getUserInfo, getUser } from "../controller/userCRUD";
import { protect } from "../middleware/authMiddleware";

const router = Router();

router.post("/create", createUser);
router.get("/getUserInfo", protect, getUserInfo);
router.get("/get/:id", protect, getUser);
router.get("/getAll", protect, getAllUsers);
router.delete("/deleteUser/:id", protect, deleteUser);

export default router;
