import { Router } from "express";
import { searchClassSessions } from "../controllers/search.controller";

const router = Router();

/**
 * @swagger
 * /api/search:
 *   get:
 *     summary: Search and filter class sessions
 *     tags:
 *       - Search
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         description: Search keyword for session title or description
 *         example: "Yoga"
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *         description: Filter sessions by date
 *         example: "2026-09-01"
 *     responses:
 *       200:
 *         description: Search results retrieved successfully
 */
router.get("/", searchClassSessions);

export default router;