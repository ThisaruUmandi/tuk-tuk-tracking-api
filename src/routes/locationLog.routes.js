import express from "express";
import authenticate from "../middlewares/auth.middleware.js";
import authorizeRoles from "../middlewares/rbac.middleware.js";

import {
  getAllLocationLogs,
  getLocationLogById,
  createLocationLog,
  deleteLocationLog,
} from "../controllers/locationLog.controller.js";
import {
  validateLocationLogId,
  validateLocationLogQuery,
  validateCreateLocationLog,
} from "../validations/locationLog.validation.js";

const router = express.Router();

router.use(authenticate);

/**
 * @swagger
 * tags:
 *   name: LocationLogs
 *   description: Location log management
 */
 
/**
 * @swagger
 * /location-logs:
 *   get:
 *     summary: Get all location logs
 *     tags: [LocationLogs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: tuk_tuk_id
 *         schema:
 *           type: integer
 *         description: Filter by tuk-tuk ID
 *       - in: query
 *         name: tracking_device_id
 *         schema:
 *           type: integer
 *         description: Filter by tracking device ID
 *       - in: query
 *         name: police_station_id
 *         schema:
 *           type: integer
 *         description: Filter by police station ID
 *       - in: query
 *         name: source
 *         schema:
 *           type: string
 *           enum: [gps, simulated, manual]
 *         description: Filter by source
 *       - in: query
 *         name: from
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Start date-time range
 *         example: "2026-05-01T00:00:00Z"
 *       - in: query
 *         name: to
 *         schema:
 *           type: string
 *           format: date-time
 *         description: End date-time range
 *         example: "2026-05-02T00:00:00Z"
 *     responses:
 *       200:
 *         description: List of location logs
 *       401:
 *         description: Unauthorized
 *   post:
 *     summary: Create a location log
 *     tags: [LocationLogs]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - tuk_tuk_id
 *               - tracking_device_id
 *               - police_station_id
 *               - latitude
 *               - longitude
 *               - recorded_at
 *             properties:
 *               tuk_tuk_id:
 *                 type: integer
 *                 example: 1
 *               tracking_device_id:
 *                 type: integer
 *                 example: 1
 *               police_station_id:
 *                 type: integer
 *                 example: 1
 *               latitude:
 *                 type: number
 *                 example: 6.9271
 *               longitude:
 *                 type: number
 *                 example: 79.8612
 *               speed:
 *                 type: number
 *                 example: 40.5
 *               heading:
 *                 type: number
 *                 example: 180.0
 *               recorded_at:
 *                 type: string
 *                 format: date-time
 *                 example: "2026-05-01T10:00:00Z"
 *               source:
 *                 type: string
 *                 enum: [gps, simulated, manual]
 *                 example: gps
 *     responses:
 *       201:
 *         description: Location log created
 *       401:
 *         description: Unauthorized
 */
 
/**
 * @swagger
 * /location-logs/{id}:
 *   get:
 *     summary: Get location log by ID
 *     tags: [LocationLogs]
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
 *         description: Location log found
 *       404:
 *         description: Not found
 *   delete:
 *     summary: Delete a location log
 *     tags: [LocationLogs]
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
 *         description: Location log deleted
 *       404:
 *         description: Not found
 */

router.get("/", validateLocationLogQuery, authorizeRoles("admin", "police"), getAllLocationLogs);
router.get("/:id", validateLocationLogId, authorizeRoles("admin", "police"), getLocationLogById);

router.post("/", validateCreateLocationLog, authorizeRoles("admin"), createLocationLog);
router.delete("/:id", validateLocationLogId, authorizeRoles("admin"), deleteLocationLog);

export default router;