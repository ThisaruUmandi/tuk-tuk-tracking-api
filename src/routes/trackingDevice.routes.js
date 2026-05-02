import express from "express";
import authenticate from "../middlewares/auth.middleware.js";
import authorizeRoles from "../middlewares/rbac.middleware.js";

import {
  getAllTrackingDevices,
  getTrackingDeviceById,
  createTrackingDevice,
  updateTrackingDevice,
  deleteTrackingDevice,
} from "../controllers/trackingDevice.controller.js";

import {
  validateTrackingDeviceId,
  validateTrackingDeviceQuery,
  validateCreateTrackingDevice,
  validateUpdateTrackingDevice,
} from "../validations/trackingDevice.validation.js";

const router = express.Router();

router.use(authenticate, authorizeRoles("admin"));

/**
 * @swagger
 * tags:
 *   name: TrackingDevices
 *   description: Tracking device management
 */
 
/**
 * @swagger
 * /tracking_devices:
 *   get:
 *     summary: Get all tracking devices
 *     tags: [TrackingDevices]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: tuk_tuk_id
 *         schema:
 *           type: integer
 *         description: Filter by tuk-tuk ID
 *       - in: query
 *         name: is_active
 *         schema:
 *           type: boolean
 *         description: Filter by active status
 *     responses:
 *       200:
 *         description: List of tracking devices
 *       401:
 *         description: Unauthorized
 *   post:
 *     summary: Create a tracking device
 *     tags: [TrackingDevices]
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
 *               - serial_number
 *               - api_key
 *             properties:
 *               tuk_tuk_id:
 *                 type: integer
 *                 example: 13
 *               serial_number:
 *                 type: string
 *                 example: SN-ABC12345
 *               api_key:
 *                 type: string
 *                 example: "abc123xyz456"
 *               installed_at:
 *                 type: string
 *                 format: date-time
 *                 example: "2026-05-01T10:00:00Z"
 *               last_seen_at:
 *                 type: string
 *                 format: date-time
 *                 example: "2026-05-01T12:00:00Z"
 *               is_active:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       201:
 *         description: Tracking device created
 *       401:
 *         description: Unauthorized
 */
 
/**
 * @swagger
 * /tracking_devices/{id}:
 *   get:
 *     summary: Get tracking device by ID
 *     tags: [TrackingDevices]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 13
 *     responses:
 *       200:
 *         description: Tracking device found
 *       404:
 *         description: Not found
 *   put:
 *     summary: Update a tracking device
 *     tags: [TrackingDevices]
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
 *               - tuk_tuk_id
 *               - serial_number
 *               - api_key
 *             properties:
 *               tuk_tuk_id:
 *                 type: integer
 *                 example: 13
 *               serial_number:
 *                 type: string
 *                 example: SN-ABC12346
 *               api_key:
 *                 type: string
 *                 example: "abc123xyz457"
 *               installed_at:
 *                 type: string
 *                 format: date-time
 *                 example: "2026-05-08T10:00:00Z"
 *               last_seen_at:
 *                 type: string
 *                 format: date-time
 *                 example: "2026-05-08T12:00:00Z"
 *               is_active:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Tracking device updated
 *       404:
 *         description: Not found
 *   delete:
 *     summary: Delete a tracking device
 *     tags: [TrackingDevices]
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
 *         description: Tracking device deleted
 *       404:
 *         description: Not found
 */

router.get("/", validateTrackingDeviceQuery, getAllTrackingDevices);
router.get("/:id", validateTrackingDeviceId, getTrackingDeviceById);
router.post("/", validateCreateTrackingDevice, createTrackingDevice);
router.put( "/:id", validateTrackingDeviceId, validateUpdateTrackingDevice, updateTrackingDevice );
router.delete("/:id", validateTrackingDeviceId, deleteTrackingDevice);

export default router;