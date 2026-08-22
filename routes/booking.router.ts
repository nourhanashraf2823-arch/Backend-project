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
 *               - session
 *             properties:
 *               session:
 *                 type: string
 *                 description: Class session ID
 *                 example: "6a896c4d0b443b4502d51b0f"
 *     responses:
 *       201:
 *         description: Booking done successfully
 *       400:
 *         description: Invalid or expired session / duplicate booking / no seats
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Class session not found
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
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user bookings
 *       401:
 *         description: Unauthorized
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
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Booking ID
 *         example: "6a896d1b0b443b4502d51b10"
 *     responses:
 *       200:
 *         description: Booking cancelled successfully
 *       400:
 *         description: Invalid booking ID or booking already cancelled
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: You can only cancel your own booking
 *       404:
 *         description: Booking not found
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
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of bookings for the trainer
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Trainer role required
 */
router.get(
  "/trainer",
  authenticate,
  authrizeRoles(["Trainer"]),
  gettraninerbookings
);

export default router;