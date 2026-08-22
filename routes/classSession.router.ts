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
 *         example: "6a896c4d0b443b4502d51b0f"
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
 *               - capacity
 *               - startTime
 *               - durationMinutes
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Yoga Class"
 *               capacity:
 *                 type: number
 *                 example: 15
 *               startTime:
 *                 type: string
 *                 format: date-time
 *                 example: "2026-09-01T10:00:00.000Z"
 *               durationMinutes:
 *                 type: number
 *                 example: 60
 *     responses:
 *       201:
 *         description: Class session created successfully
 *       400:
 *         description: Invalid session data
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Trainer role required
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
 *         example: "6a896c4d0b443b4502d51b0f"
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
 *               capacity:
 *                 type: number
 *                 example: 20
 *               startTime:
 *                 type: string
 *                 format: date-time
 *                 example: "2026-09-02T10:00:00.000Z"
 *               durationMinutes:
 *                 type: number
 *                 example: 60
 *     responses:
 *       200:
 *         description: Class session updated successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Trainer role required
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
 *         example: "6a89701e0b443b4502d51b11"
 *     responses:
 *       200:
 *         description: Class session deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Trainer role required
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