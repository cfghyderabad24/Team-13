import { Project } from "../models/project.model.js";
import sendEmail from "./SendEmail.js";
import { Stage } from "../models/stage.model.js";

export async function sendEscalationNotification() {
  const projects = await Project.find({ current_status: "pending" });

  projects.forEach(async (project) => {
    const daysUntilEscalation = Math.floor(
      project.escalationDate - Date.now() / (1000 * 60 * 60 * 24)
    );
    const shouldSendEscalationNotification =
      !project.lastEscalationNotification ||
      new Date(project.lastEscalationNotification).toDateString() !==
        new Date().toDateString();

    if (daysUntilEscalation <= 0) {
      if (shouldSendEscalationNotification) {
        await sendEmail(
          await Stage.findOne({ name: project.current_stage }).email,
          "Project Escalated",
          `Your project with id ${mongoose.Types.ObjectId(
            project._id
          )} has been escalated to the next stage.`
        );
        project.current_stage = await Stage.findOne({
          name: project.current_stage,
        }).next_stage;
        project.lastEscalationNotification = null;
        project.escalationDate = new Date() + 1000 * 60 * 60 * 24 * 7;
        await project.save();
      }
    } else {
      if (shouldSendEscalationNotification) {
        await sendEmail(
          await Stage.findOne({ name: project.current_stage }).email,
          "Escalation Reminder",
          `Your project will be escalated in ${daysUntilEscalation} days.Approve or reject the project before then.`
        );
        project.lastEscalationNotification = new Date();
      }
    }
  });
}
