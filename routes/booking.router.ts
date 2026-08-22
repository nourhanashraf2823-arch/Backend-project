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
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - classId
 *               - date
 *             properties:
 *               classId:
 *                 type: string
 *               date:
 *                 type: string
 *     responses:
 *       201:
 *         description: Booking created successfully
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
 *     responses:
 *       200:
 *         description: List of user bookings
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
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The booking ID
 *     responses:
 *       200:
 *         description: Booking cancelled successfully
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
 *     responses:
 *       200:
 *         description: List of bookings for the trainer
 */
router.get(
  "/trainer",
  authenticate,
  authrizeRoles(["Trainer"]),
  gettraninerbookings
);

export default router;