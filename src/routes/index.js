import express from "express";
import healthRoutes from "./health.route.js";
import provinceRoutes from "./province.routes.js";
import districtRoutes from "./district.routes.js";

const router = express.Router();

router.use("/health", healthRoutes);
router.use("/provinces", provinceRoutes);
router.use("/districts", districtRoutes);

export default router;