import mongoose, { Schema } from "mongoose";
import sendEmail from "../utils/SendEmail.js";

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
    siteVisitDate: {
      type: Date,
    },
    escalationDate: {
      type: Date,
    },
    lastEscalationNotification: {
      type: Date,
      default: null,
    },
    lastSiteVisitNotification: {
      type: Date,
      default: null,
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

projectSchema.pre("save", async function (next) {
  if (this.isModified("current_status")) {
    if (this.current_status === "approved") {
      if (this.current_stage === this.cutoff) {
        this.sentToFinance = true;
      } else {
        this.current_stage = await Stage.findOne({ name: this.current_stage })
          .next_stage;
      }
    } else if (this.current_status === "declined") {
      sendEmail(
        await Stage.findOne({ name: this.current_stage }).email,
        "Project Declined",
        `Your project with id ${mongoose.Types.ObjectId(
          this._id
        )} has been declined.`
      );
    }
  }
  next();
});

export const Project = mongoose.model("Project", projectSchema);
