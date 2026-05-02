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

/**
 * @swagger
 * tags:
 *   name: Districts
 *   description: District management
 */

/**
 * @swagger
 * /districts:
 *   get:
 *     summary: Get all districts
 *     tags: [Districts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of districts
 *       401:
 *         description: Unauthorized
 *   post:
 *     summary: Create a district
 *     tags: [Districts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - code
 *               - province_id
 *             properties:
 *               name:
 *                 type: string
 *                 example: Colombo1
 *               code:
 *                 type: string
 *                 example: COLOB
 *               province_id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: District created
 *       401:
 *         description: Unauthorized
 *       409:
 *         description: District code already exists
 */

/**
 * @swagger
 * /districts/{id}:
 *   get:
 *     summary: Get district by ID
 *     tags: [Districts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: District found
 *       404:
 *         description: District not found
 *   put:
 *     summary: Update a district
 *     tags: [Districts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - code
 *               - province_id
 *             properties:
 *               name:
 *                 type: string
 *                 example: Colombo12
 *               code:
 *                 type: string
 *                 example: COLO
 *               province_id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: District updated
 *       404:
 *         description: District not found
 *   delete:
 *     summary: Delete a district
 *     tags: [Districts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: District deleted
 *       404:
 *         description: District not found
 */

router.get("/", authorizeRoles("admin", "police"), getAllDistricts);
router.get("/:id", authorizeRoles("admin", "police"), validateDistrictId, getDistrictById);
router.post("/", authorizeRoles("admin"), validateCreateDistrict, createDistrict);
router.put("/:id", authorizeRoles("admin"), validateDistrictId, validateUpdateDistrict, updateDistrict);
router.delete("/:id", authorizeRoles("admin"), validateDistrictId, deleteDistrict);

export default router;