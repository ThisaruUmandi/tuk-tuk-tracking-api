import express from "express";
import healthRoutes from "./health.route.js";
import provinceRoutes from "./province.routes.js";
import districtRoutes from "./district.routes.js";
import policeStationRoutes from "./policeStation.routes.js";
import driver from "./driver.routes.js";
import tukTukRoutes from "./tukTuk.routes.js";

const router = express.Router();

router.use("/health", healthRoutes);
router.use("/provinces", provinceRoutes);
router.use("/districts", districtRoutes);
router.use("/police-stations", policeStationRoutes);
router.use("/drivers", driver);
router.use("/tuk-tuks", tukTukRoutes);

export default router;