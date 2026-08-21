import { Router } from "express";
import { searchClassSessions } from "../controllers/search.controller";

const router = Router();

router.get("/", searchClassSessions);

export default router;