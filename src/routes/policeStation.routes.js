import express from "express";
import {
  getAllPoliceStations,
  getPoliceStationById,
  createPoliceStation,
  updatePoliceStation,
  deletePoliceStation,
} from "../controllers/policeStation.controller.js";

const router = express.Router();

router.get("/", getAllPoliceStations);
router.get("/:id",getPoliceStationById);
router.post("/", createPoliceStation);
router.put(
  "/:id",
  updatePoliceStation
);
router.delete("/:id", deletePoliceStation);

export default router;