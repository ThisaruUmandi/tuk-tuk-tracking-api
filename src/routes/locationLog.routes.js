import express from "express";
import authenticate from "../middlewares/auth.middleware.js";
import authorizeRoles from "../middlewares/rbac.middleware.js";

import {
  getAllLocationLogs,
  getLocationLogById,
  createLocationLog,
  deleteLocationLog,
} from "../controllers/locationLog.controller.js";
import {
  validateLocationLogId,
  validateLocationLogQuery,
  validateCreateLocationLog,
} from "../validations/locationLog.validation.js";

const router = express.Router();

router.use(authenticate);

router.get("/", validateLocationLogQuery, authorizeRoles("admin", "police"), getAllLocationLogs);
router.get("/:id", validateLocationLogId, authorizeRoles("admin", "police"), getLocationLogById);

router.post("/", validateCreateLocationLog, authorizeRoles("admin"), createLocationLog);
router.delete("/:id", validateLocationLogId, authorizeRoles("admin"), deleteLocationLog);

export default router;