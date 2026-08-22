import { Router } from "express";

import {
 bookSession,
  cancelbooking,
 gettraninerbookings,
 getMyBookings,
  
} from "../controllers/booking.controller";

import { authenticate } from "../middlewares/auth.middleware";
import { authrizeRoles } from "../middlewares/role.middleware";

const router = Router();

/**
 * @swagger
 * /api/bookings:
 *   post:
 *     summary: Book a class session
 *     tags:
 *       - Bookings
 */
router.post(
  "/",
  authenticate,
  authrizeRoles(["Member"]),
  bookSession
);
/**
 * @swagger
 * /api/bookings/my:
 *   get:
 *     summary: Get my bookings
 *     tags:
 *       - Bookings
 */
router.get(
  "/my",
  authenticate,
  authrizeRoles(["Member"]),
  getMyBookings
);
/**
 * @swagger
 * /api/bookings/{id}/cancel:
 *   patch:
 *     summary: Cancel my booking
 *     tags:
 *       - Bookings
 */
router.patch(
  "/:id/cancel",
  authenticate,
  authrizeRoles(["Member"]),
  cancelbooking
);
/**
 * @swagger
 * /api/bookings/trainer:
 *   get:
 *     summary: Get trainer bookings
 *     tags:
 *       - Bookings
 */
router.get(
  "/trainer",
  authenticate,
  authrizeRoles(["Trainer"]),
  gettraninerbookings
);

export default router;