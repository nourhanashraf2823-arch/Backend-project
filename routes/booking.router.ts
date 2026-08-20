import { Router } from "express";

import {
 bookSession,
  cancelbooking,
 gettraninerbookings,
 getMyBookings,
  
} from "../controllers/booking.controller.js";

import { authenticate } from "../middlewares/auth.middleware.js";
import { authrizeRoles } from "../middlewares/role.middleware.js";

const router = Router();


router.post(
  "/",
  authenticate,
  authrizeRoles(["Member"]),
 bookSession,
);


router.get(
  "/my",
  authenticate,
  authrizeRoles(["Member"]),
  getMyBookings
);
router.patch(
  "/:id/cancel",
  authenticate,
  authrizeRoles(["Member"]),
   cancelbooking,
);

router.get(
  "/trainer",
  authenticate,
  authrizeRoles(["Trainer"]),
 gettraninerbookings
);

export default router;