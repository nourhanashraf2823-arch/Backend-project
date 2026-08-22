import { Router } from "express";

import {
  getAllClassSessions,
  getClassSessionById,
  createClassSession,
  updateClassSession,
  deleteClassSession
} from "../controllers/classSession.controller";

import { authenticate } from "../middlewares/auth.middleware";
import { authrizeRoles } from "../middlewares/role.middleware";

const router = Router();
/**
 * @swagger
 * /api/sessions:
 *   get:
 *     summary: Get all class sessions
 *     tags:
 *       - Class Sessions
 */
router.get("/", getAllClassSessions);
/**
 * @swagger
 * /api/sessions/{id}:
 *   get:
 *     summary: Get class session by ID
 *     tags:
 *       - Class Sessions
 */
router.get("/:id", getClassSessionById);
/**
 * @swagger
 * /api/sessions:
 *   post:
 *     summary: Create class session
 *     tags:
 *       - Class Sessions
 */
router.post(
  "/",
  authenticate,
  authrizeRoles(["Trainer"]),
  createClassSession
);
/**
 * @swagger
 * /api/sessions/{id}:
 *   put:
 *     summary: Update class session
 *     tags:
 *       - Class Sessions
 */
router.put(
  "/:id",
  authenticate,
  authrizeRoles(["Trainer"]),
  updateClassSession
);
/**
 * @swagger
 * /api/sessions/{id}:
 *   delete:
 *     summary: Delete class session
 *     tags:
 *       - Class Sessions
 */
router.delete(
  "/:id",
  authenticate,
  authrizeRoles(["Trainer"]),
  deleteClassSession
);

export default router;
