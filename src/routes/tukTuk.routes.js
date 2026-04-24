import express from "express";
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

router.get("/", validateTukTukQuery, getAllTukTuks);
router.get("/:id", validateTukTukId, getTukTukById);
router.post("/", validateCreateTukTuk, createTukTuk);
router.put("/:id", validateTukTukId, validateUpdateTukTuk, updateTukTuk);
router.delete("/:id", validateTukTukId, deleteTukTuk);

export default router;