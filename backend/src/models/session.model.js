import mongoose, { Schema } from "mongoose";

const sessionSchema = new mongoose.Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User", // Reference to the User collection
      required: true,
    },
    duration: {
      type: Number, // Duration in seconds
      required: true,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

export default mongoose.model("Session", sessionSchema); // Session model export
