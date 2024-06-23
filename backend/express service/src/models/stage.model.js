import mongoose, { Schema } from "mongoose";

const stageSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    next_stage: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Stage = mongoose.model("Stage", stageSchema);
