import express from "express";
import authenticate from "../middlewares/auth.middleware.js";
import authorizeRoles from "../middlewares/rbac.middleware.js";

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

router.get("/", authorizeRoles("admin", "police"), getAllDrivers);
router.get("/:id", authorizeRoles("admin", "police"),validateDriverId, getDriverById);

router.post("/", authorizeRoles("admin"),validateCreateDriver, createDriver);
router.patch("/:id", authorizeRoles("admin"), validateDriverId, validateUpdateDriver, updateDriver);
router.delete("/:id", authorizeRoles("admin"), validateDriverId, deleteDriver);

export default router;


