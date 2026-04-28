import express from "express";
import {
  getAllLocationLogs,
  getLocationLogById,
  createLocationLog,
  deleteLocationLog,
} from "../controllers/locationLog.controller.js";

const router = express.Router();

router.get("/", getAllLocationLogs);
router.get("/:id", getLocationLogById);
router.post("/", createLocationLog);
router.delete("/:id", deleteLocationLog);

export default router;