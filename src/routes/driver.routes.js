import express from "express";
import {
  getAllDrivers,
  getDriverById,
  createDriver,
  updateDriver,
  deleteDriver,
} from "../controllers/driver.controller.js";
import {
  validateDriverId,
  validateCreateDriver,
  validateUpdateDriver,
} from "../validations/driver.validation.js";

const router = express.Router();

router.get("/", getAllDrivers);
router.get("/:id", validateDriverId, getDriverById);
router.post("/", validateCreateDriver, createDriver);
router.put("/:id", validateDriverId, validateUpdateDriver, updateDriver);
router.delete("/:id", validateDriverId, deleteDriver);

export default router;