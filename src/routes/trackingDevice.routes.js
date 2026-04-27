import express from "express";
import {
  getAllTrackingDevices,
  getTrackingDeviceById,
  createTrackingDevice,
  updateTrackingDevice,
  deleteTrackingDevice,
} from "../controllers/trackingDevice.controller.js";
import {
  validateTrackingDeviceId,
  validateTrackingDeviceQuery,
  validateCreateTrackingDevice,
  validateUpdateTrackingDevice,
} from "../validations/trackingDevice.validation.js";

const router = express.Router();

router.get("/", validateTrackingDeviceQuery, getAllTrackingDevices);
router.get("/:id", validateTrackingDeviceId, getTrackingDeviceById);
router.post("/", validateCreateTrackingDevice, createTrackingDevice);
router.put(
  "/:id",
  validateTrackingDeviceId,
  validateUpdateTrackingDevice,
  updateTrackingDevice
);
router.delete("/:id", validateTrackingDeviceId, deleteTrackingDevice);

export default router;