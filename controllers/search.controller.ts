import { Request, Response } from "express";
import ClassSession from "../models/classSession.model";
import { User } from "../models/user.model";
import { Booking } from "../models/booking.model";

export const searchClassSessions = async (
  req: Request,
  res: Response
) => {
  try {
    const { title, trainer, day, available } = req.query;

    const filter: any = {};

    // Search by class title
    if (title) {
      filter.title = {
        $regex: title as string,
        $options: "i",
      };
    }

    // Search by trainer name
    if (trainer) {
      const trainers = await User.find({
        fullName: {
          $regex: trainer as string,
          $options: "i",
        },
        role: "Trainer",
      }).select("_id");

      filter.trainer = {
        $in: trainers.map((t) => t._id),
      };
    }

    // Filter by day
    if (day) {
      const dayDate = new Date(day as string);

      if (isNaN(dayDate.getTime())) {
        return res.status(400).json({
          message: "Invalid day format. Use YYYY-MM-DD",
        });
      }

      const startOfDay = new Date(
        new Date(dayDate).setHours(0, 0, 0, 0)
      );

      const endOfDay = new Date(
        new Date(dayDate).setHours(23, 59, 59, 999)
      );

      filter.startTime = {
        $gte: startOfDay,
        $lte: endOfDay,
      };
    }

    let classSessions = await ClassSession.find(filter).populate(
      "trainer",
      "fullName email"
    );

    // Filter available sessions
    if (available === "true") {
      const withAvailability = await Promise.all(
        classSessions.map(async (session) => {
          const bookedCount = await Booking.countDocuments({
            session: session._id,
            status: "booked",
          });

          return {
            session,
            hasSpace: bookedCount < session.capacity,
          };
        })
      );

      classSessions = withAvailability
        .filter((item) => item.hasSpace)
        .map((item) => item.session);
    }

    return res.status(200).json({
      message: "Class sessions retrieved successfully",
      count: classSessions.length,
      classSessions,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};