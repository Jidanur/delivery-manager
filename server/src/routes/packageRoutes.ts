import { Router } from "express";
import {
    createPackage,
    deletePackage,
    getAllPackages,
    getPackage,
    myPackages,
    updatePackage,
} from "../controller/packageController";
import { protect } from "../middleware/authMiddleware";

const router = Router();

// Route to create a package
router.post("/create", protect, createPackage);

// Route to update a package
router.put("/update", protect, updatePackage);

// Route to get a package by ID
router.get("/get/:packageId", protect, getPackage);

// getting driver or client's own packages
router.get("/myPackages", protect, myPackages);

// Route to get all packages
router.get("/getAll", protect, getAllPackages);

// Route to delete a package by ID
router.delete("/delete/:packageId", protect, deletePackage);

export default router;