
import { Request, Response } from "express";
import mongoose from "mongoose";
import ClassSession from "../models/classSession.model";

export const getAllClassSessions = async (req: Request, res: Response) => {
  try {
    const classSessions = await ClassSession.find().populate(
      "trainer",
      "fullName email"
    );

    return res.status(200).json({
      message: "Class sessions retrieved successfully",
      classSessions,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getClassSessionById = async (req: Request, res: Response) => {
  try {
    const sessionId = req.params.id;

    if (!sessionId) {
      return res.status(400).json({
        message: "Id is required",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(sessionId as string )) {
      return res.status(400).json({
        message: "Invalid session id",
      });
    }

    const classSession = await ClassSession.findById(sessionId).populate(
      "trainer",
      "fullName email"
    );

    if (!classSession) {
      return res.status(404).json({
        message: "No Class Session for this id",
      });
    }

    return res.status(200).json({
      message: "Class session retrieved successfully",
      classSession,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const createClassSession = async (req: Request, res: Response) => {
  try {
    const { title, capacity, startTime, durationMinutes } = req.body;

    if (!title || capacity === undefined || !startTime) {
      return res.status(400).json({
        message: "Title, capacity and startTime are required",
      });
    }

    if (!Number.isInteger(capacity) || capacity < 1) {
      return res.status(400).json({
        message: "Capacity must be a positive integer",
      });
    }

    const sessionDate = new Date(startTime);

    if (isNaN(sessionDate.getTime())) {
      return res.status(400).json({
        message: "Invalid startTime",
      });
    }

    if (sessionDate <= new Date()) {
      return res.status(400).json({
        message: "Session must be in the future",
      });
    }

    if (
      durationMinutes !== undefined &&
      (!Number.isInteger(durationMinutes) || durationMinutes < 1)
    ) {
      return res.status(400).json({
        message: "Duration must be a positive integer",
      });
    }

    const classSession = await ClassSession.create({
      title,
      capacity,
      startTime: sessionDate,
      durationMinutes,
      trainer: req.user.id,
    });

    return res.status(201).json({
      message: "Class session created successfully",
      classSession,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const updateClassSession = async (req: Request, res: Response) => {
  try {
    const sessionId = req.params.id;

    if (!sessionId) {
      return res.status(400).json({
        message: "Id is required",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(sessionId as string)) {
      return res.status(400).json({
        message: "Invalid session id",
      });
    }

    const classSession = await ClassSession.findById(sessionId);

    if (!classSession) {
      return res.status(404).json({
        message: "No Class Session for this id",
      });
    }

    if (classSession.trainer.toString() !== req.user.id) {
      return res.status(403).json({
        message: "You are not authorized to update this session",
      });
    }

   const {title, capacity, startTime, durationMinutes } = req.body;

    if (capacity !== undefined) {
      if (!Number.isInteger(capacity) || capacity < 1) {
        return res.status(400).json({
          message: "Capacity must be a positive integer",
        });
      }
    }

    if (startTime !== undefined) {
      const sessionDate = new Date(startTime);

      if (isNaN(sessionDate.getTime())) {
        return res.status(400).json({
          message: "Invalid startTime",
        });
      }

      if (sessionDate <= new Date()) {
        return res.status(400).json({
          message: "Session must be in the future",
        });
      }
    }

    if (durationMinutes !== undefined) {
      if (!Number.isInteger(durationMinutes) || durationMinutes < 1) {
        return res.status(400).json({
          message: "Duration must be a positive integer",
        });
      }
    }

   
    const updatedSession = await ClassSession.findByIdAndUpdate(
  sessionId,
  { title, capacity, startTime, durationMinutes },
  {
    new: true,
    runValidators: true,
  }
);

    return res.status(200).json({
      message: "Class session updated successfully",
      updatedSession,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteClassSession = async (req: Request, res: Response) => {
  try {
    const sessionId = req.params.id;

    if (!sessionId) {
      return res.status(400).json({
        message: "Id is required",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(sessionId as string)) {
      return res.status(400).json({
        message: "Invalid session id",
      });
    }

    const classSession = await ClassSession.findById(sessionId);

    if (!classSession) {
      return res.status(404).json({
        message: "No Class Session for this id",
      });
    }

    if (classSession.trainer.toString() !== req.user.id) {
      return res.status(403).json({
        message: "You are not authorized to delete this session",
      });
    }

    await ClassSession.findByIdAndDelete(sessionId);

    return res.status(200).json({
      message: "Class session deleted successfully",
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
