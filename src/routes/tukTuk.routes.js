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

/**
 * @swagger
 * tags:
 *   name: TukTuks
 *   description: Tuk-tuk vehicle management
 */
 
/**
 * @swagger
 * /tuk-tuks:
 *   get:
 *     summary: Get all tuk-tuks
 *     tags: [TukTuks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: province_id
 *         schema:
 *           type: integer
 *         description: Filter by province ID
 *       - in: query
 *         name: district_id
 *         schema:
 *           type: integer
 *         description: Filter by district ID
 *       - in: query
 *         name: police_station_id
 *         schema:
 *           type: integer
 *         description: Filter by police station ID
 *       - in: query
 *         name: driver_id
 *         schema:
 *           type: integer
 *         description: Filter by driver ID
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [active, inactive, flagged]
 *         description: Filter by status
 *     responses:
 *       200:
 *         description: List of tuk-tuks
 *       401:
 *         description: Unauthorized
 *   post:
 *     summary: Create a tuk-tuk
 *     tags: [TukTuks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - province_id
 *               - district_id
 *               - police_station_id
 *               - driver_id
 *               - registration_number
 *             properties:
 *               province_id:
 *                 type: integer
 *                 example: 1
 *               district_id:
 *                 type: integer
 *                 example: 1
 *               police_station_id:
 *                 type: integer
 *                 example: 1
 *               driver_id:
 *                 type: integer
 *                 example: 1
 *               registration_number:
 *                 type: string
 *                 example: CAB-1234
 *               status:
 *                 type: string
 *                 enum: [active, inactive, flagged]
 *                 example: active
 *               last_latitude:
 *                 type: number
 *                 example: 6.9271
 *               last_longitude:
 *                 type: number
 *                 example: 79.8612
 *               last_recorded_at:
 *                 type: string
 *                 format: date-time
 *                 example: "2026-05-01T10:00:00Z"
 *     responses:
 *       201:
 *         description: Tuk-tuk created
 *       401:
 *         description: Unauthorized
 */
 
/**
 * @swagger
 * /tuk-tuks/{id}:
 *   get:
 *     summary: Get tuk-tuk by ID
 *     tags: [TukTuks]
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
 *         description: Tuk-tuk found
 *       404:
 *         description: Not found
 *   put:
 *     summary: Update a tuk-tuk
 *     tags: [TukTuks]
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
 *               - province_id
 *               - district_id
 *               - police_station_id
 *               - driver_id
 *               - registration_number
 *             properties:
 *               province_id:
 *                 type: integer
 *                 example: 1
 *               district_id:
 *                 type: integer
 *                 example: 1
 *               police_station_id:
 *                 type: integer
 *                 example: 1
 *               driver_id:
 *                 type: integer
 *                 example: 1
 *               registration_number:
 *                 type: string
 *                 example: CAB-1234
 *               status:
 *                 type: string
 *                 enum: [active, inactive, flagged]
 *                 example: active
 *               last_latitude:
 *                 type: number
 *                 example: 6.9271
 *               last_longitude:
 *                 type: number
 *                 example: 79.8612
 *               last_recorded_at:
 *                 type: string
 *                 format: date-time
 *                 example: "2026-05-01T10:00:00Z"
 *     responses:
 *       200:
 *         description: Tuk-tuk updated
 *       404:
 *         description: Not found
 *   delete:
 *     summary: Delete a tuk-tuk
 *     tags: [TukTuks]
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
 *         description: Tuk-tuk deleted
 *       404:
 *         description: Not found
 */

router.get("/", authorizeRoles("admin", "police"), validateTukTukQuery, getAllTukTuks);
router.get("/:id", authorizeRoles("admin", "police"),  validateTukTukId, getTukTukById);

router.post("/", authorizeRoles("admin"), validateCreateTukTuk, createTukTuk);
router.put("/:id", authorizeRoles("admin"), validateTukTukId, validateUpdateTukTuk, updateTukTuk);
router.delete("/:id", authorizeRoles("admin"), validateTukTukId, deleteTukTuk);

export default router;