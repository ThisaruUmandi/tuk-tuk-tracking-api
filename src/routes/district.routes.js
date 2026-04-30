import express from "express";
import authenticate from "../middlewares/auth.middleware.js";
import authorizeRoles from "../middlewares/rbac.middleware.js";

import {
  getAllDistricts,
  getDistrictById,
  createDistrict,
  updateDistrict,
  deleteDistrict,
} from "../controllers/district.controller.js";

import {
  validateDistrictId,
  validateCreateDistrict,
  validateUpdateDistrict,
} from "../validations/district.validation.js";

const router = express.Router();

router.use(authenticate);

router.get("/", authorizeRoles("admin", "police"), getAllDistricts);
router.get("/:id", authorizeRoles("admin", "police"), validateDistrictId, getDistrictById);
router.post("/", authorizeRoles("admin"), validateCreateDistrict, createDistrict);
router.put("/:id", authorizeRoles("admin"), validateDistrictId, validateUpdateDistrict, updateDistrict);
router.delete("/:id", authorizeRoles("admin"), validateDistrictId, deleteDistrict);

export default router;