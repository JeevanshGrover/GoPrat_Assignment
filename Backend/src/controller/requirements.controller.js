import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Requirement, modelByCategory } from "../models/requirement.model.js";

const createRequirement = asyncHandler(async (req, res) => {
  const { category, event, details } = req.body;

  const Model = modelByCategory[category];
  if (!Model) {
    throw new ApiError(400, "Invalid category");
  }

  if (event?.dateMode === "range") {
    if (!event.endDate) {
      throw new ApiError(400, "End date is required for a date range");
    }
    if (new Date(event.endDate) < new Date(event.startDate)) {
      throw new ApiError(400, "End date cannot be before start date");
    }
  }

  if (category === "planner" && details?.budgetMax < details?.budgetMin) {
    throw new ApiError(400, "Max budget cannot be less than min budget");
  }

  if (event?.dateMode === "single") {
    delete event.endDate;
  }

  const requirement = await Model.create(req.body);

  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        {
          _id: requirement._id,
          category: requirement.category,
          status: requirement.status,
        },
        "Requirement created successfully"
      )
    );
});

const getRequirementById = asyncHandler(async (req, res) => {
  const requirement = await Requirement.findById(req.params.id);

  if (!requirement) {
    throw new ApiError(404, "Requirement not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, requirement, "Requirement fetched successfully"));
});

const getRequirements = asyncHandler(async (req, res) => {
  const { category } = req.query;

  if (category && !modelByCategory[category]) {
    throw new ApiError(400, "Invalid category");
  }

  const filter = category ? { category } : {};
  const requirements = await Requirement.find(filter).sort({ createdAt: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, requirements, "Requirements fetched successfully"));
});

export { 
    createRequirement, 
    getRequirementById, 
    getRequirements 
};