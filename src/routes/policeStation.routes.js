import express from "express";
import authenticate from "../middlewares/auth.middleware.js";
import authorizeRoles from "../middlewares/rbac.middleware.js";

import {
  getAllPoliceStations,
  getPoliceStationById,
  createPoliceStation,
  updatePoliceStation,
  deletePoliceStation,
} from "../controllers/policeStation.controller.js";
import {
  validatePoliceStationId,
  validatePoliceStationQuery,
  validateCreatePoliceStation,
  validateUpdatePoliceStation,
} from "../validations/policeStation.validation.js";

const router = express.Router();

router.use(authenticate);

router.get("/", authorizeRoles("admin", "police"), validatePoliceStationQuery, getAllPoliceStations);
router.get("/:id", authorizeRoles("admin", "police"), validatePoliceStationId, getPoliceStationById);

router.post("/", authorizeRoles("admin"), validateCreatePoliceStation, createPoliceStation);
router.put("/:id", authorizeRoles("admin"), validatePoliceStationId, validateUpdatePoliceStation, updatePoliceStation);
router.delete("/:id", authorizeRoles("admin"), validatePoliceStationId, deletePoliceStation);

export default router;