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

router.use(authenticate, authorizeRoles("admin"));

router.post("/", validateCreateUser, createUser);
router.get("/", getAllUsers);
router.get("/:id", validateUserId, getUserById);
router.patch("/:id", validateUserId, validateUpdateUser, updateUser);
router.delete("/:id", validateUserId, deleteUser);

export default router;