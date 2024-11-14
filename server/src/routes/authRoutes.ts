import { Router } from "express";
import { createUser, login } from "../controller/authController";


const router = Router();

router.post("/login", login);
router.post("/create", createUser);

export default router;
