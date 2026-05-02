import express from "express";
import authenticate from "../middlewares/auth.middleware.js";
import authorizeRoles from "../middlewares/rbac.middleware.js";

import {
  getAllTukTuks,
  getTukTukById,
  createTukTuk,
  updateTukTuk,
  deleteTukTuk,
} from "../controllers/tukTuk.controller.js";
import {
  validateTukTukId,
  validateTukTukQuery,
  validateCreateTukTuk,
  validateUpdateTukTuk,
} from "../validations/tukTuk.validation.js";

const router = express.Router();

router.use(authenticate);

router.get("/", authorizeRoles("admin", "police"), validateTukTukQuery, getAllTukTuks);
router.get("/:id", authorizeRoles("admin", "police"),  validateTukTukId, getTukTukById);

router.post("/", authorizeRoles("admin"), validateCreateTukTuk, createTukTuk);
router.put("/:id", authorizeRoles("admin"), validateTukTukId, validateUpdateTukTuk, updateTukTuk);
router.delete("/:id", authorizeRoles("admin"), validateTukTukId, deleteTukTuk);

export default router;