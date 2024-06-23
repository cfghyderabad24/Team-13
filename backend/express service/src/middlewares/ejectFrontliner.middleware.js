import asyncHandler from "../utils/asyncHandler.js";

export const ejectFrontliner = asyncHandler(async (req, res, next) => {
  const { frontliner_id } = req.params;
  if (!frontliner_id) {
    throw new ApiError(400, "Frontliner ID is required");
  }
  req.id = frontliner_id;
  next();
});

export default ejectFrontliner;
