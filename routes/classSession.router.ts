
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

router.get("/", getAllClassSessions);

router.get("/:id", getClassSessionById);

router.post(
  "/",
  authenticate,
  authrizeRoles(["Trainer"]),
  createClassSession
);

router.put(
  "/:id",
  authenticate,
  authrizeRoles(["Trainer"]),
  updateClassSession
);

router.delete(
  "/:id",
  authenticate,
  authrizeRoles(["Trainer"]),
  deleteClassSession
);

export default router;
