import express from "express";
import healthRoutes from "./health.route.js";
import provinceRoutes from "./province.routes.js";
import districtRoutes from "./district.routes.js";
import policeStationRoutes from "./policeStation.routes.js";
import driver from "./driver.routes.js";
import tukTukRoutes from "./tukTuk.routes.js";
import trackingDeviceRoutes from "./trackingDevice.routes.js";
import locationLogRoutes from "./locationLog.routes.js";
import userRoutes from "./user.routes.js";
import authRoutes from "./auth.routes.js";

const router = express.Router();

router.use("/health", healthRoutes);
router.use("/provinces", provinceRoutes);
router.use("/districts", districtRoutes);
router.use("/police-stations", policeStationRoutes);
router.use("/drivers", driver);
router.use("/tuk-tuks", tukTukRoutes);
router.use("/tracking_devices", trackingDeviceRoutes);
router.use("/location-logs", locationLogRoutes);
router.use("/users", userRoutes);
router.use("/auth", authRoutes);

export default router;