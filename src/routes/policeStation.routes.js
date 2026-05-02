import express from "express";
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

router.get("/", validatePoliceStationQuery, getAllPoliceStations);
router.get("/:id", validatePoliceStationId, getPoliceStationById);
router.post("/", validateCreatePoliceStation, createPoliceStation);
router.put(
  "/:id",
  validatePoliceStationId,
  validateUpdatePoliceStation,
  updatePoliceStation
);
router.delete("/:id", validatePoliceStationId, deletePoliceStation);

export default router;