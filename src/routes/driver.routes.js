import express from "express";
import authenticate from "../middlewares/auth.middleware.js";
import authorizeRoles from "../middlewares/rbac.middleware.js";

import {
  getAllDrivers,
  getDriverById,
  createDriver,
  updateDriver,
  deleteDriver,
} from "../controllers/driver.controller.js";
import {
  validateDriverId,
  validateCreateDriver,
  validateUpdateDriver,
} from "../validations/driver.validation.js";

const router = express.Router();

router.use(authenticate);

/**
 * @swagger
 * tags:
 *   name: Drivers
 *   description: Driver management
 */
 
/**
 * @swagger
 * /drivers:
 *   get:
 *     summary: Get all drivers
 *     tags: [Drivers]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of drivers
 *       401:
 *         description: Unauthorized
 *   post:
 *     summary: Create a driver
 *     tags: [Drivers]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - first_name
 *               - last_name
 *               - nic
 *               - phone
 *               - license_number
 *             properties:
 *               first_name:
 *                 type: string
 *                 example: Kamal
 *               last_name:
 *                 type: string
 *                 example: Perera
 *               nic:
 *                 type: string
 *                 example: "199012345678"
 *               phone:
 *                 type: string
 *                 example: "0771234567"
 *               license_number:
 *                 type: string
 *                 example: B1234567
 *               address:
 *                 type: string
 *                 example: "No. 5, Galle Road, Colombo 03"
 *               is_active:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       201:
 *         description: Driver created
 *       401:
 *         description: Unauthorized
 */
 
/**
 * @swagger
 * /drivers/{id}:
 *   get:
 *     summary: Get driver by ID
 *     tags: [Drivers]
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
 *         description: Driver found
 *       404:
 *         description: Driver not found
 *   patch:
 *     summary: Update a driver
 *     tags: [Drivers]
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
 *               - first_name
 *               - last_name
 *               - nic
 *               - phone
 *               - license_number
 *             properties:
 *               first_name:
 *                 type: string
 *                 example: Kamal12
 *               last_name:
 *                 type: string
 *                 example: Perera12
 *               nic:
 *                 type: string
 *                 example: "199012345679"
 *               phone:
 *                 type: string
 *                 example: "0771234568"
 *               license_number:
 *                 type: string
 *                 example: B1234568
 *               address:
 *                 type: string
 *                 example: "No. 55, Galle Road, Colombo 03"
 *               is_active:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Driver updated
 *       404:
 *         description: Driver not found
 *   delete:
 *     summary: Delete a driver
 *     tags: [Drivers]
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
 *         description: Driver deleted
 *       404:
 *         description: Driver not found
 */

router.get("/", authorizeRoles("admin", "police"), getAllDrivers);
router.get("/:id", authorizeRoles("admin", "police"), validateDriverId, getDriverById);
router.post("/", authorizeRoles("admin"), validateCreateDriver, createDriver);
router.patch("/:id", authorizeRoles("admin"), validateDriverId, validateUpdateDriver, updateDriver);
router.delete("/:id", authorizeRoles("admin"), validateDriverId, deleteDriver);

export default router;