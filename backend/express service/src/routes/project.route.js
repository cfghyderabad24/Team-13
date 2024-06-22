import { Router } from "express";
import {
  addProject,
  fetchProjects,
  fetchProjectDetails,
  fetchProjectsPerRole,
  approveProject,
  rejectProject,
} from "../controllers/project.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { ejectFrontliner } from "../middlewares/ejectFrontliner.middleware.js";

const projectRouter = Router();

projectRouter.post(
  "/add/:frontliner_id/",
  upload.fields([
    { name: "ITR", maxCount: 1 },
    { name: "proposal_doc", maxCount: 1 },
  ]),
  ejectFrontliner,
  addProject
);

projectRouter.get("/frontliner/:frontliner_id/", fetchProjects);
projectRouter.get(
  "/frontliner/:frontliner_id/:project_id",
  fetchProjectDetails
);
projectRouter.get("/role/:role", fetchProjectsPerRole);
projectRouter.patch("/approve/:project_id", approveProject);
projectRouter.patch("/reject/:project_id", rejectProject);

export default projectRouter;
