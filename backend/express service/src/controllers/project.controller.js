import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { Project } from "../models/project.model.js";
import uploadOnCloudinary from "../utils/cloudinary.js";

const addProject = asyncHandler(async (req, res) => {
  const { ngo_name, budget } = req.body;
  if ([ngo_name, budget].some((field) => field?.trim() == "")) {
    throw new ApiError(400, "All fields are required");
  }
  const itrlocalPath = req.files?.ITR[0]?.path;
  const proposallocalPath = req.files?.proposal_doc[0]?.path;
  if (!itrlocalPath || !proposallocalPath) {
    throw new ApiError(400, "ITR and proposal documents are required");
  }

  const itr = await uploadOnCloudinary(itrlocalPath);
  const proposal = await uploadOnCloudinary(proposallocalPath);

  if (!itr || !proposal) {
    throw new ApiError(500, "Failed to upload documents");
  }

  const project = new Project.create({
    frontliner_id: req.id,
    ngo_name,
    budget,
    ITR: itr,
    proposal_doc: proposal,
    siteVisitDate: new Date(new Date().setDate(new Date().getDate() + 90)),
    escalationDate: new Date(new Date().setDate(new Date().getDate() + 7)),
  });

  const createdUser = await Project.findById(project._id);
  if (!createdUser) {
    throw new ApiError(500, "Failed to create project");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, "Project created", createdUser));
});

const fetchProjects = asyncHandler(async (req, res) => {
  const { frontliner_id } = req.params;
  if (!frontliner_id) {
    throw new ApiError(400, "Frontliner ID is required");
  }

  const projects = await Project.find({ frontliner_id });

  if (projects.length === 0) {
    throw new ApiError(404, "No projects found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "Projects fetched", projects));
});

const fetchProjectDetails = asyncHandler(async (req, res) => {
  const { frontliner_id, project_id } = req.params;
  if (!frontliner_id || !project_id) {
    throw new ApiError(400, "Frontliner ID and Project ID are required");
  }

  const project = await Project.findOne({ frontliner_id, _id: project_id });

  if (!project) {
    throw new ApiError(404, "Project not found");
  }

  return res.status(200).json(new ApiResponse(200, "Project fetched", project));
});

const fetchProjectsPerRole = asyncHandler(async (req, res) => {
  console.log("role projects");
  const { role } = req.params;
  if (!role) {
    throw new ApiError(400, "Role is required");
  }
  const projects = await Project.find({
    current_stage: role,
    current_status: "pending",
  });
  if (projects.length === 0) {
    throw new ApiError(404, "No projects found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, "Projects fetched", projects));
});

const approveProject = asyncHandler(async (req, res) => {
  const { project_id } = req.params;
  if (!project_id) {
    throw new ApiError(400, "Project ID is required");
  }
  const project = await Project.findById(project_id);
  if (!project) {
    throw new ApiError(404, "Project not found");
  }
  project.current_status = "approved";
  project.save();
  return res
    .status(200)
    .json(new ApiResponse(200, "Project approved", project));
});

const rejectProject = asyncHandler(async (req, res) => {
  const { project_id } = req.params;
  if (!project_id) {
    throw new ApiError(400, "Project ID is required");
  }
  const project = await Project.findById(project_id);
  if (!project) {
    throw new ApiError(404, "Project not found");
  }
  project.current_status = "rejected";
  project.save();
  return res
    .status(200)
    .json(new ApiResponse(200, "Project rejected", project));
});

const getProjectDetailsForRole = asyncHandler(async (req, res) => {
  const { role, project_id } = req.params;
  if (!role || !project_id) {
    throw new ApiError(400, "Role and Project ID are required");
  }
  const project = await Project.findOne({
    current_stage: role,
    _id: project_id,
  });
  if (!project) {
    throw new ApiError(404, "Project not found");
  }
  return res.status(200).json(new ApiResponse(200, "Project fetched", project));
});

export {
  addProject,
  fetchProjects,
  fetchProjectDetails,
  fetchProjectsPerRole,
  approveProject,
  rejectProject,
  getProjectDetailsForRole,
};
