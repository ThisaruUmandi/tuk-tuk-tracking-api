import express from "express";

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

// GET all districts
router.get("/", getAllDistricts);

// GET district by ID
router.get("/:id", validateDistrictId, getDistrictById);

// CREATE district
router.post("/", validateCreateDistrict, createDistrict);

// UPDATE district
router.put("/:id", validateDistrictId, validateUpdateDistrict, updateDistrict);

// DELETE district
router.delete("/:id", validateDistrictId, deleteDistrict);

export default router;