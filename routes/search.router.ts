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
 */
router.get("/", searchClassSessions);

export default router;