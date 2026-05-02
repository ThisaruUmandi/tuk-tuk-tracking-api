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

/**
 * @swagger
 * tags:
 *   name: Provinces
 *   description: Province management
 */
 
/**
 * @swagger
 * /provinces:
 *   get:
 *     summary: Get all provinces
 *     tags: [Provinces]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of provinces
 *       401:
 *         description: Unauthorized
 *   post:
 *     summary: Create a province
 *     tags: [Provinces]
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
 *             properties:
 *               name:
 *                 type: string
 *                 example: Western Province Test
 *               code:
 *                 type: string
 *                 example: WPT
 *     responses:
 *       201:
 *         description: Province created
 *       401:
 *         description: Unauthorized
 */
 
/**
 * @swagger
 * /provinces/{id}:
 *   get:
 *     summary: Get province by ID
 *     tags: [Provinces]
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
 *         description: Province found
 *       404:
 *         description: Province not found
 *   put:
 *     summary: Update a province
 *     tags: [Provinces]
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
 *             properties:
 *               name:
 *                 type: string
 *                 example: Western Province Test12
 *               code:
 *                 type: string
 *                 example: WPT12
 *     responses:
 *       200:
 *         description: Province updated
 *       404:
 *         description: Province not found
 *   delete:
 *     summary: Delete a province
 *     tags: [Provinces]
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
 *         description: Province deleted
 *       404:
 *         description: Province not found
 */

router.get("/", authorizeRoles("admin", "police"), getAllProvinces);
router.get("/:id", authorizeRoles("admin", "police"), validateProvinceId, getProvinceById);

router.post("/", authorizeRoles("admin"), validateCreateProvince, createProvince);
router.put("/:id", authorizeRoles("admin"), validateProvinceId, validateUpdateProvince, updateProvince);
router.delete("/:id", authorizeRoles("admin"), validateProvinceId, deleteProvince);

export default router;