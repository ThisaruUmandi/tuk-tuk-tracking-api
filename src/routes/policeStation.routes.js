import express from "express";
import authenticate from "../middlewares/auth.middleware.js";
import authorizeRoles from "../middlewares/rbac.middleware.js";

import {
  getAllPoliceStations,
  getPoliceStationById,
  createPoliceStation,
  updatePoliceStation,
  deletePoliceStation,
} from "../controllers/policeStation.controller.js";
import {
  validatePoliceStationId,
  validatePoliceStationQuery,
  validateCreatePoliceStation,
  validateUpdatePoliceStation,
} from "../validations/policeStation.validation.js";

const router = express.Router();

router.use(authenticate);

/**
 * @swagger
 * tags:
 *   name: PoliceStations
 *   description: Police station management
 */
 
/**
 * @swagger
 * /police-stations:
 *   get:
 *     summary: Get all police stations
 *     tags: [PoliceStations]
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
 *     responses:
 *       200:
 *         description: List of police stations
 *       401:
 *         description: Unauthorized
 *   post:
 *     summary: Create a police station
 *     tags: [PoliceStations]
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
 *               - name
 *               - code
 *             properties:
 *               province_id:
 *                 type: integer
 *                 example: 1
 *               district_id:
 *                 type: integer
 *                 example: 1
 *               name:
 *                 type: string
 *                 example: Colombo Fort Police Station
 *               code:
 *                 type: string
 *                 example: CFT
 *               address:
 *                 type: string
 *                 example: "No. 1, Main Street, Colombo 01"
 *               phone:
 *                 type: string
 *                 example: "0112345678"
 *               email:
 *                 type: string
 *                 example: colombofort@police.lk
 *               is_active:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       201:
 *         description: Police station created
 *       401:
 *         description: Unauthorized
 *       409:
 *         description: Police station code already exists
 */
 
/**
 * @swagger
 * /police-stations/{id}:
 *   get:
 *     summary: Get police station by ID
 *     tags: [PoliceStations]
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
 *         description: Police station found
 *       404:
 *         description: Not found
 *   put:
 *     summary: Update a police station
 *     tags: [PoliceStations]
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
 *               - name
 *               - code
 *             properties:
 *               province_id:
 *                 type: integer
 *                 example: 1
 *               district_id:
 *                 type: integer
 *                 example: 1
 *               name:
 *                 type: string
 *                 example: Colombo Fort Police Station1
 *               code:
 *                 type: string
 *                 example: CFT
 *               address:
 *                 type: string
 *                 example: "No. 1, Main Street, Colombo 07"
 *               phone:
 *                 type: string
 *                 example: "0112345679"
 *               email:
 *                 type: string
 *                 example: colombofort1@police.lk
 *               is_active:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Police station updated
 *       404:
 *         description: Not found
 *   delete:
 *     summary: Delete a police station
 *     tags: [PoliceStations]
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
 *         description: Police station deleted
 *       404:
 *         description: Not found
 */

router.get("/", authorizeRoles("admin", "police"), validatePoliceStationQuery, getAllPoliceStations);
router.get("/:id", authorizeRoles("admin", "police"), validatePoliceStationId, getPoliceStationById);

router.post("/", authorizeRoles("admin"), validateCreatePoliceStation, createPoliceStation);
router.put("/:id", authorizeRoles("admin"), validatePoliceStationId, validateUpdatePoliceStation, updatePoliceStation);
router.delete("/:id", authorizeRoles("admin"), validatePoliceStationId, deletePoliceStation);

export default router;