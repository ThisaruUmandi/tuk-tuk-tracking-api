import express from "express";
import authenticate from "../middlewares/auth.middleware.js";
import authorizeRoles from "../middlewares/rbac.middleware.js";

import {
  getAllProvinces,
  getProvinceById,
  createProvince,
  updateProvince,
  deleteProvince,
} from "../controllers/province.controller.js";
import {
  validateProvinceId,
  validateCreateProvince,
  validateUpdateProvince,
} from "../validations/province.validation.js";

const router = express.Router();

router.use(authenticate);

router.get("/", authorizeRoles("admin", "police"), getAllProvinces);
router.get("/:id", authorizeRoles("admin", "police"), validateProvinceId, getProvinceById);

router.post("/", authorizeRoles("admin"), validateCreateProvince, createProvince);
router.put("/:id", authorizeRoles("admin"), validateProvinceId, validateUpdateProvince, updateProvince);
router.delete("/:id", authorizeRoles("admin"), validateProvinceId, deleteProvince);

export default router;