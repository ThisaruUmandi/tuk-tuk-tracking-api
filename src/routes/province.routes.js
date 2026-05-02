import express from "express";
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

router.get("/", getAllProvinces);
router.get("/:id", validateProvinceId, getProvinceById);
router.post("/", validateCreateProvince, createProvince);
router.put("/:id", validateProvinceId, validateUpdateProvince, updateProvince);
router.delete("/:id", validateProvinceId, deleteProvince);

export default router;