import express from "express";
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

router.get("/", validateLocationLogQuery, getAllLocationLogs);
router.get("/:id", validateLocationLogId, getLocationLogById);
router.post("/", validateCreateLocationLog, createLocationLog);
router.delete("/:id", validateLocationLogId, deleteLocationLog);

export default router;