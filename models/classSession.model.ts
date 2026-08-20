import mongoose from "mongoose";

const classSessionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },

    trainer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    capacity: {
      type: Number,
      required: true,
      min: 1,
      validate: {
        validator: Number.isInteger,
        message: "Capacity must be a positive integer"
      }
    },

    startTime: {
      type: Date,
      required: true,
      validate: {
        validator: function (value: Date) {
          return value > new Date();
        },
        message: "Session must be in the future"
      }
    },

    durationMinutes: {
      type: Number,
      required: true,
      min: 1,
      validate: {
        validator: Number.isInteger,
        message: "Duration must be a positive integer"
      }
    }
  },
  { timestamps: true }
);

const ClassSession = mongoose.model("ClassSession", classSessionSchema);

export default ClassSession;
