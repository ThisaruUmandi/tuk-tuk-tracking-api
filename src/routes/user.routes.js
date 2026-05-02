import express from "express";
import authenticate from "../middlewares/auth.middleware.js";
import authorizeRoles from "../middlewares/rbac.middleware.js";

import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";
import {
  validateUserId,
  validateCreateUser,
  validateUpdateUser,
} from "../validations/user.validation.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */
 
/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users
 *       401:
 *         description: Unauthorized
 *   post:
 *     summary: Create a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - first_name
 *               - last_name
 *               - email
 *               - password_hash
 *               - role
 *             properties:
 *               first_name:
 *                 type: string
 *                 example: Nimali
 *               last_name:
 *                 type: string
 *                 example: Perera
 *               email:
 *                 type: string
 *                 example: Nimali@test.com
 *               password_hash:
 *                 type: string
 *                 example: "123456"
 *               role:
 *                 type: string
 *                 enum: [admin, police]
 *                 example: police
 *               police_station_id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: User created
 *       401:
 *         description: Unauthorized
 */
 
/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags: [Users]
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
 *         description: User found
 *       404:
 *         description: Not found
 *   patch:
 *     summary: Update a user
 *     tags: [Users]
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
 *               - role
 *               - is_active
 *             properties:
 *               first_name:
 *                 type: string
 *                 example: Nimali1
 *               last_name:
 *                 type: string
 *                 example: Perera1
 *               role:
 *                 type: string
 *                 enum: [admin, police]
 *                 example: police
 *               is_active:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: User updated
 *       404:
 *         description: Not found
 *   delete:
 *     summary: Delete a user
 *     tags: [Users]
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
 *         description: User deleted
 *       404:
 *         description: Not found
 */

router.post("/", validateCreateUser, createUser);
router.get("/", authenticate, authorizeRoles("admin"), getAllUsers);
router.get("/:id", authenticate, authorizeRoles("admin"), validateUserId, getUserById);
router.patch("/:id", authenticate, authorizeRoles("admin"), validateUserId, validateUpdateUser, updateUser);
router.delete("/:id", authenticate, authorizeRoles("admin"), validateUserId, deleteUser);

export default router;