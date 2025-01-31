import { Router } from "express";
import { createUser, deleteUser, getAllUsers, getUser, getUserInfo, updateUser } from '../controller/userCRUD';
import { protect } from "../middleware/authMiddleware";

const router = Router();

router.post("/create", createUser);
router.put("/update/:id", protect, updateUser)
router.get("/getUserInfo", protect, getUserInfo);
router.get("/get/:id", protect, getUser);
router.get("/getAll", protect, getAllUsers);
router.delete("/deleteUser/:id", protect, deleteUser);

export default router;
