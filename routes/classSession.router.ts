import { Router } from "express";

import {
  getAllClassSessions,
  getClassSessionById,
  createClassSession,
  updateClassSession,
  deleteClassSession,
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
 *     responses:
 *       200:
 *         description: Successfully retrieved all class sessions
 */
router.get("/", getAllClassSessions);

/**
 * @swagger
 * /api/sessions/{id}:
 *   get:
 *     summary: Get class session by ID
 *     tags:
 *       - Class Sessions
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Class session ID
 *     responses:
 *       200:
 *         description: Successfully retrieved the class session
 *       404:
 *         description: Class session not found
 */
router.get("/:id", getClassSessionById);

/**
 * @swagger
 * /api/sessions:
 *   post:
 *     summary: Create class session
 *     tags:
 *       - Class Sessions
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - date
 *               - capacity
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Yoga Class"
 *               description:
 *                 type: string
 *                 example: "Morning relaxation and flexibility training"
 *               date:
 *                 type: string
 *                 example: "2026-09-01T10:00:00.000Z"
 *               capacity:
 *                 type: number
 *                 example: 15
 *     responses:
 *       201:
 *         description: Class session created successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
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
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Class session ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Advanced Yoga Class"
 *               description:
 *                 type: string
 *                 example: "Updated session details"
 *               date:
 *                 type: string
 *                 example: "2026-09-02T10:00:00.000Z"
 *               capacity:
 *                 type: number
 *                 example: 20
 *     responses:
 *       200:
 *         description: Class session updated successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Class session not found
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
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Class session ID
 *     responses:
 *       200:
 *         description: Class session deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Class session not found
 */
router.delete(
  "/:id",
  authenticate,
  authrizeRoles(["Trainer"]),
  deleteClassSession
);

export default router;