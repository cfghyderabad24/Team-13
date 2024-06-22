import mongoose, { Schema } from "mongoose";

const projectSchema = new Schema(
  {
    frontliner_id: {
      type: Number,
      required: true,
    },
    ngo_name: {
      type: String,
      required: true,
    },
    budget: {
      type: Number,
      required: true,
    },
    current_stage: {
      type: String,
      default: "state_lead",
    },
    current_status: {
      type: String,
      enum: ["approved", "pending", "declined"],
      default: "pending",
    },
    deadline: {
      type: Date,
      required: true,
    },
    ITR: {
      type: String, //cloudinary url
      required: true,
    },
    proposal_doc: {
      type: String, //cloudinary url
      required: true,
    },
    cutoff: {
      type: String,
    },
    sentToFinance: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

projectSchema.pre("save", async function (next) {
  this.cutoff =
    this.budget < 500000
      ? "general_manager"
      : this.budget < 1000000
      ? "regional_commitee"
      : "head_office";
});

export const Project = mongoose.model("Project", projectSchema);
