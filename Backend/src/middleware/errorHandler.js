import mongoose from "mongoose";
import { ApiError } from "../utils/ApiError.js";

const errorHandler = (err, req, res, next) => {
  // If headers already sent, delegate to default express handler
  if (res.headersSent) {
    return next(err);
  }

  // Handle Mongoose Validation Error
  if (err instanceof mongoose.Error.ValidationError) {
    const errors = Object.values(err.errors).map((e) => ({
      field: e.path,
      message: e.message,
    }));
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors,
      data: null,
    });
  }

  // Handle Mongoose CastError (e.g. invalid ObjectId or number type)
  if (err instanceof mongoose.Error.CastError) {
    return res.status(400).json({
      success: false,
      message: `Invalid ${err.path}: ${err.value}`,
      errors: [{ field: err.path, message: `Invalid ${err.path}` }],
      data: null,
    });
  }

  // Handle ApiError
  if (err instanceof ApiError) {
    return res.status(err.statusCode || 400).json({
      success: false,
      message: err.message,
      errors: err.errors || [],
      data: null,
    });
  }

  // Handle malformed JSON error from express.json()
  if (err.type === "entity.parse.failed" || (err instanceof SyntaxError && err.status === 400 && "body" in err)) {
    return res.status(400).json({
      success: false,
      message: "Malformed JSON in request body",
      errors: [],
      data: null,
    });
  }

  // Generic 500 error
  console.error("Unhandled error:", err);
  return res.status(500).json({
    success: false,
    message: "Something went wrong",
    errors: [],
    data: null,
  });
};

export { errorHandler };
