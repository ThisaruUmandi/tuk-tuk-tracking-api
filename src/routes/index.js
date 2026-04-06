import express from "express";
import healthRoutes from "./health.route.js";
import provinceRoutes from "./province.routes.js";

const router = express.Router();

router.use("/health", healthRoutes);
router.use("/provinces", provinceRoutes);

export default router;