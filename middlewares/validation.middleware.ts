import { Request, Response, NextFunction } from "express";

export const validateRegister = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { fullName, email, password, role } = req.body;

  if (!fullName || !email || !password || !role) {
    return res.status(400).json({
      message: "All fields are required.",
    });
  }

  if (!email.includes("@") || !email.includes(".")) {
    return res.status(400).json({
      message: "Please provide a valid email address.",
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      message: "Password must be at least 6 characters.",
    });
  }

  if (role !== "Member" && role !== "Trainer") {
    return res.status(400).json({
      message: "Role must be either Member or Trainer.",
    });
  }

  next();
};

export const validateLogin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password are required.",
    });
  }

  next();
};

export const validateClassSession = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { title, capacity, startTime, durationMinutes } = req.body;

  if (!title || capacity === undefined || !startTime) {
    return res.status(400).json({
      message: "Title, capacity and startTime are required.",
    });
  }

  if (!Number.isInteger(capacity) || capacity < 1) {
    return res.status(400).json({
      message: "Capacity must be a positive integer.",
    });
  }

  const sessionDate = new Date(startTime);

  if (isNaN(sessionDate.getTime())) {
    return res.status(400).json({
      message: "Invalid startTime.",
    });
  }

  if (sessionDate <= new Date()) {
    return res.status(400).json({
      message: "Session must be in the future.",
    });
  }

  if (
    durationMinutes !== undefined &&
    (!Number.isInteger(durationMinutes) || durationMinutes < 1)
  ) {
    return res.status(400).json({
      message: "Duration must be a positive integer.",
    });
  }

  next();
};

export const validateBooking = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { session } = req.body;

  if (!session) {
    return res.status(400).json({
      message: "session ID is required.",
    });
  }

  next();
};